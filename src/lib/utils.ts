import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retorna la URL del video a través del proxy de Firebase si es un archivo .m3u8 o de dominios con CORS estricto.
 */
export function getHlsProxyUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.includes('.m3u8') || url.includes('motionarray.com')) {
    const projectID = "studio-4965149336-13332";
    const region = "us-central1";
    const proxyBase = `https://${region}-${projectID}.cloudfunctions.net/hlsProxy`;
    return `${proxyBase}?url=${encodeURIComponent(url)}`;
  }
  return url;
}

/**
 * Limpia los precios y símbolos de moneda de las descripciones
 */
export function cleanDescription(desc?: string) {
    if (!desc) return '';
    return desc
        .replace(/[💸💵💰🤑]?\s*\$\s*[\d.,kKmM\s-]+\s*[💸💵💰🤑]?/g, '')
        .replace(/\d{1,3}([.,]\d{3})+\s*[💸💵💰🤑]/gi, '')
        .replace(/\s\s+/g, ' ')
        .trim();
}

/**
 * Calcula el precio para el cliente final basado en las reglas del usuario
 */
export function calculateCustomerPrice(basePrice: number): number {
  if (basePrice === 0) return 0;
  
  if (basePrice < 10000) {
    return basePrice + 10000;
  } else if (basePrice <= 25000) {
    return basePrice + 15000;
  } else if (basePrice <= 180000) {
    return basePrice + 20000;
  } else if (basePrice <= 250000) {
    return basePrice + 25000;
  } else {
    return basePrice + 35000;
  }
}
