(function () {
  var KEY = "fsc_portal_session";

  window.PortalAuth = {
    isLoggedIn: function () {
      try {
        return sessionStorage.getItem(KEY) === "1";
      } catch (e) {
        return false;
      }
    },
    login: function () {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch (e) {}
    },
    logout: function () {
      try {
        sessionStorage.removeItem(KEY);
      } catch (e) {}
    },
    requireAuth: function (loginPath) {
      loginPath = loginPath || "index.html";
      if (!window.PortalAuth.isLoggedIn()) {
        window.location.href = loginPath;
        return false;
      }
      return true;
    },
  };
})();
