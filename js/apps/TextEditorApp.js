/**
 * Aplicación de Procesador de Textos
 * Editor de texto básico con opciones de formato
 */
class TextEditorApp extends Application {
    constructor() {
        super(
            'Procesador de Textos',
            'Editor de texto con herramientas de formato',
            '📝',
            null
        );
        this.fontSize = 14;
        this.isBold = false;
        this.isItalic = false;
        this.isUnderline = false;
    }

    /**
     * Retorna el contenido HTML de la ventana
     */
    getWindowContent() {
        return `
            <div class="text-editor-container">
                <div class="text-editor-toolbar">
                    <button class="editor-btn" id="boldBtn" title="Negrita (Ctrl+B)">
                        <strong>B</strong>
                    </button>
                    <button class="editor-btn" id="italicBtn" title="Cursiva (Ctrl+I)">
                        <em>I</em>
                    </button>
                    <button class="editor-btn" id="underlineBtn" title="Subrayado (Ctrl+U)">
                        <u>U</u>
                    </button>
                    <div class="editor-separator"></div>
                    <label for="fontSizeSelect" class="editor-label">Tamaño:</label>
                    <select id="fontSizeSelect" class="editor-select">
                        <option value="10">10px</option>
                        <option value="12">12px</option>
                        <option value="14" selected>14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                        <option value="24">24px</option>
                        <option value="28">28px</option>
                    </select>
                    <div class="editor-separator"></div>
                    <button class="editor-btn" id="saveBtn" title="Guardar">
                        💾 Guardar
                    </button>
                </div>
                <div id="textEditorArea" class="text-editor-area" contenteditable="true" placeholder="Escribe aquí..."></div>
                <div class="editor-status">
                    Palabras: <span id="wordCount">0</span> | Caracteres: <span id="charCount">0</span>
                </div>
            </div>
        `;
    }

    /**
     * Estilos específicos para esta aplicación
     */
    getStyles() {
        return `
            .text-editor-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #1e1e1e;
                color: #ffffff;
            }

            .text-editor-toolbar {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px;
                background: #2d2d2d;
                border-bottom: 1px solid #404040;
                flex-wrap: wrap;
            }

            .editor-btn {
                padding: 6px 12px;
                background: #0066ff;
                color: #ffffff;
                border: 1px solid #003d99;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.2s ease;
            }

            .editor-btn:hover {
                background: #0052cc;
                border-color: #002966;
            }

            .editor-btn:active {
                background: #004db3;
            }

            .editor-btn.active {
                background: #00ff88;
                border-color: #00cc6a;
                color: #000000;
            }

            .editor-separator {
                width: 1px;
                height: 25px;
                background: #0066ff;
            }

            .editor-label {
                font-size: 0.9em;
                color: #00ff88;
                font-weight: 500;
            }

            .editor-select {
                padding: 6px 8px;
                background: #0a1a3a;
                color: #ffffff;
                border: 1px solid #0d3d7a;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
            }

            .editor-select:hover {
                background: #0d2847;
            }

            .editor-select:focus {
                outline: none;
                border-color: #00ff88;
                box-shadow: 0 0 5px rgba(0, 255, 136, 0.3), inset 0 0 5px rgba(0, 102, 255, 0.2);
            }

            .text-editor-area {
                flex: 1;
                padding: 15px;
                background: #1e1e1e;
                color: #ffffff;
                border: none;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                resize: none;
                outline: none;
                width: 100%;
                overflow-y: auto;
                word-wrap: break-word;
                white-space: pre-wrap;
            }

            .text-editor-area:focus {
                outline: 1px solid #0066ff;
            }

            .text-editor-area[contenteditable="true"]:empty:before {
                content: attr(placeholder);
                color: #666;
            }

            .editor-status {
                padding: 8px 15px;
                background: #2d2d2d;
                border-top: 1px solid #404040;
                font-size: 0.85em;
                color: #b0b0b0;
            }

            #charCount, #wordCount {
                color: #00ff88;
                font-weight: bold;
            }

            @media (max-width: 768px) {
                .text-editor-toolbar {
                    flex-direction: column;
                    align-items: stretch;
                }

                .editor-btn {
                    width: 100%;
                }

                .editor-separator {
                    width: 100%;
                    height: 1px;
                }

                .editor-select {
                    width: 100%;
                }
            }
        `;
    }

    /**
     * Método llamado cuando se abre la aplicación
     */
    onOpen(windowElement) {
        super.onOpen(windowElement);
        
        const editor = windowElement.querySelector('#textEditorArea');
        const fontSelect = windowElement.querySelector('#fontSizeSelect');
        const boldBtn = windowElement.querySelector('#boldBtn');
        const italicBtn = windowElement.querySelector('#italicBtn');
        const underlineBtn = windowElement.querySelector('#underlineBtn');
        const saveBtn = windowElement.querySelector('#saveBtn');
        const wordCount = windowElement.querySelector('#wordCount');
        const charCount = windowElement.querySelector('#charCount');

        // Cargar contenido guardado si existe
        const saved = localStorage.getItem('textEditorContent');
        if (saved) {
            editor.innerHTML = saved;
            this.updateStats(editor, wordCount, charCount);
        }

        // Cambiar tamaño de fuente
        fontSelect.addEventListener('change', (e) => {
            this.fontSize = e.target.value;
            editor.style.fontSize = `${e.target.value}px`;
            editor.focus();
        });

        // Aplicar negrita
        boldBtn.addEventListener('click', () => {
            document.execCommand('bold', false, null);
            this.isBold = !this.isBold;
            boldBtn.classList.toggle('active', this.isBold);
            editor.focus();
        });

        // Aplicar cursiva
        italicBtn.addEventListener('click', () => {
            document.execCommand('italic', false, null);
            this.isItalic = !this.isItalic;
            italicBtn.classList.toggle('active', this.isItalic);
            editor.focus();
        });

        // Aplicar subrayado
        underlineBtn.addEventListener('click', () => {
            document.execCommand('underline', false, null);
            this.isUnderline = !this.isUnderline;
            underlineBtn.classList.toggle('active', this.isUnderline);
            editor.focus();
        });

        // Guardar contenido
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('textEditorContent', editor.innerHTML);
            this.showNotification(saveBtn, '✓ Guardado');
        });

        // Actualizar estadísticas en tiempo real
        editor.addEventListener('input', () => {
            this.updateStats(editor, wordCount, charCount);
        });

        // Atajos de teclado
        editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'b') {
                    e.preventDefault();
                    boldBtn.click();
                }
                if (e.key === 'i') {
                    e.preventDefault();
                    italicBtn.click();
                }
                if (e.key === 'u') {
                    e.preventDefault();
                    underlineBtn.click();
                }
                if (e.key === 's') {
                    e.preventDefault();
                    saveBtn.click();
                }
            }
        });

        editor.focus();
    }

    updateStats(editor, wordCount, charCount) {
        const text = editor.innerText || '';
        charCount.textContent = text.length;
        
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        wordCount.textContent = words;
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

    /**
     * Método llamado cuando se cierra la aplicación
     */
    onClose() {
        super.onClose();
    }
}
