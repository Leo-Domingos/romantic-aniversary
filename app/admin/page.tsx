"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Mensagem {
  nome: string
  data: string
  conteudo: string
  caminho: string
}

export default function Admin() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [senha, setSenha] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [carregando, setCarregando] = useState(false)
  
  const verificarSenha = () => {
    // Senha simples para demonstração - mude em produção
    if (senha === 'lindinha123') {
      setAutenticado(true)
      carregarMensagens()
    } else {
      alert('Senha incorreta!')
    }
  }
  
  const carregarMensagens = async () => {
    setCarregando(true)
    try {
      const res = await fetch('/api/mensagem')
      const data = await res.json()
      
      if (data.success) {
        setMensagens(data.mensagens)
      } else {
        console.error('Erro ao carregar mensagens:', data.message)
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    }
    setCarregando(false)
  }
  
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR')
  }
  
  // Página de login
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Área Administrativa</h1>
          <p className="text-gray-600 mb-6 text-center">Digite a senha para acessar as mensagens.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => e.key === 'Enter' && verificarSenha()}
              />
            </div>
            
            <Button 
              onClick={verificarSenha}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Acessar
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  // Página principal com as mensagens
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Mensagens do Futuro</h1>
          <Button
            onClick={() => setAutenticado(false)}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Sair
          </Button>
        </div>
        
        {carregando ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-2"></div>
            <p className="text-gray-600">Carregando mensagens...</p>
          </div>
        ) : mensagens.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Nenhuma mensagem encontrada.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mensagens.map((mensagem, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-500">{formatarData(mensagem.data)}</span>
                  <div className="flex items-center space-x-3">
                    <a 
                      href={mensagem.caminho} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Baixar arquivo
                    </a>
                    <a 
                      href={`${process.env.NEXT_PUBLIC_GITHUB_REPO_URL?.replace('.git', '')}/blob/main/public/mensagens_do_futuro/${mensagem.nome}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline text-sm flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                      Ver no GitHub
                    </a>
                  </div>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{mensagem.conteudo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 