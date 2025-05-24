export class peerConnection {
  private publicConnection: RTCPeerConnection;
  private configuration: RTCConfiguration;
  constructor() {
    this.configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    this.publicConnection = new RTCPeerConnection(this.configuration);

    this.publicConnection.addEventListener("connectionstatechange", () => {
      if (this.publicConnection.connectionState === "connected") {
        // Peers connected!
        console.log("Peers connected!");
      }
    });
  }

  public async createOffer(): Promise<RTCSessionDescriptionInit> {
    try {
      const offer = await this.publicConnection.createOffer();
      await this.publicConnection.setLocalDescription(offer);
      console.log(offer);
      return offer;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      throw error;
    }
  }

  public async createAnswer(offer: string) {
    const addoffer = JSON.parse(offer) as RTCSessionDescriptionInit;

    const remoteOffer = new RTCSessionDescription(addoffer);

    this.publicConnection.setRemoteDescription(remoteOffer);
    const answer = await this.publicConnection.createAnswer();
    await this.publicConnection.setLocalDescription(answer);
    return answer;
  }

  public async addRemoteAnswer(answer: string) {
    const remoteAnser = JSON.parse(answer) as RTCSessionDescriptionInit;
    const remoteDesc = new RTCSessionDescription(remoteAnser);
    await this.publicConnection.setRemoteDescription(remoteDesc);
  }

  public getPublicConnection(): RTCPeerConnection {
    return this.publicConnection;
  }
}
