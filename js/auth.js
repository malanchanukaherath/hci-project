(function () {
  var KEY = "fsc_portal_session";
  var STAFF_KEY = "fsc_staff_session";

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
      loginPath = loginPath || "student-login.html";
      if (!window.PortalAuth.isLoggedIn()) {
        window.location.href = loginPath;
        return false;
      }
      return true;
    },
    isStaffLoggedIn: function () {
      try {
        return sessionStorage.getItem(STAFF_KEY) === "1";
      } catch (e) {
        return false;
      }
    },
    staffLogin: function () {
      try {
        sessionStorage.setItem(STAFF_KEY, "1");
      } catch (e) {}
    },
    staffLogout: function () {
      try {
        sessionStorage.removeItem(STAFF_KEY);
      } catch (e) {}
    },
    requireStaffAuth: function (loginPath) {
      loginPath = loginPath || "staff-login.html";
      if (!window.PortalAuth.isStaffLoggedIn()) {
        window.location.href = loginPath;
        return false;
      }
      return true;
    },
  };
})();
