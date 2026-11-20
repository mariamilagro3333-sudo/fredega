
'use client';

import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { Spinner } from '@/components/ui/spinner';
import { Search } from 'lucide-react';


function SearchPageContent() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="text-center mb-12">
                <Search className="h-12 w-12 mx-auto text-primary" />
                <h1 className="text-3xl font-bold mt-4">Resultados de la Búsqueda</h1>
            </div>
            <SearchResults />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Spinner className="h-10 w-10" />
                    <p>Cargando resultados...</p>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
