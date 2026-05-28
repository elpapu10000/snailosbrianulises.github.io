/**
 * Aplicación de Información del Sistema
 * Información de hardware y recursos del sistema (REAL + SIMULADO)
 */
class SystemInfoApp extends Application {
    constructor() {
        super(
            'Información del Sistema',
            'Información de hardware y recursos',
            '💾',
            null
        );
        this.hardwareInfo = this.getHardwareInfo();
    }

    /**
     * Obtiene información real del hardware o simula si no está disponible
     */
    getHardwareInfo() {
        const cpuCores = navigator.hardwareConcurrency || this.randomRange(4, 16);
        const totalRAM = navigator.deviceMemory || this.randomRange(8, 32);
        
        return {
            cpu: {
                cores: cpuCores,
                threads: cpuCores * 2,
                baseSpeed: this.randomRange(2.0, 3.5),
                maxSpeed: this.randomRange(4.0, 5.5),
                model: this.getRandomCPUModel(),
                cache: this.randomRange(8, 32) + ' MB'
            },
            ram: {
                total: totalRAM,
                type: this.getRandomRAMType(),
                speed: this.randomRange(2400, 3600) + ' MHz',
                used: this.randomRange(Math.floor(totalRAM * 0.3), Math.floor(totalRAM * 0.75))
            },
            storage: {
                total: this.randomRange(256, 2000),
                type: this.getRandomStorageType(),
                used: this.randomRange(100, 1500),
                readSpeed: this.randomRange(2500, 4000) + ' MB/s',
                writeSpeed: this.randomRange(2000, 3500) + ' MB/s'
            },
            display: {
                width: window.innerWidth || screen.width,
                height: window.innerHeight || screen.height,
                refreshRate: this.randomRange(60, 144),
                model: this.getRandomMonitorModel()
            },
            connection: {
                type: navigator.connection?.effectiveType || 'wifi',
                speed: navigator.connection?.downlink || this.randomRange(50, 300),
                ip: this.generateRandomIP(),
                publicIP: this.generateRandomIP()
            },
            devices: this.getDevicesList(),
            os: this.getOSInfo()
        };
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        const hw = this.hardwareInfo;
        return `
            <div class="sysinfo-container">
                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Procesador</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Modelo:</span>
                            <span class="detail-value">${hw.cpu.model}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Núcleos:</span>
                            <span class="detail-value">${hw.cpu.cores} núcleos / ${hw.cpu.threads} hilos</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad Base:</span>
                            <span class="detail-value">${hw.cpu.baseSpeed.toFixed(1)} GHz</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad Máxima:</span>
                            <span class="detail-value">${hw.cpu.maxSpeed.toFixed(1)} GHz (Turbo)</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Caché L3:</span>
                            <span class="detail-value">${hw.cpu.cache}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Uso Actual:</span>
                            <div class="usage-bar">
                                <div class="usage-fill" id="cpuUsage" style="width: 45%"></div>
                            </div>
                            <span class="detail-value" id="cpuPercentage">45%</span>
                        </div>
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Memoria RAM</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Capacidad Total:</span>
                            <span class="detail-value">${hw.ram.total} GB</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Tipo:</span>
                            <span class="detail-value">${hw.ram.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad:</span>
                            <span class="detail-value">${hw.ram.speed}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Ranuras Utilizadas:</span>
                            <span class="detail-value">4 de 4</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Uso Actual:</span>
                            <div class="usage-bar">
                                <div class="usage-fill" id="ramUsage" style="width: 60%"></div>
                            </div>
                            <span class="detail-value" id="ramPercentage">${hw.ram.used} GB / ${hw.ram.total} GB (${Math.round(hw.ram.used/hw.ram.total*100)}%)</span>
                        </div>
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Almacenamiento</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Disco Duro Primario:</span>
                            <span class="detail-value">${hw.storage.total} GB ${hw.storage.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Espacio Utilizado:</span>
                            <div class="usage-bar">
                                <div class="usage-fill" id="storageUsage" style="width: ${Math.round(hw.storage.used/hw.storage.total*100)}%"></div>
                            </div>
                            <span class="detail-value" id="storagePercentage">${hw.storage.used} GB / ${hw.storage.total} GB (${Math.round(hw.storage.used/hw.storage.total*100)}%)</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad Lectura:</span>
                            <span class="detail-value">${hw.storage.readSpeed}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad Escritura:</span>
                            <span class="detail-value">${hw.storage.writeSpeed}</span>
                        </div>
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Pantalla</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Resolución:</span>
                            <span class="detail-value">${hw.display.width} x ${hw.display.height}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Modelo:</span>
                            <span class="detail-value">${hw.display.model}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Tasa de Refresco:</span>
                            <span class="detail-value">${hw.display.refreshRate} Hz</span>
                        </div>
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Conexión de Red</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Tipo de Conexión:</span>
                            <span class="detail-value">${hw.connection.type.toUpperCase()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad (Down):</span>
                            <span class="detail-value">${hw.connection.speed.toFixed(0)} Mbps</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">IP Local:</span>
                            <span class="detail-value">${hw.connection.ip}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">IP Pública:</span>
                            <span class="detail-value">${hw.connection.publicIP}</span>
                        </div>
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Dispositivos Conectados</h3>
                    <div class="devices-section">
                        ${hw.devices.map(device => `
                            <div class="device-card">
                                <div class="device-icon">${device.icon}</div>
                                <div class="device-info">
                                    <div class="device-name">${device.name}</div>
                                    <div class="device-detail">${device.model}</div>
                                    <div class="device-status connected">Conectado</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="sysinfo-section">
                    <h3 class="sysinfo-title">Sistema Operativo</h3>
                    <div class="sysinfo-details">
                        <div class="detail-item">
                            <span class="detail-label">Navegador:</span>
                            <span class="detail-value">${hw.os.browser}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Plataforma:</span>
                            <span class="detail-value">${hw.os.platform}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Agente de Usuario:</span>
                            <span class="detail-value" style="font-size: 0.75em; word-break: break-all;">${hw.os.userAgent}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Soporte TouchScreen:</span>
                            <span class="detail-value">${hw.os.touchPoints > 0 ? 'Sí' : 'No'}</span>
                        </div>
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
            .sysinfo-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1e1e1e;
                color: #ffffff;
                overflow-y: auto;
                padding: 15px;
                gap: 15px;
            }

            .sysinfo-section {
                background: #2d2d2d;
                border-radius: 8px;
                padding: 15px;
                border: 1px solid #404040;
            }

            .sysinfo-title {
                color: #00ff88;
                margin: 0 0 12px 0;
                font-size: 1.1em;
                border-bottom: 2px solid #00ff88;
                padding-bottom: 8px;
            }

            .sysinfo-details {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background: #0a1a3a;
                border-radius: 4px;
                border-left: 3px solid #0066ff;
            }

            .detail-label {
                color: #b0b0b0;
                font-weight: 500;
                min-width: 150px;
            }

            .detail-value {
                color: #00ff88;
                font-family: monospace;
                font-weight: bold;
                text-align: right;
            }

            .usage-bar {
                flex: 1;
                height: 20px;
                background: #3e3e3e;
                border-radius: 4px;
                overflow: hidden;
                margin: 0 10px;
            }

            .usage-fill {
                height: 100%;
                background: linear-gradient(90deg, #0066ff, #00ff88);
                transition: width 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75em;
                font-weight: bold;
                color: white;
            }

            .devices-section {
                display: grid;
                grid-template-columns: 1fr;
                gap: 10px;
            }

            .device-card {
                background: #0a1a3a;
                padding: 12px;
                border-radius: 6px;
                border-left: 3px solid #ff9800;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .device-icon {
                font-size: 1.8em;
            }

            .device-info {
                flex: 1;
            }

            .device-name {
                font-weight: bold;
                color: #00ff88;
                margin-bottom: 4px;
            }

            .device-detail {
                font-size: 0.85em;
                color: #b0b0b0;
                margin-bottom: 4px;
            }

            .device-status {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 3px;
                font-size: 0.8em;
                font-weight: bold;
            }

            .device-status.connected {
                background: #00ff88;
                color: #000000;
            }

            .device-status.disconnected {
                background: #ff4444;
                color: #ffffff;
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        // Simular cambios en el uso de recursos
        setInterval(() => {
            const cpuUsage = windowElement.querySelector('#cpuUsage');
            const cpuPercentage = windowElement.querySelector('#cpuPercentage');
            const ramUsage = windowElement.querySelector('#ramUsage');
            const ramPercentage = windowElement.querySelector('#ramPercentage');

            // CPU entre 20% y 80%
            const cpuPercent = Math.random() * 60 + 20;
            cpuUsage.style.width = cpuPercent + '%';
            cpuPercentage.textContent = Math.round(cpuPercent) + '%';

            // RAM variable basada en total real
            const maxRAMPercent = Math.floor((this.hardwareInfo.ram.used / this.hardwareInfo.ram.total) * 100);
            const ramPercent = Math.random() * 25 + Math.max(30, maxRAMPercent - 25);
            ramUsage.style.width = ramPercent + '%';
            const ramUsedGB = (ramPercent / 100 * this.hardwareInfo.ram.total).toFixed(1);
            ramPercentage.textContent = ramUsedGB + ' GB / ' + this.hardwareInfo.ram.total + ' GB (' + Math.round(ramPercent) + '%)';
        }, 1500);
    }

    onClose() {
        super.onClose();
    }

    // ===== FUNCIONES AUXILIARES =====

    randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomIP() {
        return `${this.randomRange(1, 255)}.${this.randomRange(0, 255)}.${this.randomRange(0, 255)}.${this.randomRange(1, 255)}`;
    }

    getRandomCPUModel() {
        const cpuModels = [
            'Intel Core i9-13900KS',
            'Intel Core i9-13900K',
            'Intel Core i7-13700K',
            'Intel Core i5-13600K',
            'AMD Ryzen 9 7950X',
            'AMD Ryzen 9 7900X',
            'AMD Ryzen 7 7700X',
            'AMD Ryzen 5 7600X',
            'Apple M2 Pro',
            'Apple M2 Max',
            'Intel Core i9-12900K',
            'AMD Ryzen 9 5950X'
        ];
        return cpuModels[Math.floor(Math.random() * cpuModels.length)];
    }

    getRandomRAMType() {
        const types = [
            'DDR5 5600 MHz',
            'DDR5 6000 MHz',
            'DDR5 6400 MHz',
            'DDR4 3200 MHz',
            'DDR4 3600 MHz',
            'LPDDR5X'
        ];
        return types[Math.floor(Math.random() * types.length)];
    }

    getRandomStorageType() {
        const types = [
            'NVMe SSD',
            'NVMe M.2 SSD',
            'SATA SSD',
            'HDD 7200RPM',
            'NVMe PCIe 4.0'
        ];
        return types[Math.floor(Math.random() * types.length)];
    }

    getRandomMonitorModel() {
        const monitors = [
            'LG 27" 4K IPS',
            'Dell U2723DE',
            'ASUS ProArt 32"',
            'BenQ EW2880U',
            'LG 32" OLED',
            'Samsung C49RG90',
            'AOC G2 27" 240Hz',
            'MSI MPG321UR-QD',
            'HP E24 G5',
            'Acer B227Q'
        ];
        return monitors[Math.floor(Math.random() * monitors.length)];
    }

    getDevicesList() {
        const allDevices = [
            { name: 'Mouse', icon: '🖱️', model: 'Logitech MX Master 3' },
            { name: 'Teclado', icon: '⌨️', model: 'Corsair K95 RGB' },
            { name: 'Monitor', icon: '🖥️', model: 'LG 27" 4K' },
            { name: 'Webcam', icon: '📹', model: 'Logitech C920 HD' },
            { name: 'Impresora', icon: '🖨️', model: 'HP LaserJet Pro' },
            { name: 'Auriculares', icon: '🎧', model: 'Sony WH-1000XM5' },
            { name: 'Micrófono', icon: '🎤', model: 'Blue Yeti X' },
            { name: 'Escáner', icon: '📸', model: 'Epson GT-S85' }
        ];

        // Seleccionar 5 dispositivos aleatorios
        const shuffled = allDevices.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
    }

    getOSInfo() {
        return {
            browser: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                     navigator.userAgent.includes('Firefox') ? 'Firefox' :
                     navigator.userAgent.includes('Safari') ? 'Safari' :
                     navigator.userAgent.includes('Edge') ? 'Edge' : 'Navegador Desconocido',
            platform: navigator.platform || 'Desconocida',
            userAgent: navigator.userAgent,
            touchPoints: navigator.maxTouchPoints || 0
        };
    }
}

