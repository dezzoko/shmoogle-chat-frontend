import { Emitter } from './emitter';
import { MediaDevicesEmitter, MediaDevicesEvents } from './media-devices-emitter';
import { RTCSignalingServerEvents, RTC_CONFIG } from 'core/constants/api';
import { Socket } from 'socket.io-client';

export class PeerConnectionEmitter extends Emitter {
  pc: RTCPeerConnection;
  clientSocket!: Socket;

  constructor(public remoteId: string, public mediaDevicesEmitter: MediaDevicesEmitter, signalingServerSocket: Socket) {
    super();
    this.pc = new RTCPeerConnection(RTC_CONFIG);
    this.clientSocket = signalingServerSocket;
    this.pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      const { candidate } = event;

      console.log(
        'PEER::: onicecandidate, emitting call to signaling server with id',
        this.remoteId,
        ' and candidate ',
        candidate,
      );

      this.clientSocket.emit(RTCSignalingServerEvents.CALL, {
        to: this.remoteId,
        candidate,
      });
    };

    this.pc.ontrack = (event: RTCTrackEvent) => {
      const { streams } = event;
      console.log('PEER::: ontrack, emitting remote stream ', streams[0]);
      this.emit(PeerConnectionEvents.REMOTE_STREAM, streams[0]);
    };

    this.getDescription = this.getDescription.bind(this);
  }

  start(isCaller: boolean, config?: MediaStreamConstraints) {
    this.mediaDevicesEmitter
      .subscribe(MediaDevicesEvents.STREAM, (stream: MediaStream) => {
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        });

        this.emit(PeerConnectionEvents.LOCAL_STREAM, stream);

        console.log(
          'PEER::: media stream event, isCaller',
          isCaller,
          ' if is caller true : emit request with id',
          this.remoteId,
          ' or create offer',
        );

        isCaller ? this.clientSocket.emit(RTCSignalingServerEvents.REQUEST, { to: this.remoteId }) : this.createOffer();
      })
      .start(config);

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

    this.mediaDevicesEmitter.stop();

    this.pc.restartIce();
    this.subscriptions = [];

    return this;
  }

  /**
   * generates description and sends to the remote user
   *
   */

  createOffer() {
    console.log('PEER::: creating offer');
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
    console.log('PEER::: creating answer');
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
    console.log('PEER::: get description and emit call with id, ', this.remoteId, 'and sdp', description);
    this.clientSocket.emit(RTCSignalingServerEvents.CALL, { to: this.remoteId, sdp: description });

    return this;
  }

  setRemoteDescription(description: RTCSessionDescriptionInit) {
    console.log('PEER::: setting remote description ', description);
    this.pc.setRemoteDescription(new RTCSessionDescription(description));

    return this;
  }

  addIceCandidate(candidate: RTCIceCandidateInit) {
    if (candidate) {
      console.log('PEER::: adding ice candidate');
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    }

    return this;
  }
}

export enum PeerConnectionEvents {
  REMOTE_STREAM = 'REMOTE_STREAM',
  LOCAL_STREAM = 'LOCAL_STREAM',
}
