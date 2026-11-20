
'use server';
/**
 * @fileOverview Flujo para mejorar el contenido de correos electrónicos usando IA.
 * 
 * - enhanceEmailSubject: Mejora el asunto de un correo.
 * - enhanceEmailBody: Mejora el cuerpo de un correo.
 */

// import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Schemas de entrada
const EnhanceSubjectInputSchema = z.object({
  subject: z.string().describe('El asunto original del correo.'),
});
type EnhanceSubjectInput = z.infer<typeof EnhanceSubjectInputSchema>;

const EnhanceBodyInputSchema = z.object({
  body: z.string().describe('El cuerpo original del correo.'),
  prompt: z.string().optional().describe('Instrucciones adicionales para la IA sobre cómo mejorar el cuerpo.'),
});
type EnhanceBodyInput = z.infer<typeof EnhanceBodyInputSchema>;

// Schemas de salida
type EnhanceSubjectOutput = { enhancedSubject: string };
type EnhanceBodyOutput = { enhancedBody: string };


// Prompts con la funcionalidad restaurada
// const enhanceSubjectPrompt = ai.definePrompt({
//     name: 'enhanceSubjectPrompt',
//     input: { schema: EnhanceSubjectInputSchema },
//     model: 'googleai/gemini-2.5-flash',
//     prompt: `
//       Eres un experto en marketing digital. Tu tarea es mejorar el siguiente asunto de correo para hacerlo más atractivo, profesional y que incite a la apertura.
//       Responde únicamente con la nueva sugerencia de asunto, sin añadir texto introductorio como "Claro, aquí tienes una sugerencia:" o similar.
      
//       Asunto Original: {{{subject}}}
//     `,
// });

// const enhanceBodyPrompt = ai.definePrompt({
//     name: 'enhanceBodyPrompt',
//     input: { schema: EnhanceBodyInputSchema },
//     model: 'googleai/gemini-2.5-flash',
//     prompt: `
//       Eres un asistente de redacción experto. Tu tarea es reescribir y mejorar el siguiente cuerpo de un correo electrónico.
//       Aplica un tono profesional pero cercano, corrige errores gramaticales, mejora la estructura y asegúrate de que el mensaje sea claro y efectivo.
//       Incorpora emojis de forma sutil y profesional si es apropiado para el contexto.
//       Si el usuario proporciona una instrucción adicional, priorízala.

//       Cuerpo Original:
//       {{{body}}}

//       {{#if prompt}}Instrucción Adicional: {{{prompt}}}{{/if}}

//       Responde únicamente con el cuerpo del correo mejorado en formato HTML. No incluyas el asunto ni ningún texto introductorio.
//     `,
// });


// Flujos que usan los prompts restaurados
// const enhanceSubjectFlow = ai.defineFlow(
//   {
//     name: 'enhanceSubjectFlow',
//     inputSchema: EnhanceSubjectInputSchema,
//     outputSchema: z.object({ enhancedSubject: z.string() }),
//   },
//   async (input) => {
//     const { text } = await enhanceSubjectPrompt(input);
//     return { enhancedSubject: text };
//   }
// );


// const enhanceBodyFlow = ai.defineFlow(
//   {
//     name: 'enhanceBodyFlow',
//     inputSchema: EnhanceBodyInputSchema,
//     outputSchema: z.object({ enhancedBody: z.string() }),
//   },
//   async (input) => {
//     const { text } = await enhanceBodyPrompt(input);
//     return { enhancedBody: text };
//   }
// );


// Funciones exportadas (Server Actions)
export async function enhanceEmailSubject(input: { subject: string }): Promise<EnhanceSubjectOutput> {
  // try {
  //   return await enhanceSubjectFlow(input);
  // } catch (e: any) {
  //   console.error("[ERROR ENHANCE SUBJECT FLOW]:", e);
  //   throw new Error(`Error del servidor de IA: ${e.message || 'Error desconocido'}`);
  // }
  console.error("Genkit is temporarily disabled.");
  return { enhancedSubject: input.subject };
}

export async function enhanceEmailBody(input: { body: string; prompt?: string }): Promise<EnhanceBodyOutput> {
  // try {
  //   return await enhanceBodyFlow(input);
  // } catch (e: any) {
  //   console.error("[ERROR ENHANCE BODY FLOW]:", e);
  //   throw new Error(`Error del servidor de IA: ${e.message || 'Error desconocido'}`);
  // }
  console.error("Genkit is temporarily disabled.");
  return { enhancedBody: input.body };
}
