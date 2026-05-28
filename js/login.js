// Contraseña correcta (123 como se especificó)
const CONTRASENA_CORRECTA = '123';

function verificarLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const mensajeError = document.getElementById('mensajeError');
    
    // Limpiar mensaje de error anterior
    mensajeError.textContent = '';
    
    // Validar contraseña (la contraseña es 123)
    if (contrasena === CONTRASENA_CORRECTA) {
        // Login exitoso - redirigir a escritorio.html
        window.location.href = 'escritorio.html';
    } else {
        // Mostrar error
        mensajeError.textContent = 'Contraseña incorrecta. Intente nuevamente.';
        document.getElementById('loginForm').reset();
    }
}
