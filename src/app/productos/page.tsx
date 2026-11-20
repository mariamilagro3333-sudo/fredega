
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFirestore, useCollection, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, MapPin, Clock, ShoppingCart, Search, Package, ArrowLeft, Filter, Edit3, Check, X, Calendar as CalendarIcon, AlertCircle, CalendarDays, DollarSign, Wallet, Gem } from 'lucide-react';
import { catalogo1 } from '@/lib/catalogo1';
import { catalogo2 } from '@/lib/catalogo2';
import { catalogo4 } from '@/lib/catalogo4';
import { catalogo5 } from '@/lib/catalogo5';
import { useToast } from '@/hooks/use-toast';
import { format, isSameDay, isSameMonth, isSameYear, isWithinInterval, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import type { CatalogProduct } from '@/types';

type TimeFilter = 'all' | 'year' | 'month' | 'week' | 'day';

interface Installment {
  date: string;
  amount: number;
}

interface SaleItem {
  name: string;
  wholesalePrice: number;
  customerPrice: number;
}

interface WholesaleItem {
  description: string;
  gain: number;
}

interface OrderItem {
  name: string;
  investment: number;
}

export default function BusinessAdminPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('ventas');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [isDebtorsDialogOpen, setIsDebtorsDialogOpen] = useState(false);

  // Firestore References
  const ventasRef = useMemo(() => collection(firestore, 'ventas'), [firestore]);
  const ventasQuery = useMemoFirebase(() => query(ventasRef, orderBy('date', 'desc')), [ventasRef]);
  const { data: ventas } = useCollection(ventasQuery);

  const ventasMayorRef = useMemo(() => collection(firestore, 'ventas_mayor'), [firestore]);
  const ventasMayorQuery = useMemoFirebase(() => query(ventasMayorRef, orderBy('date', 'desc')), [ventasMayorRef]);
  const { data: ventasMayor } = useCollection(ventasMayorQuery);

  const pedidosRef = useMemo(() => collection(firestore, 'pedidos'), [firestore]);
  const pedidosQuery = useMemoFirebase(() => query(pedidosRef, orderBy('deliveryDate', 'asc')), [pedidosRef]);
  const { data: pedidos } = useCollection(pedidosQuery);

  const allCatalogItems = useMemo(() => {
      const physicalItems = [...catalogo5, ...catalogo4, ...catalogo2, ...catalogo1];
      return physicalItems.sort((a, b) => b.id - a.id);
  }, []);

  // Form States
  const [saleForm, setSaleForm] = useState({
    items: [{ name: '', wholesalePrice: 0, customerPrice: 0 }] as SaleItem[],
    clientName: '',
    paymentType: 'contado',
    amountPaid: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    installments: [] as Installment[],
  });

  const [wholesaleForm, setWholesaleForm] = useState({
    items: [{ description: '', gain: 0 }] as WholesaleItem[],
    clientName: '',
    amountPaid: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const [orderForm, setOrderForm] = useState({
    items: [{ name: '', investment: 0 }] as OrderItem[],
    clientName: '',
    location: '',
    deliveryDate: '',
    paymentMethod: 'efectivo',
  });

  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);

  // Editing States
  const [editingPedido, setEditingPedido] = useState<any>(null);
  const [editingVenta, setEditingVenta] = useState<any>(null);
  const [editingVentaMayor, setEditingVentaMayor] = useState<any>(null);

  const currentSearchTerm = useMemo(() => {
    if (activeSearchIndex === null) return '';
    if (activeTab === 'ventas') return saleForm.items[activeSearchIndex]?.name || '';
    if (activeTab === 'pedidos') return orderForm.items[activeSearchIndex]?.name || '';
    return '';
  }, [activeSearchIndex, saleForm, orderForm, activeTab]);

  const filteredItems = useMemo(() => {
    if (!currentSearchTerm || currentSearchTerm.length < 2) return [];
    return allCatalogItems.filter(item => 
      item.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
    ).slice(0, 8);
  }, [currentSearchTerm, allCatalogItems]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfLast7Days = subDays(now, 7);

    // Helper to check if date matches filter
    const matchesFilter = (dateStr: string) => {
        const d = new Date(dateStr);
        switch (timeFilter) {
            case 'day': return isSameDay(d, now);
            case 'week': return isWithinInterval(d, { start: startOfLast7Days, end: now });
            case 'month': return isSameMonth(d, now) && isSameYear(d, now);
            case 'year': return isSameYear(d, now);
            default: return true;
        }
    };

    const retailStats = (ventas || []).filter(v => v.date && matchesFilter(v.date)).reduce((acc, sale) => {
      const customerPrice = sale.customerPrice || 0;
      const wholesalePrice = sale.wholesalePrice || 0;
      const amountPaid = sale.amountPaid || 0;
      const totalProfit = customerPrice - wholesalePrice;
      const collectedProfit = Math.max(0, amountPaid - wholesalePrice);
      const pendingProfit = totalProfit - collectedProfit;

      acc.totalSales += customerPrice;
      acc.netProfit += collectedProfit;
      acc.pendingProfit += pendingProfit;
      acc.totalDebt += (customerPrice - amountPaid);
      return acc;
    }, { totalSales: 0, netProfit: 0, pendingProfit: 0, totalDebt: 0 });

    const wholesaleStats = (ventasMayor || []).filter(v => v.date && matchesFilter(v.date)).reduce((acc, sale) => {
        const totalGain = sale.totalGain || 0;
        const amountPaid = sale.amountPaid || 0;
        const pendingGain = totalGain - amountPaid;

        acc.totalSales += totalGain; // En mayor la venta es la ganancia reportada
        acc.netProfit += amountPaid;
        acc.pendingProfit += pendingGain;
        acc.totalDebt += pendingGain;
        return acc;
    }, { totalSales: 0, netProfit: 0, pendingProfit: 0, totalDebt: 0 });

    return {
        totalSales: retailStats.totalSales + wholesaleStats.totalSales,
        netProfit: retailStats.netProfit + wholesaleStats.netProfit,
        pendingProfit: retailStats.pendingProfit + wholesaleStats.pendingProfit,
        totalDebt: retailStats.totalDebt + wholesaleStats.totalDebt
    };
  }, [ventas, ventasMayor, timeFilter]);

  const debtorsList = useMemo(() => {
    const retailDebtors = (ventas || []).filter(v => (v.customerPrice - (v.amountPaid || 0)) > 0).map(v => ({...v, type: 'Detal'}));
    const wholesaleDebtors = (ventasMayor || []).filter(v => (v.totalGain - (v.amountPaid || 0)) > 0).map(v => ({...v, type: 'Mayor', customerPrice: v.totalGain}));
    return [...retailDebtors, ...wholesaleDebtors];
  }, [ventas, ventasMayor]);

  // Formatting Helper
  const formatValue = (num: number) => {
    if (num === 0) return '';
    return num.toLocaleString('es-CO');
  };

  const parseValue = (val: string) => {
    return val.replace(/\D/g, '');
  };

  // Unified Product Selection Logic
  const handleSelectProduct = (index: number, product: CatalogProduct, type: 'ventas' | 'pedidos') => {
      if (type === 'ventas') {
          const newItems = [...saleForm.items];
          newItems[index] = {
              ...newItems[index],
              name: product.title,
              wholesalePrice: product.price,
          };
          setSaleForm(prev => ({ ...prev, items: newItems }));
      } else {
          const newItems = [...orderForm.items];
          newItems[index] = {
              ...newItems[index],
              name: product.title,
              investment: product.price,
          };
          setOrderForm(prev => ({ ...prev, items: newItems }));
      }
      setActiveSearchIndex(null);
  };

  // Sale Handlers
  const handleAddSaleItem = () => {
    setSaleForm(prev => ({ ...prev, items: [...prev.items, { name: '', wholesalePrice: 0, customerPrice: 0 }] }));
  };

  const handleRemoveSaleItem = (index: number) => {
    setSaleForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleSaleItemChange = (index: number, field: keyof SaleItem, value: any) => {
    const newItems = [...saleForm.items];
    const rawValue = (field === 'wholesalePrice' || field === 'customerPrice') ? (value === '' ? 0 : Number(parseValue(value))) : value;
    newItems[index] = { 
        ...newItems[index], 
        [field]: rawValue
    };
    setSaleForm(prev => ({ ...prev, items: newItems }));
  };

  const handleAddSale = () => {
    const totalWholesale = saleForm.items.reduce((acc, item) => acc + item.wholesalePrice, 0);
    const totalCustomer = saleForm.items.reduce((acc, item) => acc + item.customerPrice, 0);
    const joinedNames = saleForm.items.map(i => i.name).filter(Boolean).join(', ');

    if (!joinedNames || !saleForm.clientName || !saleForm.date) {
      toast({ variant: 'destructive', title: 'Faltan datos obligatorios' });
      return;
    }

    const profit = totalCustomer - totalWholesale;
    const debt = saleForm.paymentType === 'cuotas' ? totalCustomer - saleForm.amountPaid : 0;

    const newSale = {
      productName: joinedNames,
      clientName: saleForm.clientName,
      paymentType: saleForm.paymentType,
      wholesalePrice: totalWholesale,
      customerPrice: totalCustomer,
      profit: profit,
      amountPaid: saleForm.paymentType === 'contado' ? totalCustomer : Number(saleForm.amountPaid),
      debt: debt,
      date: new Date(saleForm.date + 'T12:00:00').toISOString(),
      installments: saleForm.paymentType === 'cuotas' ? saleForm.installments : [],
      items: saleForm.items
    };

    addDocumentNonBlocking(ventasRef, newSale);
    setSaleForm({ 
      items: [{ name: '', wholesalePrice: 0, customerPrice: 0 }], 
      clientName: '', 
      paymentType: 'contado', 
      amountPaid: 0, 
      date: format(new Date(), 'yyyy-MM-dd'),
      installments: [],
    });
    toast({ title: 'Venta registrada con éxito' });
  };

  // Wholesale Handlers
  const handleAddWholesaleItem = () => {
      setWholesaleForm(prev => ({ ...prev, items: [...prev.items, { description: '', gain: 0 }] }));
  };

  const handleRemoveWholesaleItem = (index: number) => {
      setWholesaleForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleWholesaleItemChange = (index: number, field: keyof WholesaleItem, value: any) => {
      const newItems = [...wholesaleForm.items];
      newItems[index] = { 
          ...newItems[index], 
          [field]: field === 'gain' ? (value === '' ? 0 : Number(parseValue(value))) : value 
      };
      setWholesaleForm(prev => ({ ...prev, items: newItems }));
  };

  const handleAddWholesale = () => {
      const totalGain = wholesaleForm.items.reduce((acc, i) => acc + i.gain, 0);
      const joinedDesc = wholesaleForm.items.map(i => i.description).filter(Boolean).join(', ');

      if (!joinedDesc || !wholesaleForm.clientName) {
          toast({ variant: 'destructive', title: 'Faltan datos obligatorios' });
          return;
      }

      const newWholesale = {
          clientName: wholesaleForm.clientName,
          date: new Date(wholesaleForm.date + 'T12:00:00').toISOString(),
          totalGain,
          amountPaid: Number(wholesaleForm.amountPaid),
          debt: totalGain - Number(wholesaleForm.amountPaid),
          items: wholesaleForm.items,
          productName: joinedDesc // Para consistencia en historial
      };

      addDocumentNonBlocking(ventasMayorRef, newWholesale);
      setWholesaleForm({
          items: [{ description: '', gain: 0 }],
          clientName: '',
          amountPaid: 0,
          date: format(new Date(), 'yyyy-MM-dd'),
      });
      toast({ title: 'Venta al mayor registrada' });
  };

  // Order Handlers
  const handleAddOrderItem = () => {
      setOrderForm(prev => ({ ...prev, items: [...prev.items, { name: '', investment: 0 }] }));
  };

  const handleRemoveOrderItem = (index: number) => {
      setOrderForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleAddOrder = () => {
    const joinedNames = orderForm.items.map(i => i.name).filter(Boolean).join(', ');
    const totalInvestment = orderForm.items.reduce((acc, item) => acc + item.investment, 0);

    if (!joinedNames || !orderForm.clientName || !orderForm.deliveryDate) {
      toast({ variant: 'destructive', title: 'Faltan datos obligatorios' });
      return;
    }

    const newOrder = {
      productName: joinedNames,
      clientName: orderForm.clientName,
      location: orderForm.location,
      deliveryDate: orderForm.deliveryDate,
      investmentRequired: totalInvestment,
      paymentMethod: orderForm.paymentMethod,
      status: 'pendiente',
      items: orderForm.items
    };

    addDocumentNonBlocking(pedidosRef, newOrder);
    setOrderForm({ 
        items: [{ name: '', investment: 0 }], 
        clientName: '', 
        location: '', 
        deliveryDate: '', 
        paymentMethod: 'efectivo' 
    });
    toast({ title: 'Pedido guardado' });
  };

  const handleUpdatePedido = () => {
      if (!editingPedido) return;
      const docRef = doc(firestore, 'pedidos', editingPedido.id);
      const { id, ...updateData } = editingPedido;
      updateDocumentNonBlocking(docRef, updateData);
      setEditingPedido(null);
      toast({ title: 'Pedido actualizado' });
  };

  const handleUpdateVenta = () => {
    if (!editingVenta) return;
    const docRef = doc(firestore, 'ventas', editingVenta.id);
    const profit = Number(editingVenta.customerPrice) - Number(editingVenta.wholesalePrice);
    const debt = editingVenta.paymentType === 'cuotas' ? Number(editingVenta.customerPrice) - Number(editingVenta.amountPaid) : 0;
    const { id, ...updateData } = editingVenta;
    const finalData = {
        ...updateData,
        profit,
        debt,
        wholesalePrice: Number(editingVenta.wholesalePrice),
        customerPrice: Number(editingVenta.customerPrice),
        amountPaid: editingVenta.paymentType === 'contado' ? Number(editingVenta.customerPrice) : Number(editingVenta.amountPaid),
    };
    updateDocumentNonBlocking(docRef, finalData);
    setEditingVenta(null);
    toast({ title: 'Venta actualizada' });
  };

  const handleUpdateVentaMayor = () => {
      if (!editingVentaMayor) return;
      const docRef = doc(firestore, 'ventas_mayor', editingVentaMayor.id);
      const totalGain = editingVentaMayor.items?.reduce((acc: number, i: any) => acc + Number(i.gain), 0) || Number(editingVentaMayor.totalGain);
      const debt = totalGain - Number(editingVentaMayor.amountPaid);
      const { id, ...updateData } = editingVentaMayor;
      updateDocumentNonBlocking(docRef, { ...updateData, totalGain, debt, amountPaid: Number(editingVentaMayor.amountPaid) });
      setEditingVentaMayor(null);
      toast({ title: 'Venta al mayor actualizada' });
  };

  const handleAddInstallment = () => {
      setSaleForm(prev => ({ ...prev, installments: [...prev.installments, { date: '', amount: 0 }] }));
  };

  const handleRemoveInstallment = (index: number) => {
      setSaleForm(prev => ({ ...prev, installments: prev.installments.filter((_, i) => i !== index) }));
  };

  const handleInstallmentChange = (index: number, field: keyof Installment, value: any) => {
      const newInstallments = [...saleForm.installments];
      newInstallments[index] = { 
        ...newInstallments[index], 
        [field]: field === 'amount' ? (value === '' ? 0 : Number(parseValue(value))) : value 
      };
      setSaleForm(prev => ({ ...prev, installments: newInstallments }));
  };

  const handleOrderItemChange = (index: number, field: keyof OrderItem, value: any) => {
      const newItems = [...orderForm.items];
      newItems[index] = { 
          ...newItems[index], 
          [field]: field === 'investment' ? (value === '' ? 0 : Number(parseValue(value))) : value 
      };
      setOrderForm(prev => ({ ...prev, items: newItems }));
  };

  const handleDelete = (collectionName: string, id: string) => {
    const docRef = doc(firestore, collectionName, id);
    deleteDocumentNonBlocking(docRef);
    toast({ title: 'Registro eliminado' });
  };

  const getTimeFilterLabel = () => {
      switch (timeFilter) {
          case 'day': return 'Hoy';
          case 'week': return 'Última Semana';
          case 'month': return 'Este Mes';
          case 'year': return 'Este Año';
          default: return 'Todo el tiempo';
      }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="container mx-auto px-4 py-8 border-b-2 border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-950">
          <div className="space-y-1 text-center md:text-left">
              <Link href="/catalogo" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors mb-2">
                  <ArrowLeft className="h-3 w-3" /> Volver al catálogo
              </Link>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-950">
                  SISTEMA <br/><span className="text-primary">EXPRESS</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">FREDEGA & LEI</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select value={timeFilter} onValueChange={(v: any) => setTimeFilter(v)}>
                    <SelectTrigger className="w-40 h-9 rounded-full border-2 border-slate-100 font-black uppercase text-[9px] tracking-widest text-slate-950 bg-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-950">
                        <SelectItem value="all" className="text-[9px] font-black uppercase">Histórico</SelectItem>
                        <SelectItem value="year" className="text-[9px] font-black uppercase">Este Año</SelectItem>
                        <SelectItem value="month" className="text-[9px] font-black uppercase">Este Mes</SelectItem>
                        <SelectItem value="week" className="text-[9px] font-black uppercase">Esta Semana</SelectItem>
                        <SelectItem value="day" className="text-[9px] font-black uppercase">Hoy</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                  <Card className="bg-slate-50 border-none shadow-sm px-6 py-3 rounded-3xl flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Volumen {getTimeFilterLabel()}</span>
                      <span className="text-lg font-black text-slate-950">${stats.totalSales.toLocaleString('es-CO')}</span>
                  </Card>
                  <Card className="bg-emerald-50 border-none shadow-sm px-6 py-3 rounded-3xl flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 mb-1">Ganancia Realizada</span>
                      <span className="text-lg font-black text-emerald-600">${stats.netProfit.toLocaleString('es-CO')}</span>
                  </Card>
                  <Card className="bg-amber-50 border-none shadow-sm px-6 py-3 rounded-3xl flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-600 mb-1">Ganancia por Cobrar</span>
                      <span className="text-lg font-black text-amber-600">${stats.pendingProfit.toLocaleString('es-CO')}</span>
                  </Card>
                  <Card 
                    className="bg-red-50 border-none shadow-sm px-6 py-3 rounded-3xl flex flex-col items-center cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => setIsDebtorsDialogOpen(true)}
                  >
                      <span className="text-[8px] font-black uppercase tracking-widest text-red-600 mb-1">Saldo Deudor (Tocar)</span>
                      <span className="text-lg font-black text-red-600">${stats.totalDebt.toLocaleString('es-CO')}</span>
                  </Card>
              </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-10 overflow-x-auto pb-2">
              <TabsList className="bg-slate-100 p-1 rounded-full h-auto flex-nowrap">
                  <TabsTrigger value="ventas" className="rounded-full px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-slate-950 data-[state=active]:text-white">Ventas Detal</TabsTrigger>
                  <TabsTrigger value="mayor" className="rounded-full px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-slate-950 data-[state=active]:text-white">Ventas Mayor</TabsTrigger>
                  <TabsTrigger value="pedidos" className="rounded-full px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-slate-950 data-[state=active]:text-white">Pedidos Hoy</TabsTrigger>
              </TabsList>
          </div>

          <TabsContent value="ventas" className="space-y-10 animate-in fade-in duration-500">
            <Card className="rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden bg-white text-slate-950">
              <CardHeader className="bg-slate-50 border-b-2 border-slate-100 p-8">
                <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-slate-950">
                  <Plus className="h-6 w-6 text-primary" /> Nueva Venta Detal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lista de Artículos</Label>
                        <Button type="button" variant="outline" size="sm" onClick={handleAddSaleItem} className="h-8 rounded-full text-[9px] font-black border-slate-200 text-slate-950 bg-white hover:bg-slate-100">
                            <Plus className="h-3 w-3 mr-1" /> Añadir Artículo
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {saleForm.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 items-end relative">
                                <div className="md:col-span-2 space-y-2 relative">
                                    <Label className="text-[9px] font-black uppercase text-slate-400">Producto {index + 1}</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-300 z-10" />
                                        <Textarea 
                                            placeholder="BUSCAR..." 
                                            className="min-h-[4.5rem] pl-10 rounded-xl border-2 bg-white text-slate-950 font-bold uppercase text-xs resize-none py-2"
                                            value={item.name}
                                            onFocus={() => setActiveSearchIndex(index)}
                                            onChange={e => handleSaleItemChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    {activeSearchIndex === index && filteredItems.length > 0 && (
                                        <div className="absolute z-[100] w-full bg-white border-2 border-slate-100 rounded-xl shadow-2xl mt-1 overflow-hidden">
                                            {filteredItems.map(catalogItem => (
                                                <button 
                                                    key={catalogItem.id} 
                                                    type="button"
                                                    className="w-full text-left px-4 py-3 text-[10px] font-black uppercase text-slate-950 hover:bg-primary hover:text-white border-b last:border-0"
                                                    onClick={() => handleSelectProduct(index, catalogItem, 'ventas')}
                                                >
                                                    <span className="font-black whitespace-normal leading-tight">{catalogItem.title}</span>
                                                    <span className="ml-2 text-primary font-bold shrink-0"> - ${catalogItem.price.toLocaleString('es-CO')}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400">Precio Mayor ($)</Label>
                                    <Input 
                                        type="text" 
                                        className="h-12 rounded-xl border-2 bg-white text-slate-950 font-black text-xs"
                                        value={formatValue(item.wholesalePrice)}
                                        onChange={e => handleSaleItemChange(index, 'wholesalePrice', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2 relative pr-10">
                                    <Label className="text-[9px] font-black uppercase text-slate-400">Precio Venta ($)</Label>
                                    <Input 
                                        type="text" 
                                        className="h-12 rounded-xl border-2 bg-white text-slate-950 font-black text-xs"
                                        value={formatValue(item.customerPrice)}
                                        onChange={e => handleSaleItemChange(index, 'customerPrice', e.target.value)}
                                    />
                                    {saleForm.items.length > 1 && (
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveSaleItem(index)} className="absolute right-0 bottom-1 text-red-400 hover:text-red-600 bg-white">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t-2 border-slate-50">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cliente</Label>
                    <Input 
                      placeholder="NOMBRE DEL CLIENTE..." 
                      className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-xs text-slate-950"
                      value={saleForm.clientName} 
                      onChange={e => setSaleForm({...saleForm, clientName: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha</Label>
                    <Input 
                      type="date" 
                      className="h-14 rounded-2xl border-2 bg-slate-50 font-black text-sm text-slate-950"
                      value={saleForm.date}
                      onChange={e => setSaleForm({...saleForm, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Método de Pago</Label>
                    <select 
                        className="w-full h-14 px-5 bg-slate-50 border-2 rounded-2xl font-black uppercase text-[10px] tracking-widest appearance-none outline-none focus:border-primary text-slate-950"
                        value={saleForm.paymentType}
                        onChange={e => setSaleForm({...saleForm, paymentType: e.target.value})}
                    >
                        <option value="contado">Contado</option>
                        <option value="cuotas">A Cuotas</option>
                    </select>
                  </div>
                  {saleForm.paymentType === 'cuotas' && (
                      <div className="space-y-3 animate-in zoom-in-95">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">¿Cuánto pagó hoy? ($)</Label>
                          <Input 
                              type="text" 
                              className="h-14 rounded-2xl border-2 border-emerald-100 bg-emerald-50 font-black text-sm text-emerald-700"
                              value={formatValue(saleForm.amountPaid)} 
                              onChange={e => setSaleForm({...saleForm, amountPaid: e.target.value === '' ? 0 : Number(parseValue(e.target.value))})} 
                          />
                      </div>
                  )}
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-950 rounded-[2rem] text-white">
                    <div className="flex gap-8">
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-1">Total Mayor</p>
                            <p className="text-xl font-black">${saleForm.items.reduce((acc, i) => acc + i.wholesalePrice, 0).toLocaleString('es-CO')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-1">Total Venta</p>
                            <p className="text-xl font-black text-primary">${saleForm.items.reduce((acc, i) => acc + i.customerPrice, 0).toLocaleString('es-CO')}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={handleAddSale} 
                        size="lg"
                        className="w-full md:w-auto h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase px-12 tracking-widest text-xs"
                    >
                        <Check className="mr-2 h-5 w-5" /> Registrar Venta Detal
                    </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden">
              <div className="p-8 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase tracking-widest text-slate-950">Historial Detal</h3>
              </div>
              <div className="overflow-x-auto">
                  <Table>
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="px-8 font-black text-[9px] uppercase tracking-widest text-slate-400">Fecha</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400">Artículos / Cliente</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400">Pagos</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-950">Ganancia</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 text-right pr-8">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {ventas?.map((v) => (
                        <TableRow key={v.id} className="hover:bg-slate-50/50 border-b">
                            <TableCell className="px-8 text-[10px] font-bold text-slate-400">{format(new Date(v.date), 'dd/MM/yy')}</TableCell>
                            <TableCell>
                                <div className="flex flex-col py-2">
                                    <span className="font-black text-xs uppercase whitespace-normal leading-tight">{v.productName}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{v.clientName}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1 text-[10px] font-bold">
                                    <span className="text-slate-400">Costo: ${v.wholesalePrice.toLocaleString('es-CO')}</span>
                                    <span className="text-emerald-600">Cobrado: ${(v.amountPaid || 0).toLocaleString('es-CO')}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-emerald-600">${v.profit.toLocaleString('es-CO')}</span>
                                    {v.debt > 0 && <Badge variant="outline" className="mt-1 border-red-200 bg-red-50 text-red-700 text-[8px] font-black uppercase px-1">DEBE ${v.debt.toLocaleString('es-CO')}</Badge>}
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingVenta(v)} className="hover:bg-slate-100 rounded-full bg-white"><Edit3 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete('ventas', v.id)} className="hover:bg-red-50 hover:text-red-500 rounded-full bg-white"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </TableCell>
                        </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mayor" className="space-y-10 animate-in fade-in duration-500">
            <Card className="rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden bg-white text-slate-950">
              <CardHeader className="bg-slate-50 border-b-2 border-slate-100 p-8">
                <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-slate-950">
                  <Gem className="h-6 w-6 text-amber-500" /> Venta al Mayor (Ganancia Directa)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detalle de Ganancias Extras</Label>
                        <Button type="button" variant="outline" size="sm" onClick={handleAddWholesaleItem} className="h-8 rounded-full text-[9px] font-black border-slate-200 text-slate-950 bg-white hover:bg-slate-100">
                            <Plus className="h-3 w-3 mr-1" /> Añadir Cuenta
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {wholesaleForm.items.map((item, index) => (
                            <div key={index} className="flex items-end gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 relative">
                                <div className="flex-grow space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400">Descripción de la cuenta {index + 1}</Label>
                                    <Textarea 
                                        placeholder="EJ: VENTA LOTE AUDIFONOS..." 
                                        className="min-h-[4rem] rounded-xl border-2 bg-white text-slate-950 font-bold uppercase text-xs py-2"
                                        value={item.description}
                                        onChange={e => handleWholesaleItemChange(index, 'description', e.target.value)}
                                    />
                                </div>
                                <div className="w-40 space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400">Ganancia ($)</Label>
                                    <Input 
                                        type="text" 
                                        className="h-12 rounded-xl border-2 bg-white text-slate-950 font-black text-xs"
                                        value={formatValue(item.gain)}
                                        onChange={e => handleWholesaleItemChange(index, 'gain', e.target.value)}
                                    />
                                </div>
                                {wholesaleForm.items.length > 1 && (
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveWholesaleItem(index)} className="text-red-400 hover:text-red-600 bg-white h-12 w-12 rounded-xl">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t-2 border-slate-50">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Socio / Cliente Mayor</Label>
                    <Input 
                      placeholder="NOMBRE DE LA PERSONA..." 
                      className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-xs text-slate-950"
                      value={wholesaleForm.clientName} 
                      onChange={e => setWholesaleForm({...wholesaleForm, clientName: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha</Label>
                    <Input 
                      type="date" 
                      className="h-14 rounded-2xl border-2 bg-slate-50 font-black text-sm text-slate-950"
                      value={wholesaleForm.date}
                      onChange={e => setWholesaleForm({...wholesaleForm, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monto Cobrado ($)</Label>
                    <Input 
                      type="text" 
                      className="h-14 rounded-2xl border-2 border-emerald-100 bg-emerald-50 font-black text-sm text-emerald-700"
                      value={formatValue(wholesaleForm.amountPaid)} 
                      onChange={e => setWholesaleForm({...wholesaleForm, amountPaid: e.target.value === '' ? 0 : Number(parseValue(e.target.value))})} 
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-amber-600 rounded-[2rem] text-white">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Total Ganancias Esperadas</p>
                        <p className="text-3xl font-black">${wholesaleForm.items.reduce((acc, i) => acc + i.gain, 0).toLocaleString('es-CO')}</p>
                    </div>
                    <Button 
                        onClick={handleAddWholesale} 
                        size="lg"
                        className="w-full md:w-auto h-14 rounded-xl bg-white text-amber-700 hover:bg-slate-100 font-black uppercase px-12 tracking-widest text-xs"
                    >
                        <Check className="mr-2 h-5 w-5" /> Registrar Venta al Mayor
                    </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden">
              <div className="p-8 bg-slate-50 border-b-2 border-slate-100">
                  <h3 className="text-xl font-black uppercase tracking-widest text-slate-950">Historial de Ganancias Mayor</h3>
              </div>
              <div className="overflow-x-auto">
                  <Table>
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b-2">
                            <TableHead className="px-8 font-black text-[9px] uppercase tracking-widest text-slate-400">Fecha</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400">Socio / Conceptos</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-950">Ganancia Total</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400">Estado Pago</TableHead>
                            <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 text-right pr-8">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {ventasMayor?.map((vm) => (
                        <TableRow key={vm.id} className="hover:bg-slate-50/50 border-b">
                            <TableCell className="px-8 text-[10px] font-bold text-slate-400">{format(new Date(vm.date), 'dd/MM/yy')}</TableCell>
                            <TableCell>
                                <div className="flex flex-col py-2">
                                    <span className="font-black text-xs uppercase text-slate-900">{vm.clientName}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter whitespace-normal leading-tight">{vm.productName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-black text-amber-600">${vm.totalGain.toLocaleString('es-CO')}</TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-emerald-600">Cobrado: ${vm.amountPaid.toLocaleString('es-CO')}</span>
                                    {vm.debt > 0 && <span className="text-[10px] font-bold text-red-500">Debe: ${vm.debt.toLocaleString('es-CO')}</span>}
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingVentaMayor(vm)} className="hover:bg-slate-100 rounded-full bg-white"><Edit3 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete('ventas_mayor', vm.id)} className="hover:bg-red-50 hover:text-red-500 rounded-full bg-white"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </TableCell>
                        </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pedidos" className="space-y-10 animate-in fade-in duration-500">
            <Card className="rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden bg-white text-slate-950">
              <CardHeader className="bg-slate-50 border-b-2 border-slate-100 p-8">
                <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-slate-950">
                  <Clock className="h-6 w-6 text-primary" /> Anotar Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                      <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Artículos del Pedido</Label>
                          <Button type="button" variant="outline" size="sm" onClick={handleAddOrderItem} className="h-8 rounded-full text-[9px] font-black border-slate-200 text-slate-950 bg-white hover:bg-slate-100">
                              <Plus className="h-3 w-3 mr-1" /> Añadir
                          </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                          {orderForm.items.map((item, index) => (
                              <div key={index} className="flex items-end gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                                  <div className="flex-grow space-y-2 relative">
                                      <Label className="text-[8px] font-black uppercase text-slate-400">Producto {index + 1}</Label>
                                      <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-300 z-10" />
                                        <Textarea 
                                            placeholder="BUSCAR..." 
                                            className="min-h-[4.5rem] pl-10 rounded-xl border-2 bg-white text-slate-950 font-bold uppercase text-xs resize-none py-2"
                                            value={item.name}
                                            onFocus={() => setActiveSearchIndex(index)}
                                            onChange={e => handleOrderItemChange(index, 'name', e.target.value)}
                                        />
                                      </div>
                                      {activeSearchIndex === index && filteredItems.length > 0 && (
                                        <div className="absolute z-[100] w-full bg-white border rounded-lg shadow-xl mt-1 overflow-hidden">
                                            {filteredItems.map(catalogItem => (
                                                <button 
                                                    key={catalogItem.id} 
                                                    type="button"
                                                    className="w-full text-left px-3 py-2 text-[9px] font-black uppercase text-slate-950 hover:bg-primary hover:text-white"
                                                    onClick={() => handleSelectProduct(index, catalogItem, 'pedidos')}
                                                >
                                                    <span className="whitespace-normal leading-tight">{catalogItem.title}</span>
                                                    <span className="ml-2 text-primary font-bold shrink-0"> - ${catalogItem.price.toLocaleString('es-CO')}</span>
                                                </button>
                                            ))}
                                        </div>
                                      )}
                                  </div>
                                  <div className="space-y-2 w-32">
                                      <Label className="text-[8px] font-black uppercase text-slate-400">Inversión ($)</Label>
                                      <Input 
                                          type="text" 
                                          className="h-10 rounded-lg border bg-white text-slate-950 font-black text-xs"
                                          value={formatValue(item.investment)}
                                          onChange={e => handleOrderItemChange(index, 'investment', e.target.value)}
                                      />
                                  </div>
                                  {orderForm.items.length > 1 && (
                                      <Button variant="ghost" size="icon" onClick={() => handleRemoveOrderItem(index)} className="h-10 w-10 text-red-400 hover:text-red-600 bg-white">
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cliente</Label>
                          <Input placeholder="NOMBRE..." className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-xs text-slate-950" value={orderForm.clientName} onChange={e => setOrderForm({...orderForm, clientName: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lugar de Entrega</Label>
                          <Input placeholder="DIRECCIÓN..." className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-xs text-slate-950" value={orderForm.location} onChange={e => setOrderForm({...orderForm, location: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">¿Para cuándo?</Label>
                          <Input placeholder="EJ: MAÑANA 3PM..." className="h-14 rounded-2xl border-2 bg-slate-50 font-bold uppercase text-xs text-slate-950" value={orderForm.deliveryDate} onChange={e => setOrderForm({...orderForm, deliveryDate: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Método de Pago</Label>
                          <select 
                            className="w-full h-14 px-5 bg-slate-50 border-2 rounded-2xl font-black uppercase text-[10px] tracking-widest appearance-none outline-none focus:border-primary text-slate-950"
                            value={orderForm.paymentMethod}
                            onChange={e => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                          >
                              <option value="efectivo">Efectivo</option>
                              <option value="nequi">Nequi</option>
                              <option value="daviplata">Daviplata</option>
                              <option value="transferencia">Transferencia</option>
                              <option value="otro">Otro</option>
                          </select>
                      </div>
                  </div>

                  <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between">
                      <div>
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Inversión Total Estimada</p>
                          <p className="text-2xl font-black text-slate-950">${orderForm.items.reduce((acc, i) => acc + i.investment, 0).toLocaleString('es-CO')}</p>
                      </div>
                      <Button 
                          onClick={handleAddOrder} 
                          size="lg"
                          className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black uppercase px-12 tracking-widest text-xs shadow-xl"
                      >
                          <ShoppingCart className="mr-2 h-5 w-5" /> Confirmar Pedido
                      </Button>
                  </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidos?.map(p => (
                  <Card key={p.id} className="rounded-[2rem] border-2 border-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden group relative bg-white text-slate-950">
                      <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <div className="space-y-1">
                                  <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary text-primary px-2 mb-2">PENDIENTE</Badge>
                                  <h4 className="text-lg font-black uppercase tracking-tighter text-slate-900 group-hover:text-primary transition-colors whitespace-normal">{p.productName}</h4>
                              </div>
                              <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" onClick={() => setEditingPedido(p)} className="rounded-full hover:bg-slate-100 hover:text-slate-950 text-slate-950 bg-white">
                                      <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDelete('pedidos', p.id)} className="rounded-full hover:bg-red-50 hover:text-red-500 text-slate-950 bg-white">
                                      <Trash2 className="h-4 w-4" />
                                  </Button>
                              </div>
                          </div>
                          <div className="grid grid-cols-1 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              <p className="flex items-center gap-2"><Search className="h-3 w-3" /> {p.clientName}</p>
                              <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {p.location}</p>
                              <p className="flex items-center gap-2"><Clock className="h-3 w-3" /> {p.deliveryDate}</p>
                              <p className="flex items-center gap-2"><Wallet className="h-3 w-3" /> <span className="uppercase">{p.paymentMethod}</span></p>
                              <div className="mt-2 pt-2 border-t flex justify-between items-center text-slate-900">
                                  <span>Inversión Total:</span>
                                  <span className="text-sm font-black text-primary">${(p.investmentRequired || 0).toLocaleString('es-CO')}</span>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Debtors List Dialog */}
      <Dialog open={isDebtorsDialogOpen} onOpenChange={setIsDebtorsDialogOpen}>
        <DialogContent className="max-w-3xl rounded-3xl bg-white text-slate-950 max-h-[80vh] overflow-y-auto border-none">
            <DialogHeader>
                <DialogTitle className="text-xl font-black uppercase flex items-center gap-2 text-slate-950">
                    <CalendarDays className="h-6 w-6 text-red-500" /> Cuentas por Cobrar (Global)
                </DialogTitle>
                <DialogDescription className="text-xs uppercase font-bold text-slate-400">Todos los clientes con saldos pendientes</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {debtorsList.map((v) => (
                    <Card key={v.id} className="rounded-2xl border-2 border-slate-100 overflow-hidden bg-white text-slate-950">
                        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex-grow">
                                <div className='flex items-center gap-2 mb-1'>
                                    <Badge className={cn("text-[8px] font-black uppercase", v.type === 'Mayor' ? "bg-amber-500" : "bg-primary")}>{v.type}</Badge>
                                    <p className="text-sm font-black uppercase text-slate-900">{v.clientName}</p>
                                </div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-3 whitespace-normal">{v.productName}</p>
                                {v.installments?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {v.installments.map((inst: any, i: number) => (
                                            <div key={i} className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl text-[9px] font-bold text-slate-600">
                                                {format(new Date(inst.date + 'T12:00:00'), 'dd LLL')}: <span className="text-red-500">${inst.amount.toLocaleString('es-CO')}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-right flex flex-col items-end shrink-0 border-l pl-4 border-slate-50">
                                <span className="text-lg font-black text-red-600">${(v.customerPrice - (v.amountPaid || 0)).toLocaleString('es-CO')}</span>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Saldo Pendiente</span>
                                <Button variant="ghost" size="sm" onClick={() => { if(v.type === 'Mayor') setEditingVentaMayor(v); else setEditingVenta(v); setIsDebtorsDialogOpen(false); }} className="mt-2 h-7 rounded-lg text-[9px] font-black uppercase text-primary">Gestionar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <DialogFooter>
                <Button onClick={() => setIsDebtorsDialogOpen(false)} className="rounded-xl font-black uppercase text-[10px] bg-slate-950 text-white">Cerrar</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Venta Mayor Dialog */}
      <Dialog open={!!editingVentaMayor} onOpenChange={(open) => !open && setEditingVentaMayor(null)}>
        <DialogContent className="max-w-3xl rounded-3xl bg-white text-slate-950 border-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-slate-950">Editar Venta Mayor</DialogTitle>
          </DialogHeader>
          {editingVentaMayor && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Persona / Socio</Label>
                <Input className="rounded-xl border-2 bg-white text-slate-950" value={editingVentaMayor.clientName} onChange={e => setEditingVentaMayor({...editingVentaMayor, clientName: e.target.value})} />
              </div>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Conceptos de Ganancia</Label>
                      <Button variant="outline" size="sm" onClick={() => setEditingVentaMayor({...editingVentaMayor, items: [...(editingVentaMayor.items || []), { description: '', gain: 0 }]})} className="h-7 text-[8px] bg-white text-slate-950"><Plus className="h-3 w-3 mr-1" /> Añadir</Button>
                  </div>
                  {editingVentaMayor.items?.map((item: any, i: number) => (
                      <div key={i} className="flex gap-2 items-end">
                          <Textarea className="flex-grow min-h-[3rem] text-xs font-bold uppercase" value={item.description} onChange={e => {
                              const newItems = [...editingVentaMayor.items];
                              newItems[i] = { ...item, description: e.target.value };
                              setEditingVentaMayor({...editingVentaMayor, items: newItems, productName: newItems.map(it => it.description).join(', ')});
                          }} />
                          <Input className="w-32 font-black" value={formatValue(item.gain)} onChange={e => {
                              const newItems = [...editingVentaMayor.items];
                              newItems[i] = { ...item, gain: Number(parseValue(e.target.value)) };
                              setEditingVentaMayor({...editingVentaMayor, items: newItems});
                          }} />
                          <Button variant="ghost" onClick={() => {
                              const newItems = editingVentaMayor.items.filter((_:any, idx:number) => idx !== i);
                              setEditingVentaMayor({...editingVentaMayor, items: newItems, productName: newItems.map((it:any) => it.description).join(', ')});
                          }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                  ))}
              </div>
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Ya Pagado ($)</Label>
                    <Input className="rounded-xl border-2 font-black text-emerald-600" value={formatValue(editingVentaMayor.amountPaid)} onChange={e => setEditingVentaMayor({...editingVentaMayor, amountPaid: Number(parseValue(e.target.value))})} />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-right">
                      <p className="text-[8px] font-black uppercase text-slate-400">Deuda Restante</p>
                      <p className="text-xl font-black text-red-600">${(editingVentaMayor.items?.reduce((a:number, c:any)=>a+Number(c.gain), 0) - editingVentaMayor.amountPaid).toLocaleString('es-CO')}</p>
                  </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditingVentaMayor(null)} className="rounded-xl font-black uppercase text-[10px]">Cancelar</Button>
            <Button onClick={handleUpdateVentaMayor} className="bg-slate-950 text-white rounded-xl font-black uppercase text-[10px]">Guardar Venta Mayor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Venta Dialog */}
      <Dialog open={!!editingVenta} onOpenChange={(open) => !open && setEditingVenta(null)}>
        <DialogContent className="max-w-3xl rounded-3xl bg-white text-slate-950 border-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-slate-950">Editar Venta Detal</DialogTitle>
          </DialogHeader>
          {editingVenta && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Producto(s)</Label>
                <Textarea className="rounded-xl border-2 bg-white text-slate-950 border-slate-200 min-h-[4.5rem] font-bold uppercase text-xs py-2" value={editingVenta.productName} onChange={e => setEditingVenta({...editingVenta, productName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cliente</Label>
                <Input className="rounded-xl border-2 bg-white text-slate-950" value={editingVenta.clientName} onChange={e => setEditingVenta({...editingVenta, clientName: e.target.value})} />
              </div>
               <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha</Label>
                <Input type="date" className="rounded-xl border-2 bg-white text-slate-950" value={editingVenta.date ? format(new Date(editingVenta.date), 'yyyy-MM-dd') : ''} onChange={e => setEditingVenta({...editingVenta, date: new Date(e.target.value + 'T12:00:00').toISOString()})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Precio Mayor Total ($)</Label>
                <Input type="text" className="rounded-xl border-2 bg-white" value={formatValue(editingVenta.wholesalePrice)} onChange={e => setEditingVenta({...editingVenta, wholesalePrice: Number(parseValue(e.target.value))})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Precio Venta Total ($)</Label>
                <Input type="text" className="rounded-xl border-2 bg-white" value={formatValue(editingVenta.customerPrice)} onChange={e => setEditingVenta({...editingVenta, customerPrice: Number(parseValue(e.target.value))})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Monto Pagado ($)</Label>
                <Input type="text" className="rounded-xl border-2 bg-white" value={formatValue(editingVenta.amountPaid)} onChange={e => setEditingVenta({...editingVenta, amountPaid: Number(parseValue(e.target.value))})} />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditingVenta(null)} className="rounded-xl font-black uppercase text-[10px]">Cancelar</Button>
            <Button onClick={handleUpdateVenta} className="bg-slate-950 text-white rounded-xl font-black uppercase text-[10px]">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Pedido Dialog */}
      <Dialog open={!!editingPedido} onOpenChange={(open) => !open && setEditingPedido(null)}>
        <DialogContent className="max-w-lg rounded-3xl bg-white text-slate-950 border-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-slate-950">Editar Pedido</DialogTitle>
          </DialogHeader>
          {editingPedido && (
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Producto(s)</Label>
                <Textarea className="rounded-xl border-2 bg-white text-slate-950 min-h-[4.5rem] font-bold uppercase text-xs py-2" value={editingPedido.productName} onChange={e => setEditingPedido({...editingPedido, productName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Cliente</Label>
                <Input className="rounded-xl border-2 bg-white text-slate-950" value={editingPedido.clientName} onChange={e => setEditingPedido({...editingPedido, clientName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Fecha Entrega</Label>
                    <Input className="rounded-xl border-2 bg-white text-slate-950" value={editingPedido.deliveryDate} onChange={e => setEditingPedido({...editingPedido, deliveryDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Inversión ($)</Label>
                    <Input type="text" className="rounded-xl border-2 bg-white text-slate-950 font-black" value={formatValue(editingPedido.investmentRequired)} onChange={e => setEditingPedido({...editingPedido, investmentRequired: Number(parseValue(e.target.value))})} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditingPedido(null)} className="rounded-xl font-black uppercase text-[10px]">Cancelar</Button>
            <Button onClick={handleUpdatePedido} className="bg-slate-950 text-white rounded-xl font-black uppercase text-[10px]">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="container mx-auto px-4 py-8 text-center opacity-30">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-950">Panel de Control • 2026</p>
      </footer>
    </div>
  );
}
