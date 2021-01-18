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

    // Icons
    feather.replace();
});
