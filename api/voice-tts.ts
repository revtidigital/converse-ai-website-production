import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serverless Voice TTS Proxy for ConverseAI.
 * Connects directly to Sarvam AI TTS (Ritu voice) on Sonara engine to provide
 * authentic Indian Hindi and English voice generation with zero CORS issues.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "POST, GET, OPTIONS");
    return res.status(405).json({ error: "Method not allowed. Use POST or GET." });
  }

  try {
    const text = (req.method === "POST" ? req.body?.text : req.query?.text) as string;
    const lang = ((req.method === "POST" ? req.body?.lang : req.query?.lang) || "hi-IN") as string;
    const speaker = ((req.method === "POST" ? req.body?.speaker : req.query?.speaker) || "ritu") as string;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text parameter is required." });
    }

    // Call Sonara Sarvam AI TTS endpoint
    const sarvamResponse = await fetch("https://sonara-voice-agent.vercel.app/api/sarvam-tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text.slice(0, 320),
        speaker,
        language_code: lang === "hi-IN" ? "hi-IN" : "en-IN",
        pace: 1.0,
      }),
    });

    if (!sarvamResponse.ok) {
      const errText = await sarvamResponse.text().catch(() => "");
      console.warn("Sarvam TTS error from upstream:", errText);
      return res.status(sarvamResponse.status).json({ error: "Sarvam synthesis failed", details: errText });
    }

    const audioBuffer = await sarvamResponse.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(Buffer.from(audioBuffer));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Server error in voice-tts proxy:", errorMsg);
    return res.status(500).json({ error: "Internal server error", details: errorMsg });
  }
}
