'use client';

import { useState, useEffect, useCallback } from 'react';
import { Solicitud } from '../types/solicitud';
import { solicitudService } from '../services/solicitudService';
import SolicitudForm from '../components/SolicitudForm';
import SolicitudList from '../components/SolicitudList';

export default function Home() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar solicitudes priorizadas
  const loadSolicitudes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await solicitudService.getPriorizadas();
      setSolicitudes(data);
    } catch {
      // Error handling
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al montar el componente
  useEffect(() => {
    loadSolicitudes();
  }, [loadSolicitudes]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Motor de Reglas de Priorización
        </h1>
      </header>

      {/* Formulario y Lista */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <aside>
          <SolicitudForm onSolicitudCreated={loadSolicitudes} />
        </aside>
        
        <section>
          <SolicitudList solicitudes={solicitudes} loading={loading} />
        </section>
      </div>
    </main>
  );
}
