import axios from 'axios';
import { Solicitud, SolicitudRequest } from '../types/solicitud';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/solicitudes';

export const solicitudService = {
    // Obtener todas las solicitudes
    getAll: async (): Promise<Solicitud[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // Obtener ordenadas por prioridad
    getPriorizadas: async (): Promise<Solicitud[]> => {
        const response = await axios.get(`${API_URL}/priorizadas`);
        return response.data;
    },

    // Crear nueva solicitud
    create: async (solicitud: SolicitudRequest): Promise<Solicitud> => {
        const response = await axios.post(API_URL, solicitud);
        return response.data;
    },

};
