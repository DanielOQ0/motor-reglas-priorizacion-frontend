import { Solicitud, TipoSolicitud } from '../types/solicitud';

interface SolicitudCardProps {
    solicitud: Solicitud;
    posicion: number;
}

// Colores según el tipo de solicitud
const TIPO_COLORS: Record<TipoSolicitud, string> = {
    INCIDENTE: 'bg-yellow-500',
    REQUERIMIENTO: 'bg-purple-500',
    CONSULTA: 'bg-blue-500',
};

export default function SolicitudCard({ solicitud, posicion }: SolicitudCardProps) {
    return (
        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
            {/* Posición en cola */}
            <div className="flex items-center justify-center w-10 h-10 font-bold text-sm">
                #{posicion}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
                {/* Tipo y Prioridad */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`px-2 py-1 text-xs font-semibold text-white rounded ${TIPO_COLORS[solicitud.tipo]}`}>
                        {solicitud.tipo}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                        Prioridad: <strong className="text-gray-900">{solicitud.prioridadCalculada}</strong>
                    </span>
                </div>

                {/* Detalles */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="text-gray-400">Usuario:</span> {solicitud.usuario}</p>
                    <p><span className="text-gray-400">ID:</span> {solicitud.id}</p>
                </div>
            </div>
        </div>
    );
}
