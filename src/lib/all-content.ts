
import { products as freeProducts } from './products';
import { exclusiveProducts } from './exclusive-products';
import { exclusiveProducts2 } from './exclusive-products-2';
import { exclusiveProducts3 } from './exclusive-products-3';
import { logo01 } from './logo01';
import { logo02 } from './logo02';
import { cumple01 } from './cumple01';
import { titu01 } from './titu01';
import { sociale01 } from './sociale01';
import { social02 } from './social02';
import { icono01 } from './icono01';
import { infog01 } from './infog01';
import { october15Products } from './october-15-products';
import { halloweenProducts } from './halloween';
import { november19Products } from './19noviembre';
import { november15Products } from './15noviembre';
import { october31stProducts } from './31octubre';
import { navidad2025Products } from './navidad2025';
import { january16Products } from './16enero';
import { february24Products } from './24febrero';
import { corpo1 } from './corpo1';
import { fifteenAnos01 } from './15anos01';
import { maestro } from './maestro';
import { madre } from './madre';
import { bodaDavinci } from './boda-davinci';
import { sociales03 } from './sociales03';
import { diapadre } from './diapadre';
import { packs2026 } from './packs2026';
import { entries } from './entries';
import type { Product, Entry } from '@/types';

/**
 * Catálogo centralizado de todos los productos descargables.
 */
export const allProducts: Product[] = [
    ...packs2026,
    ...freeProducts,
    ...exclusiveProducts,
    ...exclusiveProducts2,
    ...exclusiveProducts3,
    ...logo01,
    ...logo02,
    ...cumple01,
    ...titu01,
    ...sociale01,
    ...infog01,
    ...october15Products,
    ...halloweenProducts,
    ...november19Products,
    ...november15Products,
    ...october31stProducts,
    ...navidad2025Products,
    ...january16Products,
    ...february24Products,
    ...corpo1,
    ...social02,
    ...icono01,
    ...fifteenAnos01,
    ...maestro,
    ...madre,
    ...bodaDavinci,
    ...sociales03,
    ...diapadre
];

/**
 * Función para obtener productos mezclados aleatoriamente, 
 * manteniendo los destacados (Featured) siempre de primero.
 */
export function getSmartShuffledProducts(productList: Product[]) {
  const featured = productList.filter(p => p.isFeatured).sort((a, b) => b.id - a.id);
  const others = productList.filter(p => !p.isFeatured);
  
  // Mezcla aleatoria simple para los no destacados
  const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
  
  return [...featured, ...shuffledOthers];
}

/**
 * Catálogo centralizado de todas las entradas de tutoriales.
 */
export const allEntries: Entry[] = [
    ...entries
];

/**
 * Lista combinada de todo el contenido (productos + tutoriales) 
 * ordenada por ID descendente para obtener lo más reciente primero.
 */
export const allContentOrdered = [...allProducts, ...allEntries].sort((a, b) => b.id - a.id);

/**
 * Obtener los contenidos más recientes.
 * @param count Cantidad de elementos a retornar.
 */
export const getRecentContent = (count: number = 6) => {
    return allContentOrdered.slice(0, count);
};
