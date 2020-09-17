function initDemoModal() {
    var $show = $(".modal-show-trigger");
    var $close = $(".modal-close-trigger");

    $show.on("click", function (e) {
        e.preventDefault();
        $($(this).data("target")).addClass("show");
    });

    $close.on("click", function (e) {
        e.preventDefault();
        $($(this).data("target")).removeClass("show");
    });
}

$(document).ready(function () {
    initDemoModal();
});
