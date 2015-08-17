/*!
 * ffstats
 * Copyright (c) 2015. Andreas Rutz. Published under MIT license.
 */

function leadingZero(number) {
    if (number < 10) {
        number = '0' + number;
    }

    return number.toString();
}

function setStats() {
    $.getJSON(config.apiPath, function(data) {
        $.each(data, function(key, value) {
            var $element = $('[data-key="' + key + '"]');
            
            if (key === config.hostnameKey) {
                document.title = config.titlePrefix + value;
            }
            
            switch($element.attr('data-type')) {
                case 'mail':
                    $element.attr('href', 'mailto:' + value);
                    break;
                case 'duration':
                    var hours = leadingZero(Math.floor(value / 3600)),
                        minutes = leadingZero(Math.floor(value % 3600 / 60)),
                        seconds = leadingZero(Math.floor(value % 3600 % 60));

                    value = hours + ':' + minutes + ':' + seconds;
                    break;
            }

            $element.text(value);
        });
    }).fail(function() {
        console.error('API request failed');
    });
}

$(function() {
    setStats();
    setInterval(setStats, config.updateInterval);
});