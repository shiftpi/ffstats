/**
 * ffstats
 * Copyright (c) 2015. Andreas Rutz. Published under MIT license.
 */

function setStats() {
    $.getJSON(config.apiPath, function(data) {
        $.each(data, function(key, value) {
            var $element = $('[data-key="' + key + '"]');
            
            if (key === config.hostnameKey) {
                document.title = config.titlePrefix + value;
            }
            
            $element.text(value);
            if ($element.is('a')) {
                $element.attr('href', 'mailto: ' + value);
            }            
        });
    }).fail(function() {
        console.error('API request failed');
    });
}

$(function() {
    setStats();
    setInterval(setStats, config.updateInterval);
});