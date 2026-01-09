// Tipos de solicitud disponibles
export type TipoSolicitud = 'INCIDENTE' | 'REQUERIMIENTO' | 'CONSULTA';

// Solicitud completa (respuesta del backend)
export interface Solicitud {
    id: number;
    tipo: TipoSolicitud;
    prioridadManual: number;
    fechaCreacion: string;
    usuario: string;
    prioridadCalculada: number;
}

// Datos para crear una solicitud
export interface SolicitudRequest {
    tipo: TipoSolicitud;
    prioridadManual: number;
    usuario: string;
}
