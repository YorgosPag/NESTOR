'use server';

/**
 * @fileOverview An AI agent that transforms text into a user-selected writing style.
 *
 * - transformText - A function that handles the text transformation process.
 * - TransformTextInput - The input type for the transformText function.
 * - TransformTextOutput - The return type for the transformText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransformTextInputSchema = z.object({
  text: z.string().describe('The text to be transformed.'),
  style: z
    .string()
    .describe(
      'The desired writing style for the transformation (e.g., Shakespearean, Modernist).'
    ),
});
export type TransformTextInput = z.infer<typeof TransformTextInputSchema>;

const TransformTextOutputSchema = z.object({
  transformedText: z
    .string()
    .describe('The text transformed into the specified style.'),
});
export type TransformTextOutput = z.infer<typeof TransformTextOutputSchema>;

export async function transformText(
  input: TransformTextInput
): Promise<TransformTextOutput> {
  return transformTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transformTextPrompt',
  input: {schema: TransformTextInputSchema},
  output: {schema: TransformTextOutputSchema},
  prompt: `You are a skilled writer capable of transforming text into various styles.

  Please transform the following text into the style specified:

  Text: {{{text}}}
  Style: {{{style}}}
  `,
});

const transformTextFlow = ai.defineFlow(
  {
    name: 'transformTextFlow',
    inputSchema: TransformTextInputSchema,
    outputSchema: TransformTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
