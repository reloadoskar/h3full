export function numeroFormateado(numero) {
    return new Intl.NumberFormat("es-MX", { minimumIntegerDigits: 2 }).format(numero)
}