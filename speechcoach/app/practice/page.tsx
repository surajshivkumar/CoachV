"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Play, Pause, ChevronRight } from "lucide-react";
import Vapi from "@vapi-ai/web";

export default function PracticePage() {
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [hasCompletedCall, setHasCompletedCall] = useState(false);
  const [conversationData, setConversationData] = useState<any>(null);
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const userTranscriptRef = useRef<string[]>([]); // Store user speech
  const assistantResponsesRef = useRef<string[]>([]); // Store assistant responses
  const transcriptRef = useRef<string[]>([]); // Store all transcript chunks

  const assistantConfig = {
    model: {
      provider: "openai",
      model: "gpt-3.5-turbo",
      systemPrompt:
        "You're a speech coaching AI assistant. Help users practice and improve their speaking skills. At the end of conversations, provide a brief summary of what was discussed and key speaking points covered.",
    },
    voice: {
      provider: "11labs",
      voiceId: "paula",
    },
    firstMessage:
      "Hi! I'm here to help you practice your speech. What would you like to work on today?",
    // Enable call recording and transcript
    recordingEnabled: true,
    endCallMessage:
      "Thanks for practicing with me today! I'll analyze our conversation now.",
  };

  useEffect(() => {
    // Initialize Vapi
    vapiRef.current = new Vapi("9a8e7a4f-d0f0-4793-aa13-aa5949c7a53e");

    // Listen for call events
    vapiRef.current.on("call-start", () => {
      console.log("✅ Call started");
      setIsCalling(true);
      setCallDuration(0);
      transcriptRef.current = []; // Reset transcript collection

      // Start timer
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    });

    // Collect transcript chunks during the call
    vapiRef.current.on("message", (message) => {
      if (message.role === "user" && message.content) {
        transcriptRef.current.push(message.content);
      }
    });

    // Alternative: collect from speech-end events
    vapiRef.current.on("speech-end", (transcript) => {
      if (transcript) {
        transcriptRef.current.push(transcript);
      }
    });

    vapiRef.current.on("call-end", (callData) => {
      console.log("=== CALL ENDED ===");

      // Combine all collected transcript chunks
      const finalTranscript = transcriptRef.current.join(" ").trim();

      if (finalTranscript) {
        console.log("📝 FINAL COMPLETE TRANSCRIPT:");
        console.log(finalTranscript);
      } else {
        console.log("⚠️ No transcript collected during call");
      }

      // Store the final transcript
      const conversationResult = {
        ...callData,
        finalTranscript: finalTranscript,
        duration: callDuration,
      };

      setIsCalling(false);
      setHasCompletedCall(true);
      setConversationData(conversationResult);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    });

    vapiRef.current.on("error", (error) => {
      console.error("❌ Vapi error:", error);
      setIsCalling(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    });

    // Cleanup on unmount
    return () => {
      if (vapiRef.current) {
        vapiRef.current.off("call-start");
        vapiRef.current.off("call-end");
        vapiRef.current.off("message");
        vapiRef.current.off("speech-start");
        vapiRef.current.off("speech-end");
        vapiRef.current.off("error");
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Function to send data to Flask server via Next.js API
  const sendToFlaskServer = async () => {
    try {
      console.log("📤 Sending data to Next.js API...");

      // Prepare the data to send
      const finalUserTranscript = userTranscriptRef.current.join(" ").trim();
      const finalAssistantResponses = assistantResponsesRef.current
        .join(" ")
        .trim();

      const payload = {
        message: {
          type: "assistant-request",
          userTranscript: finalUserTranscript,
          assistantResponses: finalAssistantResponses,
          duration: callDuration,
          timestamp: new Date().toISOString(),
        },
      };

      console.log("📋 Sending payload:", payload);

      // Call your Next.js API route (no CORS issues)
      const response = await fetch("/api/send-to-flask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Successfully sent via Next.js API:", result);
      } else {
        console.error(
          "❌ Next.js API response error:",
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("❌ Error sending via Next.js API:", error);
    }
  };

  const handleClick = () => {
    if (!vapiRef.current) {
      console.error("Vapi not initialized");
      return;
    }

    if (isCalling) {
      console.log("Stopping call...");

      // Send data to Flask server when stopping
      sendToFlaskServer();

      vapiRef.current.stop();
    } else {
      console.log("Starting call...");
      vapiRef.current.start(assistantConfig);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    console.log(
      "Moving to next step with conversation data:",
      conversationData
    );

    // Store conversation data in sessionStorage for next page
    if (conversationData) {
      sessionStorage.setItem(
        "conversationData",
        JSON.stringify(conversationData)
      );
    }

    router.push("/flashcards");
  };

  const restartRecording = () => {
    setHasCompletedCall(false);
    setCallDuration(0);
    transcriptRef.current = []; // Reset transcript collection
  };

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
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tell us your story
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Share your speech idea, outline, or practice what you want to say.
            We'll help you perfect it.
          </p>

          {/* Recording Interface */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm p-8 mb-8">
            <CardContent className="p-0">
              <div className="flex flex-col items-center space-y-6">
                {/* Voice Button with Sound Wave */}
                <div className="relative">
                  <button
                    onClick={handleClick}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCalling
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:scale-105"
                    }`}
                  >
                    {/* Sound Wave Icon */}
                    <div className="flex items-end space-x-1">
                      <div
                        className={`w-1 h-3 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                      ></div>
                      <div
                        className={`w-1 h-6 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className={`w-1 h-4 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className={`w-1 h-8 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                      <div
                        className={`w-1 h-5 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <div
                        className={`w-1 h-7 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className={`w-1 h-3 rounded-full bg-white ${
                          isCalling ? "animate-pulse" : ""
                        }`}
                        style={{ animationDelay: "0.6s" }}
                      ></div>
                    </div>
                  </button>

                  {/* Recording indicator */}
                  {isCalling && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Recording Status */}
                <div className="text-center">
                  {isCalling ? (
                    <div>
                      <p className="text-white text-lg font-medium mb-2">
                        In conversation...
                      </p>
                      <p className="text-red-400 text-2xl font-mono">
                        {formatTime(callDuration)}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Click to end conversation
                      </p>
                    </div>
                  ) : hasCompletedCall ? (
                    <div>
                      <p className="text-green-400 text-lg font-medium mb-4">
                        Conversation completed!
                      </p>
                      <p className="text-gray-300 mb-4">
                        Duration: {formatTime(callDuration)}
                      </p>
                      <p className="text-yellow-400 text-sm mb-4">
                        Check console for transcript 📝
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={restartRecording}
                          className="text-orange-400 hover:text-orange-300 underline"
                        >
                          Start new conversation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white text-lg font-medium mb-2">
                        Tap to start conversation
                      </p>
                      <p className="text-gray-400">
                        Share your speech idea or practice your delivery
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          {!hasCompletedCall && !isCalling && (
            <div className="text-center max-w-md mx-auto">
              <p className="text-gray-400 text-sm mb-4">💡 Quick tips:</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="bg-gray-800/50 px-3 py-1 rounded-full">
                  Speak clearly
                </span>
                <span className="bg-gray-800/50 px-3 py-1 rounded-full">
                  Find quiet space
                </span>
                <span className="bg-gray-800/50 px-3 py-1 rounded-full">
                  Take your time
                </span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {hasCompletedCall && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Continue to Analysis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
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
  );
}
