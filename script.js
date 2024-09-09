document.addEventListener('DOMContentLoaded', function() {
    // Datos guardados en localStorage
    const localStorageKey = 'datosGuardados';
    const datosGuardados = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    // Función para guardar datos
    window.guardarDatos = function() {
        const form = document.getElementById('registrationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');

        // Obtener los datos del formulario
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Guardar los datos en el arreglo
        datosGuardados.push(data);
        localStorage.setItem(localStorageKey, JSON.stringify(datosGuardados));

        // Mostrar mensaje de confirmación
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);

        // Limpiar el formulario
        form.reset();
    };

    // Función para buscar datos
    window.buscarDatos = function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const fichaContainer = document.getElementById('fichaContainer');
        const fichaContent = document.getElementById('fichaContent');

        // Buscar en los datos guardados
        const encontrado = datosGuardados.find(data => data.nombre.toLowerCase().includes(searchInput));

        if (encontrado) {
            fichaContent.innerHTML = Object.entries(encontrado).map(([key, value]) => 
                `<strong>${key.replace(/-/g, ' ').toUpperCase()}:</strong> ${value}`
            ).join('<br>');
            fichaContainer.style.display = 'block';
        } else {
            fichaContent.innerHTML = '<strong>No se encontraron datos para el nombre ingresado.</strong>';
            fichaContainer.style.display = 'block';
        }
    };

    // Event listener para el botón de guardar
    document.getElementById('saveButton').addEventListener('click', guardarDatos);

    // Event listener para el botón de búsqueda
    document.getElementById('searchButton').addEventListener('click', buscarDatos);
});
