"use client";
import { peerConnection } from "@/services/webrtc";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [webRtc, setwebRtc] = useState<peerConnection | null>(null);
  const [offer, setOffer] = useState<string>("");
  const [answer, setanswer] = useState("");

  async function addOffer() {
    const answer = await webRtc?.createAnswer(offer);
    setanswer(JSON.stringify(answer));
  }
  useEffect(() => {
    const connection = new peerConnection();

    setwebRtc(connection);
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">WebRTC Demo</h1>
        <p className="mt-4 text-lg">
          This is a simple WebRTC demo application.
        </p>
        <textarea
          value={offer}
          onChange={(e)=> setOffer(e.target.value)}
          className="w-full h-32"
          placeholder="Generated Offer"
        />

        <button type="button" onClick={addOffer}>
          Add Offer
        </button>

        <textarea
          value={answer}
          disabled
          className="w-full h-32 mt-4"
          placeholder="Paste remote offer here"
        />

        <Image
          src="webrtcimage.svg"
          alt="WebRTC Logo"
          width={200}
          height={200}
        />
      </main>
    </>
  );
}
