/**
 * Gestor de aplicaciones - Patrón Singleton
 * Responsable de registrar, ejecutar y gestionar aplicaciones (Inversión de Control)
 */
class ApplicationManager {
    constructor(windowsContainer) {
        this.applications = new Map();
        this.runningWindows = new Map();
        this.windowsContainer = windowsContainer;
    }

    /**
     * Registra una nueva aplicación
     * @param {Application} application - Instancia de una aplicación
     */
    registerApplication(application) {
        if (!(application instanceof Application)) {
            throw new Error('La aplicación debe heredar de la clase Application');
        }
        this.applications.set(application.name, application);
    }

    /**
     * Obtiene una aplicación registrada por nombre
     */
    getApplication(name) {
        return this.applications.get(name);
    }

    /**
     * Obtiene todas las aplicaciones registradas
     */
    getAllApplications() {
        return Array.from(this.applications.values());
    }

    /**
     * Ejecuta/abre una aplicación
     */
    launchApplication(name) {
        const application = this.getApplication(name);
        if (!application) {
            console.error(`Aplicación '${name}' no encontrada`);
            return;
        }

        // Si ya hay una ventana abierta del mismo tipo, ciérrala antes de abrir la nueva
        if (this.runningWindows.has(name)) {
            const existingWindow = this.runningWindows.get(name);
            try { existingWindow.close(); } catch (e) { /* ignore */ }
            this.runningWindows.delete(name);
        }

        // Crear nueva ventana con callback para cuando se cierre
        const window = new ApplicationWindow(
            application,
            this.windowsContainer,
            () => this.runningWindows.delete(name)
        );
        this.runningWindows.set(name, window);
    }

    /**
     * Cierra una aplicación
     */
    closeApplication(name) {
        if (this.runningWindows.has(name)) {
            const window = this.runningWindows.get(name);
            window.close();
            this.runningWindows.delete(name);
        }
    }

    /**
     * Cierra todas las aplicaciones abiertas
     */
    closeAllApplications() {
        this.runningWindows.forEach((window, name) => {
            window.close();
        });
        this.runningWindows.clear();
    }
}
