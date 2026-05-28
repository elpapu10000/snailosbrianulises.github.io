/**
 * Aplicación de Gestor de Redes
 * Información de redes y conexiones
 */
class NetworkManagerApp extends Application {
    constructor() {
        super(
            'Gestor de Redes',
            'Información de redes y conexiones',
            '🌐',
            null
        );
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="network-container">
                <div class="network-section">
                    <h3 class="network-title">Tipos de Redes</h3>
                    <div class="network-types">
                        <div class="network-type">
                            <div class="network-type-name">LAN (Red Local)</div>
                            <div class="network-type-desc">Red de área local. Conecta dispositivos en una pequeña área geográfica como oficinas o hogares.</div>
                        </div>
                        <div class="network-type">
                            <div class="network-type-name">MAN (Red Metropolitana)</div>
                            <div class="network-type-desc">Red de área metropolitana. Cubre una ciudad o campus universitario.</div>
                        </div>
                        <div class="network-type">
                            <div class="network-type-name">WAN (Red Amplia)</div>
                            <div class="network-type-desc">Red de área amplia. Conecta múltiples ciudades o países (ejemplo: Internet).</div>
                        </div>
                        <div class="network-type">
                            <div class="network-type-name">PAN (Red Personal)</div>
                            <div class="network-type-desc">Red de área personal. Conecta dispositivos personales muy cercanos (Bluetooth, NFC).</div>
                        </div>
                    </div>
                </div>

                <div class="network-section">
                    <h3 class="network-title">Conexión de Red Actual</h3>
                    <div class="network-status">
                        <div class="status-item">
                            <span class="status-label">Estado:</span>
                            <span id="connectionStatus" class="status-value connected">Conectado</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Tipo:</span>
                            <span id="connectionType" class="status-value">WiFi</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Velocidad:</span>
                            <span id="connectionSpeed" class="status-value">100 Mbps</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">IP Local:</span>
                            <span id="ipAddress" class="status-value">192.168.1.100</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">IP Pública:</span>
                            <span id="publicIP" class="status-value">203.45.67.89</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">SSID:</span>
                            <span id="ssid" class="status-value">SnailOS-Network</span>
                        </div>
                    </div>
                </div>

                <div class="network-section">
                    <h3 class="network-title">Dispositivos Conectados</h3>
                    <div id="devicesList" class="devices-list">
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Estilos específicos para esta aplicación
     */
    getStyles() {
        return `
            .network-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1e1e1e;
                color: #ffffff;
                overflow-y: auto;
                padding: 15px;
                gap: 20px;
            }

            .network-section {
                background: #2d2d2d;
                border-radius: 8px;
                padding: 15px;
                border: 1px solid #404040;
            }

            .network-title {
                color: #00ff88;
                margin: 0 0 12px 0;
                font-size: 1.1em;
                border-bottom: 2px solid #00ff88;
                padding-bottom: 8px;
            }

            .network-types {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .network-type {
                background: #0a1a3a;
                padding: 10px;
                border-left: 3px solid #00ff88;
                border-radius: 4px;
            }

            .network-type-name {
                font-weight: bold;
                color: #00ff88;
                margin-bottom: 5px;
            }

            .network-type-desc {
                font-size: 0.9em;
                color: #b0b0b0;
                line-height: 1.4;
            }

            .network-status {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }

            .status-item {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background: #0a1a3a;
                border-radius: 4px;
                border: 1px solid #0d3d7a;
            }

            .status-label {
                color: #b0b0b0;
                font-weight: 500;
            }

            .status-value {
                font-family: monospace;
                color: #00ff88;
                font-weight: bold;
            }

            .status-value.connected {
                color: #00ff88;
            }

            .status-value.disconnected {
                color: #ff4444;
            }

            .devices-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .device-item {
                background: #0a1a3a;
                padding: 10px;
                border-left: 3px solid #0066ff;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .device-name {
                font-weight: 500;
                color: #00ff88;
            }

            .device-ip {
                font-size: 0.85em;
                color: #b0b0b0;
                font-family: monospace;
            }

            .device-status {
                font-size: 0.8em;
                padding: 4px 8px;
                background: #00ff88;
                color: #000000;
                border-radius: 3px;
                font-weight: bold;
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        const devicesList = windowElement.querySelector('#devicesList');

        // Generar dispositivos simulados
        const devices = [
            { name: 'PC Principal', ip: '192.168.1.100', status: 'Conectado' },
            { name: 'Smartphone', ip: '192.168.1.105', status: 'Conectado' },
            { name: 'Tablet', ip: '192.168.1.110', status: 'Conectado' },
            { name: 'Smart TV', ip: '192.168.1.115', status: 'Conectado' },
            { name: 'Impresora', ip: '192.168.1.120', status: 'Conectado' }
        ];

        devices.forEach(device => {
            const div = document.createElement('div');
            div.className = 'device-item';
            div.innerHTML = `
                <div>
                    <div class="device-name">📱 ${device.name}</div>
                    <div class="device-ip">${device.ip}</div>
                </div>
                <div class="device-status">${device.status}</div>
            `;
            devicesList.appendChild(div);
        });
    }

    onClose() {
        super.onClose();
    }
}
