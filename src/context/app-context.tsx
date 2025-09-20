"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { MoodRecord } from '@/lib/types';

interface AppContextType {
  moodHistory: MoodRecord[];
  addMoodRecord: (record: MoodRecord) => void;
  affirmation: string | null;
  setAffirmation: (affirmation: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [moodHistory, setMoodHistory] = useState<MoodRecord[]>([]);
  const [affirmation, setAffirmation] = useState<string | null>(null);

  const addMoodRecord = (record: MoodRecord) => {
    setMoodHistory(prev => [...prev, record]);
  };

  return (
    <AppContext.Provider value={{ moodHistory, addMoodRecord, affirmation, setAffirmation }}>
      {children}
    </AppContext.Provider>
  );
}
