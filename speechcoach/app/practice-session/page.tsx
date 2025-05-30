"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock data for flashcards - in a real app, this would come from an API or state
const mockFlashcards = [
  {
    id: 1,
    title: "Opening Statement",
    content:
      "Start with a compelling hook: 'Imagine a world where every word you speak resonates with your audience.' This creates immediate engagement and sets the tone for your speech.",
  },
  {
    id: 2,
    title: "Key Point 1",
    content:
      "When discussing your main argument, use the power of three. Group your ideas into three memorable points that build upon each other. This creates a rhythm that audiences find both satisfying and memorable.",
  },
  {
    id: 3,
    title: "Handling Objections",
    content:
      "Anticipate potential counterarguments and address them directly. Use phrases like 'Some might say..., but consider this...' This demonstrates that you've thought deeply about your topic from multiple perspectives.",
  },
  {
    id: 4,
    title: "Body Language",
    content:
      "Maintain open posture with your shoulders back and arms relaxed. Make deliberate hand gestures to emphasize key points, and remember to scan the room making brief eye contact with different sections of your audience.",
  },
  {
    id: 5,
    title: "Vocal Variety",
    content:
      "Vary your speaking pace and volume for emphasis. Slow down for important points, and use strategic pauses after asking questions or making impactful statements. This gives your audience time to process your message.",
  },
  {
    id: 6,
    title: "Powerful Conclusion",
    content:
      "End with a call to action that ties back to your opening hook. 'Now that you've seen how impactful your words can be, I challenge you to...' This creates a satisfying full-circle moment for your audience.",
  },
]

export default function PracticeSessionPage() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [highlightPosition, setHighlightPosition] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  // Simulate speech recognition and card advancement
  useEffect(() => {
    if (isActive && !isPaused) {
      // Advance highlight position
      const interval = setInterval(() => {
        setHighlightPosition((prev) => {
          const currentCard = mockFlashcards[currentCardIndex]
          const contentLength = currentCard.content.length

          // If we've reached the end of the current card
          if (prev >= contentLength) {
            // Move to next card if available
            if (currentCardIndex < mockFlashcards.length - 1) {
              setCurrentCardIndex((prev) => prev + 1)
              return 0 // Reset highlight position for new card
            } else {
              clearInterval(interval)
              setIsActive(false)
              return prev // Keep at end
            }
          }

          return prev + 1 // Advance highlight by one character
        })
      }, 100) // Speed of highlighting - adjust as needed

      // Timer for elapsed time
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)

      return () => {
        clearInterval(interval)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [isActive, isPaused, currentCardIndex])

  const startPractice = () => {
    setIsActive(true)
    setIsPaused(false)
    setHighlightPosition(0)
    // In a real app, this would start speech recognition
  }

  const pausePractice = () => {
    setIsPaused(!isPaused)
  }

  const resetPractice = () => {
    setIsActive(false)
    setIsPaused(false)
    setCurrentCardIndex(0)
    setHighlightPosition(0)
    setElapsedTime(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentCard = mockFlashcards[currentCardIndex]
  const highlightedText = currentCard.content.substring(0, highlightPosition)
  const remainingText = currentCard.content.substring(highlightPosition)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">SpeakAI</span>
          </div>
          <Link href="/flashcards">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Flashcards
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Interactive Practice</h1>
            <p className="text-xl text-gray-300">
              Follow along with the highlighted text as you speak. The cards will advance automatically.
            </p>
          </div>

          {/* Timer and Progress */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gray-800/70 px-4 py-2 rounded-lg">
              <span className="text-orange-400 font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-white">
              Card {currentCardIndex + 1} of {mockFlashcards.length}
            </div>
          </div>

          {/* Teleprompter Card */}
          <div className="relative mb-8" ref={cardContainerRef}>
            <Card className="bg-gray-800/70 border-gray-700 p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                  {currentCard.title}
                </span>
              </div>

              {/* Karaoke-style text highlighting */}
              <p className="text-white text-xl leading-relaxed">
                <span className="text-orange-400">{highlightedText}</span>
                <span>{remainingText}</span>
              </p>
            </Card>

            {/* Card Navigation Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {mockFlashcards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${currentCardIndex === index ? "bg-orange-500" : "bg-gray-600"}`}
                />
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {!isActive ? (
              <Button
                onClick={startPractice}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Practice
              </Button>
            ) : (
              <>
                <Button onClick={pausePractice} className="bg-gray-700 hover:bg-gray-600 text-white">
                  {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button
                  onClick={resetPractice}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </>
            )}
          </div>

          {/* Voice Activity Visualization */}
          {isActive && !isPaused && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-end space-x-1 h-12">
                {[3, 5, 7, 9, 12, 8, 10, 6, 4, 7, 9, 5].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-orange-400 rounded-full animate-pulse"
                    style={{
                      height: `${height * 4}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "0.8s",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {!isActive && (
            <div className="mt-12 text-center">
              <p className="text-gray-400">
                Click "Start Practice" to begin. Speak naturally and follow along with the highlighted text.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-700 mt-10">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 SpeakAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
