
'use server';
/**
 * @fileOverview Flujo para interactuar con la API de Pexels y buscar videos.
 * 
 * - searchPexelsVideos - La función principal que se llama desde el cliente.
 * - getSearchSuggestions - Un flujo que utiliza IA para sugerir mejores términos de búsqueda.
 */

// import { ai } from '@/ai/genkit';
import type { PexelsSearchInput, PexelsSearchOutput, Suggestion } from '@/types/pexels';
import { PexelsSearchInputSchema, PexelsSearchOutputSchema, SuggestionOutputSchema } from '@/types/pexels';
import { z } from 'zod';


// Definición del flujo de Genkit para la búsqueda de videos
// const pexelsSearchFlow = ai.defineFlow(
//   {
//     name: 'pexelsSearchFlow',
//     inputSchema: PexelsSearchInputSchema,
//     outputSchema: PexelsSearchOutputSchema,
//   },
//   async (input) => {
//     const apiKey = process.env.PEXELS_API_KEY;
//     if (!apiKey) {
//       throw new Error('La clave API de Pexels no está configurada en las variables de entorno (PEXELS_API_KEY).');
//     }
    
//     if (!input.query) {
//         throw new Error('La consulta de búsqueda está vacía.');
//     }

//     const url = new URL('https://api.pexels.com/videos/search');
//     url.searchParams.append('query', input.query);
//     url.searchParams.append('orientation', input.orientation);
//     url.searchParams.append('per_page', String(input.per_page));
//     url.searchParams.append('page', String(input.page));

//     try {
//       const response = await fetch(url.toString(), {
//         headers: {
//           'Authorization': apiKey,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Error en la API de Pexels: ${response.statusText} - ${errorData}`);
//       }

//       const data = await response.json();
      
//       let processedVideos: PexelsVideo[] = [];

//       if (input.quality === '4k') {
//         const fourKVideos = data.videos.filter((video: any) => 
//             [...video.video_files].some(file => file.quality === '4k' || (file.width && file.width >= 3840))
//         );

//         processedVideos = fourKVideos.map((video: any) => {
//             const fourKFile = [...video.video_files].find(file => file.quality === '4k' || (file.width && file.width >= 3840));
//             return {
//                 id: video.id,
//                 image: video.image,
//                 photographer: video.user?.name || 'Desconocido',
//                 downloadUrl: fourKFile.link || '',
//                 width: fourKFile.width,
//                 height: fourKFile.height,
//             };
//         });

//       } else { // Calidad HD 1080p Estricta
//         const hdVideos = data.videos.filter((video: any) => 
//             [...video.video_files].some(file => 
//                 (input.orientation === 'landscape' && file.width === 1920) ||
//                 (input.orientation === 'portrait' && file.height === 1920)
//             )
//         );

//         processedVideos = hdVideos.map((video: any) => {
//             const hdFile = [...video.video_files].find(file => 
//                 (input.orientation === 'landscape' && file.width === 1920) ||
//                 (input.orientation === 'portrait' && file.height === 1920)
//             );
//              return {
//                 id: video.id,
//                 image: video.image,
//                 photographer: video.user?.name || 'Desconocido',
//                 downloadUrl: hdFile.link || '',
//                 width: hdFile.width,
//                 height: hdFile.height,
//             };
//         });
//       }


//       return { videos: processedVideos };

//     } catch (error) {
//       console.error('Error al conectar con la API de Pexels:', error);
//       throw new Error('No se pudo establecer la conexión con la API de Pexels.');
//     }
//   }
// );

// Flujo para obtener sugerencias de búsqueda
// const getSearchSuggestionsFlow = ai.defineFlow(
//   {
//     name: 'getSearchSuggestionsFlow',
//     inputSchema: z.object({ query: z.string() }),
//     outputSchema: SuggestionOutputSchema,
//   },
//   async ({ query }) => {
//     const { output } = await ai.generate({
//         prompt: `
//         Eres un asistente de búsqueda experto para un banco de videos (Pexels). Tu tarea es tomar la consulta de un usuario y generar hasta 4 sugerencias de búsqueda inteligentes.

//         Para cada sugerencia, debes proporcionar un objeto con dos campos:
//         1. 'display': El texto en español, corregido y mejorado, para mostrarle al usuario.
//         2. 'query': El término de búsqueda en INGLÉS, optimizado para la API de Pexels.

//         Reglas importantes:
//         - Si la consulta es un lugar, monumento o ciudad famosa, corrige la ortografía y proporciona el nombre en inglés, añadiendo la ciudad o país si es relevante.
//         - Si la consulta es un término general, simplemente tradúcelo al inglés.
//         - Si la consulta es ambigua o no estás seguro, devuelve la consulta original en ambos campos como una de las opciones.
//         - Devuelve siempre un array de objetos, incluso si solo hay una sugerencia.

//         Ejemplos:
//         - Usuario busca: "torre eifel" -> Sugerencias: [{ display: "Torre Eiffel, París", query: "Eiffel Tower, Paris" }]
//         - Usuario busca: "coliceo romano" -> Sugerencias: [{ display: "Coliseo, Roma", query: "Colosseum, Rome" }]
//         - Usuario busca: "calles de colombia" -> Sugerencias: [{ display: "Calles de Bogotá, Colombia", query: "Streets of Bogota, Colombia" }, { display: "Calles coloniales de Cartagena", query: "Cartagena colonial streets" }]
//         - Usuario busca: "perros jugando" -> Sugerencas: [{ display: "Perros jugando", query: "dogs playing" }]
//         - Usuario busca: "Caribe" -> Sugerencias: [{ display: "Mar Caribe", query: "Caribbean Sea" }, { display: "Playas del Caribe", query: "Caribbean beaches" }]

//         Consulta del usuario: "${query}"
//       `,
//       model: 'googleai/gemini-2.5-flash',
//       output: {
//         schema: SuggestionOutputSchema,
//       },
//     });

//     return output || { suggestions: [] };
//   }
// );


// Función exportada que se llamará desde el componente de React
export async function searchPexelsVideos(input: PexelsSearchInput): Promise<PexelsSearchOutput> {
  // return pexelsSearchFlow(input);
  console.error("Genkit is temporarily disabled.");
  return { videos: [] };
}

export async function getSearchSuggestions(query: string): Promise<Suggestion[]> {
    // const result = await getSearchSuggestionsFlow({ query });
    // return result.suggestions;
    console.error("Genkit is temporarily disabled.");
    return [];
}
