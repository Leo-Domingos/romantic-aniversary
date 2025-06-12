                    try {
                      const response = await fetch('/api/mensagem', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ mensagem }),
                      });
                      
                      const data = await response.json();
                      
                      if (data.success) {
                        setMensagem('');
                        toast({
                          title: "Mensagem enviada com sucesso!",
                          description: "Sua mensagem foi salva para o futuro. 💌",
                          status: "success"
                        });
                        
                        // Mostrar mensagem adicional sobre Git se disponível
                        if (data.gitStatus) {
                          setTimeout(() => {
                            toast({
                              title: "Mensagem versionada!",
                              description: data.gitStatus,
                              status: "info"
                            });
                          }, 1500);
                        }
                        
                      } else {
                        toast({
                          title: "Erro ao enviar mensagem",
                          description: data.message || "Ocorreu um erro desconhecido.",
                          status: "error"
                        });
                      }
                    } catch (error) {
                      console.error('Erro ao enviar mensagem:', error);
                      toast({
                        title: "Erro ao enviar mensagem",
                        description: "Não foi possível conectar ao servidor.",
                        status: "error"
                      });
                    } finally {
                      setIsSending(false);
                    } 