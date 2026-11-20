'use client';

import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Users, Star, CheckCircle, Instagram } from 'lucide-react';
import Image from 'next/image';

const Hojadevida2Page = () => {
  const professionalSkills = [
    { title: "Diseño Gráfico y Producción", desc: "Especialista en After Effects, Premiere y Photoshop. Creación de piezas publicitarias de alto impacto visual." },
    { title: "Marketing y Redes Sociales", desc: "Gestión estratégica de perfiles comerciales, creación de calendarios de contenido y crecimiento de marca digital." },
    { title: "Sistemas y Bases de Datos en Línea", desc: "Dominio en consulta, actualización y administración de bases de datos en la nube; rapidez en la digitación y búsqueda de referencias." },
    { title: "Operación de Sistemas POS", desc: "Manejo de sistemas de punto de venta, facturación comercial, datáfonos y validación de transferencias electrónicas." },
    { title: "Soporte Técnico en Sitio", desc: "Habilidad para resolver bloqueos informáticos cotidianos (equipos, impresoras, red) para no detener la operación." },
    { title: "Atención al Cliente", desc: "Comunicación asertiva, trato respetuoso y agilidad en la atención en mostrador o ventas digitales." },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 print:text-black">
      {/* Estilos específicos para impresión PDF Folio */}
      <style jsx global>{`
        @media print {
          @page {
            size: 216mm 330mm; /* Tamaño Folio / Legal aprox */
            margin: 15mm;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .page-break {
            break-before: page;
            padding-top: 10mm;
          }
        }
      `}</style>

      <div className="w-full bg-card text-card-foreground shadow-none rounded-none overflow-hidden print:bg-white">
        
        <header className="text-center lg:text-left p-8 sm:p-12 bg-muted/30 border-b print:bg-white print:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-2">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary font-headline print:text-black print:text-5xl">Fredy Amir De La Hoz</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground uppercase tracking-tight print:text-slate-700 print:text-xl">Diseño Gráfico, Marketing Digital y Sistemas POS</h2>
                </div>
                <div className="flex justify-center lg:justify-end print:hidden">
                    <div className="relative w-40 h-40">
                         <Image
                            src="https://media.fredegapro.com/01/Image_4.png"
                            alt="Fredy De La Hoz"
                            fill
                            className="rounded-full object-cover border-4 border-primary shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex flex-col lg:grid lg:grid-cols-3">
          
          {/* BLOQUE 1: INFO PERSONAL, CONTACTO, EDUCACION (SIEMPRE PRIMERO) */}
          <div className="lg:col-span-1 bg-muted/10 p-8 sm:p-12 space-y-12 lg:border-r order-1 print:bg-white print:p-6 print:border-none">
             <section>
                <h3 className="text-xl font-bold mb-6 border-b-2 border-primary pb-2 uppercase text-sm tracking-widest text-primary print:text-black print:border-black">Información Personal</h3>
                <div className="space-y-4 text-base md:text-lg print:text-lg">
                    <p className="font-bold text-slate-900">Fredy Amir De La Hoz Garizábalo</p>
                    <p><strong>Cédula:</strong> 1.042.440.954</p>
                    <p><strong>Nacimiento:</strong> 03 de Febrero 1991</p>
                    <p><strong>Residencia:</strong> Soledad, Atlántico</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6 border-b-2 border-primary pb-2 uppercase text-sm tracking-widest text-primary print:text-black print:border-black">Contacto Directo</h3>
                <div className="space-y-5 text-base md:text-lg print:text-lg">
                  <p className="flex items-center gap-3"><MapPin className="text-primary h-5 w-5 print:text-black" /> Soledad, Atlántico</p>
                  <p className="flex items-center gap-3"><Phone className="text-primary h-5 w-5 print:text-black" /> 319 545 6391</p>
                  <p className="flex items-center gap-3"><Mail className="text-primary h-5 w-5 print:text-black" /> contacto@fredegapro.com</p>
                  <p className="flex items-center gap-3"><Globe className="text-primary h-5 w-5 print:text-black" /> fredegapro.com</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6 border-b-2 border-primary pb-2 uppercase text-sm tracking-widest text-primary print:text-black print:border-black">Formación</h3>
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg">Realizador Audiovisual</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Escuela Distrital de Artes (2016)</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg">Bachiller Académico</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">I.E. Dolores María Ucrós (2007)</p>
                  </div>
                  <div className="pt-6 border-t border-primary/10 print:border-slate-200">
                     <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4 print:text-black">Formación Complementaria</h4>
                     <ul className="space-y-3 text-sm text-muted-foreground print:text-slate-700">
                        <li className="leading-relaxed">• Programación Web y Gestión de Bases de Datos en Línea.</li>
                        <li className="leading-relaxed">• Manejo de Herramientas Ofimáticas (Excel / Sheets).</li>
                     </ul>
                  </div>
                </div>
              </section>
          </div>

          {/* BLOQUE 2: PERFIL, HABILIDADES, EXPERIENCIA */}
          <div className="lg:col-span-2 lg:row-span-2 p-8 sm:p-12 space-y-12 order-2 print:p-6">
            <section className="print:page-break">
              <h3 className="text-3xl font-bold border-b-4 border-primary pb-3 mb-6 flex items-center gap-4 print:text-black print:border-black"><User className="text-primary h-8 w-8 print:text-black" /> Perfil Profesional</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed print:text-black print:text-lg">
                Profesional integral que combina una sólida formación técnica y operativa con habilidades avanzadas en <strong>Diseño Gráfico, Realización Audiovisual y Marketing Digital</strong>. Experto en la administración de plataformas comerciales, manejo de sistemas POS, control de inventarios y cuadre de caja. Mi valor agregado radica en la capacidad de gestionar la operatividad administrativa y técnica de un negocio, mientras lidero estrategias de contenido y branding para potenciar su presencia en redes sociales y canales digitales.
              </p>
            </section>

            <section className="page-break">
              <h3 className="text-3xl font-bold border-b-4 border-primary pb-3 mb-8 flex items-center gap-4 print:text-black print:border-black"><Star className="text-primary h-8 w-8 print:text-black" /> Competencias Mixtas</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {professionalSkills.map((skill, i) => (
                    <div key={i} className="p-6 bg-muted/20 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors print:bg-white print:border-slate-200">
                        <h4 className="font-bold text-primary text-base uppercase mb-2 flex items-center gap-2 print:text-black">
                           {skill.title}
                        </h4>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed print:text-slate-700">{skill.desc}</p>
                    </div>
                  ))}
                </div>
            </section>
            
            <section className="page-break">
              <h3 className="text-3xl font-bold border-b-4 border-primary pb-3 mb-10 flex items-center gap-4 print:text-black print:border-black"><Briefcase className="text-primary h-8 w-8 print:text-black" /> Experiencia Laboral</h3>
              <div className="space-y-12">
                
                <div className="relative pl-8 border-l-4 border-primary/20 print:border-slate-200">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1 print:bg-black" />
                  <h4 className="text-xl font-bold text-primary print:text-black">Director de Marketing y Procesos Digitales</h4>
                  <h5 className="text-3xl font-black my-2 uppercase tracking-tight">SISMA DH SAS</h5>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">2022 - 2026</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground print:text-black">
                          <Instagram className="h-4 w-4" /> @sisma_aviation
                      </span>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground font-bold print:text-black">
                          <Phone className="h-4 w-4" /> 304 618 1073
                      </span>
                  </div>

                  <ul className="space-y-4 text-muted-foreground print:text-black">
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Liderazgo de la estrategia de marketing digital y creación de todo el contenido publicitario audiovisual de la marca.</li>
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Control y actualización de bases de datos operativas para el seguimiento de componentes técnicos y repuestos de aviación.</li>
                  </ul>
                </div>

                <div className="relative pl-8 border-l-4 border-primary/20 print:border-slate-200">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1 print:bg-black" />
                  <h4 className="text-xl font-bold text-primary print:text-black">Director Operativo y de Marketing Digital</h4>
                  <h5 className="text-3xl font-black my-2 uppercase tracking-tight">Fredega Producciones</h5>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">2016 - Presente</p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground print:text-black">
                          <Globe className="h-4 w-4" /> fredegapro.com
                      </span>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground font-bold print:text-black">
                          <Phone className="h-4 w-4" /> 319 545 6391
                      </span>
                  </div>

                  <ul className="space-y-4 text-muted-foreground print:text-black">
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Administración de tienda virtual: control de inventarios de recursos digitales y gestión de bases de datos de usuarios.</li>
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Conciliación diaria de ventas mediante pasarelas de pago y soporte técnico de la plataforma.</li>
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Dirección creativa: diseño de plantillas gráficas y edición de video profesional para el catálogo comercial.</li>
                  </ul>
                </div>

                 <div className="relative pl-8 border-l-4 border-primary/20 print:border-slate-200">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1 print:bg-black" />
                  <h4 className="text-xl font-bold text-primary print:text-black">Soporte Técnico y Asesoría Creativa</h4>
                  <h5 className="text-2xl font-black my-2 uppercase tracking-tight">Independiente / Comercios Locales</h5>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">2018 - Presente</p>
                  <ul className="space-y-4 text-muted-foreground print:text-black">
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Apoyo a negocios en la implementación de sistemas POS y organización de sus inventarios físicos.</li>
                    <li className="flex gap-3 items-start text-base md:text-lg"><CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 print:text-black" /> Asesoría en diseño de marca y manejo de redes sociales para aumentar la visibilidad comercial.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* BLOQUE 3: REFERENCIAS (AL FINAL ABSOLUTO) */}
          <div className="lg:col-span-1 lg:col-start-1 bg-muted/10 p-8 sm:p-12 space-y-12 lg:border-r border-t lg:border-t-0 order-3 print:bg-white print:p-6 print:border-none print:page-break">
             <section>
                <h3 className="text-2xl font-bold border-b-2 border-primary pb-3 mb-8 flex items-center gap-4 print:text-black print:border-black"><Users className="text-primary h-7 w-7 print:text-black" /> Referencias Personales</h3>
                <div className="space-y-10 text-base md:text-lg print:text-lg">
                    <div className="p-4 rounded-xl border border-primary/10 print:border-slate-200">
                        <p className="font-bold text-slate-900 text-xl">Rogers Mackenzie Gomez</p>
                        <p className="text-muted-foreground text-xs uppercase mb-2">Administrador de Empresa</p>
                        <p className="text-primary font-black text-lg print:text-black">304 354 3382</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/10 print:border-slate-200">
                        <p className="font-bold text-slate-900 text-xl">Leidys Romero Jimenez</p>
                        <p className="text-muted-foreground text-xs uppercase mb-2">Ingeniera Industrial</p>
                        <p className="text-primary font-black text-lg print:text-black">300 325 8971</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/10 print:border-slate-200">
                        <p className="font-bold text-slate-900 text-xl">Diana Castro Nieto</p>
                        <p className="text-muted-foreground text-xs uppercase mb-2">Comunicadora Social</p>
                        <p className="text-primary font-black text-lg print:text-black">304 431 2792</p>
                    </div>
                </div>
              </section>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Hojadevida2Page;
