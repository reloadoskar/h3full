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

export const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const imagen = new Image();
        imagen.onload = () => {
            canvas.width = imagen.width;
            canvas.height = imagen.height;
            canvas.getContext("2d").drawImage(imagen, 0, 0);
            canvas.toBlob(
                (blob) => {
                    if (blob === null) {
                        return reject(blob);
                    } else {
                        resolve(blob);
                    }
                },
                "image/jpeg",
                porcentajeCalidad / 100
            );
        };
        imagen.src = URL.createObjectURL(imagenComoArchivo);
    });
};