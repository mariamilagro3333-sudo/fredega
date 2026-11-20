-- supabase/migrations/YYYYMMDDHHMMSS_create_usage_tracker_table.sql

-- Creamos la tabla para rastrear el uso de la API de IA
CREATE TABLE IF NOT EXISTS public.usage_tracker (
  -- El identificador puede ser una dirección IP para usuarios anónimos
  -- o un UUID para usuarios registrados. TEXT es flexible para ambos.
  identifier TEXT PRIMARY KEY NOT NULL,

  -- El número de veces que se ha utilizado la función.
  usage_count INTEGER NOT NULL DEFAULT 0,

  -- La fecha y hora de la última vez que se reinició el contador.
  -- Esto permite implementar límites diarios/mensuales.
  last_reset TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Añadimos un comentario para describir el propósito de la tabla
COMMENT ON TABLE public.usage_tracker IS 'Rastrea el uso de funciones de IA para aplicar límites de uso por IP o por usuario.';

-- Añadimos comentarios para cada columna
COMMENT ON COLUMN public.usage_tracker.identifier IS 'La dirección IP del usuario anónimo o el UUID del usuario registrado.';
COMMENT ON COLUMN public.usage_tracker.usage_count IS 'Contador de usos desde el último reinicio.';
COMMENT ON COLUMN public.usage_tracker.last_reset IS 'Timestamp del último reinicio del contador de uso.';
