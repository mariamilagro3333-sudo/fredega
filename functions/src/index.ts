import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

/**
 * Proxy de "Pasarela Total" para archivos HLS (.m3u8 y .ts).
 * Esta función descarga el recurso desde el origen y lo sirve con cabeceras CORS abiertas.
 */
export const hlsProxy = onRequest({ 
  cors: true,
  region: "us-central1",
  memory: "256MiB"
}, async (req, res) => {
  // Habilitar CORS manualmente para mayor compatibilidad
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    res.status(400).send("Falta el parámetro 'url'.");
    return;
  }

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      logger.error(`Error al obtener el recurso (${response.status}): ${targetUrl}`);
      res.status(response.status).send(`Error al obtener el recurso: ${response.statusText}`);
      return;
    }

    // Copiar el tipo de contenido original (crucial para HLS)
    const contentType = response.headers.get("content-type") || "application/vnd.apple.mpegurl";
    res.set("Content-Type", contentType);
    res.set("Cache-Control", "public, max-age=3600");

    // Obtener los datos como buffer para manejar tanto texto (.m3u8) como binario (.ts)
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.send(buffer);
  } catch (error) {
    logger.error("Error fatal en el Proxy HLS:", error);
    res.status(500).send("Error interno del servidor al procesar el proxy de video.");
  }
});
