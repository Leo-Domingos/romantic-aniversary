import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

// Converte exec para Promise
const execPromise = util.promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { mensagem } = await request.json();
    
    // Criando a data atual formatada
    const now = new Date();
    const dataFormatada = now.toLocaleDateString('pt-BR');
    const horaFormatada = now.toLocaleTimeString('pt-BR');
    
    // Conteúdo do arquivo
    const conteudo = `Data: ${dataFormatada} às ${horaFormatada}\n\nMensagem:\n${mensagem}`;
    
    // Nome do arquivo
    const nomeArquivo = `mensagem-do-futuro-${dataFormatada.replace(/\//g, '-')}-${Date.now()}.txt`;
    
    // Caminho para salvar
    const diretorio = path.join(process.cwd(), 'public', 'mensagens_do_futuro');
    
    // Verifica se o diretório existe, se não, cria
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }
    
    // Caminho completo do arquivo
    const caminhoArquivo = path.join(diretorio, nomeArquivo);
    
    // Escreve o arquivo
    fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');
    
    // Caminhos relativos para os comandos git
    const caminhoRelativo = path.join('public', 'mensagens_do_futuro', nomeArquivo);
    
    try {
      // Configurar git se estivermos em produção
      if (process.env.NODE_ENV === 'production') {
        await execPromise('git config --global user.name "Mensagens Bot"');
        await execPromise('git config --global user.email "bot@example.com"');
      }
      
      // Adicionar o arquivo ao Git
      await execPromise(`git add "${caminhoRelativo}"`);
      
      // Fazer commit
      await execPromise(`git commit -m "Nova mensagem: ${dataFormatada} ${horaFormatada}"`);
      
      // Fazer push se tivermos as credenciais (em produção você precisará configurar as credenciais do GitHub)
      if (process.env.GITHUB_TOKEN) {
        // Utiliza o token para autenticação
        const repoUrl = process.env.GITHUB_REPO_URL?.replace('https://', `https://${process.env.GITHUB_TOKEN}@`);
        await execPromise(`git push ${repoUrl || 'origin'} main`);
      } else {
        // Em desenvolvimento, só informa que o push seria feito
        console.log('GITHUB_TOKEN não configurado. Em produção, configure para fazer push automático.');
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Mensagem salva com sucesso e adicionada ao Git!',
        filePath: `/mensagens_do_futuro/${nomeArquivo}`,
        gitStatus: 'Arquivo commitado' + (process.env.GITHUB_TOKEN ? ' e enviado para o GitHub' : ' localmente')
      });
      
    } catch (gitError) {
      console.error('Erro nas operações Git:', gitError);
      
      // Mesmo que o Git falhe, o arquivo foi salvo
      return NextResponse.json({ 
        success: true, 
        message: 'Mensagem salva com sucesso, mas houve um erro ao adicionar ao Git.',
        filePath: `/mensagens_do_futuro/${nomeArquivo}`,
        gitError: String(gitError)
      });
    }
    
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro ao salvar a mensagem' 
    }, { status: 500 });
  }
}

// Rota para listar todas as mensagens
export async function GET(request: NextRequest) {
  try {
    const diretorio = path.join(process.cwd(), 'public', 'mensagens_do_futuro');
    
    // Verifica se o diretório existe
    if (!fs.existsSync(diretorio)) {
      return NextResponse.json({ 
        success: true, 
        mensagens: [] 
      });
    }
    
    // Lê os arquivos do diretório
    const arquivos = fs.readdirSync(diretorio);
    
    // Filtra apenas os arquivos .txt
    const arquivosTxt = arquivos.filter(arquivo => arquivo.endsWith('.txt'));
    
    // Obtém informações dos arquivos
    const mensagens = arquivosTxt.map(arquivo => {
      const caminhoCompleto = path.join(diretorio, arquivo);
      const stat = fs.statSync(caminhoCompleto);
      const conteudo = fs.readFileSync(caminhoCompleto, 'utf8');
      
      return {
        nome: arquivo,
        data: stat.mtime,
        conteudo,
        caminho: `/mensagens_do_futuro/${arquivo}`
      };
    });
    
    // Ordena por data de modificação (mais recentes primeiro)
    mensagens.sort((a, b) => b.data.getTime() - a.data.getTime());
    
    return NextResponse.json({ 
      success: true, 
      mensagens 
    });
    
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro ao listar mensagens' 
    }, { status: 500 });
  }
} 