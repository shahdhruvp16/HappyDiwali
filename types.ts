
export enum Scene {
  Welcome,
  Decorate,
  Fireworks,
  Wish,
  Share,
}

export type Mood = 'Joyful' | 'Funny' | 'Heartfelt' | 'Traditional';

export interface WishData {
  from: string;
  to: string;
  mood: Mood;
  customMessage?: string;
  generatedWish: string;
}

export interface Decoration {
  id: number;
  type: 'diya' | 'lantern' | 'rangoli' | 'lights';
  x: number;
  y: number;
}

export interface Firework {
  id: number;
  x: number;
  y: number;
  message: string;
}
