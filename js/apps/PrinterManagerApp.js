/**
 * Aplicación de Gestor de Impresoras
 * Gestión de impresoras y cola de impresión
 */
class PrinterManagerApp extends Application {
    constructor() {
        super(
            'Gestor de Impresoras',
            'Gestión de impresoras y trabajos de impresión',
            '🖨️',
            null
        );
        this.printerQueue = [];
        this.printJobIdCounter = 0;
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="printer-container">
                <div class="printer-section">
                    <h3 class="printer-title">Impresoras Disponibles</h3>
                    <div id="printersList" class="printers-list">
                    </div>
                </div>

                <div class="printer-section">
                    <h3 class="printer-title">Enviar a Imprimir</h3>
                    <div class="print-form">
                        <div class="form-group">
                            <label for="documentName">Nombre del documento:</label>
                            <input type="text" id="documentName" placeholder="Mi documento" class="print-input">
                        </div>
                        <div class="form-group">
                            <label for="printPages">Páginas:</label>
                            <select id="printPages" class="print-select">
                                <option>Todas</option>
                                <option>1-5</option>
                                <option>1-10</option>
                                <option>Personalizado</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="printerSelect">Seleccionar impresora:</label>
                            <select id="printerSelect" class="print-select">
                                <option value="HP-Office">HP Office Printer</option>
                                <option value="Canon-Color">Canon Color Printer</option>
                                <option value="Brother-BW">Brother B/W Printer</option>
                            </select>
                        </div>
                        <button id="printBtn" class="print-btn">🖨️ Imprimir</button>
                    </div>
                </div>

                <div class="printer-section">
                    <h3 class="printer-title">Cola de Impresión</h3>
                    <div id="queueList" class="queue-list">
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
            .printer-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1e1e1e;
                color: #ffffff;
                overflow-y: auto;
                padding: 15px;
                gap: 15px;
            }

            .printer-section {
                background: #2d2d2d;
                border-radius: 8px;
                padding: 15px;
                border: 1px solid #404040;
            }

            .printer-title {
                color: #00ff88;
                margin: 0 0 12px 0;
                font-size: 1.05em;
                border-bottom: 2px solid #00ff88;
                padding-bottom: 8px;
            }

            .printers-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .printer-item {
                background: #0a1a3a;
                padding: 12px;
                border-left: 3px solid #0066ff;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .printer-info {
                flex: 1;
            }

            .printer-name {
                font-weight: bold;
                color: #00ff88;
                margin-bottom: 4px;
            }

            .printer-details {
                font-size: 0.85em;
                color: #b0b0b0;
            }

            .printer-status {
                padding: 6px 12px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 0.9em;
            }

            .status-connected {
                background: #00ff88;
                color: #000000;
            }

            .status-disconnected {
                background: #ff4444;
                color: #ffffff;
            }

            .print-form {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .form-group label {
                color: #b0b0b0;
                font-size: 0.95em;
                font-weight: 500;
            }

            .print-input,
            .print-select {
                padding: 10px;
                background: #0a1a3a;
                color: #ffffff;
                border: 1px solid #0d3d7a;
                border-radius: 4px;
                font-size: 0.9em;
            }

            .print-input:focus,
            .print-select:focus {
                outline: none;
                border-color: #00ff88;
                box-shadow: 0 0 5px rgba(0, 255, 136, 0.3), inset 0 0 5px rgba(0, 102, 255, 0.2);
            }

            .print-btn {
                padding: 10px 20px;
                background: #00ff88;
                color: #000000;
                border: 1px solid #00cc6a;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.95em;
                font-weight: bold;
                transition: all 0.2s ease;
            }

            .print-btn:hover {
                background: #00d975;
                border-color: #009944;
            }

            .queue-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .queue-item {
                background: #0a1a3a;
                padding: 12px;
                border-left: 3px solid #ff9800;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .queue-item.completed {
                border-left-color: #00ff88;
                opacity: 0.7;
            }

            .queue-info {
                flex: 1;
            }

            .queue-doc-name {
                font-weight: bold;
                color: #00ff88;
                margin-bottom: 4px;
            }

            .queue-progress {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 6px;
            }

            .progress-bar {
                flex: 1;
                height: 8px;
                background: #3e3e3e;
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: #00ff88;
                width: 0%;
                transition: width 0.3s ease;
            }

            .queue-controls {
                display: flex;
                gap: 8px;
            }

            .queue-btn {
                padding: 6px 12px;
                background: #0066ff;
                color: #ffffff;
                border: 1px solid #003d99;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85em;
                transition: all 0.2s ease;
            }

            .queue-btn:hover {
                background: #0052cc;
                border-color: #002966;
            }

            .empty-queue {
                color: #b0b0b0;
                text-align: center;
                padding: 20px;
                font-style: italic;
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        const printersList = windowElement.querySelector('#printersList');
        const printBtn = windowElement.querySelector('#printBtn');
        const documentNameInput = windowElement.querySelector('#documentName');
        const queueList = windowElement.querySelector('#queueList');

        // Cargar cola guardada
        const saved = localStorage.getItem('printQueue');
        if (saved) {
            this.printerQueue = JSON.parse(saved);
        }

        // Renderizar impresoras
        this.renderPrinters(printersList);

        // Enviar a imprimir
        printBtn.addEventListener('click', () => {
            const docName = documentNameInput.value || 'Documento sin nombre';
            const printerSelect = windowElement.querySelector('#printerSelect');
            
            if (!docName.trim()) {
                alert('Por favor ingresa el nombre del documento');
                return;
            }

            const job = {
                id: ++this.printJobIdCounter,
                documentName: docName,
                printer: printerSelect.value,
                status: 'pendiente',
                progress: 0,
                timestamp: new Date().toLocaleTimeString()
            };

            this.printerQueue.push(job);
            this.savePrintQueue();
            this.renderQueue(queueList);
            documentNameInput.value = '';
            
            alert(`Documento "${docName}" enviado a impresión`);
        });

        // Renderizar cola
        this.renderQueue(queueList);

        // Simular impresión
        setInterval(() => {
            this.printerQueue.forEach(job => {
                if (job.status === 'imprimiendo' && job.progress < 100) {
                    job.progress += Math.random() * 15;
                    if (job.progress >= 100) {
                        job.progress = 100;
                        job.status = 'completado';
                    }
                } else if (job.status === 'pendiente') {
                    job.status = 'imprimiendo';
                }
            });
            this.renderQueue(queueList);
        }, 1000);
    }

    renderPrinters(container) {
        const printers = [
            { name: 'HP Office Printer', model: 'HP LaserJet Pro', status: 'Conectada' },
            { name: 'Canon Color Printer', model: 'Canon imagePROGRAF', status: 'Conectada' },
            { name: 'Brother B/W Printer', model: 'Brother HL-L8360', status: 'Desconectada' }
        ];

        container.innerHTML = '';
        printers.forEach(printer => {
            const div = document.createElement('div');
            div.className = 'printer-item';
            
            const statusClass = printer.status === 'Conectada' ? 'status-connected' : 'status-disconnected';
            
            div.innerHTML = `
                <div class="printer-info">
                    <div class="printer-name">${printer.name}</div>
                    <div class="printer-details">${printer.model}</div>
                </div>
                <div class="printer-status ${statusClass}">${printer.status}</div>
            `;
            container.appendChild(div);
        });
    }

    renderQueue(container) {
        container.innerHTML = '';
        
        if (this.printerQueue.length === 0) {
            container.innerHTML = '<div class="empty-queue">Cola de impresión vacía</div>';
            return;
        }

        this.printerQueue.forEach(job => {
            const div = document.createElement('div');
            div.className = `queue-item ${job.status === 'completado' ? 'completed' : ''}`;
            
            div.innerHTML = `
                <div class="queue-info">
                    <div class="queue-doc-name">${job.documentName}</div>
                    <div style="font-size: 0.85em; color: #b0b0b0;">
                        Impresora: ${job.printer} | Estado: ${job.status.toUpperCase()}
                    </div>
                    <div class="queue-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${job.progress}%"></div>
                        </div>
                        <span style="font-size: 0.85em; color: #00ff88;">${Math.round(job.progress)}%</span>
                    </div>
                </div>
                <div class="queue-controls">
                    <button class="queue-btn" onclick="alert('Pausa no disponible en demo')">⏸️</button>
                    <button class="queue-btn" onclick="alert('Cancelación no disponible en demo')">✕</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    savePrintQueue() {
        localStorage.setItem('printQueue', JSON.stringify(this.printerQueue));
    }

    onClose() {
        super.onClose();
        this.savePrintQueue();
    }
}
