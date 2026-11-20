
'use server';
/**
 * @fileOverview Flujo para generar expresiones de After Effects a partir de parámetros detallados.
 * 
 * - generateAeExpression: La función principal que se llama desde el cliente.
 */

// import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { AeExpressionGeneratorInput, AeExpressionGeneratorOutput } from '@/types';
import { canGenerateExpression, recordExpressionGeneration } from '@/app/ia/actions';

// Esquema de entrada que captura todos los parámetros del usuario.
const AeExpressionGeneratorInputSchema = z.object({
  property: z.string().describe("La propiedad de After Effects a animar (ej: 'Posición', 'Escala'). Puede ser 'reference-image' si el usuario quiere que la IA deduzca la propiedad o 'effects-only' si solo quiere aplicar efectos."),
  description: z.string().optional().describe("Descripción en lenguaje natural del comportamiento deseado."),
  startTime: z.number().optional().describe("El tiempo de inicio de la animación en segundos."),
  endTime: z.number().optional().describe("El tiempo de finalización de la animación en segundos."),
  effects: z.array(z.string()).optional().describe("Efectos adicionales a aplicar (ej: ['Wiggle', 'Rebote'])."),
  intensity: z.number().optional().describe("Parámetros de intensidad/amplitud para los efectos (0-100)."),
  frequency: z.number().optional().describe("Parámetros de frecuencia para los efectos (0-100)."),
  imageDataUri: z.string().optional().describe("Una imagen de referencia (como Data URI) para dar contexto visual."),
  compWidth: z.number().optional().describe("Ancho de la composición en píxeles."),
  compHeight: z.number().optional().describe("Alto de la composición en píxeles."),
  startValue: z.number().optional().describe("El valor inicial de la animación. El significado (porcentaje, grados, etc.) depende de la propiedad."),
  endValue: z.number().optional().describe("El valor final de la animación. El significado (porcentaje, grados- etc.) depende de la propiedad."),
  enhanceOnly: z.boolean().optional().describe("Si es verdadero, el usuario ya tiene keyframes y solo quiere mejorar la animación (ej. añadir rebote). El código debe usar 'value', 'key(1).time', etc."),
  rotations: z.number().optional().describe("Número de vueltas completas (360°) para la propiedad de rotación."),
  axis: z.enum(['x', 'y', 'xy']).optional().describe("Para la propiedad 'Posición', especifica qué ejes animar."),
  easingType: z.enum(['linear', 'ease', 'easeIn', 'easeOut']).optional().describe("El tipo de curva de velocidad a aplicar."),
  easingIntensity: z.number().optional().describe("La intensidad de la curva de velocidad (0-100)."),
  loopType: z.enum(['cycle', 'pingpong', 'offset', 'continue']).optional().describe("El tipo de bucle para la expresión loopOut."),
  userRole: z.string().optional().describe("El rol del usuario que realiza la solicitud ('admin', 'miembro', etc.)."),
});

// Esquema de salida: ahora puede contener código principal y secundario.
const AeExpressionGeneratorOutputSchema = z.object({
  mainExpression: z.string().describe("El código de la expresión principal de After Effects (ExtendScript) generado."),
  secondaryExpression: z.string().optional().describe("Código de expresión adicional para otra propiedad si es necesario (ej: opacidad)."),
  secondaryProperty: z.string().optional().describe("La propiedad a la que se debe aplicar el código secundario (ej: 'Opacidad')."),
  usageInfo: z.object({
    allowed: z.boolean(),
    isMember: z.boolean(),
    remaining: z.number().optional(),
    resetsAt: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
});

// El prompt de Genkit, diseñado para seguir las reglas estrictas del usuario.
// const aeExpressionPrompt = ai.definePrompt({
//     name: 'aeExpressionPrompt',
//     input: { schema: AeExpressionGeneratorInputSchema.omit({ userRole: true }) }, // Quitamos userRole del prompt de la IA
//     output: { schema: AeExpressionGeneratorOutputSchema.omit({ usageInfo: true }) },
//     prompt: `
//         Eres un experto mundial en expresiones de After Effects (ExtendScript).
//         Tu única tarea es generar código de expresión funcional, limpio y optimizado basándote ESTRICTAMENTE en los parámetros proporcionados.

//         NUEVA CAPACIDAD CRÍTICA: ANÁLISIS DE IMAGEN Y CONTEXTO
//         1. ANÁLISIS DE IMAGEN: Si se proporciona una 'imageDataUri', debes analizar la imagen para entender el contexto de la animación solicitada en 'description'.
//            - Identifica con RIGOR los objetos (ej: "círculo rojo") y sus propiedades visuales iniciales (posición, escala, rotación).
//            - Determina sus posiciones iniciales y finales relativas (ej: el círculo rojo empieza abajo a la izquierda y termina donde está el azul).
//            - ¡MUY IMPORTANTE! Si se menciona un "trazado" o "recorrido" (ej: "el trazado amarillo"), debes generar una expresión de 'Posición' que SIMULE ese movimiento de forma lo más precisa posible. Esto puede requerir una serie de sentencias 'linear()' o 'ease()' para aproximar la curva.
//            - Relaciona las posiciones de la imagen con el tamaño de la composición (compWidth, compHeight). Por ejemplo, si el círculo rojo está en la esquina inferior izquierda, su posición aproximada en la expresión sería [0, compHeight]. Centro: [compWidth/2, compHeight/2].

//         2. CONTEXTO DEL FORMULARIO:
//            - SI 'property' es 'reference-image': ¡IGNORA POR COMPLETO 'startValue' y 'endValue'! Tu única fuente de verdad es la 'description' y la 'imageDataUri'. Analiza la descripción para deducir la(s) propiedad(es) a animar. Si la descripción implica múltiples animaciones (ej. 'saltar y girar'), genera el código principal en 'mainExpression' para la propiedad principal (Posición) y usa 'secondaryExpression' y 'secondaryProperty' (Rotación) para la segunda.
//            - SI 'property' es específica (ej: 'Posición', 'Escala'): DEBES usar esa propiedad como la principal. La 'description' e 'imageDataUri' servirán como contexto adicional para refinar esa animación, pero NO debes cambiar la propiedad.
        
//         REGLAS INNEGOCIABLES DE SALIDA:
//         1. SOLO CÓDIGO: Tu respuesta DEBE contener únicamente el código de expresión en los campos correspondientes. No incluyas explicaciones ni markdown.
//         2. INSTRUCCIONES CLARAS: En 'secondaryProperty', y también en el código de 'mainExpression' si es deducido, indica claramente para qué propiedad es el código. Ejemplo: "Posición", "Opacidad", "Escala".
//         3. CÓDIGO SECUNDARIO: Si la descripción o un efecto requieren animar una segunda propiedad, genera ese código en 'secondaryExpression' y especifica la propiedad en 'secondaryProperty'. Si no, deja esos campos vacíos.
//         4. REGLAS DE PROPIEDAD:
//            - 'Posición': Devuelve un array [x, y]. Si 'axis' es 'x', solo anima x ([newX, value[1]]). Si es 'y', solo anima y ([value[0], newY]).
//            - 'Escala': Devuelve [x, y]. start/endValue son porcentajes.
//            - 'Rotación': Devuelve un valor numérico. start/endValue son grados. El valor 'rotations' son vueltas completas que debes sumar (rotations * 360).
//            - 'Opacidad': Devuelve un valor de 0 a 100.
//         5. VALOR DE EFECTO: Si la propiedad es 'Valor de Efecto', incluye un comentario inicial (ej: // Aplicar a 'Slider' del efecto 'Control Deslizador').
//         6. LÓGICA DE EFECTOS:
//            - ¡IMPORTANTE! SOLO aplica los efectos si el array 'effects' contiene elementos. Si está vacío, NO inventes ni añadas ningún efecto.
//            - 'Wiggle': Usa wiggle(frecuencia, amplitud) derivado de 'frequency' e 'intensity'.
//            - 'Loop': ¡IMPORTANTE! Requiere keyframes. El código generado DEBE SER solo loopOut("{{#if loopType}}{{{loopType}}}{{else}}cycle{{/if}}").
//            - 'Rebote' o 'Elástico': Modifica 'value' asumiendo que ya hay keyframes.
//            - 'Animación Constante': Usa 'time' multiplicado por un factor derivado de 'intensity'.
//            - 'Oscilación': Usa Math.sin() o Math.cos() con 'time', 'frequency' e 'intensity'.
//            - 'Efecto Staccato': Usa posterizeTime() con un valor derivado de 'frequency'.
//            - 'Parpadeo Aleatorio': Usa random() o un wiggle.
//            - 'Luces de Discoteca': Combina un wiggle en 'Posición' y 'posterizeTime(random())' en 'Opacidad' (usando código secundario).
//         7. SUAVIZADO Y TIEMPO: ¡CRÍTICO! APLICA SIEMPRE el 'easingType' y 'easingIntensity' seleccionados usando las funciones 'linear' o 'ease' entre el 'startTime' y 'endTime' proporcionados, a menos que 'enhanceOnly' sea true. La animación DEBE durar lo especificado por 'startTime' y 'endTime'.
//         8. MODO MEJORA ('enhanceOnly'): El código NO debe crear una animación nueva, sino MODIFICAR la existente usando 'value', 'key(numKeys).time', etc.
//         9. MODO SOLO EFECTOS ('effects-only'): El código NO debe crear una animación de principio a fin. Aplica solo los efectos seleccionados en el array 'effects'. Si es 'Loop', genera solo loopOut(...). Si es 'Wiggle', genera 'value + wiggle(...)'.
//         10. INTERPRETACIÓN DE VALORES:
//             - 'Posición': start/endValue son porcentajes. Conviértelos a valores reales: 'thisComp.width * (valor/100)' para X, 'thisComp.height * (valor/100)' para Y.
//             - 'Rotación', 'Escala', 'Opacidad': start/endValue son valores directos.

//         PARÁMETROS DEL USUARIO:
//         - Propiedad a Animar: {{{property}}}
//         - Ancho Composición: {{{compWidth}}}px
//         - Alto Composición: {{{compHeight}}}px
//         - Tiempo de Inicio: {{{startTime}}}s
//         - Tiempo de Fin: {{{endTime}}}s
//         - Valor Inicial: {{{startValue}}}
//         - Valor Final: {{{endValue}}}
//         {{#if axis}}- Ejes a animar (Posición): {{{axis}}}{{/if}}
//         {{#if rotations}}- Vueltas de Rotación: {{{rotations}}}{{/if}}
//         {{#if description}}- Descripción del Comportamiento: {{{description}}}{{/if}}
//         {{#if effects}}- Efectos Adicionales: {{{effects}}}{{/if}}
//         {{#if loopType}}- Tipo de Loop: {{{loopType}}}{{/if}}
//         {{#if intensity}}- Intensidad (Amplitud) de Efectos: {{{intensity}}}/100{{/if}}
//         {{#if frequency}}- Frecuencia de Efectos: {{{frequency}}}/100{{/if}}
//         {{#if enhanceOnly}}- Modo: Mejorar animación existente (el usuario ya puso keyframes).{{/if}}
//         {{#if easingType}}- Tipo de Suavizado: {{{easingType}}}{{/if}}
//         {{#if easingIntensity}}- Intensidad de Suavizado: {{{easingIntensity}}}/100{{/if}}
//         {{#if imageDataUri}}- Imagen de Referencia: {{media url=imageDataUri}}{{/if}}
//     `,
// });

// El flujo de Genkit que orquesta la llamada a la IA.
// const aeExpressionGeneratorFlow = ai.defineFlow(
//   {
//     name: 'aeExpressionGeneratorFlow',
//     inputSchema: AeExpressionGeneratorInputSchema,
//     outputSchema: AeExpressionGeneratorOutputSchema,
//   },
//   async (input) => {
//     // 1. Verificar permisos
//     const usageStatus = await canGenerateExpression(input.userRole);
//     if (!usageStatus.allowed) {
//       return { 
//         mainExpression: '',
//         usageInfo: usageStatus,
//       };
//     }
    
//     // Quitamos userRole antes de pasarlo al prompt
//     const { userRole, ...promptInput } = input;
    
//     const useProModel = !!promptInput.imageDataUri;
//     const modelToUse = useProModel ? 'googleai/gemini-2.5-pro' : 'googleai/gemini-2.5-flash';
//     let finalOutput: Omit<AeExpressionGeneratorOutput, 'usageInfo'> | null | undefined = null;

//     try {
//       console.log(`Intentando generar expresión con: ${modelToUse}`);
//       const { output } = await aeExpressionPrompt(promptInput, { model: modelToUse });
//       finalOutput = output;
//     } catch (e: any) {
//       const errorMessage = e.message || '';
//       console.error(`Error con ${modelToUse}:`, errorMessage);

//       if (useProModel && (errorMessage.includes('503') || errorMessage.includes('overloaded'))) {
//         console.log('Modelo PRO sobrecargado. Reintentando con el modelo flash...');
//         const fallbackInput = { ...promptInput, imageDataUri: undefined };
        
//         try {
//           const { output: fallbackOutput } = await aeExpressionPrompt(fallbackInput, { model: 'googleai/gemini-2.5-flash' });
//           finalOutput = fallbackOutput;
//         } catch (fallbackError: any) {
//            console.error('Error en el reintento con el modelo Flash:', fallbackError.message);
//            throw new Error(`El modelo PRO está ocupado y el reintento con el modelo estándar también falló: ${fallbackError.message}`);
//         }
//       } else {
//         throw e;
//       }
//     }
    
//     if (!finalOutput?.mainExpression) {
//       throw new Error("No se pudo generar la expresión de After Effects.");
//     }
    
//     // 2. Registrar el uso si la generación fue exitosa
//     await recordExpressionGeneration(input.userRole);

//     const cleanMain = finalOutput.mainExpression
//         .replace(/```(javascript|js|jsx|extendscript)?/g, '')
//         .replace(/```/g, '')
//         .trim();
    
//     const cleanSecondary = finalOutput.secondaryExpression
//         ?.replace(/```(javascript|js|jsx|extendscript)?/g, '')
//         .replace(/```/g, '')
//         .trim();

//     return {
//         mainExpression: cleanMain,
//         secondaryExpression: cleanSecondary || undefined,
//         secondaryProperty: finalOutput.secondaryProperty || undefined,
//         usageInfo: usageStatus, // Devolvemos el estado del uso
//     };
//   }
// );

// Función exportada que el cliente llamará.
export async function generateAeExpression(input: AeExpressionGeneratorInput): Promise<AeExpressionGeneratorOutput> {
  // return aeExpressionGeneratorFlow(input);
  console.error("Genkit is temporarily disabled.");
  return { mainExpression: "" };
}
