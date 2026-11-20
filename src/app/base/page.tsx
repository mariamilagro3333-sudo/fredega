'use client';

import { useState, useMemo } from 'react';
import { 
  useFirestore, 
  useCollection, 
  addDocumentNonBlocking, 
  updateDocumentNonBlocking, 
  deleteDocumentNonBlocking, 
  useMemoFirebase 
} from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus, Trash2, Edit3, MapPin, Package, Home, X, Save, Loader2, ArrowLeft, Smartphone, Watch, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from 'next/link';

interface HomeItem {
  id: string;
  name: string;
  location: string;
}

// Diccionario extendido de términos relacionados para búsqueda inteligente
const RELATED_TERMS: Record<string, string[]> = {
  'mouse': ['ratón', 'raton', 'puntero', 'computador', 'pc', 'periférico'],
  'raton': ['mouse', 'puntero', 'click'],
  'ratón': ['mouse', 'puntero', 'click'],
  'caja': ['cajón', 'cajon', 'gaveta', 'organizador', 'contenedor', 'baúl', 'maleta'],
  'cajon': ['caja', 'gaveta', 'mueble', 'armario'],
  'cajón': ['caja', 'gaveta', 'mueble', 'armario'],
  'gaveta': ['cajón', 'caja', 'escritorio'],
  'celular': ['teléfono', 'telefono', 'móvil', 'movil', 'iphone', 'android', 'smartphone', 'cel'],
  'telefono': ['celular', 'móvil', 'equipo', 'llamada'],
  'llaves': ['llave', 'llavero', 'puerta', 'carro', 'casa', 'candado'],
  'llave': ['llaves', 'llavero', 'herramienta'],
  'control': ['mando', 'remoto', 'televisor', 'tv', 'consola', 'aire'],
  'remoto': ['control', 'mando'],
  'tv': ['televisor', 'pantalla', 'tele', 'monitor'],
  'televisor': ['tv', 'tele', 'pantalla'],
  'audifonos': ['auriculares', 'cascos', 'diadema', 'parlante', 'headphones', 'airpods', 'buds'],
  'herramientas': ['martillo', 'destornillador', 'pinzas', 'taller', 'taladro', 'llave', 'clavo', 'tornillo'],
  'ropa': ['camisa', 'pantalon', 'vestido', 'closet', 'armario', 'prenda', 'zapato', 'media', 'interior'],
  'cocina': ['nevera', 'estufa', 'microondas', 'platos', 'olla', 'cubiertos', 'tenedor', 'cuchara', 'vaso'],
  'baño': ['ducha', 'aseo', 'toalla', 'sanitario', 'jabón', 'shampoo', 'cepillo'],
  'cuarto': ['habitación', 'dormitorio', 'alcoba', 'cama', 'pieza', 'nocheros'],
  'documentos': ['papeles', 'archivo', 'carpeta', 'recibos', 'facturas', 'pasaporte', 'visa', 'identidad'],
  'medicina': ['pastillas', 'remedio', 'botiquín', 'salud', 'droga', 'jarabe', 'aspirina']
};

export default function HomeInventoryPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HomeItem | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '' });

  // Referencia a Firestore
  const itemsRef = useMemo(() => collection(firestore, 'home_items'), [firestore]);
  const itemsQuery = useMemoFirebase(() => query(itemsRef, orderBy('name', 'asc')), [itemsRef]);
  const { data: items, isLoading } = useCollection<HomeItem>(itemsQuery);

  // Filtrado inteligente con expansión de términos
  const filteredItems = useMemo(() => {
    if (!items) return [];
    const term = searchTerm.toLowerCase().trim();
    if (!term) return items;
    
    // Generar lista de términos de búsqueda (el original + sinónimos)
    const expandedSearchTerms = [term];
    
    // Buscar en el diccionario si alguna clave coincide o contiene el término
    Object.keys(RELATED_TERMS).forEach(key => {
      if (key.includes(term) || term.includes(key)) {
        expandedSearchTerms.push(...RELATED_TERMS[key]);
      }
    });

    // Eliminar duplicados para optimizar
    const uniqueSearchTerms = Array.from(new Set(expandedSearchTerms));
    
    return items.filter(item => {
      const itemName = item.name.toLowerCase();
      const itemLocation = item.location.toLowerCase();
      
      // Comprobar si alguno de los términos expandidos coincide con el nombre o ubicación
      return uniqueSearchTerms.some(t => 
        itemName.includes(t) || 
        itemLocation.includes(t)
      );
    });
  }, [items, searchTerm]);

  const handleOpenForm = (item?: HomeItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, location: item.location });
    } else {
      setEditingItem(null);
      setFormData({ name: '', location: '' });
    }
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.location) {
      toast({ variant: 'destructive', title: 'Faltan datos', description: 'Por favor completa todos los campos.' });
      return;
    }

    if (editingItem) {
      const docRef = doc(firestore, 'home_items', editingItem.id);
      updateDocumentNonBlocking(docRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });
      toast({ title: 'Actualizado correctamente' });
    } else {
      addDocumentNonBlocking(itemsRef, {
        ...formData,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Objeto guardado' });
    }

    setIsFormOpen(false);
    setFormData({ name: '', location: '' });
  };

  const handleDelete = (id: string) => {
    const docRef = doc(firestore, 'home_items', id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: 'Objeto eliminado' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20">
      {/* HEADER ADAPTADO PARA MÓVIL */}
      <header className="bg-white border-b border-slate-200 py-4 md:py-6 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:gap-6">
          <div className="w-full flex justify-between items-center md:justify-center md:relative">
             <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2">
                <ArrowLeft className="h-4 w-4 md:h-3 md:w-3" /> <span className="hidden md:inline">Inicio</span>
             </Link>
             <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-slate-950 flex items-center gap-2 md:gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Home className="h-5 w-5 md:h-7 md:w-7 text-primary" />
                </div>
                <span>Busca Todo <span className="text-primary">Express</span></span>
             </h1>
             <div className="w-8 md:hidden" /> {/* Spacer para centrado en móvil */}
          </div>

          <div className="relative w-full max-w-lg group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="¿QUÉ BUSCAS HOY?"
              className="h-14 md:h-16 pl-12 pr-12 rounded-2xl border-2 border-slate-100 bg-slate-50 font-black uppercase text-sm md:text-xs tracking-widest focus-visible:border-primary shadow-inner text-slate-950 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CON PADDING INFERIOR PARA EL FAB */}
      <main className="container mx-auto px-4 py-6 md:py-10 max-w-2xl pb-32">
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="font-black uppercase text-[10px] tracking-[0.3em]">Sincronizando inventario...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item.id} className="rounded-[1.5rem] md:rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all group overflow-hidden active:scale-[0.98]">
                <CardContent className="p-4 md:p-6 flex items-center justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0 border border-slate-100">
                        <Package className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="space-y-0.5 md:space-y-1 min-w-0">
                      <h3 className="font-black uppercase text-xs md:text-sm tracking-tight text-slate-950 truncate group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 truncate">
                        <MapPin className="h-3 w-3 shrink-0" /> {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 md:gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(item)} className="h-10 w-10 md:h-10 md:w-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-primary">
                      <Edit3 className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-10 w-10 md:h-10 md:w-10 rounded-xl hover:bg-red-50 hover:text-red-600 text-slate-400">
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 px-6">
                <div className="p-5 bg-slate-50 rounded-full w-fit mx-auto mb-4">
                  <Search className="h-10 w-10 text-slate-200" />
                </div>
                <p className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400 leading-relaxed">
                  No encontramos nada similar a <br /> <span className="text-slate-900">"{searchTerm}"</span>
                </p>
                {searchTerm && (
                    <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4 text-primary font-black uppercase text-[10px] tracking-widest">
                        Ver todo el inventario
                    </Button>
                )}
            </div>
          )}
        </div>
      </main>

      {/* BOTÓN FLOTANTE (FAB) OPTIMIZADO PARA PULGAR */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-6">
        <Button 
          onClick={() => handleOpenForm()} 
          size="lg" 
          className="h-16 w-full max-w-xs rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black uppercase text-xs tracking-[0.2em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all active:scale-90 border-4 border-white"
        >
          <Plus className="mr-3 h-6 w-6" /> Registrar Nuevo
        </Button>
      </div>

      {/* DIÁLOGO REGISTRO / EDICIÓN ADAPTADO */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-[90vw] md:max-w-sm rounded-[2.5rem] bg-white text-slate-950 border-none p-6 md:p-8">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                {editingItem ? <Edit3 className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-black uppercase tracking-widest text-slate-950">
                  {editingItem ? 'Actualizar Datos' : 'Nuevo Registro'}
              </DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {editingItem ? 'Modifica los detalles del objeto' : 'Mantén tu hogar organizado en un toque'}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-6 text-slate-950">
            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">¿Qué objeto es?</Label>
              <Input 
                placeholder="EJ: LLAVES DE CARRO..." 
                className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-sm md:text-xs text-slate-950 focus-visible:border-primary focus-visible:ring-0"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">¿Dónde está guardado?</Label>
              <Input 
                placeholder="EJ: CAJÓN DE LA COCINA..." 
                className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-sm md:text-xs text-slate-950 focus-visible:border-primary focus-visible:ring-0"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-3">
             <Button onClick={handleSave} className="w-full rounded-2xl h-14 bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">
                <Save className="mr-2 h-5 w-5" /> {editingItem ? 'Guardar Cambios' : 'Registrar Objeto'}
             </Button>
             <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="w-full rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest text-slate-400">
                Cancelar
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="py-20 text-center opacity-20 select-none pointer-events-none">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-950">Sistema de Inventario • 2026</p>
      </footer>
    </div>
  );
}
