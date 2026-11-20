'use client';

import { Mail, Phone, MapPin, Globe, FileText, User, Briefcase, GraduationCap, Users, Bot, Code, Clapperboard, Star, CheckCircle, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HojadevidaPage = () => {
  const professionalSkills = [
    "Edición de video (After Effects, Premiere Pro, DaVinci Resolve, Blender 3D)",
    "Desarrollo de aplicaciones web y automatizaciones con IA",
    "Gestión y estrategia de marketing para redes sociales",
    "Creación de cursos y venta de plantillas audiovisuales",
    "Asesoramiento y soporte técnico para producción audiovisual",
    "Especialista en Motion Graphics y Efectos Visuales",
  ];

  return (
    <div className="bg-background min-h-screen p-4 sm:p-8">
      <div className="container mx-auto max-w-6xl bg-card text-card-foreground shadow-2xl rounded-2xl overflow-hidden">
        
        <header className="text-center lg:text-left p-8 sm:p-10 bg-muted/30 border-b">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                    <h1 className="text-5xl font-extrabold tracking-tight text-primary font-headline">Fredy Amir De La Hoz</h1>
                    <h2 className="text-2xl font-semibold text-muted-foreground mt-2">Realizador Audiovisual</h2>
                    <p className="text-lg font-medium text-muted-foreground mt-1">Fredega Producciones</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-40 h-40">
                         <Image
                            src="https://media.fredegapro.com/01/Image_4.png"
                            alt="Fredy De La Hoz"
                            fill
                            className="rounded-full object-cover border-4 border-primary shadow-lg"
                            data-ai-hint="male portrait"
                        />
                    </div>
                </div>
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3">
          
          <aside className="lg:col-span-1 bg-muted/30 p-8 sm:p-10 space-y-10 lg:border-r">
             <section>
                <h3 className="text-xl font-bold mb-4">Información Personal</h3>
                <div className="space-y-4 text-sm">
                    <div>
                        <p className="font-semibold">Nombre Completo:</p>
                        <p className="text-muted-foreground">Fredy Amir De La Hoz Garizábalo</p>
                    </div>
                  <p><strong>Cédula:</strong> 1.042.440.954</p>
                  <p><strong>Fecha de Nacimiento:</strong> 03 de Febrero 1991</p>
                  <p><strong>Lugar de Nacimiento:</strong> Soledad, Atlántico</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Contacto</h3>
                <div className="space-y-4 text-sm">
                  <p className="flex items-center gap-3"><MapPin className="text-primary" /> Carrera 33 27-133, Soledad, Atlántico</p>
                  <p className="flex items-center gap-3"><Phone className="text-primary" /> 319 545 6391</p>
                  <p className="flex items-center gap-3"><Mail className="text-primary" /> contacto@fredegapro.com</p>
                  <p className="flex items-center gap-3"><Globe className="text-primary" /> fredegapro.com</p>
                  <p className="flex items-center gap-3"><Instagram className="text-primary" /> @fredegapro</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><GraduationCap className="text-primary" /> Educación</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Realizador Audiovisual</h4>
                    <p className="text-sm text-muted-foreground">Escuela Distrital de Artes de Barranquilla (2016)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bachiller Académico</h4>
                    <p className="text-sm text-muted-foreground">I.E. Dolores María Ucrós (2007)</p>
                  </div>
                </div>
              </section>
                <section>
                <h3 className="text-xl font-bold border-b-2 border-primary pb-2 mb-4 flex items-center gap-3"><Users className="text-primary" /> Referencias Personales</h3>
                <div className="space-y-6 text-sm">
                    <div>
                        <p className="text-card-foreground font-semibold">Rogers Mackenzie Gomez</p>
                        <p className="text-muted-foreground">Administrador de Empresa</p>
                        <p className="text-muted-foreground">3043543382</p>
                    </div>
                    <div>
                        <p className="text-card-foreground font-semibold">Leidys Romero Jimenez</p>
                        <p className="text-muted-foreground">Ingeniera Industrial</p>
                        <p className="text-muted-foreground">300 325 8971</p>
                    </div>
                    <div>
                        <p className="text-card-foreground font-semibold">Diana Castro Nieto</p>
                        <p className="text-muted-foreground">Comunicadora Social</p>
                        <p className="text-muted-foreground">304 4312792</p>
                    </div>
                </div>
                </section>
          </aside>

           <div className="lg:col-span-2 p-8 sm:p-10 space-y-10">
            <section>
              <h3 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4 flex items-center gap-3"><User className="text-primary" /> Sobre Mí</h3>
              <p className="text-muted-foreground leading-relaxed">
                Realizador audiovisual con más de 8 años de experiencia, cuyo énfasis principal es la posproducción. Poseo un sólido conocimiento en preproducción y producción, incluyendo lenguaje audiovisual y técnicas de rodaje, lo que me permite tener una visión integral del proceso creativo para entregar resultados de alta calidad. Apasionado por la enseñanza y la creación de herramientas que potencian la creatividad de otros. Fundador de Fredega Producciones, una plataforma online que ofrece desde plantillas y cursos hasta servicios de desarrollo de software y marketing digital, siempre a la vanguardia de la tecnología y la inteligencia artificial.
              </p>
            </section>
            
            <section>
              <h3 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-6 flex items-center gap-3"><Briefcase className="text-primary" /> Experiencia Laboral</h3>
              <div className="space-y-8">
                 <div>
                  <h4 className="text-xl font-semibold text-primary">Director y Fundador</h4>
                   <Link href="https://fredegapro.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <h5 className="text-3xl font-bold hover:text-primary transition-colors my-2">Fredega Producciones</h5>
                   </Link>
                  <p className="text-sm text-muted-foreground">2016 - Presente</p>
                  <p className="mt-2 text-card-foreground">
                    Lidero la creación y mantenimiento de una aplicación web audiovisual y tienda en línea con más de 8 años de trayectoria. Desarrollo y comercializo plantillas, cursos y efectos para edición de video. Además, ofrezco servicios de producción, marketing digital y desarrollo de aplicaciones personalizadas con IA.
                  </p>
                   <div className="flex flex-wrap gap-4 mt-3">
                        <a href="https://fredegapro.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Globe className="h-4 w-4" /> fredegapro.com
                        </a>
                        <a href="https://instagram.com/fredegapro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Instagram className="h-4 w-4" /> @fredegapro
                        </a>
                    </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary">Asesor Personal y Colaborador</h4>
                  <p className="mt-2 text-card-foreground">
                    Actualmente, asesoro personalmente a <strong className="font-semibold text-accent">Luis López</strong>, reconocido DJ y locutor español, creador del programa de radio World Dance Music. Mi rol consiste en guiarlo en temas de edición, producción audiovisual y la implementación de nuevas tecnologías e inteligencia artificial para potenciar su marca y contenidos.
                  </p>
                  <a href="https://instagram.com/luislopezwdm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-3">
                      <Instagram className="h-4 w-4" /> @luislopezwdm
                  </a>
                </div>
                 <div>
                  <h4 className="text-xl font-semibold text-primary">Director de Marketing y Contenido Audiovisual</h4>
                    <p className="mt-2 text-card-foreground">
                        Dirijo la estrategia de marketing digital para <strong className="font-semibold text-accent">SISMA DH</strong>, una empresa de aviación con sede en Ubaté, Cundinamarca. Soy el encargado de generar todo el contenido publicitario y audiovisual, desde la concepción de estrategias hasta la postproducción final, para fortalecer su posicionamiento en el sector.
                    </p>
                  <div className="flex flex-wrap gap-4 mt-3">
                        <a href="https://sismadh.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Globe className="h-4 w-4" /> sismadh.com
                        </a>
                        <a href="https://instagram.com/sisma_aviation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Instagram className="h-4 w-4" /> @sisma_aviation
                        </a>
                    </div>
                </div>
                 <div>
                  <h4 className="text-xl font-semibold text-primary">Realizador Audiovisual Principal</h4>
                  <p className="mt-2 text-card-foreground">
                    Soy el realizador audiovisual principal de la <strong className="font-semibold text-accent">Fundación Folclórica Estampas Colombianas</strong>, encargado de la producción y posproducción de todo el contenido visual. Mi trabajo incluye la grabación de eventos, creación de videos promocionales y documentales que capturan y difunden la riqueza del folclor colombiano.
                  </p>
                  <a href="https://instagram.com/estampascolombianas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-3">
                      <Instagram className="h-4 w-4" /> @estampascolombianas
                  </a>
                </div>
                 <div>
                  <h4 className="text-xl font-semibold text-primary">Otros Proyectos Audiovisuales</h4>
                  <p className="mt-2 text-card-foreground">
                    He realizado trabajos independientes para una variedad de clientes, incluyendo la <strong className="font-semibold text-accent">Clínica del Caribe</strong> en Barranquilla, grupos musicales, creadores de contenidos y pequeños negocios, adaptando mi estilo y técnica a las necesidades específicas de cada proyecto.
                  </p>
                </div>

                <Alert className="mt-8 border-primary/20 bg-primary/5">
                    <AlertDescription>
                        Se puede observar mi trabajo y contribuciones directamente en el perfil de Instagram de cada empresa, fundación o persona mencionada, o ver un portafolio completo en mi perfil de Instagram <a href="https://instagram.com/fredegapro" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">@fredegapro</a>.
                    </AlertDescription>
                </Alert>

              </div>
            </section>

             <section>
              <h3 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4 flex items-center gap-3"><Star className="text-primary" /> Habilidades Profesionales</h3>
               <p className="mb-6 text-muted-foreground">La creatividad es mi mayor fortaleza, combinada con un enfoque profesional y ético para entregar siempre resultados de alta calidad que superen las expectativas.</p>
              
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Edición de video (After Effects, Premiere Pro, DaVinci Resolve, Blender 3D)</span>
                  </div>
                   <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Gestión y estrategia de marketing para redes sociales</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Desarrollo de aplicaciones web y automatizaciones con IA</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Creación de cursos y venta de plantillas audiovisuales</span>
                  </div>
                   <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Asesoramiento y soporte técnico para producción audiovisual</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Especialista en Motion Graphics y Efectos Visuales</span>
                  </div>
                </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HojadevidaPage;
