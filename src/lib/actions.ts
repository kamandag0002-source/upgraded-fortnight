"use server";

import { generateAffirmation, type AffirmationInput } from "@/ai/flows/personalized-affirmations";
import { z } from "zod";

const checkInSchema = z.object({
  mood: z.string().min(1, "Mood is required."),
  energyLevel: z.string().min(1, "Energy level is required."),
  significantEvents: z.string().optional(),
});

export async function getAffirmationAction(formData: FormData) {
  try {
    const validatedFields = checkInSchema.safeParse({
      mood: formData.get("mood"),
      energyLevel: formData.get("energyLevel"),
      significantEvents: formData.get("significantEvents"),
    });

    if (!validatedFields.success) {
      return {
        error: "Invalid input. Please check your entries.",
      };
    }

    const { mood, energyLevel, significantEvents } = validatedFields.data;

    const affirmationInput: AffirmationInput = {
      mood,
      energyLevel,
      significantEvents: significantEvents || "None.",
    };

    const result = await generateAffirmation(affirmationInput);
    
    return {
      data: result.affirmation,
    };
  } catch (error) {
    console.error("Error generating affirmation:", error);
    return {
      error: "Failed to generate affirmation. Please try again later.",
    };
  }
}
