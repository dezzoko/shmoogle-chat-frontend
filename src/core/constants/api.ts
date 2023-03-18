// TODO: add json config file for api data
export const SERVER_URL = 'http://localhost:3000/v1/';
export const SERVER_SOCKET_URL = 'http://localhost:8080/chat';
export const SERVER_SIGNALING_URL = 'http://localhost:8080/signal';
export const SERVER_AVATARS_URL = 'http://localhost:3000/avatars/';

export enum ClientEvents {
  NEW_MESSAGE = 'NEW_MESSAGE',
  INVITED_TO_CHAT = 'INVITED_TO_CHAT',
  HISTORY_CHANGED = 'HISTORY_CHANGED',
  NEW_CHATS = 'NEW_CHATS',
  NEW_CHAT = 'NEW_CHAT',
  ERROR = 'ERROR',
}

export enum ServerEvents {
  GET_AND_SUBSCRIBE_CHATS = 'GET_AND_SUBSCRIBE_CHATS',
  SEND_MESSAGE = 'SEND_MESSAGE',
  LEAVE_CHAT = 'LEAVE_CHAT',
  INVITE_TO_CHAT = 'INVITE_TO_CHAT',
  CREATE_CHAT = 'CREATE_CHAT',
  CHANGE_HISTORY = 'CHANGE_HISTORY',
}

export const RTC_CONFIG: RTCConfiguration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };

export enum RTCSignalingClientEvents {
  INITIALIZATION = 'INITIALIZATION',
  REQUEST = 'REQUEST',
  CALL = 'CALL',
  END = 'END',
  NEW_MEMBER = 'NEW_MEMBER',
}

export enum RTCSignalingServerEvents {
  JOIN_ROOM = 'JOIN_ROOM',
  INITIALIZATION = 'INITIALIZATION',
  CALL = 'CALL',
  REQUEST = 'REQUEST',
  END = 'END',
}
