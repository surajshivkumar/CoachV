"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Download, Play, Mic } from "lucide-react"

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

export default function FlashcardsPage() {
  const router = useRouter()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  const currentCard = mockFlashcards[currentCardIndex]
  const totalCards = mockFlashcards.length

  const goToNextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const handleExportToPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log("Exporting flashcards to PDF...")
    alert("Your flashcards are being exported to PDF!")
  }

  const handleStartPracticing = () => {
    // Navigate to practice session
    router.push("/practice-session")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">SpeakAI</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Your Speech Flashcards</h1>
            <p className="text-xl text-gray-300">
              We've analyzed your speech and created these flashcards to help you practice and improve.
            </p>
          </div>

          {/* Flashcard Container */}
          <div className="relative mb-12" ref={cardContainerRef}>
            {/* Current Card */}
            <Card className="bg-gray-800/70 border-gray-700 p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="text-orange-400 font-medium">
                  Card {currentCardIndex + 1} of {totalCards}
                </span>
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                  {currentCard.title}
                </span>
              </div>
              <p className="text-white text-lg leading-relaxed">{currentCard.content}</p>
            </Card>

            {/* Navigation Controls */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={goToPrevCard}
                disabled={currentCardIndex === 0}
                className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 hover:text-white disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {mockFlashcards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentCardIndex === index ? "bg-orange-500" : "bg-gray-600"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={goToNextCard}
                disabled={currentCardIndex === totalCards - 1}
                className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 hover:text-white disabled:opacity-50"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Button
              variant="outline"
              onClick={handleExportToPDF}
              className="border-orange-500/50 bg-transparent text-orange-400 hover:bg-orange-500/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>

            <Button
              onClick={handleStartPracticing}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Practicing
            </Button>
          </div>
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
