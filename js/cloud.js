jQuery(document)
    .ready(function () {
        setInterval(function (e) {

            $('.dayopen').trigger('click');
            
        }, 5000);
        setInterval(function (e) {
            
            $('.dayclose').trigger('click');
            
            

        }, 10000);
        $('.dayopen').on('click', function (e) {
            var href,target;
            e.preventDefault();
            target = $(this).data('target');
            href = "#" + target;
            $("#" + target).fadeIn().addClass('activeday');
            
        });
        return $('.dayclose').on('click', function (e) {
            e.preventDefault();
            return $('.activeday')
                .fadeOut()
                .removeClass('activeday');
        });
    });
