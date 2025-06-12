"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Dados dos 12 meses
const monthsData = [
  {
    mes: 1,
    nome: "Junho",
    imagem: "/fotos/24-06.JPG",
    mensagem: "Junho: O Vale ficou pequeno!",
    data: "10/06/2024",
    cor: "#90EE90",
  },
  {
    mes: 2,
    nome: "Julho",
    imagem: "/fotos/24-07.JPG",
    mensagem: "Julho: A raposa finalmente chegou nas uvas!",
    data: "06/07/2024",
    cor: "#98FB98",
  },
  {
    mes: 3,
    nome: "Agosto",
    imagem: "/fotos/24-08.JPG",
    mensagem: "Agosto: Primeiro vôo com esse avião!",
    data: "24/08/2024",
    cor: "#F0FFF0",
  },
  {
    mes: 4,
    nome: "Setembro",
    imagem: "/fotos/24-09.JPG",
    mensagem: "Setembro: Férias merecedíssimas com essa deusa GREGA!",
    data: "27/09/2024",
    cor: "#ADFF2F",
  },
  {
    mes: 5,
    nome: "Outubro",
    imagem: "/fotos/24-10.JPG",
    mensagem: "Outubro: Nas ladeiras de Olinda, só vejo você!",
    data: "11/10/2024",
    cor: "#9AFF9A",
  },
  {
    mes: 6,
    nome: "Novembro",
    imagem: "/fotos/24-11.JPG",
    mensagem: "Novembro: A verdadeira escultura sempre esteve do meu lado!",
    data: "09/11/2024",
    cor: "#00FF7F",
  },
  {
    mes: 7,
    nome: "Dezembro",
    imagem: "/fotos/24-12.png",
    mensagem: "Dezembro: Mesmo fantasma voltaria pra falar com você!",
    data: "14/12/2024",
    cor: "#7CFC00",
  },
  {
    mes: 8,
    nome: "Janeiro",
    imagem: "/fotos/25-01.JPG",
    mensagem: "Janeiro: Te amarei de Janeiro a Janeiro!",
    data: "26/01/2025",
    cor: "#32CD32",
  },
  {
    mes: 9,
    nome: "Fevereiro",
    imagem: "/fotos/25-02.JPG",
    mensagem: "Fevereiro: Só tem graça destramelar com você!",
    data: "08/02/2025",
    cor: "#00FA9A",
  },
  {
    mes: 10,
    nome: "Março",
    imagem: "/fotos/25-03.png",
    mensagem: "Março: É muito DIVERTIDO viver ao seu lado!",
    data: "08/03/2025",
    cor: "#228B22",
  },
  {
    mes: 11,
    nome: "Abril",
    imagem: "/fotos/25-04.JPG",
    mensagem: "Abril: Não poderia faltar uma no feriado nacional!",
    data: "25/04/2025",
    cor: "#6B8E23",
  },
  {
    mes: 12,
    nome: "Maio",
    imagem: "/fotos/25-05.JPG",
    mensagem: "Maio: Sempre incrível dividir as loucuras da vida contigo!",
    data: "20/05/2025",
    cor: "#8FBC8F",
  },
]

// Data do primeiro encontro (ajuste conforme necessário)
const FIRST_DATE = new Date("2024-06-08T17:40:00-03:00")

// Componente de partículas de coração
const HeartParticles = ({ trigger }: { trigger: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || trigger === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const hearts: Array<{
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }> = []

    // Criar corações
    for (let i = 0; i < 15; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 3 + 2,
        opacity: 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hearts.forEach((heart, index) => {
        heart.y -= heart.speed
        heart.opacity -= 0.01

        if (heart.opacity <= 0) {
          hearts.splice(index, 1)
          return
        }

        ctx.save()
        ctx.globalAlpha = heart.opacity
        ctx.fillStyle = "#dc143c"
        ctx.font = `${heart.size}px serif`
        ctx.textAlign = "center"
        ctx.fillText("♥", heart.x, heart.y)
        ctx.restore()
      })

      if (hearts.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [trigger])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ background: "transparent" }} />
  )
}

// Componente do player de música
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-green-200 z-40">
      <audio ref={audioRef} loop>
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        {/* Substitua por uma URL de música romântica real */}
      </audio>

      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-green-700">🎵</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-green-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

// Componente contador de dias
const DayCounter = () => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    const updateCounter = () => {
      // Cria a data atual considerando GMT-3
      const now = new Date()
      // Ajusta para o fuso horário GMT-3 (Brasil)
      const brasiliaOffset = -3 * 60
      const nowMinusOffset = now.getTime() + (now.getTimezoneOffset() + brasiliaOffset) * 60000
      const nowInBrasilia = new Date(nowMinusOffset)
      
      // Calcula a diferença em relação à data de início
      const diff = nowInBrasilia.getTime() - FIRST_DATE.getTime()

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      // Calcular o total de horas desde o início (não apenas as horas do dia atual)
      const totalHoursOverall = Math.floor(diff / (1000 * 60 * 60))
      // Calcular o total de minutos desde o início
      const totalMinutesOverall = Math.floor(diff / (1000 * 60))

      setDays(totalDays)
      setHours(totalHoursOverall)
      setMinutes(totalMinutesOverall)
    }

    updateCounter()
    const interval = setInterval(updateCounter, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-green-100 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-serif text-green-800 mb-4">Nosso Amor em Números</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-green-700">{days}</div>
            <div className="text-green-600 font-medium">Dias Juntos</div>
          </div>
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-red-600">{hours}</div>
            <div className="text-red-500 font-medium">Horas Juntos</div>
          </div>
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-green-700">{minutes}</div>
            <div className="text-green-600 font-medium">Minutos Juntos</div>
          </div>
        </div>
        <p className="mt-6 text-green-700 font-serif italic">
          Só vou parar de contar quando não couber aqui!
        </p>
      </div>
    </div>
  )
}

// Componente do card com flip 3D
const FlipCard = ({ month, index }: { month: (typeof monthsData)[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card h-[480px] w-[300px] mx-auto cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        className={`flip-card-inner relative w-full h-full transition-transform duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Frente do card */}
        <div className="flip-card-front absolute inset-0 backface-hidden">
          <Card className="h-full overflow-hidden border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-full">
              <img
                src={month.imagem || "/placeholder.svg"}
                alt={`Mês ${month.nome}`}
                className="w-[300px] h-[400px] object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                style={{ background: `linear-gradient(to top, ${month.cor}80, transparent)` }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif text-green-800 drop-shadow-md">{month.nome}</h3>
                  <span className="text-2xl text-red-400 animate-pulse">♥</span>
                </div>
                <p className="text-sm text-green-700 drop-shadow-md">📅 {month.data}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Verso do card */}
        <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180">
          <Card
            className="h-full border-2 border-green-200 shadow-lg flex flex-col items-center justify-center p-6"
            style={{ backgroundColor: month.cor + "40" }}
          >
            <div className="w-[300px] h-[400px] flex flex-col items-center justify-center p-4 text-center">
              <span className="text-4xl text-red-500 block mb-4">❤️</span>
              <p
                className="text-gray-800 text-lg leading-relaxed font-semibold mx-auto"
                style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}
              >
                {month.mensagem}
              </p>
              <div className="mt-4 flex items-center justify-center text-gray-800">
                <span className="text-sm mr-2">📅</span>
                <span className="text-sm font-bold">{month.data}</span>
              </div>
            </div>
            <div className="w-full bg-white/80 p-4">
              <p className="text-center text-green-700 font-serif">Toque para voltar</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Componente de texto destacado com slideshow de fundo
const FeaturedText = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % monthsData.length)
    }, 4000) // Muda a imagem a cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Slideshow de fundo */}
      <div className="absolute inset-0">
        {monthsData.map((month, index) => (
          <div
            key={month.mes}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-30" : "opacity-0"
            }`}
          >
            <img
              src={month.imagem || "/placeholder.svg"}
              alt={`Foto de ${month.nome}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-emerald-900/60"></div>
          </div>
        ))}
      </div>

      {/* Overlay para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-sm"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="relative">
          {/* Decoração de fundo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-9xl text-green-600">🌿</span>
          </div>

          {/* Texto principal */}
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif text-green-800 mb-8 italic">Uma Carta de Amor</h2>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-green-100">
              <blockquote className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 font-serif italic">
                <span className="text-6xl text-red-500 leading-none">"</span>
                <p className="mt-4 mb-6">
                  Lindinha, crescer junto com você está sendo uma experiência incrível, foram muitos momentos de 
                  parceria e escuta cuidadosa, espero muito que a gente consiga se apaixonar cada vez mais um pelo
                  outro!
                </p>
                <p className="mb-6">
                  Quero te agradecer por cada momento de ajuda, de cuidado, de amor e carinho que tivemos, todos eles
                  nos fizeram chegar até aqui, e com certeza vão nos fazer ir muito longe!
                </p>
                <p className="mb-4">
                  É muito mágico se sentir tão bem perto de uma pessoa, você me faz sentir isso e sempre farei o possível
                  para que você sinta o mesmo! Te amo muito Lindinha, e que venham mais 12 meses, 12 anos e 12 décadas!
                </p>
                <span className="text-6xl text-red-500 leading-none">"</span>
              </blockquote>

              <div className="mt-8 flex items-center justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-red-400"></div>
                <span className="mx-4 text-2xl text-red-500">♥</span>
                <div className="w-16 h-0.5 bg-gradient-to-l from-green-400 to-red-400"></div>
              </div>

              <p className="text-green-800 font-serif text-xl font-bold">Seu Lindinho</p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RomanticAnniversary() {
  const [heartTrigger, setHeartTrigger] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ mensagem: "" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const triggerHearts = () => {
    setHeartTrigger((prev) => prev + 1)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % monthsData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + monthsData.length) % monthsData.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Enviando a mensagem para a API
      const response = await fetch('/api/mensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensagem: formData.mensagem }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert("Mensagem para o futuro salva com sucesso! ❤️")
        setIsModalOpen(false)
        setFormData({ mensagem: "" })
      } else {
        alert("Erro ao salvar a mensagem. Por favor, tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      alert("Erro ao salvar a mensagem. Por favor, tente novamente.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-green-600 animate-pulse mb-4">🌿</div>
          <p className="text-green-700 font-serif text-xl">Cultivando nossa história de amor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <HeartParticles trigger={heartTrigger} />
      <MusicPlayer />

      {/* Header Imersivo */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-emerald-200/30" />

        {/* Partículas flutuantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <span className="text-green-400/60 text-lg">🌿</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 cursor-pointer hover:scale-105 transition-transform duration-300 font-serif"
            onClick={triggerHearts}
          >
            <span className="text-green-700">Nossos</span> <span className="text-red-600">12 Meses</span>{" "}

          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-sans">
            Que nunca falte kikiki e kakaka
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <span className="text-4xl text-green-500 animate-pulse">🌱</span>
            <span className="text-4xl text-red-500 animate-pulse">♥</span>
            <span className="text-4xl text-green-500 animate-pulse">🌿</span>
          </div>
        </div>
      </header>

      {/* Timeline Interativa */}
      <main className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12 font-serif">
            Nossa Jornada de Amor
          </h2>

          {/* Desktop: Grid de 3 colunas */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {monthsData.map((month, index) => (
              <FlipCard key={month.mes} month={month} index={index} />
            ))}
          </div>

          {/* Mobile: Carrossel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {monthsData.map((month, index) => (
                  <div key={month.mes} className="w-full flex-shrink-0 px-4 flex justify-center">
                    <FlipCard month={month} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controles do carrossel */}
            <div className="flex justify-center mt-6 space-x-4">
              <Button onClick={prevSlide} variant="outline" size="sm" className="border-green-300 text-green-700">
                ← Anterior
              </Button>
              <Button onClick={nextSlide} variant="outline" size="sm" className="border-green-300 text-green-700">
                Próximo →
              </Button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-4 space-x-2">
              {monthsData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-green-600" : "bg-green-200"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Texto Destacado com Slideshow */}
      <FeaturedText />

      {/* Contador de Dias */}
      <DayCounter />

      {/* Rodapé Emocional */}
      <footer className="py-16 px-4 bg-gradient-to-t from-green-100 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed font-serif italic">
            Agora a última surpresinha hehe
          </p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">🌿</span>
                Criar Cápsula do Tempo
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-green-700 font-serif flex items-center justify-center">
                  <span className="mr-2">⏰</span>
                  Cápsula do Tempo do Amor
                </DialogTitle>
              </DialogHeader>

              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Lindinha, esse é o momento para você deixar uma mensagem para o futuro!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Uma mensagem para o futuro começa com..."
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ mensagem: e.target.value })}
                  rows={8}
                  required
                  className="border-green-200 focus:border-green-500"
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <span className="mr-2">❤️</span>
                  Salvar Mensagem para o Futuro
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </footer>
    </div>
  )
}
