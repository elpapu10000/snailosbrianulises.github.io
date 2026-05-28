/**
 * Aplicación de Planilla de Cálculo
 * Editor de hojas de cálculo básico
 */
class SpreadsheetApp extends Application {
    constructor() {
        super(
            'Planilla de Cálculo',
            'Editor de hojas de cálculo',
            '📊',
            null
        );
        this.rows = 10;
        this.cols = 5;
        this.data = {};
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="spreadsheet-container">
                <div class="spreadsheet-toolbar">
                    <button class="spreadsheet-btn" id="addRowBtn" title="Agregar fila">
                        ➕ Fila
                    </button>
                    <button class="spreadsheet-btn" id="addColBtn" title="Agregar columna">
                        ➕ Columna
                    </button>
                    <button class="spreadsheet-btn" id="deleteRowBtn" title="Eliminar fila">
                        ➖ Fila
                    </button>
                    <button class="spreadsheet-btn" id="deleteColBtn" title="Eliminar columna">
                        ➖ Columna
                    </button>
                    <button class="spreadsheet-btn" id="clearAllBtn" title="Limpiar todo">
                        🗑️ Limpiar
                    </button>
                    <button class="spreadsheet-btn" id="saveSpreadsheetBtn" title="Guardar">
                        💾 Guardar
                    </button>
                </div>
                <div class="spreadsheet-wrapper">
                    <table id="spreadsheetTable" class="spreadsheet-table"></table>
                </div>
                <div class="spreadsheet-status">
                    Tamaño: <span id="gridSize">10x5</span>
                </div>
            </div>
        `;
    }

    /**
     * Estilos específicos para esta aplicación
     */
    getStyles() {
        return `
            .spreadsheet-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1a1a1a;
            }

            .spreadsheet-toolbar {
                display: flex;
                gap: 8px;
                padding: 10px;
                background: #2d2d2d;
                border-bottom: 1px solid #404040;
                flex-wrap: wrap;
            }

            .spreadsheet-btn {
                padding: 6px 12px;
                background: #0066ff;
                color: #ffffff;
                border: 1px solid #003d99;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.2s ease;
            }

            .spreadsheet-btn:hover {
                background: #0052cc;
                border-color: #002966;
            }

            .spreadsheet-wrapper {
                flex: 1;
                overflow: auto;
                border: 1px solid #404040;
            }

            .spreadsheet-table {
                border-collapse: collapse;
                width: 100%;
                background: #1e1e1e;
                min-width: 100%;
            }

            .spreadsheet-table td {
                border: 1px solid #404040;
                padding: 0;
                min-width: 80px;
                height: 30px;
                position: relative;
            }

            .spreadsheet-table input {
                width: 100%;
                height: 100%;
                border: none;
                background: #0a1a3a;
                color: #ffffff;
                padding: 5px;
                font-size: 0.9em;
                font-family: monospace;
            }

            .spreadsheet-table input:focus {
                background: #0d2847;
                outline: none;
                box-shadow: inset 0 0 5px rgba(0, 102, 255, 0.5), 0 0 5px rgba(0, 102, 255, 0.3);
            }

            .spreadsheet-table th {
                background: #3e3e3e;
                color: #00ff88;
                padding: 5px;
                text-align: center;
                font-size: 0.9em;
                border: 1px solid #505050;
                font-weight: bold;
            }

            .spreadsheet-status {
                padding: 8px 15px;
                background: #2d2d2d;
                border-top: 1px solid #404040;
                font-size: 0.85em;
                color: #b0b0b0;
            }

            #gridSize {
                color: #00ff88;
                font-weight: bold;
            }

            @media (max-width: 768px) {
                .spreadsheet-toolbar {
                    flex-direction: column;
                    align-items: stretch;
                }

                .spreadsheet-btn {
                    width: 100%;
                }

                .spreadsheet-table td {
                    min-width: 60px;
                    height: 28px;
                }

                .spreadsheet-table input {
                    font-size: 0.85em;
                    padding: 4px;
                }
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        const table = windowElement.querySelector('#spreadsheetTable');
        const addRowBtn = windowElement.querySelector('#addRowBtn');
        const addColBtn = windowElement.querySelector('#addColBtn');
        const deleteRowBtn = windowElement.querySelector('#deleteRowBtn');
        const deleteColBtn = windowElement.querySelector('#deleteColBtn');
        const clearAllBtn = windowElement.querySelector('#clearAllBtn');
        const saveBtn = windowElement.querySelector('#saveSpreadsheetBtn');
        const gridSizeDisplay = windowElement.querySelector('#gridSize');

        // Cargar datos guardados
        const saved = localStorage.getItem('spreadsheetData');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.rows = parsed.rows;
            this.cols = parsed.cols;
            this.data = parsed.data;
        }

        // Renderizar tabla
        this.renderTable(table, gridSizeDisplay);

        // Agregar fila
        addRowBtn.addEventListener('click', () => {
            this.rows++;
            this.renderTable(table, gridSizeDisplay);
            this.saveSpreadsheet();
        });

        // Agregar columna
        addColBtn.addEventListener('click', () => {
            this.cols++;
            this.renderTable(table, gridSizeDisplay);
            this.saveSpreadsheet();
        });

        // Eliminar fila
        deleteRowBtn.addEventListener('click', () => {
            if (this.rows > 1) {
                for (let c = 0; c < this.cols; c++) {
                    delete this.data[`${this.rows - 1}-${c}`];
                }
                this.rows--;
                this.renderTable(table, gridSizeDisplay);
                this.saveSpreadsheet();
            }
        });

        // Eliminar columna
        deleteColBtn.addEventListener('click', () => {
            if (this.cols > 1) {
                for (let r = 0; r < this.rows; r++) {
                    delete this.data[`${r}-${this.cols - 1}`];
                }
                this.cols--;
                this.renderTable(table, gridSizeDisplay);
                this.saveSpreadsheet();
            }
        });

        // Limpiar todo
        clearAllBtn.addEventListener('click', () => {
            if (confirm('¿Deseas limpiar toda la hoja?')) {
                this.data = {};
                this.renderTable(table, gridSizeDisplay);
                this.saveSpreadsheet();
            }
        });

        // Guardar
        saveBtn.addEventListener('click', () => {
            this.saveSpreadsheet();
            this.showNotification(saveBtn, '✓ Guardado');
        });
    }

    renderTable(table, gridSizeDisplay) {
        table.innerHTML = '';
        
        const header = document.createElement('tr');
        header.innerHTML = '<th></th>';
        for (let c = 0; c < this.cols; c++) {
            const th = document.createElement('th');
            th.textContent = String.fromCharCode(65 + c);
            header.appendChild(th);
        }
        table.appendChild(header);

        for (let r = 0; r < this.rows; r++) {
            const row = document.createElement('tr');
            
            const rowHeader = document.createElement('th');
            rowHeader.textContent = r + 1;
            rowHeader.style.background = '#3e3e3e';
            rowHeader.style.color = '#00ff88';
            rowHeader.style.textAlign = 'center';
            row.appendChild(rowHeader);

            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';

                const key = `${r}-${c}`;
                if (this.data[key]) {
                    input.value = this.data[key];
                }

                input.addEventListener('input', () => {
                    this.data[key] = input.value;
                });

                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        if (gridSizeDisplay) {
            gridSizeDisplay.textContent = `${this.rows}x${this.cols}`;
        }
    }

    saveSpreadsheet() {
        const saveData = {
            rows: this.rows,
            cols: this.cols,
            data: this.data
        };
        localStorage.setItem('spreadsheetData', JSON.stringify(saveData));
    }

    showNotification(element, message) {
        const originalText = element.textContent;
        element.textContent = message;
        element.style.background = '#00ff88';
        element.style.color = '#000000';
        setTimeout(() => {
            element.textContent = originalText;
            element.style.background = '';
            element.style.color = '';
        }, 2000);
    }

    onClose() {
        super.onClose();
        this.saveSpreadsheet();
    }
}
