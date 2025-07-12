
'use server';

/**
 * @fileOverview This is the central AI processing flow for the application.
 * It handles incoming messages, with or without files, determines user intent,
 * uses tools to interact with project data, and generates comprehensive responses
 * including summaries, suggested tags, and forwarding recommendations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { findContextByQuery, updateStageStatus, addFileToStage as addFileToStageData } from '@/lib/data';
import type { StageStatus } from '@/types';
import {
    ProcessMessageInputSchema,
    type ProcessMessageInput,
    ProcessMessageOutputSchema,
    type ProcessMessageOutput
} from './schemas';

// #################################################################
//  TOOLS DEFINITION
// #################################################################

const findStageTool = ai.defineTool(
  {
    name: 'findStage',
    description: 'Finds a project stage using a natural language query. Use keywords from the user message, like project titles or stage names (e.g., "technical study for the Athens renovation" or "invoice for Papadopoulos"). This is the first step for any action.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
        projectId: z.string(),
        interventionMasterId: z.string(),
        stageId: z.string(),
        stageTitle: z.string(),
        projectTitle: z.string(),
    }).nullable(),
  },
  async ({ query }) => {
    console.log(`[AI Tool] Finding stage with query: "${query}"`);
    // This is a mock implementation. Replace with your actual data fetching logic.
    const result = await findContextByQuery(query);
    return result;
  }
);

const updateStageStatusTool = ai.defineTool(
    {
        name: 'updateStageStatus',
        description: 'Updates the status of a specific stage. Use this if the message implies a task is finished (e.g., "ολοκληρώθηκε", "έγινε η πληρωμή", "τελείωσε").',
        inputSchema: z.object({
            projectId: z.string(),
            stageId: z.string(),
            status: z.enum(['pending', 'in progress', 'completed', 'failed']),
        }),
        outputSchema: z.boolean(),
    },
    async ({ projectId, stageId, status }) => {
        console.log(`[AI Tool] Updating stage ${stageId} in project ${projectId} to status "${status}"`);
        // This is a mock implementation. Replace with your actual data updating logic.
        const success = await updateStageStatus(projectId, stageId, status as StageStatus);
        return success;
    }
);

const addFileToStageTool = ai.defineTool(
    {
        name: 'addFileToStage',
        description: 'Attaches a file to a specific project stage. This should be used whenever a file is provided.',
        inputSchema: z.object({
            projectId: z.string(),
            stageId: z.string(),
            fileName: z.string(),
            dataUri: z.string().describe("The Data URI of the file to attach. This must be passed from the input."),
        }),
        outputSchema: z.boolean(),
    },
    async ({ projectId, stageId, fileName, dataUri }) => {
        console.log(`[AI Tool] Adding file "${fileName}" to stage ${stageId} in project ${projectId}`);
        // The URL saved in the data store IS the data URI.
        const success = await addFileToStageData(projectId, stageId, { name: fileName, url: dataUri });
        return success;
    }
);


// #################################################################
//  AI FLOW DEFINITION
// #################################################################

const messageProcessorFlow = ai.defineFlow(
  {
    name: 'messageProcessorFlow',
    inputSchema: ProcessMessageInputSchema,
    outputSchema: ProcessMessageOutputSchema,
    system: `You are an expert project management assistant for "NESTOR eco", a platform for managing energy-saving projects. Your task is to process incoming messages, understand user intent, and take action using the available tools. You MUST respond and make all suggestions in GREEK.
    
    Your process is as follows:
    1.  Analyze the user's message text to understand the context. Use the 'findStage' tool to locate the relevant project and stage. This is your primary context for all other actions. If you cannot find a stage, inform the user clearly and stop.
    2.  If the user's message implies a task is finished (e.g., "ολοκληρώθηκε η μελέτη", "έγινε η πληρωμή"), use the 'updateStageStatus' tool to set the stage to 'completed'.
    3.  If a file is provided in the input, you MUST use the 'addFileToStage' tool to attach it to the context you found in step 1. You must pass the 'dataUri' from the input to the tool.
    4.  If a file was processed, analyze its likely content (based on its name and the message context) to suggest relevant tags and recommend which department/role it should be forwarded to (e.g., 'Λογιστήριο', 'Τεχνικό Τμήμα').
    5.  Formulate a final JSON response containing a 'responseText' in GREEK confirming the actions you took, a list of 'actionsTaken', and any 'tags' or 'forwardingRecommendation' you generated. If you couldn't do something, 'responseText' should explain why clearly.`
  },
  async (input) => {
    
    const llmResponse = await ai.generate({
      prompt: {
          text: input.messageText,
          media: input.fileInfo ? [{url: input.fileInfo.dataUri}] : [],
      },
      history: input.chatHistory?.map(entry => ({
          role: entry.role,
          parts: [{ text: entry.content }],
      })),
      tools: [findStageTool, updateStageStatusTool, addFileToStageTool],
      model: 'googleai/gemini-2.0-flash',
      output: { schema: ProcessMessageOutputSchema }
    });
    
    return llmResponse.output!;
  }
);


export async function processMessage(input: ProcessMessageInput): Promise<ProcessMessageOutput> {
  return messageProcessorFlow(input);
}
