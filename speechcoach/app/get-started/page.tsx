"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Award, Briefcase, GraduationCap, Heart, PartyPopper, ChevronRight } from "lucide-react"

export default function GetStartedPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    speechType: "",
    name: "",
    gender: "",
    age: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, you would save this data and redirect to the next step
    router.push("/practice")
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Let's personalize your experience</h1>
          <p className="text-xl text-gray-300 mb-10">
            Tell us a bit about yourself and what type of speech you'd like to practice
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Speech Type Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                What type of speech would you like to practice?
              </h2>
              <RadioGroup
                value={formData.speechType}
                onValueChange={(value) => handleInputChange("speechType", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-gray-800/70">
                  <CardContent className="p-0">
                    <label className="flex items-start p-4 space-x-4 cursor-pointer">
                      <RadioGroupItem value="personal" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-orange-400 mr-2" />
                          <span className="text-lg font-medium text-white">Personal & Emotional</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Best man/maid of honor speeches, toasts, eulogies, and other heartfelt moments
                        </p>
                      </div>
                    </label>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-gray-800/70">
                  <CardContent className="p-0">
                    <label className="flex items-start p-4 space-x-4 cursor-pointer">
                      <RadioGroupItem value="professional" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Briefcase className="h-5 w-5 text-orange-400 mr-2" />
                          <span className="text-lg font-medium text-white">Professional</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Business presentations, pitches, interviews, and workplace communications
                        </p>
                      </div>
                    </label>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-gray-800/70">
                  <CardContent className="p-0">
                    <label className="flex items-start p-4 space-x-4 cursor-pointer">
                      <RadioGroupItem value="academic" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="h-5 w-5 text-orange-400 mr-2" />
                          <span className="text-lg font-medium text-white">Academic</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Lectures, presentations, thesis defenses, and classroom discussions
                        </p>
                      </div>
                    </label>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-gray-800/70">
                  <CardContent className="p-0">
                    <label className="flex items-start p-4 space-x-4 cursor-pointer">
                      <RadioGroupItem value="ceremonial" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Award className="h-5 w-5 text-orange-400 mr-2" />
                          <span className="text-lg font-medium text-white">Ceremonial</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Award acceptances, inauguration speeches, and formal ceremonies
                        </p>
                      </div>
                    </label>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-gray-800/70 md:col-span-2">
                  <CardContent className="p-0">
                    <label className="flex items-start p-4 space-x-4 cursor-pointer">
                      <RadioGroupItem value="celebratory" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <PartyPopper className="h-5 w-5 text-orange-400 mr-2" />
                          <span className="text-lg font-medium text-white">Celebratory</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Birthday toasts, anniversary speeches, and other joyful occasions
                        </p>
                      </div>
                    </label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Tell us about yourself</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gray-800/70 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-white">
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white">
                    Age (Optional)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="bg-gray-800/70 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg font-semibold w-full md:w-auto"
              >
                Continue to Practice
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
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
