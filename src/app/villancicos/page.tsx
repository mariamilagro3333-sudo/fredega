'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Mic, MessageCircle, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const villancicos = [
    {
      title: "A Belén pastores (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/A%20belen%20pastores%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/a%20belen%20Pastores%20Cantando.mp3",
    },
    {
      title: "A la nanita Nana (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/A%20la%20nanita%20nana%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/A%20la%20nanita%20Cantando.mp3",
    },
    {
      title: "Antón tiruliruliru (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Ant%C3%B3n%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/ant%C3%B3n%20Cantando.mp3",
    },
    {
      title: "Arbolito de Navidad - Niños Cantores de Prado (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Arbolito%20de%20Navidad%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Arbolito%20de%20navidad%20cantado.mp3",
    },
    {
      title: "Arre Burriquito - Niños cantores de Prado (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Arre%20Burriquito%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Arre%20Burriquito%20Cantado.mp3",
    },
    {
      title: "Brisas de Diciembre",
      pistaUrl: "https://archive.org/download/MsAllGuia/Brisas%20de%20diciembre%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Brisas%20de%20Diciembre%20guia.mp3",
    },
    {
      title: "Campana sobre campana (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Campana%20sobre%20Campana%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Campana%20Cantando.mp3",
    },
    {
      title: "Campanas navideñas - En la capilla hay repiques (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Campanas%20navide%C3%B1as%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Campanas%20navide%C3%B1as%20guia.mp3",
    },
    {
      title: "Con mi burrito sabanero (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Con%20mi%20burrito%20sabanero%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Con%20mi%20burrito%20cantando.mp3",
    },
    {
      title: "Dónde será pastores (Villancico)",
      pistaUrl: "https://archive.org/download/NatillaGuia/Donde%20sera%20pastores%20Corto.mp3",
      guiaUrl: "https://archive.org/download/NatillaGuia/D%C3%B3nde%20Ser%C3%A1%20Pastores%20Guia.mp3",
    },
    {
      title: "El amor de los amores - A Belén venid pastores (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/El%20amor%20de%20los%20Amores%20%28A%20bel%C3%A9n%20venid%20Pastores%29%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/El%20Amor%20De%20Los%20Amores%20Guia.mp3",
    },
    {
      title: "El año viejo - Niños cantores de Prado",
      pistaUrl: "https://archive.org/download/MsAllGuia/El%20a%C3%B1o%20viejo%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/El%20a%C3%B1o%20viejo%20cantado.mp3",
    },
    {
      title: "El niño del carpintero - ven ven mi Jesús ven ven (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/El%20Ni%C3%B1o%20del%20Carpintero%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/El%20Ni%C3%B1o%20del%20Carpintero%20cantado.mp3",
    },
    {
      title: "Feliz Navidad (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Feliz%20Navidad%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Feliz%20Navidad%20Cantando.mp3",
    },
    {
      title: "Ha nacido el niño (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Ha%20nacido%20el%20ni%C3%B1o%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Ha%20nacido%20el%20ni%C3%B1o%20Guia.mp3",
    },
    {
      title: "Hacia Belén va una burra rin rin (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Hacia%20Bel%C3%A9n%20va%20un%20Burra%20Rin%20Rin%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Hacia%20Bel%C3%A9n%20guia.mp3",
    },
    {
      title: "Huepa eh, huepa eh - Los Toribianitos (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Huepa%20eh%2C%20huepa%20eh%20Los%20Toribianitos%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/HUEPA%20EH%20HUEPA%20EH%20guia.mp3",
    },
    {
      title: "Jingle Bells - Cascabel Cascabel (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Jingle%20Bells%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Jingle%20Bells%20Cantando.mp3",
    },
    {
      title: "Mamá, ¿dónde están los juguetes? (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Mam%C3%A1%20d%C3%B3nde%20est%C3%A1n%20los%20juguetes%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Mam%C3%A1%20%C2%BFD%C3%B3nde%20Est%C3%A1n%20Los%20Juguetes%20guia.mp3",
    },
    {
      title: "Más allá - Gloria Estefan",
      pistaUrl: "https://archive.org/download/MsAllGuia/mas%20alla%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/M%C3%A1s%20all%C3%A1%20guia.mp3",
    },
    {
      title: "Muñeco de Nieve - Niños cantores (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Mu%C3%B1eco%20de%20Nieve%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Mu%C3%B1eco%20de%20Nieve%20guia.mp3",
    },
    {
      title: "Natilla - Niños cantores (Villancico)",
      pistaUrl: "https://archive.org/download/NatillaGuia/Natilla%20Corto.mp3",
      guiaUrl: "https://archive.org/download/NatillaGuia/Natilla%20guia.mp3",
    },
    {
      title: "Niño del alma (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Nilo%20del%20alma%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Ni%C3%B1o%20del%20alma%20cantado.mp3",
    },
    {
      title: "Noche de Paz (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Noche%20de%20Paz%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Noche%20de%20Paz%20cantado.mp3",
    },
    {
      title: "Pastores venid (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Pastores%20Venid%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Pastores%20venid%20guia.mp3",
    },
    {
      title: "Peces en el río (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Peces%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Peces%20cantado.mp3",
    },
    {
      title: "Rodolfo el Reno (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Rodolfo%20El%20Reno%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Rodolfo%20el%20Reno%20Guia.mp3",
    },
    {
      title: "Salve reina y madre versión tradicional (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Salve%20reina%20y%20madre%20Tradicional%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Salve%20Reina%20Y%20Madre%20tradicional%20guia.mp3",
    },
    {
      title: "Salve reina y madre versión merengue (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Salve%20Reina%20y%20Madre%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Salve%20Reina%20y%20Madre%20Cantando.mp3",
    },
    {
      title: "Tutaina (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Tutaina%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Tutaina%20Cantado.mp3",
    },
    {
      title: "Un feliz año Pa Ti - Los Tucusitos (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Un%20feliz%20a%C3%B1o%20pa%20ti%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Un%20feliz%20a%C3%B1o%20pa%20ti%20los%20tucusitos%20guia.mp3",
    },
    {
      title: "Vamos vamos pastorcitos (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Vamos%20Vamos%20Pastorcitos%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Vamos%20Pastorcitos%20Cantado.mp3",
    },
    {
      title: "Ven a cantar que ya llegó la navidad (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Ven%20a%20Cantar%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/ven%20a%20cantar%20cantado.mp3",
    },
    {
      title: "Whe Wish you a Merry Christmas (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/We%20%20whish%20you%20a%20merry%20christmas%20corto.mp3",
      guiaUrl: null,
    },
    {
      title: "Yo soy Vicentico (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Yo%20soy%20vicentico%20corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Yo%20soy%20vicentico%20cantado.mp3",
    },
    {
      title: "Zagalillo del Valle venid (Villancico)",
      pistaUrl: "https://archive.org/download/MsAllGuia/Zagalillos%20Corto.mp3",
      guiaUrl: "https://archive.org/download/MsAllGuia/Zagalillo%20cantando.mp3",
    },
];

const getContactLinks = (carolTitle: string) => ({
    whatsapp: `https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20cotizar%20el%20villancico:%20${encodeURIComponent(carolTitle)}`,
    email: `mailto:contacto@fredegapro.com?subject=Cotización%20de%20Villancico:%20${encodeURIComponent(carolTitle)}`,
});

const AudioPlayer = ({ title, url }: { title: string, url: string | null }) => {
    if (!url) {
        return <p className="text-sm text-muted-foreground italic">No disponible</p>;
    }
    return (
        <div className="w-full">
            <p className="text-sm font-medium mb-2">{title}</p>
            <audio controls className="w-full">
                <source src={url} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};

export default function VillancicosPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Plataforma de Villancicos
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Escucha las pistas instrumentales y las guías de voz de tus villancicos favoritos.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villancicos.map((carol) => (
          <Card key={carol.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{carol.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <AudioPlayer title="Pista Instrumental" url={carol.pistaUrl} />
              <AudioPlayer title="Canción Guía (Voz)" url={carol.guiaUrl} />
            </CardContent>
            <CardFooter>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="w-full">
                      Cotizar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={getContactLinks(carol.title).whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Por WhatsApp</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getContactLinks(carol.title).email} target="_blank" rel="noopener noreferrer">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Por Correo</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
