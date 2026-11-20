'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, Download, UserRound, LogOut, PanelLeft, 
  Gem, Crown, BrainCircuit, Search, 
  MonitorSmartphone, Zap, Sparkles, 
  UserCheck, Film, Home, ShieldCheck, 
  PlayCircle, Rocket, Laptop, HardDrive, 
  Repeat, Type, Scan, PictureInPicture
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Input } from './ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from './ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';

const coursesMenu = [
    { icon: BrainCircuit, title: "IA con programas de edición", href: "/cursos?show-ia-details=true#ia-promo-banner", description: "Domina la IA integrada en After Effects, Premiere y Filmora." },
    { logo: "Ae", title: "Curso After Effects", href: "/cursos#ae", description: "Conviértete en un profesional de la animación y VFX." },
    { icon: Film, title: "Curso Adobe Premiere", href: "/cursos#pr", description: "Domina la edición de video profesional desde cero." },
    { icon: Scan, title: "Curso Mocha Pro", href: "/cursos#mocha", description: "Conviértete en un experto del trackeo planar." },
    { icon: PictureInPicture, title: "Curso Efecto Parallax", href: "/cursos#parallax", description: "Dale vida y profundidad a tus imágenes." },
    { logo: "Ai", title: "Curso Adobe Illustrator", href: "/cursos#ai", description: "Crea gráficos vectoriales espectaculares." },
];

const servicesMenu = [
    { icon: UserCheck, title: "Cursos Personalizados", href: "/servicios#cursos-personalizados-anchor", description: "Aprende a tu ritmo con un plan 100% adaptado a ti." },
    { icon: MonitorSmartphone, title: "Apps Web y Móviles", href: "/servicios", description: "Creamos sitios modernos que se sienten como aplicaciones." },
    { icon: Zap, title: "Automatizaciones", href: "/servicios", description: "Optimiza tus flujos de trabajo con software inteligente." },
    { icon: Film, title: "Edición de Video", href: "/servicios", description: "VFX, Motion Graphics y postproducción profesional." },
];

const membershipMenu = [
    { icon: Crown, title: "Membresía VIP", href: "/membresia", description: "Acceso total a miles de recursos y contenido exclusivo." },
    { icon: HardDrive, title: "Súper Packs Drive", href: "/contenidos", description: "Descarga bibliotecas masivas en un solo clic." },
    { icon: BrainCircuit, title: "Curso IA Gratis", href: "/ia", description: "Incluido en tu suscripción PRO sin costo adicional." },
];

const SearchPopover = ({ showText = false }: { showText?: boolean }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                 <button className="flex items-center gap-x-2 text-sm font-medium hover:text-gray-300 transition-colors py-2 shrink-0">
                    <Search className="h-5 w-5" />
                    {showText && <span className="text-lg ml-2">Buscar</span>}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-black text-white border-gray-800 shadow-2xl" sideOffset={10}>
                <form onSubmit={handleSearch}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-bold leading-none uppercase text-xs tracking-widest text-primary">Búsqueda Rápida</h4>
                            <p className="text-xs text-muted-foreground">Encuentra productos, cursos o servicios.</p>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                id="search"
                                placeholder="Escribe aquí..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 bg-gray-900 border-gray-700 focus:ring-primary text-xs"
                            />
                             <Button type="submit" size="sm" className="h-9">Buscar</Button>
                        </div>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export function Header() {
  const { user, logout, isAdmin, loading, rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';
  
  if (loading) return <header className="sticky top-0 z-50 h-20 w-full border-b bg-black text-white" />;

  return (
    <header className="sticky top-0 z-50 h-20 w-full flex items-center border-b bg-black px-4 xl:px-8 text-white backdrop-blur-md bg-black/90">
        <div className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between gap-x-4">
            
            {/* --- MOBILE / TABLET NAV (lg:hidden) --- */}
            <div className="flex items-center justify-between w-full lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 px-3 shrink-0 h-10 border border-white/5 bg-white/5 hover:bg-white/10">
                            <PanelLeft className="h-5 w-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] bg-black text-white border-r-gray-800 p-0 flex flex-col">
                        <SheetHeader className="p-6 border-b border-white/5">
                        <SheetClose asChild>
                            <Link href="/" className="flex items-center justify-center">
                                <Image src="https://media.fredegapro.com/2022/05/Logo-Blanco-1.png" alt="Logo" width={120} height={40} className="object-contain" />
                            </Link>
                        </SheetClose>
                        <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                        <SheetDescription className="sr-only">Navegación para móviles y tablets</SheetDescription>
                        </SheetHeader>
                        <nav className="flex flex-col p-6 gap-y-5 flex-grow overflow-y-auto">
                            <SearchPopover showText={true} />
                            <SheetClose asChild><Link href="/" className="flex items-center gap-3 text-lg font-bold uppercase text-primary"><Home className="h-5 w-5" /> Inicio</Link></SheetClose>
                            <SheetClose asChild><Link href="/servicios" className="flex items-center gap-3 text-lg font-medium uppercase"><Wrench className="h-5 w-5 text-primary" /> Servicios</Link></SheetClose>
                            <SheetClose asChild><Link href="/ia" className="flex items-center gap-3 text-lg font-bold text-primary uppercase"><BrainCircuit className="h-5 w-5" /> Inteligencia Artificial</Link></SheetClose>
                            <SheetClose asChild><Link href="/contenidos" className="flex items-center gap-3 text-lg font-bold text-primary uppercase"><Download className="h-5 w-5" /> Descargar Contenidos</Link></SheetClose>
                            <SheetClose asChild><Link href="/aprende" className="flex items-center gap-3 text-lg font-medium uppercase"><PlayCircle className="h-5 w-5 text-primary" /> Aprende Aquí</Link></SheetClose>
                            <SheetClose asChild><Link href="/cursos" className="flex items-center gap-3 text-lg font-medium uppercase"><Laptop className="h-5 w-5 text-primary" /> Cursos</Link></SheetClose>
                            <SheetClose asChild><Link href="/membresia" className="flex items-center gap-3 text-lg font-medium uppercase"><Gem className="h-5 w-5 text-primary" /> Membresía</Link></SheetClose>
                            
                            {isAdmin && (
                                <>
                                    <div className="h-px bg-white/10 my-2" />
                                    <SheetClose asChild>
                                        <Link href="/admin" className="flex items-center gap-3 text-lg font-bold text-amber-500">
                                            <ShieldCheck className="h-5 w-5" /> Panel Admin
                                        </Link>
                                    </SheetClose>
                                </>
                            )}
                        </nav>
                        <div className="p-6 border-t border-white/5">
                            {user ? (
                                <Button onClick={() => logout()} variant="destructive" className="w-full h-12 rounded-xl uppercase font-bold text-xs tracking-widest">
                                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                                </Button>
                            ) : (
                                <Button asChild className="w-full h-12 rounded-xl uppercase font-bold text-xs tracking-widest bg-primary">
                                    <Link href="/login">Iniciar Sesión</Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 shrink-0">
                    <Image src="https://media.fredegapro.com/2022/05/Logo-Blanco-1.png" alt="Logo" width={90} height={30} className="object-contain xs:w-[110px]" />
                </Link>
                <div className="flex items-center gap-1 shrink-0">
                    {user ? (
                        <Link href="/account" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <UserRound className="h-6 w-6 text-primary" />
                        </Link>
                    ) : (
                        <Link href="/login" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <UserRound className="h-6 w-6" />
                        </Link>
                    )}
                </div>
            </div>
            
            {/* --- DESKTOP NAVIGATION (hidden lg:flex) --- */}
            <div className="hidden lg:flex w-full items-center justify-between gap-x-2">
                
                {/* Lado Izquierdo: Logo + Inicio */}
                <div className="flex items-center gap-x-8 xl:gap-x-12 shrink-0">
                    <Link href="/" className="shrink-0 transition-all hover:opacity-80 pr-4">
                        <Image src="https://media.fredegapro.com/2022/05/Logo-Blanco-1.png" alt="Logo" width={110} height={36} className="object-contain xl:w-[130px]" />
                    </Link>
                    
                    <Link href="/" className={cn(
                        navigationMenuTriggerStyle(), 
                        "uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] font-black tracking-widest px-3 xl:px-4 h-9 shrink-0 border border-white/10 bg-white/5 hover:bg-primary/10 transition-colors"
                    )}>
                        <Home className="h-4 w-4 xl:mr-2" /> 
                        <span className="hidden xl:inline">Inicio</span>
                    </Link>
                </div>

                {/* Centro: Navegación Principal adaptable */}
                <div className="flex items-center gap-x-1.5 flex-1 justify-center min-w-0">
                    
                    <NavigationMenu delayDuration={0} skipDelayDuration={0}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] font-black tracking-widest px-2 xl:px-3 h-9">
                                    <Wrench className="h-4 w-4 xl:mr-1.5" /> 
                                    <span className="hidden xl:inline">Servicios</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[450px] gap-3 p-6 lg:grid-cols-2 bg-black border-white/10">
                                        {servicesMenu.map((item) => (
                                            <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Link href="/ia" className={cn(
                        navigationMenuTriggerStyle(), 
                        "font-black text-primary bg-primary/5 uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-widest px-2 xl:px-3 h-9 whitespace-nowrap"
                    )}>
                        <BrainCircuit className="h-4 w-4 xl:mr-1.5" /> 
                        <span className="hidden xl:inline">Inteligencia Artificial</span>
                        <span className="inline xl:hidden">IA</span>
                    </Link>

                    <Link href="/contenidos" className={cn(
                        navigationMenuTriggerStyle(), 
                        "font-black text-primary bg-primary/10 hover:bg-primary/20 uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-widest px-2 xl:px-3 h-9 whitespace-nowrap"
                    )}>
                        <Download className="h-4 w-4 xl:mr-1.5" /> 
                        <span className="hidden xl:inline">Descargar Contenidos</span>
                        <span className="inline xl:hidden">Recursos</span>
                    </Link>

                    <Link href="/aprende" className={cn(
                        navigationMenuTriggerStyle(), 
                        "uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] font-black tracking-widest px-2 xl:px-3 h-9"
                    )}>
                        <PlayCircle className="h-4 w-4 xl:mr-1.5" /> 
                        <span className="hidden xl:inline">Aprende</span>
                    </Link>

                    <NavigationMenu delayDuration={0} skipDelayDuration={0}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] font-black tracking-widest px-2 xl:px-3 h-9">
                                    <Laptop className="h-4 w-4 xl:mr-1.5" /> 
                                    <span className="hidden xl:inline">Cursos</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[450px] gap-3 p-6 lg:grid-cols-2 bg-black border-white/10">
                                        {coursesMenu.map((course) => (
                                            <ListItem key={course.title} title={course.title} href={course.href} icon={'icon' in course ? course.icon : undefined} logo={'logo' in course ? course.logo : undefined}>
                                                {course.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu delayDuration={0} skipDelayDuration={0}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="uppercase text-[10px] xl:text-[11px] 2xl:text-[12px] font-black tracking-widest px-2 xl:px-3 h-9">
                                    <Crown className="h-4 w-4 xl:mr-1.5" /> 
                                    <span className="hidden xl:inline">Membresía</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-6 lg:grid-cols-1 bg-black border-white/10">
                                        {membershipMenu.map((item) => (
                                            <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Lado Derecho: Búsqueda + Usuario */}
                <div className="flex items-center gap-x-2 xl:gap-x-6 shrink-0 ml-4">
                    <SearchPopover />
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/30 hover:border-primary transition-all shrink-0">
                                    <UserRound className="h-6 w-6 text-primary" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-black text-white border-white/10" align="end" forceMount sideOffset={10}>
                                <DropdownMenuLabel className="font-normal p-4">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-sm font-black uppercase tracking-widest text-primary">Mi Perfil</p>
                                        <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 py-3">
                                    <Link href="/account" className="flex w-full items-center">
                                        <UserRound className="mr-3 h-4 w-4" />
                                        <span className="font-bold">Mi Cuenta</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 font-black text-primary py-3">
                                    <Link href={isMember ? "/renovar" : "/membresia"} className="flex w-full items-center">
                                        <Repeat className="mr-3 h-4 w-4" />
                                        <span>{isMember ? "Renovar Membresía" : "Adquirir Membresía"}</span>
                                    </Link>
                                </DropdownMenuItem>
                                {isAdmin && (
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5 text-amber-500 focus:text-amber-500 font-black py-3">
                                        <Link href="/admin" className="flex w-full items-center">
                                            <ShieldCheck className="mr-3 h-4 w-4" />
                                            <span>Panel Admin</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500 focus:text-red-500 hover:bg-red-500/10 py-3">
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span className="font-bold">Cerrar Sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild className="h-9 xl:h-10 px-4 xl:px-8 rounded-xl bg-primary text-white uppercase font-black text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-widest shadow-xl shadow-primary/20 whitespace-nowrap hover:scale-105 transition-all shrink-0">
                            <Link href="/login">Entrar</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </header>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    icon?: any;
    logo?: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(({ className, title, children, icon: Icon, logo, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a ref={ref} className={cn("group block select-none space-y-2 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-white/5 hover:text-primary", className)} {...props}>
        <div className="flex items-center gap-3 mb-1">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {logo && <span className="text-[10px] font-black text-primary border-2 border-primary/20 rounded-md px-1.5 py-0.5">{logo}</span>}
            <div className="text-sm font-black uppercase tracking-tight leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-gray-300 font-medium">{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
))
ListItem.displayName = "ListItem"
