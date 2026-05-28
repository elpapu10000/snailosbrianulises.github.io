/**
 * Script principal del escritorio
 * Inicializa el gestor de aplicaciones y configura la interfaz
 */

// Variables globales
let applicationManager;
const windowsContainer = document.getElementById('windowsContainer');
const desktopGrid = document.getElementById('desktopGrid');
const appLauncherBtn = document.getElementById('appLauncherBtn');
const appLauncherPanel = document.getElementById('appLauncherPanel');
const appLauncherClose = document.getElementById('appLauncherClose');
const appLauncherList = document.getElementById('appLauncherList');
const shutdownBtn = document.getElementById('shutdownBtn');

/**
 * Inicializa el sistema del escritorio
 */
function initializeDesktop() {
    // Crear gestor de aplicaciones
    applicationManager = new ApplicationManager(windowsContainer);

    // Registrar aplicaciones
    registerApplications();

    // Configurar UI del escritorio
    setupDesktopUI();

    // Configurar eventos de la barra de tareas
    setupTaskbarEvents();
    // Configurar botón de apagado simulado
    setupShutdown();

    // Actualizar hora en tiempo real
    updateClock();
    setInterval(updateClock, 1000);
}

/**
 * Configura el botón de apagado simulado
 */
function setupShutdown() {
    if (!shutdownBtn) return;
    shutdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        simulateShutdown();
    });
}

/**
 * Simula el apagado: cierra apps, muestra overlay y vuelve al login
 */
function simulateShutdown() {
    try {
        if (applicationManager) applicationManager.closeAllApplications();
    } catch (e) { /* ignore */ }

    // Crear overlay de apagado
    const overlay = document.createElement('div');
    overlay.id = 'shutdownOverlay';
    overlay.innerHTML = `
        <div class="shutdown-message">
            <div class="shutdown-spinner"></div>
            <div>Apagando SnailOS...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        #shutdownOverlay{position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;z-index:99999}
        .shutdown-message{display:flex;flex-direction:column;align-items:center;gap:12px;font-size:20px}
        .shutdown-spinner{width:48px;height:48px;border:5px solid #222;border-top-color:#00b3ff;border-radius:50%;animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
    `;
    document.head.appendChild(styleEl);

    // Después de una pausa, redirigir al login (simula apagado/reinicio)
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1800);
}

/**
 * Registra todas las aplicaciones disponibles
 */
function registerApplications() {
    // Registrar aplicaciones
    applicationManager.registerApplication(new TextEditorApp());
    applicationManager.registerApplication(new SpreadsheetApp());
    applicationManager.registerApplication(new NetworkManagerApp());
    applicationManager.registerApplication(new SettingsApp());
    applicationManager.registerApplication(new PrinterManagerApp());
    applicationManager.registerApplication(new SystemInfoApp());
    applicationManager.registerApplication(new AuthorsApp());
    // HelloWorldApp removed: no registration
}

/**
 * Configura la interfaz del escritorio con los iconos de aplicaciones
 */
function setupDesktopUI() {
    const applications = applicationManager.getAllApplications();

    // Crear iconos en el escritorio
    applications.forEach(app => {
        const iconElement = createDesktopIcon(app);
        desktopGrid.appendChild(iconElement);
    });

    // Crear lista en el panel del launcher
    updateAppLauncherList();
}

/**
 * Crea un icono para el escritorio
 */
function createDesktopIcon(application) {
    const div = document.createElement('div');
    div.className = 'desktop-icon';
    
    const iconContent = application.image 
        ? `<img src="${application.image}" alt="${application.name}" class="desktop-icon-image">`
        : `<div class="desktop-icon-visual">${application.icon}</div>`;
    
    div.innerHTML = `
        ${iconContent}
        <div class="desktop-icon-label">${application.name}</div>
    `;

    div.addEventListener('click', () => {
        applicationManager.launchApplication(application.name);
    });

    div.addEventListener('dblclick', () => {
        applicationManager.launchApplication(application.name);
    });

    return div;
}

/**
 * Actualiza la lista de aplicaciones en el panel del launcher
 */
function updateAppLauncherList() {
    appLauncherList.innerHTML = '';
    const applications = applicationManager.getAllApplications();

    applications.forEach(app => {
        const item = document.createElement('div');
        item.className = 'app-launcher-item';
        
        const iconContent = app.image 
            ? `<img src="${app.image}" alt="${app.name}" class="app-launcher-item-image">`
            : `<div class="app-launcher-item-icon">${app.icon}</div>`;
        
        item.innerHTML = `
            ${iconContent}
            <div class="app-launcher-item-info">
                <div class="app-launcher-item-name">${app.name}</div>
                <div class="app-launcher-item-description">${app.description}</div>
            </div>
        `;

        item.addEventListener('click', () => {
            applicationManager.launchApplication(app.name);
            closeAppLauncher();
        });

        appLauncherList.appendChild(item);
    });
}

/**
 * Configura los eventos de la barra de tareas
 */
function setupTaskbarEvents() {
    appLauncherBtn.addEventListener('click', toggleAppLauncher);
    appLauncherClose.addEventListener('click', closeAppLauncher);

    // Cerrar el panel si se hace click fuera
    document.addEventListener('click', (e) => {
        if (!appLauncherPanel.contains(e.target) && 
            !appLauncherBtn.contains(e.target) &&
            appLauncherPanel.classList.contains('active')) {
            closeAppLauncher();
        }
    });
}

/**
 * Alterna la visibilidad del panel de aplicaciones
 */
function toggleAppLauncher() {
    if (appLauncherPanel.classList.contains('active')) {
        closeAppLauncher();
    } else {
        openAppLauncher();
    }
}

/**
 * Abre el panel de aplicaciones
 */
function openAppLauncher() {
    appLauncherPanel.classList.add('active');
    appLauncherBtn.classList.add('active');
}

/**
 * Cierra el panel de aplicaciones
 */
function closeAppLauncher() {
    appLauncherPanel.classList.remove('active');
    appLauncherBtn.classList.remove('active');
}

/**
 * Actualiza la hora en la barra de tareas
 */
function updateClock() {
    const ahora = new Date();

    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    const reloj = document.getElementById('reloj');
    if (reloj) {
        reloj.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

/**
 * Inicializa el escritorio cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', initializeDesktop);
