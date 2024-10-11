export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        // Opciones para mejorar la precisión
        const options = {
            enableHighAccuracy: true, // Habilita alta precisión
            timeout: 5000, // Tiempo máximo para obtener la ubicación en milisegundos
            maximumAge: 0 // No usar una ubicación en caché
        };

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                resolve([longitude, latitude]);
            },
            (err) => {
                console.error('Error obteniendo la geolocalización', err);
                reject(err); // Rechazar la promesa con el error
            },
            options // Pasa las opciones al método
        );
    });
};
