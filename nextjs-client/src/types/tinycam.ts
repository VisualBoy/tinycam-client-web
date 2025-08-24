export enum PtzCapability {
  MoveRel = 0x1 << 1,
  GotoPresets = 0x1 << 4,
  LedOn = 0x1 << 15,
  LedOff = 0x1 << 16,
  LedAuto = 0x1 << 17,
}

export interface CameraSettings {
  enabled: boolean;
  id: number;
  name: string;
  ptzCapabilities: number;
  audioListening: boolean;
  cloudAccess: boolean;
}

export interface EventRecord {
  time: number; // epoch
  motion: string; // 'motion', 'face', 'person', 'vehicle', 'pet', 'motion', 'audio'
  video: string;
  image?: string;
  duration: number; // msec
}

export enum StatusStreamProfile {
  Main = 0,
  Sub = 1,
  Auto = 2,
}

export enum BatteryStatus {
  Charging = 'charging',
  Charged = 'charged',
  Discharging = 'discharging',
  NotCharging = 'not charging',
  Unknown = 'unknown',
}

export interface StatusProcess {
  name: string;
  memoryUsed: number;
}

export interface Status {
  // Global status
  backgroundMode: boolean;
  batteryLevel: number; // 0-100
  batteryStatus: BatteryStatus;
  streamProfile: StatusStreamProfile;
  powerSafeMode: boolean;
  notifications: boolean;
  cpuFrequencyMhz: number;
  cpuUsagePercents: number;
  liveConnections: number;
  networkInBps: number; // bytes per second
  networkOutBps: number; // bytes per second
  processes: StatusProcess[]; // names and memory used of processes running
  threadsRunnableUsed?: number;
  threadsUsed?: number;
  uptime: number; // msec
  rootAvailable: boolean;
  memoryUsed: number; // bytes, RAM
  memoryAvailable: number; // bytes, RAM
  spaceUsed: number; // bytes, local storage use
  spaceAvailable: number; // bytes, local storage available
  motionCameras: string[]; // names of cameras which current motion detected

  // Camera status
  motion: boolean;
}

export interface ServerResponse<T> {
  data: T;
}

export interface Server {
  url: string;
}

export interface Login {
  token: string;
}
