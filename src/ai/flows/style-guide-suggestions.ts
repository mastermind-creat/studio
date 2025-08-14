'use server';

/**
 * @fileOverview Generates style guide suggestions based on user input.
 *
 * - suggestStyleGuide - A function that handles the style guide suggestion process.
 * - SuggestStyleGuideInput - The input type for the suggestStyleGuide function.
 * - SuggestStyleGuideOutput - The return type for the suggestStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStyleGuideInputSchema = z.object({
  occasion: z
    .string()
    .describe(
      'A description of the occasion or style the user is looking for.'
    ),
  previousKeywords: z
    .array(z.string())
    .optional()
    .describe('Keywords the user has previously used.'),
});
export type SuggestStyleGuideInput = z.infer<typeof SuggestStyleGuideInputSchema>;

const SuggestStyleGuideOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe(
      'A list of relevant keywords that the user can use to refine their search and clothing recommendations.'
    ),
});
export type SuggestStyleGuideOutput = z.infer<typeof SuggestStyleGuideOutputSchema>;

export async function suggestStyleGuide(input: SuggestStyleGuideInput): Promise<SuggestStyleGuideOutput> {
  return suggestStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStyleGuidePrompt',
  input: {schema: SuggestStyleGuideInputSchema},
  output: {schema: SuggestStyleGuideOutputSchema},
  prompt: `You are a personal stylist who suggests keywords to help users find the perfect clothing for their needs.

  The user is looking for clothing for the following occasion:
  {{occasion}}

  Here are keywords that the user has previously used:
  {{#if previousKeywords}}
  {{#each previousKeywords}}
  - {{{this}}}
  {{/each}}
  {{else}}
  None
  {{/if}}

  Suggest a list of relevant keywords that the user can use to refine their search and clothing recommendations. Focus on keywords that are related to style, occasion, and clothing attributes.
  The keywords should be tailored to the occasion and the user's previous keywords, if any.
  Include keywords that are specific and descriptive.
  Return no more than 10 keywords.
  `,
});

const suggestStyleGuideFlow = ai.defineFlow(
  {
    name: 'suggestStyleGuideFlow',
    inputSchema: SuggestStyleGuideInputSchema,
    outputSchema: SuggestStyleGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
