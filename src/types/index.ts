
import { categories } from "@/lib/categories";
import { z } from 'zod';
import type { LucideIcon } from "lucide-react";

export type Category = typeof categories[number];

export type DownloadLink = {
  label: string;
  url: string;
  isExclusive?: boolean;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  videoUrl: string;
  downloadUrl?: string;
  downloadLinks?: DownloadLink[];
  fredegaUrl?: string;
  categories: Category["slug"][];
  isExclusive?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isHybrid?: boolean; // Indica si tiene partes gratuitas y exclusivas simultáneamente
  // Nuevos campos técnicos
  description?: string;
  author?: string;
  resolution?: string;
  fileSize?: string;
  requiresPlugins?: boolean;
  compatibility?: string;
  duration?: string;
};

export type CatalogProduct = {
  id: number;
  title: string;
  description?: string;
  mediaUrl: string;
  isVideo: boolean;
  price: number;
  categories: string[];
};

export type Entry = {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  videoUrl: string;
  fredegaUrl?: string;
  downloadUrl?: string;
  categories: Category["slug"][];
  // Nuevos campos técnicos opcionales
  description?: string;
  author?: string;
  resolution?: string;
  fileSize?: string;
  requiresPlugins?: boolean;
  compatibility?: string;
};

export type CourseLesson = {
    title: string;
    description: string;
    isPro: boolean;
    status: 'publicado' | 'muy-pronto';
    downloadUrl: string | null;
    youtubeUrl: string | null;
    materialUrl?: string | null;
};

export type Course = {
    id: string;
    icon?: LucideIcon;
    logo?: string;
    title: string;
    description: string;
    totalLessons?: number;
    mainTopics?: string[];
    modules: {
        title: string;
        lessons: string[];
    }[];
    lessons?: CourseLesson[];
    isFree: boolean;
    youtubePlaylistUrl?: string;
    lessonDownloads?: { label: string; url: string | null }[];
};


export type UserProfile = {
  id: string;
  email: string | undefined;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  membership_start_date: string | null;
  membership_end_date: string | null;
  created_at: string;
};

export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio." }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export type SiteNotification = {
  id: number;
  is_active: boolean;
  title: string;
  content: string;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  bg_color: string | null;
  updated_at: string;
};

// --- Tipos para el Generador de Expresiones de After Effects ---
export type AeExpressionGeneratorInput = {
  property: string;
  description?: string;
  startTime?: number;
  endTime?: number;
  effects?: string[];
  intensity?: number;
  frequency?: number;
  imageDataUri?: string;
  compWidth?: number;
  compHeight?: number;
  startValue?: number;
  endValue?: number;
  enhanceOnly?: boolean;
  rotations?: number;
  axis?: 'x' | 'y' | 'xy';
  easingType?: 'linear' | 'ease' | 'easeIn' | 'easeOut';
  easingIntensity?: number;
  loopType?: 'cycle' | 'pingpong' | 'offset' | 'continue';
  userRole?: string | null;
};

export type AeExpressionGeneratorOutput = {
  mainExpression: string;
  secondaryExpression?: string;
  secondaryProperty?: string;
  usageInfo?: {
    allowed: boolean;
    isMember: boolean;
    remaining?: number;
    resetsAt?: string;
    message?: string;
  };
};
