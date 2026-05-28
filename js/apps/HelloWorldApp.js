/**
 * Aplicación de prueba HelloWorld
 * Ejemplo de implementación de una aplicación personalizada
 */
class HelloWorldApp extends Application {
    constructor() {
        super(
            'Hello World',
            'Una simple aplicación de prueba',
            '👋',
            '../img/apps/helloworld-app.svg'
        );
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="hello-world-container">
                <div class="hello-world-text">
                    <h1>Hello World</h1>
                    <p>¡Bienvenido a FutureOS!</p>
                    <p>Esta es una aplicación de prueba que demuestra el sistema de aplicaciones.</p>
                </div>
            </div>
        `;
    }

    /**
     * Estilos específicos para esta aplicación
     */
    getStyles() {
        return `
            .hello-world-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 102, 255, 0.1));
            }
            
            .hello-world-text {
                text-align: center;
                color: white;
            }
            
            .hello-world-text h1 {
                font-size: 2.5em;
                margin-bottom: 20px;
                color: #00ff88;
            }
            
            .hello-world-text p {
                font-size: 1.1em;
                opacity: 0.9;
                margin: 10px 0;
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        console.log('HelloWorldApp abierta');
    }

    /**
     * Método llamado cuando se cierra la aplicación
     */
    onClose() {
        super.onClose();
        console.log('HelloWorldApp cerrada');
    }
}
