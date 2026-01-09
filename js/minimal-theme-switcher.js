/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */

const themeSwitcher = {
  // Config
  _scheme: "light", // CHANGED: Default to light mode
  menuTarget: "details.dropdown",
  buttonsTarget: ".theme-toggle", // CHANGED: Target your specific button class
  buttonAttribute: "data-theme-switcher",
  rootAttribute: "data-theme",
  localStorageKey: "picoPreferredColorScheme",

  // Init
  init() {
    this.scheme = this.schemeFromLocalStorage;
    this.initSwitchers();
  },

  // Get color scheme from local storage
  get schemeFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
  },

  // Preferred color scheme
  get preferredColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  },

  // Init switchers
  initSwitchers() {
    const buttons = document.querySelectorAll(this.buttonsTarget);
    buttons.forEach((button) => {
      button.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            // Toggle logic: If current is light, switch to dark, and vice versa
            this.scheme = this.scheme === "light" ? "dark" : "light";
          },
          false
      );
    });
  },

  // Set scheme
  set scheme(scheme) {
    if (scheme == "auto") {
      this._scheme = this.preferredColorScheme;
    } else if (scheme == "dark" || scheme == "light") {
      this._scheme = scheme;
    }
    this.applyScheme();
    this.schemeToLocalStorage();
  },

  // Get scheme
  get scheme() {
    return this._scheme;
  },

  // Apply scheme
  applyScheme() {
    // 1. Update the HTML attribute
    document.querySelector("html")?.setAttribute(this.rootAttribute, this.scheme);

    // 2. Update the button icon animation state
    const button = document.querySelector(this.buttonsTarget);
    if (button) {
      if (this.scheme === 'dark') {
        button.classList.add('theme-toggle--toggled');
      } else {
        button.classList.remove('theme-toggle--toggled');
      }
    }
  },

  // Store scheme to local storage
  schemeToLocalStorage() {
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },
};

// Init
themeSwitcher.init();