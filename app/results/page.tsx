"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flame, CheckCircle, Star, Lock, ShieldCheck, Clock, Target } from "lucide-react"
import Script from "next/script"

export default function ResultsPage() {
  const [imageProgress, setImageProgress] = useState(50)

  // ✅ SOLUÇÃO: Aguardar UTMify processar
  const handleReceivePlan = async () => {
    // Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "plan_received", {
        plan_name: "Plano A - Seca Jejum",
        price: "R\$ 19,90",
      })
    }

    // ✅ Aguardar UTMify estar pronto
    const waitForUTMify = () => {
      return new Promise((resolve) => {
        if (window.UTMify && window.UTMify.getLink) {
          resolve(true)
        } else {
          setTimeout(() => waitForUTMify().then(resolve), 100)
        }
      })
    }

    try {
      await waitForUTMify()
      
      // ✅ Usar UTMify para gerar link com UTMs
      const checkoutUrl = window.UTMify.getLink("https://pay.cakto.com.br/37iud5r_506380")
      
      console.log('URL gerada pelo UTMify:', checkoutUrl)
      
      // ✅ Navegar para checkout
      window.location.href = checkoutUrl
      
    } catch (error) {
      console.error('Erro ao processar UTMify:', error)
      // ✅ Fallback: ir direto para checkout
      window.location.href = "https://pay.cakto.com.br/37iud5r_506380"
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "results_page_view", {
        page_title: "Plano A - Seca Jejum Results",
        page_path: "/results",
      })
    }
  }, [])

  return (
    <>
      {/* ✅ Scripts UTMify otimizados */}
      <Script id="utmify-pixel-script" strategy="afterInteractive">
        {`
          window.pixelId = "688bd76d39249d6f834ff133";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
      </Script>

      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="afterInteractive"
        async
        defer
      />

      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GVND5XYZ4T" />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GVND5XYZ4T');
        `}
      </Script>

      <div className="min-h-screen bg-white">
        {/* Header Mobile First */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
          <div className="w-full px-3 py-3 flex items-center justify-center">
            <Flame className="w-6 h-6 text-yellow-300 mr-2 animate-pulse" />
            <span className="text-lg font-bold text-white">Plano A - Seca Jejum</span>
            <div className="ml-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
              PERSONALIZADO
            </div>
          </div>
        </div>

        <div className="w-full px-3 py-4">
          {/* Título Principal Mobile */}
          <div className="text-center mb-6">
            <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold">
              🔥 PROTOCOLO EXCLUSIVO CRIADO PARA VOCÊ
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
              Seu <span className="text-green-600 bg-green-50 px-1 py-1 rounded">protocolo científico</span> está pronto!
              <br />
              <span className="text-red-600">Perca até 8kg em apenas</span>
              <br />
              <div className="flex items-center justify-center mt-2">
                <Clock className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-2xl font-black text-red-600">28 DIAS</span>
              </div>
            </h1>
            <p className="text-gray-600 text-xs">
              ⚡ Baseado em suas respostas + pesquisas de Harvard e Stanford
            </p>
          </div>

          {/* Before & After Mobile Otimizado */}
          <div className="relative w-full h-72 mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-green-400">
            {/* Imagem ANTES (base) */}
            <div className="absolute inset-0">
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-photograph-of-a-confident-slender-woma_6pH4Bhx2SOKjY1q47cLqJQ_Bu33yAxDSs67Z6oKXZAotA-1.jpeg"
                alt="Antes do Plano A"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Imagem DEPOIS (sobreposta com clip-path) */}
            <div 
              className="absolute inset-0 transition-all duration-300 ease-out"
              style={{ 
                clipPath: `inset(0 ${100 - imageProgress}% 0 0)`,
              }}
            >
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-photograph-of-a-confident-woman-with-w_HJcLKNlRSKKHFm3MIswJ7Q_Bu33yAxDSs67Z6oKXZAotA-1.jpeg"
                alt="Depois do Plano A"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Linha divisória */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-300"
              style={{ left: `${imageProgress}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Slider Mobile */}
            <input
              type="range"
              min="0"
              max="100"
              value={imageProgress}
              onChange={(e) => setImageProgress(Number(e.target.value))}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-white bg-opacity-80 rounded-full appearance-none cursor-pointer shadow-lg slider"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${imageProgress}%, #22c55e ${imageProgress}%, #22c55e 100%)`
              }}
            />

            {/* Labels ANTES/DEPOIS Mobile */}
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-center text-xs font-bold shadow-lg">
              <p className="mb-1">ANTES</p>
              <p className="text-xs opacity-90">Metabolismo lento</p>
            </div>
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-center text-xs font-bold shadow-lg">
              <p className="mb-1">DEPOIS</p>
              <p className="text-xs opacity-90">28 dias</p>
            </div>

            {/* Indicadores inferiores Mobile */}
            <div className="absolute bottom-10 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <Target className="w-3 h-3 mr-1 text-red-400" />
              <span>Gordura localizada</span>
            </div>
            <div className="absolute bottom-10 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
              <span>Cintura definida</span>
            </div>
          </div>

          {/* CSS para o slider customizado Mobile */}
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ffffff;
              border: 2px solid #22c55e;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
            
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ffffff;
              border: 2px solid #22c55e;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
          `}</style>

          {/* Oferta Principal Mobile */}
          <Card className="mb-5 border-4 border-green-400 shadow-2xl bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4 text-center">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold animate-pulse">
                🚨 ÚLTIMAS VAGAS HOJE
              </div>
              <p className="text-lg font-bold text-gray-800 mb-3">
                Seu <span className="text-green-600">Plano A - Seca Jejum</span> personalizado está pronto!
              </p>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-700 mb-2">💰 <strong>Investimento normal:</strong> <span className="line-through">R\$ 97,00</span></p>
                <div className="flex items-center justify-center mb-2 flex-wrap">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-base font-bold text-gray-800">Hoje apenas</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-500">4x de</span>
                  <span className="text-2xl font-black text-green-600 ml-1">R\$ 5,77</span>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  ✅ Ou R\$ 19,90 à vista (79% de desconto)
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 leading-tight"
                onClick={handleReceivePlan}
              >
                🔥 QUERO MEU PLANO AGORA!
              </Button>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 mb-1 text-green-500" />
                  <span>Compra SEGURA</span>
                </div>
                <div className="flex flex-col items-center">
                  <Star className="w-4 h-4 mb-1 text-green-500" />
                  <span>Garantia 30 DIAS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-4 h-4 mb-1 text-green-500" />
                  <span>Dados PROTEGIDOS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Como Funciona Mobile */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              🎯 O que você vai receber no <span className="text-green-600">Plano A</span>?
            </h2>
            <p className="text-gray-600 text-xs mb-4 text-center bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <strong>📚 Protocolo científico baseado em Harvard + Stanford</strong><br />
              Desenvolvido especificamente para seus objetivos e estilo de vida. 
              Resultados comprovados em <strong>28 dias</strong> sem efeito sanfona.
            </p>
            
            <div className="space-y-3">
              <Card className="p-3 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                  Protocolo Seca Jejum Personalizado:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Horários exatos de jejum baseados na sua rotina + alimentos que aceleram a queima de gordura. 
                  <strong>Perca até 8kg em 28 dias</strong> sem passar fome ou perder músculos.
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                  Turbinador Metabólico 24h:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Estratégias para acelerar seu metabolismo em até 40% e queimar gordura mesmo dormindo. 
                  <strong>Energia de jovem aos 20 anos!</strong>
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                  Transformação Espelho em 7 Dias:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Método exclusivo para desinchar rapidamente e ver resultados no espelho em menos de 1 semana. 
                  <strong>Prepare-se para os elogios!</strong>
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">4</span>
                  Blindagem Anti-Efeito Sanfona:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  O segredo para manter o peso perdido para sempre. <strong>Nunca mais volte a engordar</strong> 
                  mesmo depois de atingir seu objetivo.
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">5</span>
                  Kit Motivação Inabalável:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Metas diárias + protocolo anti-procrastinação + planilha de acompanhamento. 
                  <strong>Mantenha-se motivada todos os dias!</strong>
                </p>
              </Card>
            </div>
          </div>

          {/* Segunda Oferta Mobile */}
          <Card className="mb-5 border-4 border-red-400 shadow-2xl bg-gradient-to-br from-red-50 to-yellow-50">
            <CardContent className="p-4 text-center">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold animate-bounce">
                ⏰ OFERTA EXPIRA EM BREVE!
              </div>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-center mb-2 flex-wrap">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-base font-bold text-gray-800">Últimas vagas</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-500">4x de apenas</span>
                  <span className="text-2xl font-black text-green-600 ml-1">R\$ 5,77</span>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  💳 Ou R\$ 19,90 à vista (desconto de 79%)
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse leading-tight"
                onClick={handleReceivePlan}
              >
                🚨 GARANTIR MINHA VAGA AGORA!
              </Button>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 mb-1 text-green-500" />
                  <span>Compra SEGURA</span>
                </div>
                <div className="flex flex-col items-center">
                  <Star className="w-4 h-4 mb-1 text-green-500" />
                  <span>Garantia 30 DIAS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-4 h-4 mb-1 text-green-500" />
                  <span>Dados PROTEGIDOS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Final Mobile */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center text-white mb-4">
            <h3 className="text-lg font-bold mb-2">🎯 Sua transformação começa HOJE!</h3>
            <p className="text-xs mb-3 opacity-90">
              Junte-se às mais de 15.000 mulheres que já transformaram seus corpos com o Plano A
            </p>
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 leading-tight"
              onClick={handleReceivePlan}
            >
              🔥 COMEÇAR MINHA TRANSFORMAÇÃO AGORA!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
