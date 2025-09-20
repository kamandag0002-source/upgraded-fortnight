// src/ai/flows/personalized-affirmations.ts
'use server';

/**
 * @fileOverview A flow for generating personalized affirmations based on user's daily check-in data.
 *
 * - generateAffirmation - A function that generates personalized affirmations.
 * - AffirmationInput - The input type for the generateAffirmation function.
 * - AffirmationOutput - The return type for the generateAffirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AffirmationInputSchema = z.object({
  mood: z.string().describe('The user\'s mood today.'),
  energyLevel: z.string().describe('The user\'s energy level today.'),
  significantEvents: z
    .string()
    .describe('Any significant events that happened to the user today.'),
});

export type AffirmationInput = z.infer<typeof AffirmationInputSchema>;

const AffirmationOutputSchema = z.object({
  affirmation: z.string().describe('A personalized affirmation for the user.'),
});

export type AffirmationOutput = z.infer<typeof AffirmationOutputSchema>;

export async function generateAffirmation(
  input: AffirmationInput
): Promise<AffirmationOutput> {
  return generateAffirmationFlow(input);
}

const affirmationPrompt = ai.definePrompt({
  name: 'affirmationPrompt',
  input: {schema: AffirmationInputSchema},
  output: {schema: AffirmationOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized affirmations for users based on their daily check-in data.

  Instructions:
  - Use the mood, energy level, and significant events provided to create a unique and uplifting affirmation.
  - The affirmation should be positive, encouraging, and tailored to the user's specific situation.
  - Keep the affirmation concise and easy to remember.

  Here is the user's check-in data:
  Mood: {{{mood}}}
  Energy Level: {{{energyLevel}}}
  Significant Events: {{{significantEvents}}}

  Generate a personalized affirmation for the user:
  `,
});

const generateAffirmationFlow = ai.defineFlow(
  {
    name: 'generateAffirmationFlow',
    inputSchema: AffirmationInputSchema,
    outputSchema: AffirmationOutputSchema,
  },
  async input => {
    const {output} = await affirmationPrompt(input);
    return output!;
  }
);
