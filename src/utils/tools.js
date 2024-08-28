export function numeroFormateado(numero) {
    return new Intl.NumberFormat("es-MX", { minimumIntegerDigits: 2 }).format(numero)
}

export const nombreDelDiaSegunFecha = fecha => [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
][new Date(fecha).getDay()];