// This is a server-side file.
'use server';

/**
 * @fileOverview Generates personalized clothing recommendations based on user preferences.
 *
 * - generatePersonalizedRecommendations - A function that generates clothing recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  pastPreferences: z
    .string()
    .describe('A description of the user past clothing preferences.'),
  currentBrowsingActivity: z
    .string()
    .describe('A description of the user current browsing activity.'),
});
export type PersonalizedRecommendationsInput =
  z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string().describe('The name of the clothing item.'),
      description: z.string().describe('A short description of the item.'),
      imageUrl: z.string().describe('URL of the clothing item image.'),
      keywords: z.array(z.string()).describe('Keywords associated with the item.'),
    })
  ).
    describe('A list of personalized clothing recommendations.'),
});
export type PersonalizedRecommendationsOutput =
  z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a personal stylist who provides clothing recommendations based on user preferences and browsing history.

  Past Preferences: {{{pastPreferences}}}
  Current Browsing Activity: {{{currentBrowsingActivity}}}

  Based on the past preferences and current browsing activity, recommend clothing items that the user might like.
  Each item in recommendations array should contain name, description, imageUrl and keywords. The keywords represent a list of keywords associated with the clothing item. This will be used to track user preferences over time.
  Please only return clothes available in Kenya.
  Do not recommend more than 5 items.
  If you cannot provide a meaningful recommendation, return an empty array.`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
