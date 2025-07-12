
'use server';

/**
 * @fileOverview Defines the Zod schemas for the inputs and outputs of the message processing AI flow.
 */

import { z } from 'zod';

/**
 * Schema for the input of the message processing flow.
 */
export const ProcessMessageInputSchema = z.object({
  messageText: z.string().describe('The text message sent by the user.'),
  fileInfo: z
    .object({
      name: z.string().describe('The name of the uploaded file.'),
      dataUri: z
        .string()
        .describe(
          "The file content as a data URI. This must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    })
    .optional()
    .describe('An optional file attached by the user.'),
  chatHistory: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
  })).optional().describe('The history of the conversation.'),
});
export type ProcessMessageInput = z.infer<typeof ProcessMessageInputSchema>;


/**
 * Schema for the output of the message processing flow.
 */
export const ProcessMessageOutputSchema = z.object({
    responseText: z.string().describe("A comprehensive, friendly response in Greek summarizing the actions taken or providing an answer. If an action failed, explain why."),
    actionsTaken: z.array(z.object({
        toolName: z.string().describe("The name of the tool that was executed (e.g., 'addFileToStage')."),
        result: z.any().describe("The result or status of the tool execution."),
    })).describe("A list of all actions performed by the AI tools during the process."),
    tags: z.array(z.string()).optional().describe("A list of suggested tags in Greek based on the file content and message context (e.g., ['τιμολόγιο', 'τεχνική μελέτη', 'ΔΕΔΔΗΕ'])."),
    forwardingRecommendation: z.string().optional().describe("A recommendation in Greek for which department or role the file should be forwarded to (e.g., 'Λογιστήριο', 'Τεχνικό Τμήμα').")
});
export type ProcessMessageOutput = z.infer<typeof ProcessMessageOutputSchema>;
