import { Emitter } from './emitter';
import { MediaDevicesEmitter, MediaDevicesEvents } from './media-devices-emitter';
import { RTCSignalingServerEvents, RTC_CONFIG } from 'core/constants/api';
import { Socket } from 'socket.io-client';
import { User } from 'core/entities/user.entity';

export class PeerConnectionEmitter extends Emitter {
  pc: RTCPeerConnection;
  clientSocket!: Socket;
  streamCaptured = false;

  constructor(public remoteId: string, public mediaDevicesEmitter: MediaDevicesEmitter, signalingServerSocket: Socket) {
    super();
    this.pc = new RTCPeerConnection(RTC_CONFIG);
    this.clientSocket = signalingServerSocket;
    this.pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      const { candidate } = event;

      this.clientSocket.emit(RTCSignalingServerEvents.CALL, {
        to: this.remoteId,
        candidate,
      });
    };

    this.pc.ontrack = (event: RTCTrackEvent) => {
      const { streams } = event;
      this.emit(PeerConnectionEvents.REMOTE_STREAM, streams[0]);
    };

    this.getDescription = this.getDescription.bind(this);
  }

  start(isCaller: boolean, config?: MediaStreamConstraints, user?: User) {
    this.mediaDevicesEmitter
      .subscribe(MediaDevicesEvents.STREAM, (stream: MediaStream) => {
        if (this.streamCaptured) return;
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        });

        this.emit(PeerConnectionEvents.LOCAL_STREAM, stream);

        this.streamCaptured = true;

        isCaller
          ? this.clientSocket.emit(RTCSignalingServerEvents.REQUEST, { to: this.remoteId, user: user })
          : this.createOffer();
      })
      .start(config);

    return this;
  }

  startWithExisting(isCaller: boolean, localStream: MediaStream, user?: User) {
    localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, localStream);
    });
    this.emit(PeerConnectionEvents.LOCAL_STREAM, localStream);

    isCaller
      ? this.clientSocket.emit(RTCSignalingServerEvents.REQUEST, { to: this.remoteId, user: user })
      : this.createOffer();

    return this;
  }

  /**
   * stops the call by clearing media devices, emitting END event to remote user
   * restarts ice and clearing subs
   */

  stop(isCaller: boolean) {
    if (isCaller) {
      this.clientSocket.emit(RTCSignalingServerEvents.END, { to: this.remoteId });
    }
    if (!isCaller) {
      this.mediaDevicesEmitter.stop();
    }

    this.pc.restartIce();
    this.pc.close();
    this.subscriptions = [];

    return this;
  }

  /**
   * generates description and sends to the remote user
   *
   */

  createOffer() {
    this.pc
      .createOffer()
      .then(this.getDescription)
      .catch((error) => {
        throw new Error('Cannot create offer', { cause: error });
      });

    return this;
  }

  /**
   * generates description and sends to the remote user
   *
   */

  createAnswer() {
    this.pc
      .createAnswer()
      .then(this.getDescription)
      .catch((error) => {
        throw new Error('Cannot create answer', { cause: error });
      });

    return this;
  }

  getDescription(description: RTCSessionDescriptionInit) {
    this.pc.setLocalDescription(description);
    this.clientSocket.emit(RTCSignalingServerEvents.CALL, { to: this.remoteId, sdp: description });

    return this;
  }

  setRemoteDescription(description: RTCSessionDescriptionInit) {
    this.pc.setRemoteDescription(new RTCSessionDescription(description));

    return this;
  }

  addIceCandidate(candidate: RTCIceCandidateInit) {
    if (candidate) {
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    }

    return this;
  }
}

export enum PeerConnectionEvents {
  REMOTE_STREAM = 'REMOTE_STREAM',
  LOCAL_STREAM = 'LOCAL_STREAM',
}
