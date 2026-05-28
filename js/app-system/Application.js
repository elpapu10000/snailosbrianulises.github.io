/**
 * Clase base para todas las aplicaciones
 * Implementa la interfaz que todas las apps deben seguir (Principio de Abstracción)
 */
class Application {
    constructor(name, description, icon = '📄', image = null) {
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.image = image;
        this.isRunning = false;
    }

    /**
     * Método que debe implementar cada aplicación
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        throw new Error('getWindowContent() debe ser implementado en las subclases');
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        this.isRunning = true;
    }

    /**
     * Método llamado cuando se cierra la aplicación
     */
    onClose() {
        this.isRunning = false;
    }

    /**
     * Obtiene los estilos CSS específicos de la aplicación (opcional)
     */
    getStyles() {
        return '';
    }
}
