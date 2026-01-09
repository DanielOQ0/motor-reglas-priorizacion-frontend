import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Solicitud } from '../types/solicitud';
import { solicitudService } from '../services/solicitudService';

// Esquema de validación con Zod
const solicitudSchema = z.object({
    tipo: z.enum(['INCIDENTE', 'REQUERIMIENTO', 'CONSULTA']),
    prioridadManual: z.coerce.number().min(1).max(5),
    usuario: z.string().min(1, 'El usuario es requerido').max(100),
});

const prioridadManual = [1, 2, 3, 4, 5];

type SolicitudFormData = z.output<typeof solicitudSchema>;
type SolicitudFormInput = z.input<typeof solicitudSchema>;

interface SolicitudFormProps {
    onSolicitudCreated: (solicitud: Solicitud) => void;
}

export default function SolicitudForm({ onSolicitudCreated }: SolicitudFormProps) {
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SolicitudFormInput, unknown, SolicitudFormData>({
        resolver: zodResolver(solicitudSchema),
        defaultValues: { tipo: 'CONSULTA', prioridadManual: 3, usuario: '' },
    });

    const onSubmit = async (data: SolicitudFormData) => {
        setSubmitError(null);
        try {
            const nueva = await solicitudService.create(data);
            reset();
            onSolicitudCreated(nueva);
        } catch {
            setSubmitError('Error al crear la solicitud');
        }
    };

    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100";

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Nueva Solicitud</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo <span className="text-red-500">*</span>
                    </label>
                    <select {...register('tipo')} className={inputClass} disabled={isSubmitting}>
                        <option value="INCIDENTE">Incidente</option>
                        <option value="REQUERIMIENTO">Requerimiento</option>
                        <option value="CONSULTA">Consulta</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prioridad Manual <span className="text-red-500">*</span>
                    </label>
                    <select {...register('prioridadManual')} className={inputClass} disabled={isSubmitting}>
                        {prioridadManual.map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('usuario')}
                        placeholder="Nombre del usuario"
                        className={inputClass}
                        disabled={isSubmitting}
                        maxLength={100}
                    />
                    {errors.usuario && (
                        <p className="text-sm text-red-600 mt-1">{errors.usuario.message}</p>
                    )}
                </div>

                {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{submitError}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? 'Creando...' : 'Crear Solicitud'}
                </button>
            </form>
        </div>
    );
}
