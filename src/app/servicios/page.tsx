'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Video, UserCheck, Tv, Bot, Layers, Palette, Users, MessageCircle, BarChart, Film, Clapperboard, Star, Quote, Eye, Instagram, BookOpen, Youtube, Facebook, Mail, MonitorSmartphone, Zap, Sparkles, Laptop, Info, Gem, HardDrive, Cpu, Radio, BrainCircuit, Database, Workflow, PenSquare, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollAnchor } from '@/components/scroll-anchor';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const advisoryPackages = [
  { name: "Pack Básico: Asesoría inicial y configuración de programas." },
  { name: "Pack Pro: Curso personalizado de 4 módulos + 6 meses de membresía." },
  { name: "Pack Empresa: Automatización de flujos y app web a medida." },
  { name: "Pack Creador: Estrategia de contenidos y edición de 10 Reels/TikToks." }
];

const detailedServices = [
  {
    icon: Film,
    title: "Edición de Video y Postproducción Gráfica",
    description: "Transformo tus grabaciones en piezas audiovisuales impactantes, listas para cualquier plataforma.",
    items: [
      "Videos corporativos, comerciales e institucionales.",
      "Corrección de color profesional para un look cinematográfico.",
      "Animación de logos y gráficos (Motion Graphics).",
      "Videos para redes sociales (Reels, TikToks).",
      "Edición para Youtubers y creadores de contenido."
    ],
    contact: {
      whatsapp: "https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20cotizar%20el%20servicio%20de%20Edición%20de%20Video%20y%20Postproducción%20Gráfica.",
      email: "mailto:contacto@fredegapro.com?subject=Cotización%20-%20Servicio%20de%20Edición%20de%20Video"
    }
  },
   {
    icon: BarChart,
    title: "Manejo de Redes Sociales y Marketing",
    description: "Potencio tu presencia online con estrategias de contenido y marketing digital que generan resultados.",
    items: [
        "Gestión completa de perfiles en Instagram, Facebook, TikTok y YouTube.",
        "Creación de calendarios de contenido y publicaciones atractivas.",
        "Diseño de piezas gráficas y videos cortos para redes sociales.",
        "Análisis de métricas y optimización de estrategias de crecimiento."
    ],
    contact: {
      whatsapp: "https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20cotizar%20el%20servicio%20de%20Manejo%20de%20Redes%20Sociales%20y%20Marketing.",
      email: "mailto:contacto@fredegapro.com?subject=Cotización%20-%20Manejo%20de%20Redes%20Sociales%20y%20Marketing"
    }
  }
];

const serviceGridItems = [
    { icon: UserCheck, title: "Cursos Personalizados", href: "/servicios#cursos-personalizados-anchor" },
    { icon: MonitorSmartphone, title: "Aplicaciones Móvil y Web", href: "/servicios" },
    { icon: Zap, title: "Automatizaciones", href: "/servicios" },
    { icon: Sparkles, title: "Herramientas de IA", href: "/ia" },
    { icon: Laptop, title: "Cursos", href: "/cursos" },
    { icon: Layers, title: "Contenidos para Adobe y DaVinci", href: "/contenidos" },
];

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/fredega' },
  { icon: Instagram, label: 'Instagram', href: 'http://instagram.com/fredegapro' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/fredega' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quiero%20comunicarme%20con%20Fredega%20Producciones' },
];

const contactLinks = {
    whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20información%20sobre%20tus%20servicios',
    email: 'mailto:contacto@fredegapro.com?subject=Consulta%20General%20de%20Servicios',
    whatsappCourses: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20información%20sobre%20los%20cursos%20personalizados',
    whatsappApps: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20información%20sobre%20las%20aplicaciones%20y%20automatizaciones',
    whatsappPackage: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20me%20gustar%C3%ADa%20un%20paquete%20personalizado'
}

const personalizedCourseFeatures = [
    { icon: Radio, text: "Lecciones en video grabadas para que avances a tu ritmo." },
    { icon: Users, text: "Asesoría remota en vivo para resolver dudas puntuales." },
    { icon: Layers, text: "Contenido modular adaptado a tus metas específicas." },
    { icon: MessageCircle, text: "Asistencia permanente y directa vía WhatsApp." },
    { icon: Cpu, text: "Asistencia remota por Anydesk para solucionar problemas técnicos." }
];

const courseObjectives = [
    "Motion Graphics", "Eventos Sociales", "Efectos Visuales (VFX)",
    "Videografía", "Cine", "Videos Educativos", "Contenido para Redes Sociales"
];

const courseBonusFeatures = [
    { icon: Gem, text: "1 Año de Membresía FredegaPro con acceso a todo el contenido." },
    { icon: BrainCircuit, text: "1 Año de suscripción a Gemini Pro de Google." },
    { icon: HardDrive, text: "2 Terabytes de almacenamiento en Google Drive por 1 año." },
];

const automationFeatures = [
    { icon: Database, title: "Bases de Datos Interconectadas", description: "Sistemas para gestión de archivos, contabilidad, estadísticas y proyecciones futuras." },
    { icon: MonitorSmartphone, title: "Apps Multiplataforma", description: "Aplicaciones a medida para escritorio, web y móvil que comparten datos en tiempo real." },
    { icon: Mail, title: "Marketing Automatizado", description: "Envío de correos y redacción de contenido promocional asistido por IA, como en esta web." },
    { icon: PenSquare, title: "Formularios y Filtros Avanzados", description: "Sistemas de formularios que actualizan la base de datos al instante, con filtros potentes." },
    { icon: Workflow, title: "Automatización de Tareas", description: "Reducción de procesos manuales para optimizar la atención al cliente, gestión de usuarios y comunicaciones." },
];

const appDevelopmentFeatures = [
    { icon: MonitorSmartphone, title: "Diseños Web tipo Aplicación", description: "Creamos sitios web modernos que funcionan y se sienten como una aplicación, ofreciendo una experiencia de usuario superior (¡como esta misma web!)." },
    { icon: Shield, title: "Gestión de Usuarios y Seguridad", description: "Implementamos sistemas completos de registro, inicio de sesión y gestión de perfiles con roles y permisos, todo protegido con altos estándares de seguridad." },
    { icon: Database, title: "Bases de Datos y Formularios Inteligentes", description: "Desarrollamos la gestión de cotizaciones, formularios, reserva de citas por calendario y bases de datos que se actualizan en tiempo real." },
    { icon: Mail, title: "Marketing y Notificaciones Automatizadas", description: "Configuramos el envío de correos personalizados con tu dominio propio para bienvenida, notificaciones o marketing." },
    { icon: UserCheck, title: "Panel de Administración a Medida", description: "Creamos un panel de control interno para que puedas gestionar usuarios, contenidos y todas las operaciones de tu aplicación." },
];


export default function ServicesPage() {
  const pathname = usePathname();

  // Manejo manual de anclajes al cargar la página
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Pequeño retardo para asegurar que el contenido se haya renderizado
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [pathname]);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center items-center">
              <Image
                src="https://media.fredegapro.com/2025/09/Historia-De-Instagram-Agencia-De-Marketing-Profesional-Moderno-Violeta-1-scaled.png"
                alt="Freddy De La Hoz Garizábalo"
                width={500}
                height={500}
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint="male portrait"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">¡Hola! Soy Freddy De La Hoz</h2>
                <p className="text-lg text-muted-foreground mt-4">
                  Productor de cine y audiovisual, y el creador de Fredega Producciones. Desde 2018, mi plataforma ofrece servicios y materiales para la producción gráfica y audiovisual, ayudando a creadores y empresas a dar vida a sus ideas.
                </p>
                 <div className="flex flex-wrap items-center gap-4 mt-6">
                    {socialLinks.map((link) => (
                      <Button asChild key={link.href} size="icon" variant="outline" className="text-primary border-primary/50 hover:bg-primary/10 hover:text-primary">
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                          <link.icon className="h-5 w-5" />
                          <span className="sr-only">{link.label}</span>
                        </Link>
                      </Button>
                    ))}
                </div>
              </div>
            </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceGridItems.map((service, index) => (
                <Link key={index} href={service.href} className="block">
                  <Card className="flex flex-col items-center justify-center text-center p-6 bg-card hover:bg-muted/50 transition-colors h-full">
                      <service.icon className="h-10 w-10 text-primary mb-4" />
                      <CardTitle className="text-base font-semibold">{service.title}</CardTitle>
                  </Card>
                </Link>
            ))}
        </div>
      </section>

      <section className="mb-16">
        <Card className="bg-card border rounded-lg">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <Bot className="h-16 w-16 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                        <CardTitle className="text-3xl font-bold">Aplicaciones y Automatizaciones para Empresas</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Optimizo tus flujos de trabajo con soluciones a medida que impulsan la eficiencia de tu negocio.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {automationFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <feature.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-center pt-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Solicitar Cotización
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={contactLinks.whatsappApps} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                <span>Por WhatsApp</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={contactLinks.email} target="_blank" rel="noopener noreferrer">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Por Correo</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    </section>

    <section className="mb-16">
        <Card className="bg-card border rounded-lg">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <MonitorSmartphone className="h-16 w-16 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                        <CardTitle className="text-3xl font-bold">Desarrollo de Aplicaciones Web y Móviles</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Creamos soluciones digitales a medida, desde sitios web interactivos hasta aplicaciones complejas.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appDevelopmentFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <feature.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-center pt-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Solicitar Cotización de App
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={contactLinks.whatsappApps} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                <span>Por WhatsApp</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="mailto:contacto@fredegapro.com?subject=Cotización%20-%20Desarrollo%20de%20App%20Web/Móvil" target="_blank" rel="noopener noreferrer">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Por Correo</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {detailedServices.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full border border-primary/20">
                   <service.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 text-muted-foreground">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button className="w-full" size="lg">
                        Solicitar Cotización
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[calc(100%-1rem)] sm:w-auto">
                        <DropdownMenuItem asChild>
                        <Link href={service.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Por WhatsApp</span>
                        </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                        <Link href={service.contact.email} target="_blank" rel="noopener noreferrer">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Por Correo</span>
                        </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

       <section className="mb-16" id="cursos-personalizados">
        <ScrollAnchor id="cursos-personalizados-anchor" />
        <Card className="bg-card/50 border border-primary/30">
          <CardHeader className="text-center">
            <UserCheck className="h-12 w-12 mx-auto text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">Cursos Personalizados a Tu Medida</CardTitle>
            <CardDescription className="max-w-3xl mx-auto text-base">
              Avanza a tu propio ritmo con un plan de estudios 100% adaptado a tus necesidades y objetivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
             <div className="text-center">
                 <Button asChild size="lg" variant="secondary">
                    <Link href="/demo">
                        <Eye className="mr-2 h-5 w-5" />
                        Ver un curso de demostración aquí
                    </Link>
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">¿Cómo Funcionan?</h3>
                <div className="space-y-4 text-muted-foreground">
                  {personalizedCourseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p>{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Enfócate en lo que Quieres Lograr</h3>
                <div className="flex flex-wrap gap-2">
                  {courseObjectives.map(obj => (
                    <div key={obj} className="bg-muted px-3 py-1 rounded-full text-sm">{obj}</div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Las lecciones se adaptan a tu objetivo principal. Un curso completo puede tener de 4 a 6 módulos, cada uno con 7 a 9 lecciones, dependiendo de la complejidad.
                </p>
              </div>
            </div>
             <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-4 text-center text-primary">Tu Inversión Incluye Beneficios Exclusivos</h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {courseBonusFeatures.map((bonus, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <bonus.icon className="h-8 w-8 text-primary" />
                      <p className="font-medium">{bonus.text}</p>
                    </div>
                  ))}
                </div>
            </div>

          </CardContent>
          <CardFooter className="flex-col gap-4 pt-6">
            <p className="text-muted-foreground">La cotización se realiza por módulos. Una vez pagado un módulo, se entregan las lecciones correspondientes.</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Cotización
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href={contactLinks.whatsappCourses} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Por WhatsApp</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="mailto:contacto@fredegapro.com?subject=Cotización%20de%20Curso%20Personalizado" target="_blank" rel="noopener noreferrer">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Por Correo</span>
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </section>

       <section className="mt-16 bg-card border rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                    <p className="text-sm font-semibold text-primary">PROFESOR Y ASESOR PERSONAL DE</p>
                    <h2 className="text-4xl font-bold tracking-tighter">Luis López DJ</h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Asesoro y enseño a Luis sobre <span className="font-semibold text-foreground">edición gráfica, audiovisual e inteligencia artificial</span>. Luis es un reconocido DJ y locutor español, creador del World Dance Music.
                    </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <Image 
                        src="https://pbs.twimg.com/media/Cl06TOmWAAAJR13.jpg"
                        alt="Luis López DJ"
                        width={300}
                        height={300}
                        data-ai-hint="male portrait"
                        className="rounded-full object-cover border-4 border-primary/50 shadow-lg"
                    />
                </div>
            </div>
        </section>


      <section className="mt-16 text-center">
            <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                    <Star className="h-10 w-10 text-accent mx-auto mb-4" />
                    <CardTitle className="text-3xl">Paquetes de Asesoría y Cursos</CardTitle>
                    <CardDescription className="max-w-2xl mx-auto text-base">
                        ¿Necesitas una solución a tu medida? Combino mis servicios para crear un paquete que se ajuste perfectamente a tus objetivos y presupuesto.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="max-w-lg mx-auto text-left">
                        <ul className="space-y-4">
                            {advisoryPackages.map((pkg, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg">
                                    <div className="bg-accent text-accent-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
                                    <p className="font-medium text-foreground">{pkg.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mt-8">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Armemos tu Paquete Ideal
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={contactLinks.whatsappPackage} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    <span>Por WhatsApp</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                    <Link href="mailto:contacto@fredegapro.com?subject=Cotización%20de%20Paquete%20Personalizado" target="_blank" rel="noopener noreferrer">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Por Correo</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>
        </section>

    </div>
  );
}
