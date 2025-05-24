export class peerConnection {
  private publicConnection: RTCPeerConnection;
  private configuration: RTCConfiguration;
  constructor() {
    this.configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    this.publicConnection = new RTCPeerConnection(this.configuration);

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

  public getPublicConnection(): RTCPeerConnection {
    return this.publicConnection;
  }
}
