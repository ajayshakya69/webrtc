"use client";
import { peerConnection } from "@/services/webrtc";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [webRtc, setwebRtc] = useState<peerConnection | null>(null);
  const [offer, setOffer] = useState<string>("");
  const [remoteOffer, setRemoteOffer] = useState("");

  function createAnswer() {
    alert("This function will create an answer based on a received offer.");
  }

  useEffect(() => {

    const setup = async () => {
      const connection = new peerConnection();
      const offer = await connection.createOffer();
      setwebRtc(connection);
      // console.log("Offer created:", offer);
      setOffer(JSON.stringify(offer)); // or offer.sdp if you only want SDP
    };

    setup();

    const publicConnection = webRtc?.getPublicConnection();
    if (!publicConnection) return;
    publicConnection.addEventListener("connectionstatechange", () => {
      if (publicConnection.connectionState === "connected") {
        // Peers connected!
      }
    });

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
          disabled
          className="w-full h-32"
          placeholder="Generated Offer"
        />

        <textarea
          value={remoteOffer}
          onChange={(e) => setRemoteOffer(e.target.value)}
          className="w-full h-32 mt-4"
          placeholder="Paste remote offer here"
        />

        <button type="button" onClick={createAnswer}>
          Create Answer
        </button>

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
