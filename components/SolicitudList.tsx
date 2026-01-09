import { Solicitud } from '../types/solicitud';
import SolicitudCard from './SolicitudCard';

interface SolicitudListProps {
    solicitudes: Solicitud[];
    loading: boolean;
}

export default function SolicitudList({ solicitudes, loading }: SolicitudListProps) {
    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Cola de Priorización</h2>
                <div className="flex flex-col items-center py-8 text-gray-500">
                    Cargando...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Cola de Priorización</h2>
                <span className="px-3 py-1 text-sm">
                    {solicitudes.length} solicitudes
                </span>
            </div>

            {/* Lista o estado vacío */}
            {solicitudes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-3xl mb-2">📭</p>
                    <p>No hay solicitudes</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {solicitudes.map((solicitud, index) => (
                        <SolicitudCard
                            key={solicitud.id}
                            solicitud={solicitud}
                            posicion={index + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
