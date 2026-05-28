/**
 * Clase que maneja la ventana de una aplicación
 * Responsable de crear, mover, minimizar y cerrar ventanas (Principio de Responsabilidad Única)
 */
class ApplicationWindow {
    constructor(application, windowsContainer, onCloseCallback) {
        this.application = application;
        this.windowsContainer = windowsContainer;
        this.onCloseCallback = onCloseCallback;
        this.windowElement = null;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.windowStartX = 0;
        this.windowStartY = 0;
        this.isMinimized = false;
        this.zIndex = 100;

        this.create();
    }

    /**
     * Crea la estructura DOM de la ventana
     */
    create() {
        this.windowElement = document.createElement('div');
        this.windowElement.className = 'app-window';
        this.windowElement.style.zIndex = this.zIndex;

        const imageHTML = this.application.image 
            ? `<img src="${this.application.image}" alt="${this.application.name}" class="app-window-image">`
            : '';

        const headerHTML = `
            <div class="app-window-header">
                <div class="app-window-title">
                    ${imageHTML}
                    <span class="app-window-icon">${this.application.icon}</span>
                    <span>${this.application.name}</span>
                </div>
                <div class="app-window-controls">
                    <button class="app-window-minimize" title="Minimizar">−</button>
                    <button class="app-window-close" title="Cerrar">✕</button>
                </div>
            </div>
            <div class="app-window-content">
                ${this.application.getWindowContent()}
            </div>
        `;

        this.windowElement.innerHTML = headerHTML;
        this.windowsContainer.appendChild(this.windowElement);

        // Inyectar estilos de la aplicación
        const appStyles = this.application.getStyles();
        if (appStyles) {
            const styleElement = document.createElement('style');
            styleElement.textContent = appStyles;
            document.head.appendChild(styleElement);
        }

        // Centrar la ventana al abrirse
        this.centerWindow();

        this.attachEventListeners();
        this.application.onOpen(this.windowElement);
    }

    /**
     * Centra la ventana en la pantalla
     */
    centerWindow() {
        // Forzar un reflow para obtener las dimensiones correctas
        const rect = this.windowElement.getBoundingClientRect();
        const windowWidth = rect.width;
        const windowHeight = rect.height;

        // Calcular posición central
        const centerX = (window.innerWidth - windowWidth) / 2;
        const centerY = (window.innerHeight - windowHeight) / 2;

        // Desplazamiento incremental según ventanas abiertas
        const baseOffset = 20;
        const openCount = Math.max(0, this.windowsContainer.querySelectorAll('.app-window').length - 1);
        const offsetX = baseOffset * openCount;
        const offsetY = baseOffset * openCount;

        // Aplicar posición con offset
        this.windowElement.style.left = centerX + offsetX + 'px';
        this.windowElement.style.top = centerY + offsetY + 'px';
    }

    /**
     * Adjunta los eventos de la ventana (arrastrar, cerrar, minimizar)
     */
    attachEventListeners() {
        const header = this.windowElement.querySelector('.app-window-header');
        const closeBtn = this.windowElement.querySelector('.app-window-close');
        const minimizeBtn = this.windowElement.querySelector('.app-window-minimize');
        const content = this.windowElement.querySelector('.app-window-content');

        // Arrastrar ventana desde header o desde cualquiera de los bordes (primeros 10px)
        header.addEventListener('mousedown', (e) => this.startDrag(e));

        // Permitir arrastrar si se hace click en el elemento ventana en sus bordes
        this.windowElement.addEventListener('mousedown', (e) => {
            // Ignorar clicks en los controles (botones) para no interferir
            if (e.target.closest && e.target.closest('.app-window-controls')) return;

            const rect = this.windowElement.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const edgeThreshold = 10;

            const onLeft = offsetX <= edgeThreshold;
            const onRight = offsetX >= rect.width - edgeThreshold;
            const onTop = offsetY <= edgeThreshold;
            const onBottom = offsetY >= rect.height - edgeThreshold;

            const isOnEdge = onLeft || onRight || onTop || onBottom;

            if (isOnEdge) {
                // Evitar selección de texto
                e.preventDefault();
                this.startDrag(e);
            }
        });

        // Eventos globales de arrastre
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());

        // Cerrar ventana
        closeBtn.addEventListener('click', () => this.close());

        // Minimizar ventana
        minimizeBtn.addEventListener('click', () => this.minimize());

        // Traer ventana al frente al hacer click
        this.windowElement.addEventListener('mousedown', () => this.bringToFront());
    }

    /**
     * Inicia el arrastre de la ventana
     */
    startDrag(e) {
        this.isDragging = true;
        // Guardar la posición inicial del mouse
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
        
        // Obtener la posición actual de la ventana en la pantalla
        const rect = this.windowElement.getBoundingClientRect();
        this.windowStartX = rect.left;
        this.windowStartY = rect.top;
        
        // Obtener el ancho y alto para mantener el centrado
        this.windowWidth = rect.width;
        this.windowHeight = rect.height;
    }

    /**
     * Mueve la ventana mientras se arrastra
     */
    drag(e) {
        if (!this.isDragging) return;

        // Calcular el delta del mouse
        const deltaX = e.clientX - this.dragStartX;
        const deltaY = e.clientY - this.dragStartY;
        
        // Nueva posición
        const newX = this.windowStartX + deltaX;
        const newY = this.windowStartY + deltaY;
        
        // Aplicar posición sin transform
        this.windowElement.style.left = newX + 'px';
        this.windowElement.style.top = newY + 'px';
        this.windowElement.style.transform = 'none';
    }

    /**
     * Detiene el arrastre de la ventana
     */
    stopDrag() {
        this.isDragging = false;
    }

    /**
     * Trae la ventana al frente
     */
    bringToFront() {
        const windows = document.querySelectorAll('.app-window');
        let maxZ = 100;
        windows.forEach(w => {
            const z = parseInt(w.style.zIndex);
            if (z > maxZ) maxZ = z;
        });
        this.windowElement.style.zIndex = maxZ + 1;
    }

    /**
     * Minimiza/restaura la ventana
     */
    minimize() {
        this.isMinimized = !this.isMinimized;
        const content = this.windowElement.querySelector('.app-window-content');
        content.style.display = this.isMinimized ? 'none' : 'block';
    }

    /**
     * Cierra la ventana
     */
    close() {
        this.application.onClose();
        this.windowElement.remove();
        if (this.onCloseCallback) {
            this.onCloseCallback();
        }
    }
}
