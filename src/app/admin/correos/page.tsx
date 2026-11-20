'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Send, Mic, Sparkles, Loader2, Users, UserCheck, Gem, User, Check, X, Megaphone, Palette, Eye, PlayCircle, Info, UserX, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRecentUsers, generateEnhancedSubject as callEnhanceSubject, generateEnhancedBody as callEnhanceBody, getEmailRecipients, sendBulkEmail, getNotification, updateNotification } from './actions';
import type { SiteNotification, UserProfile } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';

function NotificationManager() {
    const { toast } = useToast();
    const [notification, setNotification] = useState<Partial<SiteNotification>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    
    const recognitionRef = useRef<any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [activeField, setActiveField] = useState<'noti-title' | 'noti-content' | null>(null);

    const loadNotification = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getNotification();
            if (data) {
                setNotification(data);
            }
        } catch (error) {
            console.error('Error loading global notification:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cargar la configuración de la notificación.' });
        }
        setIsLoading(false);
    }, [toast]);

    useEffect(() => {
        loadNotification();
    }, [loadNotification]);

    const formattedDate = notification?.updated_at 
        ? format(new Date(notification.updated_at), "dd 'de' MMMM, yyyy 'a las' hh:mm a", { locale: es })
        : null;
    
    const handleInputChange = (field: keyof SiteNotification, value: any) => {
        setNotification(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { success, data, error } = await updateNotification(notification as SiteNotification);
            if (success && data) {
                setNotification(data);
                toast({ title: '¡Éxito!', description: 'La notificación ha sido actualizada.' });
            } else {
                 console.error('Error saving notification:', error);
                 toast({ variant: 'destructive', title: 'Error', description: error || 'No se pudo guardar la notificación.' });
            }
        } catch (error) {
            console.error('Exception saving notification:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar la notificación.' });
        }
        setIsSaving(false);
    };

    const handlePreview = () => {
        toast({
            description: (
            <div 
                className="group relative w-full text-white rounded-lg overflow-hidden max-w-[280px]"
                style={{ backgroundColor: notification.bg_color || '#49a9e5' }}
            >
                <button className="absolute right-2 top-2 rounded-md p-1 text-white/80 opacity-0 group-hover:opacity-100 ring-offset-background transition-opacity hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 disabled:pointer-events-none" aria-label="Cerrar">
                    <X className="h-4 w-4" />
                </button>

                {notification.image_url && (
                 <a href={notification.button_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-32 w-full">
                        <Image src={notification.image_url} alt={notification.title || 'Notification Image'} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="h-8 w-8 text-white/80" />
                        </div>
                    </div>
                 </a>
                )}
                <div className="p-4">
                <h3 className="font-bold text-sm">{notification.title}</h3>
                <p className="mt-1 text-xs">{notification.content}</p>
                {notification.button_text && notification.button_url && (
                    <Button asChild size="sm" className="mt-3 w-full h-8 text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <a href={notification.button_url || '#'} target="_blank" rel="noopener noreferrer">
                        {notification.button_text}
                    </a>
                    </Button>
                )}
                </div>
            </div>
            ),
            duration: 15000,
            className: 'p-0 border-0 bg-transparent w-auto',
        });
    };
    
    const handleMicClick = (field: 'noti-title' | 'noti-content') => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({ variant: 'destructive', title: 'No Soportado', description: 'Tu navegador no soporta el reconocimiento de voz.' });
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
            setActiveField(null);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'es-ES';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
            setIsRecording(true);
            setActiveField(field);
        };

        recognition.onend = () => {
            setIsRecording(false);
            setActiveField(null);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            toast({ variant: 'destructive', title: 'Error de Micrófono', description: 'No se pudo iniciar el reconocimiento de voz.' });
        };
        
        recognition.onresult = (event: any) => {
            let final_transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                }
            }

            if (final_transcript) {
                 if (field === 'noti-title') {
                    handleInputChange('title', (notification.title || '') + final_transcript);
                } else if (field === 'noti-content') {
                    handleInputChange('content', (notification.content || '') + final_transcript);
                }
            }
        };

        recognition.start();
    };

    const handleGenerateTitle = async () => {
        if (!notification.title) {
            toast({ variant: 'destructive', title: 'El título está vacío.' });
            return;
        }
        setIsGeneratingTitle(true);
        try {
            const result = await callEnhanceSubject({ subject: notification.title });
            setGeneratedTitle(result.enhancedSubject);
        } catch (e: any) {
            console.error('Error generating enhanced notification title:', e);
            toast({ variant: 'destructive', title: 'Error de IA', description: e.message || 'No se pudo generar el título.' });
        }
        setIsGeneratingTitle(false);
    };

    const handleGenerateContent = async () => {
        if (!notification.content) {
            toast({ variant: 'destructive', title: 'El contenido está vacío.' });
            return;
        }
        setIsGeneratingContent(true);
        try {
            const result = await callEnhanceBody({ body: notification.content, prompt: 'Hazlo corto, atractivo y añade emojis.' });
            setGeneratedContent(result.enhancedBody);
        } catch (e: any) {
            console.error('Error generating enhanced notification content:', e);
            toast({ variant: 'destructive', title: 'Error de IA', description: e.message || 'No se pudo generar el contenido.' });
        }
        setIsGeneratingContent(false);
    };
    
    if (isLoading) {
        return <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
      <Card className="mt-8 border-primary/30">
          <CardHeader>
              <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                      <Megaphone className="h-8 w-8 text-primary" />
                      <div>
                          <CardTitle>Gestionar Notificación Global</CardTitle>
                          <CardDescription>Configura el aviso emergente que aparecerá en todo el sitio web.</CardDescription>
                      </div>
                  </div>
                   <div className="flex items-center space-x-2">
                        <Switch id="notification-active" checked={notification.is_active || false} onCheckedChange={(checked) => handleInputChange('is_active', checked)} />
                        <Label htmlFor="notification-active" className={cn("font-semibold", notification.is_active ? "text-green-500" : "text-red-500")}>{notification.is_active ? 'Activa' : 'Inactiva'}</Label>
                    </div>
              </div>
          </CardHeader>
          <CardContent className="space-y-6">
                {notification.is_active && notification.title && formattedDate && (
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Notificación Activa</AlertTitle>
                        <AlertDescription>Actualmente se está mostrando la notificación: <strong>"{notification.title}"</strong>. Última publicación: {formattedDate}</AlertDescription>
                    </Alert>
                )}
              <div className='space-y-2'>
                  <Label htmlFor='noti-title'>Título del Aviso</Label>
                  <div className='flex gap-2'>
                    <Input id='noti-title' value={notification.title || ''} onChange={e => handleInputChange('title', e.target.value)} />
                    <Button variant="outline" size="icon" onClick={() => handleMicClick('noti-title')} disabled={isRecording && activeField !== 'noti-title'}>
                        <Mic className={cn("h-4 w-4", isRecording && activeField === 'noti-title' && "text-red-500 animate-pulse")} />
                    </Button>
                    <Button variant="secondary" onClick={handleGenerateTitle} disabled={isGeneratingTitle}>{isGeneratingTitle ? <Loader2 className='animate-spin' /> : <Sparkles />} </Button>
                  </div>
                  {generatedTitle && (
                     <Card className="mt-2 bg-muted/50 p-3">
                        <p className="text-xs font-semibold">Sugerencia IA:</p>
                        <p className="text-sm my-1">{generatedTitle}</p>
                        <div className="flex gap-2 mt-2">
                           <Button size="sm" onClick={() => { handleInputChange('title', generatedTitle); setGeneratedTitle(''); }}><Check className="mr-2 h-4 w-4" /> Usar</Button>
                           <Button size="sm" variant="ghost" onClick={() => setGeneratedTitle('')}><X className="mr-2 h-4 w-4" /> Descartar</Button>
                        </div>
                     </Card>
                  )}
              </div>
               <div className='space-y-2'>
                  <Label htmlFor='noti-content'>Contenido del Aviso</Label>
                  <div className='flex gap-2'>
                    <Textarea id='noti-content' value={notification.content || ''} onChange={e => handleInputChange('content', e.target.value)} />
                    <div className='flex flex-col gap-2'>
                       <Button variant="outline" size="icon" onClick={() => handleMicClick('noti-content')} disabled={isRecording && activeField !== 'noti-content'}>
                            <Mic className={cn("h-4 w-4", isRecording && activeField === 'noti-content' && "text-red-500 animate-pulse")} />
                       </Button>
                      <Button variant="secondary" onClick={handleGenerateContent} disabled={isGeneratingContent}>{isGeneratingContent ? <Loader2 className='animate-spin' /> : <Sparkles />}</Button>
                    </div>
                  </div>
                  {generatedContent && (
                     <Card className="mt-2 bg-muted/50 p-3">
                        <p className="text-xs font-semibold">Sugerencia IA:</p>
                        <p className="text-sm my-1">{generatedContent}</p>
                        <div className="flex gap-2 mt-2">
                           <Button size="sm" onClick={() => { handleInputChange('content', generatedContent); setGeneratedContent(''); }}><Check className="mr-2 h-4 w-4" /> Usar</Button>
                           <Button size="sm" variant="ghost" onClick={() => setGeneratedContent('')}><X className="mr-2 h-4 w-4" /> Descartar</Button>
                        </div>
                     </Card>
                  )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className='space-y-2'>
                    <Label htmlFor='noti-image'>URL de la Imagen (Opcional)</Label>
                    <Input id='noti-image' value={notification.image_url || ''} onChange={e => handleInputChange('image_url', e.target.value)} placeholder="https://ejemplo.com/imagen.jpg"/>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='noti-btn-text'>Texto del Botón</Label>
                    <Input id='noti-btn-text' value={notification.button_text || ''} onChange={e => handleInputChange('button_text', e.target.value)} placeholder="Ver ahora"/>
                </div>
              </div>
              <div className='space-y-2'>
                  <Label htmlFor='noti-btn-url'>URL del Botón</Label>
                  <Input id='noti-btn-url' value={notification.button_url || ''} onChange={e => handleInputChange('button_url', e.target.value)} placeholder="https://youtube.com/fredega"/>
              </div>
               <div className='space-y-3'>
                  <Label htmlFor='noti-color'>Color de Fondo</Label>
                  <div className='flex items-center gap-2'>
                    <Input id='noti-color' type="color" value={notification.bg_color || '#49a9e5'} onChange={e => handleInputChange('bg_color', e.target.value)} className="w-16 h-10 p-1 cursor-pointer"/>
                    <Input value={notification.bg_color || ''} onChange={e => handleInputChange('bg_color', e.target.value)} placeholder="#49a9e5" />
                  </div>
              </div>
          </CardContent>
          <CardFooter className="flex-wrap gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Send className="mr-2" />}
                  Publicar Notificación
              </Button>
              <Button onClick={handlePreview} variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Vista Previa
              </Button>
          </CardFooter>
      </Card>
    );
}


function EmailSenderContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const bulkIdsParam = searchParams.get('bulk');
  
  const [recipientType, setRecipientType] = useState(bulkIdsParam ? 'individual' : 'all');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([]);
  const [individualEmail, setIndividualEmail] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeField, setActiveField] = useState<'subject' | 'body' | null>(null);

  const [isGeneratingSubject, setIsGeneratingSubject] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState('');
  const [isGeneratingBody, setIsGeneratingBody] = useState(false);
  const [generatedBody, setGeneratedBody] = useState('');
  const [bodyPrompt, setBodyPrompt] = useState('');

  const [micStatus, setMicStatus] = useState<'idle' | 'listening' | 'error'>('idle');
  const [micError, setMicError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecentUsers() {
        const users = await getRecentUsers();
        setRecentUsers(users);
        
        if (bulkIdsParam) {
            const ids = bulkIdsParam.split(',');
            const emails = users.filter(u => ids.includes(u.id)).map(u => u.email).filter(Boolean).join(', ');
            setIndividualEmail(emails);
        }
    }
    loadRecentUsers();
  }, [bulkIdsParam]);
  
 const handleMicClick = (field: 'subject' | 'body') => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicStatus('error');
      setMicError('Tu navegador no soporta el reconocimiento de voz.');
      toast({ variant: 'destructive', title: 'No soportado', description: 'Tu navegador no soporta el reconocimiento de voz.' });
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setActiveField(null);
      setMicStatus('idle');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setMicStatus('listening');
      setActiveField(field);
      setMicError(null);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setActiveField(null);
      recognitionRef.current = null;
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error in EmailSenderContent:', event.error, event);
      let errorMsg = 'Error en el reconocimiento.';
      if (event.error === 'no-speech') errorMsg = 'No se detectó voz. Intenta de nuevo.';
      if (event.error === 'not-allowed') errorMsg = 'Permiso de micrófono denegado.';
      if (event.error === 'audio-capture') errorMsg = 'Fallo en la captura de audio.';
      
      setMicError(errorMsg);
      setMicStatus('error');
      toast({ variant: 'destructive', title: 'Error de micrófono', description: errorMsg });
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        if (field === 'subject') {
          setSubject(prev => prev + (prev ? ' ' : '') + finalTranscript);
        } else {
          setBody(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
      }
    };
    
    recognition.start();
  };

  const handleGenerateSubject = async () => {
    if (!subject) {
        toast({ variant: 'destructive', title: 'El asunto está vacío', description: 'Escribe un asunto para poder mejorarlo con IA.' });
        return;
    }
    setIsGeneratingSubject(true);
    try {
        const result = await callEnhanceSubject({ subject });
        setGeneratedSubject(result.enhancedSubject);
    } catch (e: any) {
        console.error('Error generating enhanced subject:', e);
        toast({ variant: 'destructive', title: 'Error de IA', description: e.message || 'No se pudo generar el asunto.' });
    }
    setIsGeneratingSubject(false);
  }

  const handleGenerateBody = async () => {
    if (!body) {
        toast({ variant: 'destructive', title: 'El cuerpo está vacío', description: 'Escribe algo en el cuerpo para poder mejorarlo con IA.' });
        return;
    }
    setIsGeneratingBody(true);
    try {
        const result = await callEnhanceBody({ body, prompt: bodyPrompt });
        setGeneratedBody(result.enhancedBody);
    } catch (e: any) {
        console.error('Error generating enhanced body:', e);
        toast({ variant: 'destructive', title: 'Error de IA', description: e.message || 'No se pudo generar el cuerpo del correo.' });
    }
    setIsGeneratingBody(false);
  }

 const handleSendEmail = async () => {
    setIsLoading(true);
    
    let recipients: { email: string }[] = [];
    if (recipientType === 'individual') {
        if (individualEmail) {
            recipients = individualEmail.split(',').map(e => ({ email: e.trim() }));
        }
    } else {
        recipients = await getEmailRecipients(recipientType as any);
    }

    if (recipients.length === 0) {
        toast({ variant: 'destructive', title: 'No hay destinatarios', description: 'Selecciona un grupo o introduce un correo individual.' });
        setIsLoading(false);
        return;
    }
    
    const finalSubject = generatedSubject || subject;
    const finalBody = generatedBody || body;

    if (!finalSubject || !finalBody) {
        toast({ variant: 'destructive', title: 'Faltan campos', description: 'Por favor, completa el asunto y el cuerpo del correo.' });
        setIsLoading(false);
        return;
    }

    const emailAddresses = recipients.map(r => r.email);

    const { successCount, failureCount, failedEmails } = await sendBulkEmail(emailAddresses, finalSubject, finalBody);

    if (failureCount > 0) {
        console.error('Bulk email send completed with failures:', { successCount, failureCount, failedEmails });
        toast({
            variant: 'destructive',
            title: 'Envío completado con errores',
            description: (
                <div>
                    <p>Enviados: {successCount}</p>
                    <p>Fallidos: {failureCount}</p>
                    <p>Correos fallidos: {failedEmails.join(', ')}</p>
                </div>
            ),
            duration: 10000,
        });
    } else {
        toast({
            title: '¡Correos enviados!',
            description: `Se han enviado ${successCount} correos exitosamente.`
        });
    }

    if (successCount > 0) {
        setSubject('');
        setBody('');
        setIndividualEmail('');
        setGeneratedSubject('');
        setGeneratedBody('');
        setBodyPrompt('');
    }

    setIsLoading(false);
  };
  
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Mail className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Enviar Correos Masivos</CardTitle>
              <CardDescription>Contacta a tus usuarios con anuncios, noticias o promociones.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label className="text-base font-semibold">¿A quién enviar?</Label>
            <RadioGroup value={recipientType} onValueChange={setRecipientType} className="flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="r_all" />
                <Label htmlFor="r_all" className="flex items-center gap-2"><Users className="h-4 w-4" /> Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guests" id="r_guests" />
                <Label htmlFor="r_guests" className="flex items-center gap-2"><User className="h-4 w-4" /> Invitados</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="members" id="r_members" />
                <Label htmlFor="r_members" className="flex items-center gap-2"><Gem className="h-4 w-4" /> Miembros Activos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expired_members" id="r_expired_members" />
                <Label htmlFor="r_expired_members" className="flex items-center gap-2 text-amber-500"><Clock className="h-4 w-4" /> Vencidos (Rol Miembro)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expired_role" id="r_expired_role" />
                <Label htmlFor="r_expired_role" className="flex items-center gap-2 text-red-500"><UserX className="h-4 w-4" /> Expirados (Rol Expirado)</Label>
              </div>
               <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="r_individual" />
                <Label htmlFor="r_individual" className="flex items-center gap-2"><UserCheck className="h-4 w-4" /> Individual / Varios</Label>
              </div>
            </RadioGroup>
             {recipientType === 'individual' && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Correos separados por coma" value={individualEmail} onChange={(e) => setIndividualEmail(e.target.value)} />
                    <Select onValueChange={(value) => setIndividualEmail(prev => prev ? `${prev}, ${value}` : value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="O elige un usuario reciente" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {recentUsers.map(user => (
                                <SelectItem key={user.id} value={user.email || ''}>{user.email}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
             )}
          </div>
          
           <div className="space-y-2">
            <Label htmlFor="subject" className="text-base font-semibold">Asunto</Label>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <div className="flex-grow min-w-[200px]">
                <Input id="subject" placeholder="El increíble asunto de tu correo" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="icon" onClick={() => handleMicClick('subject')}>
                    <Mic className={cn("h-4 w-4", isRecording && activeField === 'subject' && "text-red-500 animate-pulse")} />
                </Button>
                <Button type="button" variant="secondary" onClick={handleGenerateSubject} disabled={isGeneratingSubject}>
                    {isGeneratingSubject ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Mejorar con IA
                </Button>
              </div>
            </div>
            {generatedSubject && (
                <Card className="mt-4 bg-muted/50 p-4 border-primary/20">
                    <p className="text-sm font-semibold">Sugerencia de la IA:</p>
                    <p className="my-2">{generatedSubject}</p>
                    <div className="flex gap-2 mt-2">
                        <Button size="sm" onClick={() => { setSubject(generatedSubject); setGeneratedSubject(''); }}><Check className="mr-2 h-4 w-4" /> Usar</Button>
                        <Button size="sm" variant="ghost" onClick={() => setGeneratedSubject('')}><X className="mr-2 h-4 w-4" /> Descartar</Button>
                    </div>
                </Card>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body" className="text-base font-semibold">Cuerpo del Correo</Label>
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="icon" onClick={() => handleMicClick('body')}>
                      <Mic className={cn("h-4 w-4", isRecording && activeField === 'body' && "text-red-500 animate-pulse")} />
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleGenerateBody} disabled={isGeneratingBody}>
                      {isGeneratingBody ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Generar / Mejorar
                  </Button>
                </div>
                <Input value={bodyPrompt} onChange={(e) => setBodyPrompt(e.target.value)} placeholder="Instrucción IA (ej: invítalos a renovar con 20% descuento)" className="flex-grow" />
             </div>
            <Textarea id="body" placeholder="Escribe tu mensaje aquí..." value={body} onChange={(e) => setBody(e.target.value)} rows={10} />
            {generatedBody && (
                <Card className="mt-4 bg-muted/50 p-4 border-primary/20">
                    <p className="text-sm font-semibold mb-2">Vista previa sugerencia IA:</p>
                    <div className="prose prose-sm dark:prose-invert border rounded-md p-4 bg-background max-h-[300px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: generatedBody }} />
                    <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => { setBody(generatedBody); setGeneratedBody(''); }}><Check className="mr-2 h-4 w-4" /> Reemplazar mi texto</Button>
                        <Button size="sm" variant="ghost" onClick={() => setGeneratedBody('')}><X className="mr-2 h-4 w-4" /> Descartar</Button>
                    </div>
                </Card>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendEmail} disabled={isLoading} size="lg" className="w-full sm:w-auto">
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Send className="mr-2" />}
            {isLoading ? 'Enviando...' : `Enviar a ${recipientType === 'individual' ? 'destinatarios' : 'el grupo seleccionado'}`}
          </Button>
        </CardFooter>
      </Card>
      <Separator className="my-8" />
      <NotificationManager />
    </div>
  );
}

export default function EmailSenderPage() {
    return (
        <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <EmailSenderContent />
        </Suspense>
    )
}
