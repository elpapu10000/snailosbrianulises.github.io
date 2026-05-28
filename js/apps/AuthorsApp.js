/**
 * Aplicación Autores
 * Muestra información sobre los autores y la filosofía del sistema.
 */
class AuthorsApp extends Application {
    constructor() {
        super(
            'Autores',
            'Información de los autores y detalles del sistema',
            '👥',
            null
        );
    }

    getWindowContent() {
        return `
            <div class="authors-app-container">
                <div class="authors-card">
                    <h2>Autores</h2>
                    <p><strong>Brian Mendez</strong> y <strong>Ulises Battaglini</strong></p>
                </div>

                <div class="authors-card">
                    <h2>Creado con IA generativa</h2>
                    <p>Desarrollado usando tecnologías de inteligencia artificial generativa, con Claude integrado a GitHub Copilot.</p>
                </div>

                <div class="authors-card">
                    <h2>Arquitectura</h2>
                    <p>Construido con programación orientada a objetos y modularización para mantener el código organizado y reutilizable.</p>
                </div>

                <div class="authors-card">
                    <h2>Diseño</h2>
                    <p>Diseñado para ser usable en dispositivos móviles y computadoras, con diseño adaptable y una experiencia coherente en ambos.</p>
                </div>

                <div class="authors-card">
                    <h2>Ventajas de los OS web</h2>
                    <ul>
                        <li>Acceso rápido desde el navegador sin instalación.</li>
                        <li>Actualizaciones centralizadas y mantenimiento simplificado.</li>
                        <li>Compatibilidad multiplataforma y respuesta inmediata.</li>
                    </ul>
                </div>

                <div class="authors-card">
                    <h2>Desventajas</h2>
                    <ul>
                        <li>Dependencia de conexión a internet para muchas funciones.</li>
                        <li>Limitaciones en acceso directo a hardware comparado con apps nativas.</li>
                        <li>Rendimiento puede ser inferior en tareas muy pesadas.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getStyles() {
        return `
            .authors-app-container {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 16px;
                padding: 16px;
                color: #ffffff;
                background: #0f172a;
                height: 100%;
                overflow: auto;
            }

            .authors-card {
                background: #0a1a3a;
                border: 1px solid #0066ff;
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 0 15px rgba(0, 102, 255, 0.15);
            }

            .authors-card h2 {
                margin-top: 0;
                color: #00b3ff;
            }

            .authors-card p,
            .authors-card ul {
                margin: 0;
                line-height: 1.6;
                color: #d6e2ff;
            }

            .authors-card ul {
                padding-left: 18px;
            }

            .authors-card li {
                margin-bottom: 8px;
            }

            @media (max-width: 768px) {
                .authors-app-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
    }
}
