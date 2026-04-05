(function () {
  var params = new URLSearchParams(window.location.search);
  var yearKey = parseInt(params.get("year") || "1", 10);
  if (isNaN(yearKey) || yearKey < 1 || yearKey > 4) yearKey = 1;

  var data = window.PORTAL_DATA;
  var student = data && data.student;
  var pack = data && data.resultsByYear && data.resultsByYear[yearKey];

  if (student) {
    var hn = document.getElementById("hdr-name");
    var hi = document.getElementById("hdr-id");
    if (hn) hn.textContent = student.name;
    if (hi) hi.textContent = "ID: " + student.id;
  }

  if (!pack) {
    document.getElementById("page-title").textContent = "Results unavailable";
    return;
  }

  document.getElementById("page-title").textContent = pack.label;
  document.title = pack.label + " — Faculty of Science Student Portal";

  document.getElementById("rs-gpa").textContent = pack.gpa;
  document.getElementById("rs-credits").textContent = String(pack.totalCredits);
  document.getElementById("rs-nongpa").textContent = String(pack.nonGpaCredits);

  var tbody = document.getElementById("results-body");
  var rows = pack.rows.slice();

  function uniqueValues(key) {
    var set = {};
    rows.forEach(function (r) {
      set[r[key]] = true;
    });
    return Object.keys(set).sort();
  }

  function fillSelect(sel, values) {
    values.forEach(function (v) {
      var o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      sel.appendChild(o);
    });
  }

  var fy = document.getElementById("filter-year");
  var fa = document.getElementById("filter-attempt");
  var fs = document.getElementById("filter-status");
  fillSelect(fy, uniqueValues("acYear"));
  fillSelect(fa, uniqueValues("attempt"));
  fillSelect(fs, uniqueValues("status"));

  function rowMatches(r, search, y, a, st) {
    if (search) {
      var q = search.toLowerCase();
      if (
        r.code.toLowerCase().indexOf(q) === -1 &&
        r.name.toLowerCase().indexOf(q) === -1
      ) {
        return false;
      }
    }
    if (y && r.acYear !== y) return false;
    if (a && r.attempt !== a) return false;
    if (st && r.status !== st) return false;
    return true;
  }

  function render() {
    var search = document.getElementById("filter-search").value.trim();
    var y = fy.value;
    var a = fa.value;
    var st = fs.value;

    tbody.innerHTML = "";
    var filtered = rows.filter(function (r) {
      return rowMatches(r, search, y, a, st);
    });

    if (filtered.length === 0) {
      var tr = document.createElement("tr");
      tr.className = "empty-row";
      var msg =
        rows.length === 0
          ? "No course results are recorded for this academic level yet."
          : "No courses match your search or filters.";
      tr.innerHTML = "<td colspan=\"7\">" + msg + "</td>";
      tbody.appendChild(tr);
    } else {
      filtered.forEach(function (r) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" +
          escapeHtml(r.code) +
          "</td><td>" +
          escapeHtml(r.name) +
          "</td><td>" +
          escapeHtml(r.acYear) +
          "</td><td>" +
          escapeHtml(r.attempt) +
          "</td><td>" +
          escapeHtml(r.status) +
          "</td><td>" +
          escapeHtml(r.note) +
          '</td><td class="grade">' +
          escapeHtml(r.grade) +
          "</td>";
        tbody.appendChild(tr);
      });
    }

    document.getElementById("row-count").textContent =
      filtered.length + " course" + (filtered.length === 1 ? "" : "s") + " shown";
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  ["input", "change"].forEach(function (ev) {
    document.getElementById("filter-search").addEventListener(ev, render);
  });
  fy.addEventListener("change", render);
  fa.addEventListener("change", render);
  fs.addEventListener("change", render);

  render();

  document.getElementById("btn-print").addEventListener("click", function () {
    window.print();
  });

  document.getElementById("btn-pdf").addEventListener("click", function () {
    window.print();
  });
})();
