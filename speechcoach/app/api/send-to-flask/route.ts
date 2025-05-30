import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📤 Forwarding to Flask server:", body);

    const flaskResponse = await fetch("http://localhost:5000/server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (flaskResponse.ok) {
      const result = await flaskResponse.json();
      console.log("✅ Flask server responded:", result);
      return NextResponse.json(result);
    } else {
      console.error("❌ Flask server error:", flaskResponse.status);
      return NextResponse.json(
        { error: "Flask server error" },
        { status: flaskResponse.status }
      );
    }
  } catch (error) {
    console.error("❌ Error calling Flask server:", error);
    return NextResponse.json(
      { error: "Failed to contact Flask server" },
      { status: 500 }
    );
  }
}
