'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { LoginFormData, SignupFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/ai/flows/welcome-email-flow';
import { sendMembershipEmail } from '@/ai/flows/membership-email-flow';
import { sendNewUserAdminNotification } from '@/ai/flows/new-user-admin-notification-flow';

interface AuthContextType {
  user: User | null;
  rol: string | null;
  isAdmin: boolean;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function translateErrorMessage(message: string): string {
    if (message.includes('Invalid login credentials')) {
        return 'El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo.';
    }
    if (message.includes('User already registered')) {
        return 'Este correo electrónico ya está registrado. Por favor, inicia sesión o utiliza otro correo.';
    }
    if (message.includes('Email rate limit exceeded')) {
        return 'Se han enviado demasiadas solicitudes. Por favor, espera un momento antes de intentarlo de nuevo.';
    }
    return 'Ha ocurrido un error inesperado. Por favor, contacta con el soporte si el problema persiste.';
}

export function AuthProvider({ children, serverSession }: { children: ReactNode, serverSession: Session | null }) {
  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch (error) {
      console.error('Error initializing Supabase browser client:', error);
      return null;
    }
  }, []);
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(serverSession?.user ?? null);
  const [rol, setRol] = useState<string | null>(null);
  const [loading, setLoading] = useState(!serverSession);
  const previousRol = useRef<string | null>(null);

  useEffect(() => {
    previousRol.current = rol;
  }, [rol]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchUserRole = async (userId: string | undefined) => {
        if (!userId) return null;
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .select('role')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching user role:', error.message);
                return null;
            }
            return data?.role || null;
        } catch (e) {
            console.error('Exception fetching user role:', e);
            return null;
        }
    };

    const manageSession = async (session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        const newRol = await fetchUserRole(currentUser?.id);
        setRol(newRol);

        // Check for role upgrade to trigger membership email
        if (currentUser && previousRol.current === 'subscriber' && newRol === 'miembro' && currentUser.email) {
            sendMembershipEmail({ email: currentUser.email }).catch(console.error);
        }
        
        setLoading(false);
    };

    // If there's a server session, manage it right away.
    if (serverSession) {
        manageSession(serverSession);
    }
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // onAuthStateChange will also be triggered on initial load, but we can just re-run our logic.
        // It's especially important for handling logins/logouts on other tabs.
        manageSession(session);
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const login = async ({ email, password }: LoginFormData) => {
    if (!supabase) {
      console.error('Supabase client is not initialized during login.');
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: 'Servicio de autenticación no configurado.',
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: translateErrorMessage(error.message),
      });
      setLoading(false);
    } else {
      router.push('/');
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente.',
      });
    }
  };

  const signup = async ({ email, password, firstName, lastName }: SignupFormData) => {
    if (!supabase) {
      console.error('Supabase client is not initialized during signup.');
      toast({
        variant: 'destructive',
        title: 'Error en el registro',
        description: 'Servicio de autenticación no configurado.',
      });
      return;
    }
    setLoading(true);
    const { data: signupData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
  
    if (error) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Error en el registro',
        description: translateErrorMessage(error.message),
      });
      setLoading(false);
      return;
    }
    
    if (signupData.user) {
        // Enviar correos después de un registro exitoso.
        // AHORA SE ESPERAN (AWAIT) PARA ASEGURAR QUE SE ENVÍEN CORRECTAMENTE
        try {
            await Promise.all([
                sendWelcomeEmail({ firstName, email }),
                sendNewUserAdminNotification({ firstName, lastName, email })
            ]);
        } catch (err) {
            console.error("Error al enviar correos después del registro:", err);
        }
    }
    
    toast({
        title: '¡Cuenta Creada!',
        description: 'Registro completado. Ahora elige tu membresía para acceder al curso y a todos los recursos.',
    });
    
    router.push('/membresia');
  };

  const logout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
    }
    setUser(null);
    setRol(null);
    router.push('/login');
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      console.error('Supabase client is not initialized during resetPassword.');
      toast({
        variant: 'destructive',
        title: 'Error al restablecer',
        description: 'Servicio de autenticación no configurado.',
      });
      return;
    }
    setLoading(true);
    const redirectTo = `https://fredegapro.com/auth/callback?next=/account`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      console.error('Reset password error:', error);
      toast({
        variant: 'destructive',
        title: 'Error al restablecer',
        description: translateErrorMessage(error.message),
      });
    } else {
      toast({
        title: 'Correo enviado',
        description: 'Revisa tu bandeja de entrada (o spam) para restablecer tu contraseña.',
      });
    }
    setLoading(false);
  };
  
  const value: AuthContextType = {
    user,
    rol,
    isAdmin: rol === 'admin',
    loading,
    login,
    signup,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
