// src/ai/flows/generate-creative-text.ts
'use server';

/**
 * @fileOverview Flow for generating creative text content based on a prompt.
 *
 * - generateCreativeText - A function that generates creative text.
 * - GenerateCreativeTextInput - The input type for the generateCreativeText function.
 * - GenerateCreativeTextOutput - The return type for the generateCreativeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCreativeTextInputSchema = z.object({
  prompt: z.string().describe('A prompt or theme for generating creative text.'),
  style: z.string().optional().describe('The style of the generated text (e.g., Shakespearean, Modernist).'),
});
export type GenerateCreativeTextInput = z.infer<typeof GenerateCreativeTextInputSchema>;

const GenerateCreativeTextOutputSchema = z.object({
  generatedText: z.string().describe('The generated creative text.'),
});
export type GenerateCreativeTextOutput = z.infer<typeof GenerateCreativeTextOutputSchema>;

export async function generateCreativeText(input: GenerateCreativeTextInput): Promise<GenerateCreativeTextOutput> {
  return generateCreativeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCreativeTextPrompt',
  input: {schema: GenerateCreativeTextInputSchema},
  output: {schema: GenerateCreativeTextOutputSchema},
  prompt: `You are a creative writing assistant. Generate text based on the given prompt and style.

Prompt: {{{prompt}}}

Style: {{{style}}}

Generated Text:`, 
});

const generateCreativeTextFlow = ai.defineFlow(
  {
    name: 'generateCreativeTextFlow',
    inputSchema: GenerateCreativeTextInputSchema,
    outputSchema: GenerateCreativeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
