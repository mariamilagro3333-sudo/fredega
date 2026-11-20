
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from './product-card';
import { ProductDetailDialog } from './product-detail-dialog';
import type { Product, Entry } from '@/types';
import { allProducts } from '@/lib/all-content';

export function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const results = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return allProducts.filter(product => 
            product.title.toLowerCase().includes(lowerQuery) ||
            product.categories.some(cat => (cat as string).toLowerCase().includes(lowerQuery)) ||
            (product.description && product.description.toLowerCase().includes(lowerQuery))
        );
    }, [query]);

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
    };

    if (!query) {
        return <div className="text-center py-10">Ingresa un término de búsqueda para comenzar.</div>;
    }

    return (
        <div className="space-y-8">
            <p className="text-muted-foreground">
                Se encontraron {results.length} resultados para "{query}"
            </p>
            
            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {results.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onProductClick={handleProductClick} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                    <p className="text-xl text-muted-foreground">No se encontraron resultados para tu búsqueda.</p>
                </div>
            )}

            <ProductDetailDialog 
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onOpenChange={(open) => !open && setSelectedProduct(null)}
                onProductSelect={(prod) => setSelectedProduct(prod as Product)}
            />
        </div>
    );
}
