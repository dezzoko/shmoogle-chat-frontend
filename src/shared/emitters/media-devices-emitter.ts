import { Emitter } from './emitter';

export class MediaDevicesEmitter extends Emitter {
  stream: MediaStream | null = null;

  constructor() {
    super();
  }

  /**
   * gets user media devices stream (micro, cam) and emits notifying event
   */

  public async start(config?: MediaStreamConstraints) {
    try {
      const mediaStreamConstraints = config || { video: true, audio: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);

      this.stream = mediaStream;
      this.emit(MediaDevicesEvents.STREAM, this.stream);
    } catch (error) {
      throw new Error('Cannot access media devices');
    }

    return this;
  }
  /**
   * enables/disables video, audio tracks
   *
   */
  public toggle(type: MediaStreamType, value: boolean) {
    if (this.stream) {
      const tracks = this.stream[`get${type}Tracks`]();
      tracks.forEach((track) => {
        track.enabled = value;
      });
    }

    return this;
  }

  /**
   * stopping all tracks, clearing subscriptions
   */

  public async stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }

    this.subscriptions = [];

    return this;
  }
}

export enum MediaDevicesEvents {
  STREAM = 'STREAM',
}

export type MediaStreamType = 'Audio' | 'Video';

export const mediaDevicesEmitter = new MediaDevicesEmitter();
