import { z } from 'zod';

// Esquema para la entrada de búsqueda de Pexels
export const PexelsSearchInputSchema = z.object({
  query: z.string().describe('Término de búsqueda para los videos.'),
  quality: z.enum(['hd', '4k']).default('hd').describe('Calidad del video: HD o 4K.'),
  orientation: z.enum(['landscape', 'portrait']).default('landscape').describe('Orientación del video.'),
  per_page: z.number().min(1).max(80).default(80).describe('Cantidad de videos por página.'),
  page: z.number().min(1).default(1).describe('Número de página a solicitar.'),
});
export type PexelsSearchInput = z.infer<typeof PexelsSearchInputSchema>;

// Esquema para un video individual de Pexels
export const PexelsVideoSchema = z.object({
    id: z.number(),
    image: z.string().url().describe("URL de la imagen de vista previa del video."),
    photographer: z.string().describe("Nombre del fotógrafo/creador del video."),
    downloadUrl: z.string().url().describe("URL de descarga del video en la calidad solicitada."),
    width: z.number().optional().describe("Ancho del video en píxeles."),
    height: z.number().optional().describe("Alto del video en píxeles."),
});
export type PexelsVideo = z.infer<typeof PexelsVideoSchema>;

// Esquema para la salida del flujo de búsqueda de videos
export const PexelsSearchOutputSchema = z.object({
  videos: z.array(PexelsVideoSchema).describe('Lista de videos encontrados.'),
});
export type PexelsSearchOutput = z.infer<typeof PexelsSearchOutputSchema>;

// Esquema para una sugerencia individual
export const SuggestionSchema = z.object({
    display: z.string().describe('El término de búsqueda sugerido en español para mostrar al usuario.'),
    query: z.string().describe('El término de búsqueda en inglés para usar en la API de Pexels.')
});
export type Suggestion = z.infer<typeof SuggestionSchema>;

// Esquema para la salida de sugerencias
export const SuggestionOutputSchema = z.object({
    suggestions: z.array(SuggestionSchema).describe("Una lista de sugerencias de búsqueda."),
});
export type SuggestionOutput = z.infer<typeof SuggestionOutputSchema>;
