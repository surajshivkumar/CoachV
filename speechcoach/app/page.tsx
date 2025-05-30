import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mic, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 
via-orange-900 to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">SpeakAI</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 
leading-tight">
            Master Your
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 
bg-clip-text text-transparent"> Voice</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 
leading-relaxed">
            Transform your speaking skills with AI-powered coaching. Get 
personalized feedback, practice with
            confidence, and become the speaker you've always wanted to be.
          </p>

          <div className="flex justify-center mb-16">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 
hover:from-orange-600 hover:to-amber-600 text-white px-10 py-6 text-xl 
font-semibold"
              >
                Get Started
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-gray-800/50 border-gray-700 
backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" 
/>
                <h3 className="text-xl font-semibold text-white 
mb-2">Personalized Feedback</h3>
                <p className="text-gray-400">
                  Get instant, AI-powered analysis of your speech 
patterns, pace, and clarity
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 
backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-orange-400 mx-auto 
mb-4" />
                <h3 className="text-xl font-semibold text-white 
mb-2">Track Progress</h3>
                <p className="text-gray-400">Monitor your improvement over 
time with detailed analytics and insights</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 
backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-orange-400 mx-auto mb-4" 
/>
                <h3 className="text-xl font-semibold text-white 
mb-2">Practice Scenarios</h3>
                <p className="text-gray-400">Practice with realistic 
scenarios from presentations to interviews</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t 
border-gray-700">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 SpeakAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

