
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Check } from 'lucide-react';

const paymentMethodsByCountry: Record<string, string[]> = {
  'Argentina': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Mercado Pago', 'PayPal', 'Google Pay', 'Dos tarjetas', 'Western Union (Manual)'],
  'México': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'OXXO', 'PayPal', 'Mercado Pago', 'SPEI', 'Dos tarjetas', 'Western Union (Manual)'],
  'Colombia': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PSE', 'Efecty', 'Nequi (Manual)', 'PayPal', 'Bancolombia', 'Western Union (Manual)'],
  'Perú': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Yape', 'PagoEfectivo', 'PayPal', 'Dos tarjetas', 'Western Union (Manual)'],
  'Chile': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Sencillito', 'PayPal', 'Dos tarjetas', 'MACH', 'Servipag', 'Western Union (Manual)'],
  'Venezuela': ['Tarjeta de Crédito', 'Western Union (Manual)'],
  'España': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Google Pay', 'Dos tarjetas', 'Western Union (Manual)'],
  'Estados Unidos': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Google Pay', 'Venmo', 'PayPal Credit', 'Dos tarjetas', 'Western Union (Manual)'],
  'Bolivia': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Western Union (Manual)'],
  'Costa Rica': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Western Union (Manual)'],
  'El Salvador': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Western Union (Manual)'],
  'Honduras': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Western Union (Manual)'],
  'Uruguay': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Mercado Pago', 'Western Union (Manual)'],
  'Paraguay': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Mercado Pago', 'Western Union (Manual)'],
  'Otros Países': ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Google Pay', 'Dos tarjetas de crédito', 'Klarna (Europa + EE. UU.)', 'Western Union (Manual)'],
};

const countries = Object.keys(paymentMethodsByCountry);

export function PaymentMethods() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Globe className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Conoce Los Medios De Pagos En Cada País</CardTitle>
            <CardDescription>Elija un país para conocer sus medios de pago.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedCountry} onValueChange={setSelectedCountry}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto flex-wrap">
            {countries.map((country) => (
              <TabsTrigger key={country} value={country}>
                {country}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-4">Métodos de pago en {selectedCountry}:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
            {paymentMethodsByCountry[selectedCountry].map((method) => (
              <div key={method} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>{method}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
