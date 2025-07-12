'use server';

/**
 * @fileOverview AI agent that transforms text into a custom style.
 *
 * - customStyleText - A function that transforms the text into a custom style.
 * - CustomStyleTextInput - The input type for the customStyleText function.
 * - CustomStyleTextOutput - The return type for the customStyleText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomStyleTextInputSchema = z.object({
  text: z.string().describe('The text to transform.'),
  customStyle: z.string().describe('The custom style to apply to the text.'),
});
export type CustomStyleTextInput = z.infer<typeof CustomStyleTextInputSchema>;

const CustomStyleTextOutputSchema = z.object({
  transformedText: z.string().describe('The transformed text.'),
});
export type CustomStyleTextOutput = z.infer<typeof CustomStyleTextOutputSchema>;

export async function customStyleText(input: CustomStyleTextInput): Promise<CustomStyleTextOutput> {
  return customStyleTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customStyleTextPrompt',
  input: {schema: CustomStyleTextInputSchema},
  output: {schema: CustomStyleTextOutputSchema},
  prompt: `Transform the following text into the specified custom style.\n\nText: {{{text}}}\n\nCustom Style: {{{customStyle}}}`,
});

const customStyleTextFlow = ai.defineFlow(
  {
    name: 'customStyleTextFlow',
    inputSchema: CustomStyleTextInputSchema,
    outputSchema: CustomStyleTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
