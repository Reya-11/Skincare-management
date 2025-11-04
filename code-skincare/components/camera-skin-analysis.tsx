"use client"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AnalysisResult {
  skinTone: string
  hydrationLevel: string
  oiliness: string
  sensitivity: string
  texture: string
  concerns: string[]
}

export function CameraSkinAnalysis() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsStreaming(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage(imageData)
      }
    }
  }

  const analyzeImage = async (imageData: string) => {
    setIsLoading(true)
    // Simulate AI analysis - in production, send to backend API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAnalysis: AnalysisResult = {
      skinTone: "Medium",
      hydrationLevel: "Good (75%)",
      oiliness: "Balanced",
      sensitivity: "Moderate",
      texture: "Smooth with minor pores",
      concerns: ["Fine lines", "Slight redness", "Mild texture"],
    }

    setAnalysis(mockAnalysis)
    setIsLoading(false)
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setAnalysis(null)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Skin Analysis</h2>

      <div className="grid gap-6">
        {/* Camera Section */}
        {!capturedImage ? (
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <div className="flex flex-col gap-4">
              {!isStreaming ? (
                <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-700 rounded-lg border-2 border-dashed border-rose-200 dark:border-slate-600">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">📷 Ready to analyze your skin</p>
                  <Button
                    onClick={startCamera}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                  >
                    Start Camera
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-96 object-cover" />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={captureImage}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold"
                    >
                      📸 Capture Photo
                    </Button>
                    <Button
                      onClick={stopCamera}
                      className="flex-1 bg-slate-500 hover:bg-slate-600 text-white font-semibold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </Card>
        ) : (
          <>
            {/* Captured Image */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
              <div className="space-y-4">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured face for analysis"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <Button onClick={resetCapture} className="w-full bg-slate-500 hover:bg-slate-600 text-white">
                  Take Another Photo
                </Button>
              </div>
            </Card>

            {/* Analysis Results */}
            {isLoading ? (
              <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-rose-200 dark:border-slate-600 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Analyzing your skin...</p>
                  </div>
                </div>
              </Card>
            ) : analysis ? (
              <div className="grid gap-4">
                <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Analysis Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Skin Tone</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{analysis.skinTone}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Hydration</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{analysis.hydrationLevel}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Oil Balance</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{analysis.oiliness}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Sensitivity</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{analysis.sensitivity}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Texture & Concerns</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">{analysis.texture}</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.concerns.map((concern, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
