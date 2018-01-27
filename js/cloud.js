jQuery(document)
    .ready(function () {
        setInterval(function () {
            $('.dayopen').trigger('click');
        }, 5000);
        setInterval(function () {
            $('.dayclose').trigger('click');
        }, 10000);
        $('.dayopen').on('click', function (e) {
            var href,
                target;
            e.preventDefault();
            target = $(this).data('target');
            href = "#" + target;
            $("#" + target)
                .fadeIn()
                .addClass('activeday');
            return $(document).scrollTop(0);
        });
        return $('.dayclose').on('click', function (e) {
            e.preventDefault();
            return $('.activeday')
                .fadeOut()
                .removeClass('activeday');
        });
    });
