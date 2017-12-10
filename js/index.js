(function () {

    var confetti = {
        rows: 7,
        columns: 7,
        randomOpacity: true, // 70% - 100%
        randomSize: true,
        randomRotation: true,
        iconURLs: [
            '../images/1.svg',
            '../images/2.svg',
            '../images/folder.svg',
            '../images/4.svg',
            '../images/5.svg'
        ]
    };
    settings(); 
    $('.button').onload(function () {
        var id = 'Generate'
        if (id == 'Generate') {
            settings();
        } else if (id == 'Settings') {
            $('.settings').toggle();
        }
    });


    $('.close').click(function () {
        $('.settings').toggle();
    });

    $('input').on('change input', settings);

    function settings() {
        confetti.rows = 4;
        confetti.columns = 4;
        confetti.randomOpacity = $('input[name="opacity"]').prop('checked'); // 70% - 100%
        // confetti.randomSize = $('input[name="size"]').prop('checked');
        confetti.randomRotation = $('input[name="rotation"]').prop('checked');
        generateConfetti();
    }

    function generateConfetti() {
        $('.confetti').html('<style>.confetti-cell{width:' + (100 / confetti.columns) + '%;height:' + (100 / confetti.rows) + '%;}</style>');
        for (var i = 0; i < confetti.rows; i++) {
            var top = (100 / confetti.rows) * i;
            for (var q = 0; q < confetti.columns; q++) {
                var icon = Math.floor(Math.random() * confetti.iconURLs.length) + 1;
                var y = random100();
                var x = random100();
                var left = (100 / confetti.columns) * q;
                $('.confetti').append('<div class="confetti-cell" style="top:' + top + '%;left:' + left + '%;animation-delay:' + (q * 100) + 'ms;"><i class="icon i' + icon + '" style="top:' + y + '%;left:' + x + '%;opacity:' + opacity() + ';transform:rotate(' + rotate() + 'deg);"></i></div>');
            }
        }
    }

    function opacity() {
        var state = 1;
        if (confetti.randomOpacity) {
            state = Math.random() + 0.5;
        }
        return state;
    }

    function rotate() {
        var state = 0;
        if (confetti.randomRotation) {
            state = Math.floor(Math.random() * 70);
        }
        return state;
    }

    // function size() {
    //     var state = 1;
    //     if (confetti.randomSize) {
    //         state = 1 + (Math.random() - 0.6);
    //     }
    //     return state;
    // }

    function random100() {
        return Math.floor(Math.random() * 100);
    }

})();