export type Mood = "Happy" | "Calm" | "Neutral" | "Anxious" | "Sad";
export type EnergyLevel = "High" | "Medium" | "Low";

export interface MoodRecord {
  mood: Mood;
  energyLevel: EnergyLevel;
  significantEvents: string;
  timestamp: Date;
}

export interface Reminder {
  id: number;
  text: string;
  time: string;
  timeoutId?: NodeJS.Timeout;
}
