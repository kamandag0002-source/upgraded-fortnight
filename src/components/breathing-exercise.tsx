"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type BreathingState = "idle" | "inhale" | "hold-in" | "exhale" | "hold-out";

const cycle: { state: BreathingState; duration: number; text: string }[] = [
  { state: "inhale", duration: 4000, text: "Breathe in..." },
  { state: "hold-in", duration: 4000, text: "Hold" },
  { state: "exhale", duration: 6000, text: "Breathe out..." },
  { state: "hold-out", duration: 2000, text: "Hold" },
];

export function BreathingExercise() {
  const [state, setState] = useState<BreathingState>("idle");
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (state === "idle") return;

    const currentPhase = cycle[cycleIndex];
    const timer = setTimeout(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % cycle.length);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [state, cycleIndex]);
  
  useEffect(() => {
    if (state !== 'idle') {
      setState(cycle[cycleIndex].state);
    }
  }, [cycleIndex, state]);

  const handleStart = () => {
    setCycleIndex(0);
    setState("inhale");
  };

  const handleStop = () => {
    setState("idle");
  };

  const currentPhase = state === "idle" ? { text: "Press Start to Begin" } : cycle.find(c => c.state === state) || cycle[0];

  const getAnimationClass = () => {
    switch (state) {
      case "inhale":
        return "animate-inhale";
      case "exhale":
        return "animate-exhale";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 h-full">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-primary/20" />
        <div
          className={`w-1/2 h-1/2 rounded-full bg-primary transition-transform duration-[4000ms] ease-in-out ${
            state === "inhale" || state === "hold-in" ? "scale-150" : "scale-100"
          }`}
          style={{
            transitionDuration: state === "inhale" ? "4000ms" : "6000ms"
          }}
        />
      </div>

      <p className="text-2xl font-headline text-center h-8">
        {currentPhase.text}
      </p>
      
      <div className="flex gap-4">
        {state === "idle" ? (
          <Button onClick={handleStart} size="lg">Start</Button>
        ) : (
          <Button onClick={handleStop} size="lg" variant="outline">Stop</Button>
        )}
      </div>
    </div>
  );
}
