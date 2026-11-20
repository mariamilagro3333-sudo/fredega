'use client';

import { useState } from 'react';
import type { Course } from '@/types';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Youtube, Download, Gem, YoutubeIcon, LayoutGrid, Loader2, Zap, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CourseSelectorOverlay } from '@/components/course-selector-overlay';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const coursesData: Course[] = [
  {
    id: 'ae-ia',
    logo: "Ae",
    title: "After Effects con IA",
    description: "Domina After Effects enfocado en Motion Graphics y animaciones sociales usando IA.",
    totalLessons: 0,
    mainTopics: ["IA Generativa", "Motion Graphics", "Expresiones"],
    modules: [],
    lessons: [],
    isFree: false, 
  },
  {
    id: 'ae-2025',
    logo: "Ae",
    title: "After Effects 2025 (Moderno)",
    description: "Curso completo para dominar After Effects 2025 de la A a la Z.",
    modules: [],
    isFree: true,
    youtubePlaylistUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc',
    lessons: [
        { title: "Lección 01: Recomendaciones (No tiene material)", description: "Consejos iniciales para el curso.", isPro: false, status: 'publicado', downloadUrl: null, youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 02: Usar Ae por primera vez", description: "Primeros pasos en la interfaz.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1IKSr9qSF1jFNCTQQSWtcOy31Cbvcw6jC/view', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 03: Crear Historia Ae", description: "Crea contenido para tus redes sociales.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1yS90BQQDAAGvyHQ7gb1W8EWYEuBfrnxe/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 04: Animador con gráficos", description: "Dominando el editor de gráficos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/14zH90r0bd5mwRDcy9XVh0CZuAiw_xPOB/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 05: Crear 3D", description: "Espacio tridimensional básico.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1TY9rcR1Kor5w8fJgcy0HcNs6e0NJuOpS/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 06: Modo retrato", description: "Configuración para videos verticales.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1SB3MaqWZdLIeaXZklu5AKoAFt3lrJu__/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 07: Objeto 3D", description: "Importación y manejo de objetos 3D.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1YEV2S3tsfV5a5o0F1E7nTqqbxTGVdKL2/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 08: Exportar video (No tiene material)", description: "Aprende a renderizar correctamente.", isPro: false, status: 'publicado', downloadUrl: null, youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 09: Efectos y Sólidos (No tiene material)", description: "Uso de capas de ajuste y sólidos.", isPro: false, status: 'publicado', downloadUrl: null, youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 10: Máscaras y música", description: "Recorte y sincronización de audio.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1f4qo3POQEWb-mXn3qvJ23ZIVBN3_4NSU/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 11: Usar expresiones (Mismo material que L-10)", description: "Automatización básica con código.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1f4qo3POQEWb-mXn3qvJ23ZIVBN3_4NSU/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 12: Efectos de audios (Mismo material que L-10)", description: "Mejora el sonido de tus proyectos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1f4qo3POQEWb-mXn3qvJ23ZIVBN3_4NSU/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 13: Máscaras Alfa", description: "Técnicas avanzadas de composición.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1wIvjN5NzZY-mKzaGRTaHVW49zcpWeAXo/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 14: Animación de textos (Mismo material que L-13)", description: "Uso de animadores de texto.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1wIvjN5NzZY-mKzaGRTaHVW49zcpWeAXo/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 15: Dibujar formas (Mismo material que L-13)", description: "Creación de elementos vectoriales.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1wIvjN5NzZY-mKzaGRTaHVW49zcpWeAXo/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 16: Animación de recorridos (Sin material)", description: "Creación de trazados animados.", isPro: false, status: 'publicado', downloadUrl: null, youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 17: Quitar fondos en videos", description: "Rotoscopia y herramientas de recorte.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1AoOqbL46GEI2yzKgr_SsXlvUSaxOfvWo/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 18: Animar 3D con movimientos", description: "Animación de cámaras y objetos 3D.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1hAPpYLTGOxX3vmWdwk8hz4-LOWuqXVXS/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
        { title: "Lección 19: Seguimiento y animar cámaras de dos nodos", description: "Tracking avanzado y control de cámara.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1pxC54fj-zCf8S7qI7GvnjYbnilZebiEo/view?usp=drive_link', youtubeUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc' },
    ]
  },
  {
    id: 'ae-basico',
    logo: "Ae",
    title: "After Effects Básico 2021",
    description: "Las bases fundamentales de After Effects para empezar a crear desde cero.",
    modules: [],
    isFree: true,
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO',
    lessons: [
        { title: "Lección 01: Introducción y Render", description: "Primeros pasos y exportación básica.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1wRt_AgSp2doYLyuFDPKeR6pTHatYwhc3/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 02: Fotogramas", description: "Dominando los keyframes.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1xCqqiTAd06jYQ48mvfJMqwLVNF7XLBGE/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 03: Audios", description: "Manejo de sonido en la línea de tiempo.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1fJ0gLra-ie5_XNEA_9C6egDzIBEOje8b/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 04: Suavidad", description: "Curvas de aceleración y desaceleración.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/18rtowxCP-ctJEhs18oxnrGDtW2xW77ca/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 05: Sólidos y formas", description: "Creación de elementos básicos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/18ARPwtKgocYI3yKQNtobBjRAau_bOv-p/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 06: Formas", description: "Uso avanzado de capas de forma.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1ZpbBSDpoRnodxBIwpWsSe1hjO098NYNX/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 07: Transiciones", description: "Cambios fluidos entre escenas.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1Kr1wytFtKeAwCus2exKD4eHO26LbnTfR/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 08: Máscaras", description: "Recorte y aislamiento de elementos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1RZOjdp45QTNh-wV9q8R5_8perK4KaIBy/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 09: 3D y cámara", description: "Iniciación al espacio tridimensional.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1t3fX1DZ0Xma88vwxcsMxYPSuTGwHCLRm/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 10: Trazos y Parte 2", description: "Animación de líneas y contornos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1643aBfKQi_1nO0xp7z3N9NAqcMmLPuS8/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 11: Transformar", description: "Propiedades de transformación avanzada.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1k3Y6VCxShObFrGsCoJxPMkrJMMFW0YiX/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 12: Estabilización", description: "Corrigiendo movimientos de cámara.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1U_VeNe3uPwO96se9JCUw9wBjjmn-eMq8/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 13: Remapeo", description: "Control del tiempo y velocidad.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1KhdtHZDCxfkheFnjTGGYcwMPsO1tpKP_/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 14: Track Camera", description: "Rastreo de cámara en 3D.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1QlTFECB5zYbi_k7GD6oPqaMiZiW3DGXM/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 15: Animación Textos", description: "Animadores de texto profesionales.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1teVZPOKhsjXjTMEakzITK3dSVN46f2yC/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 16: Croma", description: "Extracción de fondos verdes.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1XHr84yX4fE652-7bW5rYptlMipNRDqoa/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 17: Colores", description: "Corrección y gradación de color.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1eABRFQuMYGea64KFTdlgc6Xc6MxlIRPO/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 18: Remover", description: "Limpieza de objetos en video.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1lKT6oGJaBFaTpZj2F3f6tDes8yS90IWZ/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
        { title: "Lección 19: Compensación", description: "Ajustes de lente y distorsión.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1cHfkSJwHI8gI0UlZ_Wy5Jg6ocFGyMo3v/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDxqYELEMTuhQkZ3ZjEYjheO' },
    ]
  },
  {
    id: 'ae-avanzado',
    logo: "Ae",
    title: "After Effects Avanzado 2021",
    description: "Lleva tus habilidades al siguiente nivel con Motion Graphics y VFX.",
    modules: [], 
    isFree: true,
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8',
    lessons: [
        { title: "Lección 01: Motion Graphics - Formas", description: "Diseño y animación compleja de formas.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1fllNUbxcHNDsoutfIjtKJUaWzoKufT0w/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 02: Motion Graphics - Recorrido y Controles Parentales", description: "Dominio de trayectorias y jerarquías.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1F3Bw8QZnK9ZZtnizsnqqGQT_gK-Zf8aj/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 03: Motion Graphics - Composición Gráfica", description: "Estructura visual y balance en movimiento.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1cvsTJtba7I_kf15Ta54vR664-WFlYX0K/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 04: Motion Graphics - Lower Thirds", description: "Creación de barras de nombres y redes.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1oWQVb3S-HEzz-Msrqn1SUvaM4K-Q1cGg/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 05: Motion Graphics - Efectos Líquido", description: "Simulación de fluidos con capas de forma.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1IL2IvJO0o_jwOb4rPzipj7_lrwtH2T0b/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 06: Herramienta pintar y Efecto Glowing", description: "Pintura vectorial y resplandores dinámicos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1VK7QzLl7Jj0BhwMFHnZzJcoQr_r8YjND/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 07: Rotoscopia en videos", description: "Recorte avanzado de sujetos en movimiento.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/131J3_JGJT1oFuzl0QxL0M_pGtCAZQHtW/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 08: Títere o Marioneta e Introducción a animación", description: "Uso de la herramienta Puppet para deforma.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1goHrHIMO7GWLlB8FyUk7l65DnNifXdJv/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 09: Rigging o estructura esquelética de personajes", description: "Preparación de personajes para animación.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1uUIjdBGkKM0c6v6hbq-cy1X192EGHtf-/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 10: Animación de personajes", description: "Ciclos de caminado y actuación básica.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1Ml5zH4T_ri7xvmUG9ZWhfHR_8xpHDj5J/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 11: Controladores y animación facial", description: "Manejo de rostros y expresiones.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1Ml5zH4T_ri7xvmUG9ZWhfHR_8xpHDj5J/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 12: Automatizaciones con Duik", description: "Optimización de flujos con Duik Ángela.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1Ml5zH4T_ri7xvmUG9ZWhfHR_8xpHDj5J/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 13: Partículas con CC Particle World (Humo y nieve)", description: "Sistemas de partículas nativos.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1psnft6gBw0xzs_li3dJ1eG4j1xYN0RnH/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 14: Partículas (desintegración y Líquidos)", description: "Efectos avanzados de dispersión.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1psnft6gBw0xzs_li3dJ1eG4j1xYN0RnH/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 15: Cámaras, luces y profundidad de campo", description: "Composición en el espacio 3D.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1eK00ayTfnGbIhWxZsJTl-ZFQx6rwmklk/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
        { title: "Lección 16: Conclusión y Fin", description: "Render final y consejos de carrera.", isPro: false, status: 'publicado', downloadUrl: 'https://drive.google.com/file/d/1eK00ayTfnGbIhWxZsJTl-ZFQx6rwmklk/view?usp=drivesdk', youtubeUrl: 'https://www.youtube.com/playlist?list=PLc5Uz6xFaHDwQW1SFV1TYHRZ12CdjqTA8' },
    ]
  },
];

function CourseSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-6">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="space-y-3 flex-1">
          <Skeleton className="h-8 w-1/3 rounded-lg" />
          <Skeleton className="h-5 w-full rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function CourseContent({ course, onPluginClick, onLessonDownload }: { course: Course; onPluginClick: () => void; onLessonDownload: (url: string | null, isPro: boolean) => void; }) {
  const isIA = course.id === 'ae-ia';

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      {isIA && (
          <Alert className="mb-10 bg-primary/10 border-primary border-2 p-10 shadow-2xl rounded-3xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="h-24 w-24 text-primary" />
              </div>
              <div className="mb-4">
                <Badge className="bg-yellow-500 text-black px-4 py-1 text-sm font-black uppercase tracking-widest animate-pulse">
                    MUY PRONTO
                </Badge>
              </div>
              <AlertTitle className="text-4xl font-extrabold uppercase tracking-tighter text-white flex items-center gap-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                  Nuevos Cursos Completos
              </AlertTitle>
              <AlertDescription className="text-2xl text-gray-200 font-medium mt-6 leading-relaxed max-w-3xl">
                  Muy pronto cursos completos de <span className="text-primary font-bold">After Effects - Adobe Premiere - Filmora - Inteligencia Artificial</span> en videos. ¡Hazte miembro PRO y recíbelos muy pronto sin costo adicional!
                  
                  <div className="mt-8">
                    <Button asChild size="lg" className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm shadow-xl transition-all hover:scale-105">
                        <Link href="/cursos?show-ia-details=true#ia-promo-banner">
                            Ver detalles
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                  </div>
              </AlertDescription>
          </Alert>
      )}

      {!isIA && (
        <Card className="flex flex-col border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden rounded-3xl shadow-2xl">
            <CardHeader className="p-8 md:p-12 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                      <div className="text-7xl font-black text-primary font-headline tracking-tighter">Ae</div>
                      <div>
                          <CardTitle className="text-4xl md:text-5xl uppercase tracking-tighter font-bold text-white">{course.title}</CardTitle>
                          <CardDescription className="text-xl font-normal text-gray-400 mt-4 max-w-2xl leading-relaxed">{course.description}</CardDescription>
                      </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                      <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 uppercase tracking-widest text-sm border-white/10 hover:bg-white/5 font-bold transition-all hover:scale-105">
                        <a href={course.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">
                            <Youtube className="mr-3 h-7 w-7 text-red-500" />
                            Playlist
                        </a>
                      </Button>
                      <Button onClick={onPluginClick} size="lg" className="rounded-full px-10 h-14 uppercase tracking-widest text-sm bg-blue-600 hover:bg-blue-700 font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105 text-white">
                        <Download className="mr-3 h-7 w-7" />
                        Plugins
                      </Button>
                  </div>
                </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-12 space-y-8">
                <div className="grid grid-cols-1 gap-4">
                    <div className="text-lg font-black uppercase tracking-[0.4em] text-primary/70 mb-6 border-l-4 border-primary pl-6 py-3">
                      Lecciones ({course.lessons?.length || 0})
                    </div>
                    {course.lessons && course.lessons.map((lesson, index) => (
                        <div key={index} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-8 bg-white/[0.02] hover:bg-white/[0.04] rounded-3xl border border-white/5 transition-all hover:border-primary/20">
                            <div className="flex-grow space-y-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-primary/60 uppercase tracking-widest">Lección {index + 1}</span>
                                    {lesson.isPro && (
                                      <Badge className="bg-accent/20 text-accent border-accent/20 px-3 py-1 text-[11px] font-bold animate-pulse">
                                        PRO <Gem className="ml-1.5 h-3.5 w-3.5" />
                                      </Badge>
                                    )}
                                </div>
                                <h4 className="font-bold text-2xl uppercase tracking-tight text-white group-hover:text-primary transition-colors">{lesson.title}</h4>
                                <p className="text-lg text-gray-400 font-normal line-clamp-2 max-w-4xl leading-relaxed">{lesson.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-4 w-full sm:w-auto shrink-0">
                                {lesson.youtubeUrl && (
                                    <Button size="lg" variant="ghost" className="rounded-2xl h-14 px-8 font-bold text-base hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20" onClick={() => onLessonDownload(lesson.youtubeUrl, lesson.isPro)}>
                                        <YoutubeIcon className="mr-3 h-6 w-6" /> Clase
                                    </Button>
                                )}
                                {lesson.downloadUrl ? (
                                    <Button size="lg" className="rounded-2xl h-14 px-10 font-bold text-base bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 shadow-xl shadow-primary/5" onClick={() => onLessonDownload(lesson.downloadUrl, lesson.isPro)}>
                                        <Download className="mr-3 h-6 w-6" /> Material
                                    </Button>
                                ) : (
                                    <Button disabled size="lg" variant="outline" className="rounded-2xl h-14 px-10 font-bold text-base opacity-50 border-white/5">
                                        N/A
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AeCoursesPage() {
  const { rol, user } = useAuth();
  const router = useRouter();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showLessonDialog, setShowLessonDialog] = useState(false);

  const selectedCourse = coursesData.find(c => c.id === activeCourseId);
  const isMember = rol === 'admin' || rol === 'miembro';
  
  const handleCourseSelect = (courseId: string) => {
    if (courseId === 'ae-ia') {
      router.push('/cursos?show-ia-details=true#ia-promo-banner');
      return;
    }
    setIsLoading(true);
    setShowSelector(false);
    setActiveCourseId(courseId);
    
    setTimeout(() => {
        setIsLoading(false);
    }, 600);
  };

  const handlePluginDownloadClick = () => {
    if (isMember) {
      window.open('https://drive.google.com/file/d/1G3oszTXx789ibyQWGQlRQOm9ZeHvQdDE/view?usp=drive_link', '_blank');
    } else {
      setShowMemberDialog(true);
    }
  };

  const handleLessonDownload = (url: string | null, isPro: boolean) => {
    if (!url || url === '#') return;
    if (isPro && !isMember) {
        setShowLessonDialog(true);
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <CourseSelectorOverlay 
        isOpen={showSelector} 
        onCourseSelect={handleCourseSelect} 
      />

      <div className="container mx-auto py-12 px-6 md:px-12">
        {!showSelector && (
            <div className="mb-8 flex items-center justify-between max-w-5xl mx-auto">
                <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={() => setShowSelector(true)}
                    className="text-gray-400 hover:text-primary h-14 px-10 rounded-full font-bold uppercase tracking-widest bg-white/5 hover:bg-primary/10 transition-all text-xs"
                >
                    <LayoutGrid className="mr-3 h-6 w-6" />
                    Cambiar Nivel
                </Button>
                {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            </div>
        )}

        {isLoading ? (
          <CourseSkeleton />
        ) : selectedCourse ? (
          <CourseContent 
              course={selectedCourse} 
              onPluginClick={handlePluginDownloadClick}
              onLessonDownload={handleLessonDownload}
          />
        ) : null}
      </div>

      {/* DIÁLOGOS DE RESTRICCIÓN */}
      <AlertDialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
          <AlertDialogContent className="bg-slate-950 border-white/10 rounded-3xl p-10 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-4 text-3xl font-bold uppercase tracking-tighter text-white">
                <Gem className="text-accent h-10 w-10" />
                Beneficio Miembro PRO
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-gray-400 font-normal pt-6 leading-relaxed">
                  Como miembro PRO, tienes acceso ilimitado a todos los plugins, presets y materiales exclusivos de este curso.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-10 border-t border-white/10 gap-4">
              <AlertDialogCancel className="bg-white/5 border-white/10 font-bold h-14 rounded-2xl uppercase tracking-widest text-xs">Volver</AlertDialogCancel>
              <AlertDialogAction asChild className="bg-accent hover:bg-accent/90 h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-black text-xs">
                  <Link href={user ? "/membresia" : "/login"}>
                      {user ? "Obtener Membresía" : "Iniciar Sesión"}
                  </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showLessonDialog} onOpenChange={setShowLessonDialog}>
          <AlertDialogContent className="bg-slate-950 border-white/10 rounded-3xl p-10 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-4 text-3xl font-bold uppercase tracking-tighter text-white">
                <Zap className="text-primary h-10 w-10" />
                Contenido Exclusivo
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-gray-400 font-normal pt-6 leading-relaxed">
                  Esta lección avanzada en 4K y su material de práctica son exclusivos para nuestra comunidad de miembros PRO.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-10 border-t border-white/10 gap-4">
              <AlertDialogCancel className="bg-white/5 border-white/10 font-bold h-14 rounded-2xl uppercase tracking-widest text-xs">Volver</AlertDialogCancel>
              <AlertDialogAction asChild className="bg-primary hover:bg-primary/90 h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-xs">
                  <Link href={user ? "/membresia" : "/login"}>
                      {user ? "Activar PRO" : "Iniciar Sesión"}
                  </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
