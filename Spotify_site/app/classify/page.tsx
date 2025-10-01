"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Brain, Sparkles, Activity, BarChart3, Cpu, Waves, TrendingUp, Users, Clock } from "lucide-react"

export default function ClassifyPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Playlist analiz ediliyor...")
  const [isComplete, setIsComplete] = useState(false)
  const [songsProcessed, setSongsProcessed] = useState(0)
  const [totalSongs] = useState(47)
  const [currentSong, setCurrentSong] = useState("Analyzing...")
  const router = useRouter()

  const steps = [
    "Spotify'dan playlist verisi alınıyor...",
    "Şarkı özellikleri analiz ediliyor...",
    "Audio features hesaplanıyor...",
    "Duygu durumları belirleniyor...",
    "AI ile sınıflandırma yapılıyor...",
    "Sonuçlar hazırlanıyor...",
    "Tamamlandı!",
  ]

  const mockSongs = [
    "Blinding Lights - The Weeknd",
    "Watermelon Sugar - Harry Styles",
    "Levitating - Dua Lipa",
    "Good 4 U - Olivia Rodrigo",
    "Stay - The Kid LAROI",
    "Peaches - Justin Bieber",
    "Montero - Lil Nas X",
    "Kiss Me More - Doja Cat",
  ]

  useEffect(() => {
    const token = localStorage.getItem("spotify_token")
    const emotions = localStorage.getItem("emotions")

    if (!token || !emotions) {
      router.push("/login")
      return
    }

    // Mock classification process
    let currentProgress = 0
    let stepIndex = 0
    let processed = 0

    const interval = setInterval(() => {
      currentProgress += Math.random() * 12 + 3
      processed += Math.floor(Math.random() * 2) + 1

      // Update current song being processed
      if (processed < mockSongs.length) {
        setCurrentSong(mockSongs[processed])
      }

      if (currentProgress >= 100) {
        currentProgress = 100
        processed = totalSongs
        setIsComplete(true)
        setCurrentStep("Tamamlandı!")
        setCurrentSong("Analysis Complete!")
        clearInterval(interval)

        // Mock results
        const mockResults = {
          mutlu: ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
          üzgün: ["Song 6", "Song 7", "Song 8"],
          enerjik: ["Song 9", "Song 10", "Song 11", "Song 12", "Song 13", "Song 14"],
          sakin: ["Song 15", "Song 16", "Song 17", "Song 18"],
        }
        localStorage.setItem("classification_results", JSON.stringify(mockResults))

        setTimeout(() => {
          router.push("/save")
        }, 2000)
      } else {
        const newStepIndex = Math.floor((currentProgress / 100) * (steps.length - 1))
        if (newStepIndex !== stepIndex) {
          stepIndex = newStepIndex
          setCurrentStep(steps[stepIndex])
        }
      }

      setProgress(Math.min(currentProgress, 100))
      setSongsProcessed(Math.min(processed, totalSongs))
    }, 1000)

    return () => clearInterval(interval)
  }, [router, totalSongs])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1DB954] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-[#1DB954] opacity-30 animate-bounce">
          <Brain className="h-8 w-8" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-purple-400 opacity-30 animate-bounce delay-500">
          <Activity className="h-6 w-6" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-blue-400 opacity-30 animate-bounce delay-1000">
          <Sparkles className="h-7 w-7" />
        </div>
        <div className="absolute top-1/2 right-1/3 text-[#1DB954] opacity-30 animate-bounce delay-1500">
          <Waves className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Hero Content - Centered */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                <Brain className="mr-2 h-4 w-4" />
                Adım 3/4 - AI Analizi
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                {isComplete ? (
                  <>
                    Analiz{" "}
                    <span className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent">
                      Tamamlandı!
                    </span>
                  </>
                ) : (
                  <>
                    AI{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Çalışıyor
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-[#b3b3b3] max-w-3xl mx-auto">
                {isComplete
                  ? "Playlist'iniz başarıyla sınıflandırıldı"
                  : "Şarkılarınız duygu durumlarına göre kategorilere ayrılıyor"}
              </p>
            </div>
          </div>

          {/* Main Progress Card - Centered */}
          <div className="flex justify-center mb-16">
            <Card className="w-full max-w-2xl bg-[#121212]/80 backdrop-blur-sm border-[#282828] shadow-2xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {isComplete ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="h-8 w-8 text-black" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-white">Analiz Durumu</CardTitle>
                <CardDescription className="text-[#b3b3b3]">AI modelimiz şarkılarınızı analiz ediyor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#b3b3b3]">{currentStep}</span>
                    <span className="font-bold text-[#1DB954]">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-[#404040] rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Current Song */}
                <div className="bg-[#282828] p-6 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-lg flex items-center justify-center">
                      <Music className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">Şu an analiz ediliyor:</div>
                      <div className="text-[#1DB954] text-sm">{currentSong}</div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#282828] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#1DB954] mb-1">{songsProcessed}</div>
                    <div className="text-[#b3b3b3] text-sm">İşlenen</div>
                  </div>
                  <div className="bg-[#282828] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white mb-1">{totalSongs}</div>
                    <div className="text-[#b3b3b3] text-sm">Toplam</div>
                  </div>
                  <div className="bg-[#282828] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{Math.round(progress)}%</div>
                    <div className="text-[#b3b3b3] text-sm">Tamamlandı</div>
                  </div>
                </div>

                {isComplete && (
                  <div className="text-center bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-black font-bold px-6 py-4 rounded-full">
                    <Sparkles className="inline mr-2 h-5 w-5" />
                    Sonuçlar sayfasına yönlendiriliyorsunuz...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features - Below Form */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="flex flex-col items-center space-y-3 text-[#b3b3b3]">
              <Cpu className="h-8 w-8 text-blue-400" />
              <span className="text-sm">Neural Network</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-[#b3b3b3]">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="text-sm">Audio Analysis</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-[#b3b3b3]">
              <Waves className="h-8 w-8 text-blue-400" />
              <span className="text-sm">Pattern Recognition</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-[#b3b3b3]">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="text-sm">Classification</span>
            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#181818]/60 backdrop-blur-sm border-[#282828] hover:bg-[#282828]/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Gelişmiş Analiz</h3>
                <p className="text-[#b3b3b3] text-sm">
                  Ses özellikleri, tempo, enerji seviyesi ve daha fazlasını analiz ederek en doğru sınıflandırmayı yapar
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#181818]/60 backdrop-blur-sm border-[#282828] hover:bg-[#282828]/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Makine Öğrenmesi</h3>
                <p className="text-[#b3b3b3] text-sm">
                  Binlerce şarkı verisiyle eğitilmiş AI modeli, sürekli öğrenerek daha iyi sonuçlar üretir
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#181818]/60 backdrop-blur-sm border-[#282828] hover:bg-[#282828]/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Gerçek Zamanlı</h3>
                <p className="text-[#b3b3b3] text-sm">
                  Her şarkı anında işlenir ve sınıflandırılır. Tüm süreç ortalama 30-60 saniye sürer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
