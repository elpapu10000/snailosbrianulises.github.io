/**
 * Aplicación de Configuración
 * Ajustes del sistema
 */
class SettingsApp extends Application {
    constructor() {
        super(
            'Configuración',
            'Ajustes del sistema',
            '⚙️',
            null
        );
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="settings-container">
                <div class="settings-panel">
                    <h3 class="settings-category">Pantalla</h3>
                    <div class="settings-item">
                        <label>Brillo:</label>
                        <input type="range" id="brightnessSlider" min="20" max="100" value="100" class="settings-slider">
                        <span id="brightnessValue">100%</span>
                    </div>
                    <div class="settings-item">
                        <label>Resolución:</label>
                        <select id="resolutionSelect" class="settings-select">
                            <option>1920x1080</option>
                            <option>1280x720</option>
                            <option>1366x768</option>
                            <option>2560x1440</option>
                        </select>
                    </div>
                    <div class="settings-item">
                        <label>
                            <input type="checkbox" id="darkModeToggle" checked> Modo Oscuro
                        </label>
                    </div>
                </div>

                <div class="settings-panel">
                    <h3 class="settings-category">Audio</h3>
                    <div class="settings-item">
                        <label>Volumen General:</label>
                        <input type="range" id="volumeSlider" min="0" max="100" value="70" class="settings-slider">
                        <span id="volumeValue">70%</span>
                    </div>
                    <div class="settings-item">
                        <label>
                            <input type="checkbox" id="mutToggle"> Silenciar
                        </label>
                    </div>
                </div>

                <div class="settings-panel">
                    <h3 class="settings-category">Sistema</h3>
                    <div class="settings-item">
                        <label>Nombre del Equipo:</label>
                        <input type="text" id="deviceNameInput" value="SnailOS-PC" class="settings-input">
                    </div>
                    <div class="settings-item">
                        <label>Zona Horaria:</label>
                        <select id="timezoneSelect" class="settings-select">
                            <option>GMT-5 (América Central)</option>
                            <option>GMT-3 (América del Sur)</option>
                            <option>GMT (Londres)</option>
                            <option>GMT+1 (Europa Central)</option>
                            <option>GMT+8 (Asia Oriental)</option>
                        </select>
                    </div>
                    <div class="settings-item">
                        <label>
                            <input type="checkbox" id="autoUpdateToggle" checked> Actualizaciones Automáticas
                        </label>
                    </div>
                </div>

                <div class="settings-panel">
                    <h3 class="settings-category">Privacidad</h3>
                    <div class="settings-item">
                        <label>
                            <input type="checkbox" id="analyticsToggle"> Enviar datos de análisis
                        </label>
                    </div>
                    <div class="settings-item">
                        <button class="settings-btn" id="resetBtn">🔄 Restaurar Valores Predeterminados</button>
                    </div>
                </div>

                <div class="settings-panel">
                    <button class="settings-btn primary" id="saveSettingsBtn">💾 Guardar Cambios</button>
                </div>
            </div>
        `;
    }

    /**
     * Estilos específicos para esta aplicación
     */
    getStyles() {
        return `
            .settings-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1e1e1e;
                color: #ffffff;
                overflow-y: auto;
                padding: 15px;
                gap: 15px;
            }

            .settings-panel {
                background: #2d2d2d;
                border-radius: 8px;
                padding: 15px;
                border: 1px solid #404040;
            }

            .settings-category {
                color: #00ff88;
                margin: 0 0 12px 0;
                font-size: 1em;
                border-bottom: 2px solid #00ff88;
                padding-bottom: 8px;
            }

            .settings-item {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 12px 0;
            }

            .settings-item label {
                flex: 0 0 150px;
                font-size: 0.95em;
                color: #b0b0b0;
            }

            .settings-item input[type="text"],
            .settings-item select {
                flex: 1;
                padding: 8px;
                background: #0a1a3a;
                color: #ffffff;
                border: 1px solid #0d3d7a;
                border-radius: 4px;
                font-size: 0.9em;
            }

            .settings-item input[type="text"]:focus,
            .settings-item select:focus {
                outline: none;
                border-color: #00ff88;
                box-shadow: 0 0 5px rgba(0, 255, 136, 0.3), inset 0 0 5px rgba(0, 102, 255, 0.2);
            }

            .settings-slider {
                flex: 1;
                max-width: 150px;
            }

            .settings-item span {
                color: #00ff88;
                font-weight: bold;
                min-width: 50px;
                text-align: right;
            }

            .settings-item input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .settings-btn {
                padding: 10px 20px;
                background: #0066ff;
                color: #ffffff;
                border: 1px solid #003d99;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.95em;
                transition: all 0.2s ease;
                width: 100%;
            }

            .settings-btn:hover {
                background: #0052cc;
                border-color: #002966;
            }

            .settings-btn.primary {
                background: #00ff88;
                border-color: #00cc6a;
                color: #000000;
                margin-top: 10px;
            }

            .settings-btn.primary:hover {
                background: #00d975;
                border-color: #009944;
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        const brightnessSlider = windowElement.querySelector('#brightnessSlider');
        const brightnessValue = windowElement.querySelector('#brightnessValue');
        const volumeSlider = windowElement.querySelector('#volumeSlider');
        const volumeValue = windowElement.querySelector('#volumeValue');
        const saveBtn = windowElement.querySelector('#saveSettingsBtn');
        const resetBtn = windowElement.querySelector('#resetBtn');
        const deviceNameInput = windowElement.querySelector('#deviceNameInput');

        // Cargar configuración guardada
        const saved = localStorage.getItem('systemSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            brightnessSlider.value = settings.brightness || 100;
            volumeSlider.value = settings.volume || 70;
            deviceNameInput.value = settings.deviceName || 'SnailOS-PC';
        }

        brightnessValue.textContent = brightnessSlider.value + '%';
        volumeValue.textContent = volumeSlider.value + '%';

        // Cambiar brillo
        brightnessSlider.addEventListener('input', (e) => {
            brightnessValue.textContent = e.target.value + '%';
            document.documentElement.style.filter = `brightness(${e.target.value}%)`;
        });

        // Cambiar volumen
        volumeSlider.addEventListener('input', (e) => {
            volumeValue.textContent = e.target.value + '%';
        });

        // Guardar configuración
        saveBtn.addEventListener('click', () => {
            const settings = {
                brightness: brightnessSlider.value,
                volume: volumeSlider.value,
                deviceName: deviceNameInput.value
            };
            localStorage.setItem('systemSettings', JSON.stringify(settings));
            alert('Configuración guardada correctamente');
        });

        // Restaurar valores predeterminados
        resetBtn.addEventListener('click', () => {
            if (confirm('¿Deseas restaurar los valores predeterminados?')) {
                brightnessSlider.value = 100;
                volumeSlider.value = 70;
                deviceNameInput.value = 'SnailOS-PC';
                brightnessValue.textContent = '100%';
                volumeValue.textContent = '70%';
                localStorage.removeItem('systemSettings');
                alert('Valores restaurados');
            }
        });
    }

    onClose() {
        super.onClose();
    }
}
