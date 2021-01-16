document.addEventListener("DOMContentLoaded", function () {
    // Modal show

    [].forEach.call(
        document.querySelectorAll("[data-toggle='modal']"),
        function (el) {
            el.onclick = function () {
                document
                    .getElementById(el.getAttribute("data-target"))
                    .classList.add("show");
                return false;
            };
        }
    );

    // Modal hide

    [].forEach.call(
        document.querySelectorAll("[data-dismiss='modal'"),
        function (el) {
            el.onclick = function () {
                el.closest(".modal").classList.remove("show");
                return false;
            };
        }
    );

    // Alert hide

    [].forEach.call(
        document.querySelectorAll("[data-dismiss='alert']"),
        function (el) {
            el.onclick = function () {
                el.closest(".alert").style.display = "none";
                return false;
            };
        }
    );

    // Tab toggle

    [].forEach.call(
        document.querySelectorAll("[data-toggle='tab']"),
        function (el) {
            el.onclick = function () {
                var tab = el.closest(".tab");
                var active = tab.querySelectorAll(
                    ".tab-link.active, .tab-pane.active"
                );
                for (var i = 0; i < active.length; i++) {
                    active[i].classList.remove("active");
                }
                el.classList.add("active");
                document
                    .getElementById(el.getAttribute("href").split("#")[1])
                    .classList.add("active");
                return false;
            };
        }
    );

    // Icons
    feather.replace();
});
