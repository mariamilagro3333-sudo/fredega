'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RegionalContextType {
  isCoastUser: boolean;
  countryCode: string | null;
  isCheckingLocation: boolean;
}

const RegionalContext = createContext<RegionalContextType | undefined>(undefined);

const COAST_DEPARTMENTS = [
  'atlantico', 'atlántico', 'barranquilla', 'soledad',
  'sucre', 'sincelejo',
  'bolivar', 'bolívar', 'cartagena',
  'guajira', 'la guajira', 'riohacha',
  'magdalena', 'santa marta',
  'cordoba', 'córdoba', 'monteria', 'montería',
  'cesar', 'valledupar'
];

export function RegionalProvider({ children }: { children: ReactNode }) {
  const [isCoastUser, setIsCoastUser] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(true);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        const code = data.country_code || null;
        setCountryCode(code);

        if (code === 'CO') {
          const region = (data.region || '').toLowerCase();
          const city = (data.city || '').toLowerCase();
          
          const isFromCoast = COAST_DEPARTMENTS.some(dept => 
            region.includes(dept) || dept.includes(region) || city.includes(dept)
          );

          if (isFromCoast) {
            setIsCoastUser(true);
          }
        }
      } catch (error) {
        console.error('Error al verificar la ubicación regional:', error);
      } finally {
        setIsCheckingLocation(false);
      }
    };

    checkLocation();
  }, []);

  return (
    <RegionalContext.Provider value={{ isCoastUser, countryCode, isCheckingLocation }}>
      {children}
    </RegionalContext.Provider>
  );
}

export function useRegional() {
  const context = useContext(RegionalContext);
  if (context === undefined) {
    throw new Error('useRegional debe usarse dentro de un RegionalProvider');
  }
  return context;
}
