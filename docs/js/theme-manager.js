class ThemeManager {
  constructor(options = {}) {
    this.themeToggleSelector = options.themeToggleSelector || '#theme-toggle';
    this.themeAttr = options.themeAttr || 'data-theme';
    this.storageKey = options.storageKey || 'theme';
    this.defaultTheme = options.defaultTheme || 'light';
    this.themeToggle = document.querySelector(this.themeToggleSelector);
    this.systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  getSystemTheme() {
    return this.systemThemeMediaQuery.matches ? 'dark' : 'light';
  }

  getCurrentTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) return savedTheme;
    return this.getSystemTheme();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute(this.themeAttr, theme);
    localStorage.setItem(this.storageKey, theme);
    if (this.themeToggle) {
      this.themeToggle.checked = theme === 'dark';
    }
  }

  handleSystemThemeChange = (e) => {
    if (!localStorage.getItem(this.storageKey)) {
      this.applyTheme(e.matches ? 'dark' : 'light');
    }
  }

  handleToggleChange = () => {
    const theme = this.themeToggle.checked ? 'dark' : 'light';
    this.applyTheme(theme);
  }

  init() {
    // Aplicar el tema inicial
    this.applyTheme(this.getCurrentTheme());

    // Escuchar cambios del sistema
    if (this.systemThemeMediaQuery.addEventListener) {
      this.systemThemeMediaQuery.addEventListener('change', this.handleSystemThemeChange);
    } else {
      this.systemThemeMediaQuery.addListener(this.handleSystemThemeChange);
    }

    // Escuchar cambios manuales
    if (this.themeToggle) {
      this.themeToggle.addEventListener('change', this.handleToggleChange);
    }
  }
}

// Exportar globalmente
window.ThemeManager = ThemeManager; 