(function () {
  var STORAGE_KEY = "portal-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
    syncToggleButtons(theme);
  }

  function syncToggleButtons(theme) {
    var label =
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", label);
    });
  }

  function initTheme() {
    var stored = getStoredTheme();
    var theme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
    syncToggleButtons(theme);
  }

  function bindToggles() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
      });
    });
  }

  function onDomReady() {
    bindToggles();
    syncToggleButtons(document.documentElement.getAttribute("data-theme") || "light");
  }

  initTheme();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDomReady);
  } else {
    onDomReady();
  }

  window.PortalTheme = { setTheme: setTheme, getTheme: function () {
    return document.documentElement.getAttribute("data-theme") || "light";
  } };
})();
