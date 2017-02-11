﻿"use strict";

var keyboards = {
    'eng': {
        'qwerty': ['`<sup><sup>~</sup></sup>', '1<sup>!</sup>', '2<sup>&#64</sup>', '3<sup>#</sup>', '4<sup>$</sup>', '5<sup>%</sup>', '6<sup>^</sup>', '7<sup>&amp;</sup>', '8<sup>*</sup>', '9<sup>(</sup>', '0<sup>)</sup>', '-<sup><sup>_</sup></sup>', '=<sup>+</sup>',
				'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[<sup>{</sup>', ']<sup>}</sup>', '\\<sup>|</sup>',
				'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';<sup>:</sup>', '\'<sup>"</sup>',
				'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',<sup>&lt;</sup>', '.<sup>&gt;</sup>', '/<sup>?</sup>'],
    },
    'rus': {
        'йцукен': ['Ё', '1<sup>!</sup>', '2<sup>"</sup>', '3<sup>№</sup>', '4<sup>;</sup>', '5<sup>%</sup>', '6<sup>:</sup>', '7<sup>?</sup>', '8<sup>*</sup>', '9<sup>(</sup>', '0<sup>)</sup>', '-<sup><sup>_</sup></sup>', '=<sup>+</sup>',
				'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\<sup>/</sup>',
				'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
				'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.<sup>,</sup>'],
    },
    'ukr': {
        'українська': ['\'<sup>?</sup>', '!<sup>1</sup>', '"<sup>2</sup>', '#<sup>3</sup>', ';<sup>4</sup>', ':<sup>5</sup>', ',<sup>6</sup>', '.<sup>7</sup>', '*<sup>8</sup>', '(<sup>9</sup>', ')<sup>0</sup>', '-<sup><sup>_</sup></sup>', '=<sup>+</sup>',
				'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ґ', '/<sup>%</sup>',
				'Ф', 'И', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є',
				'Я', 'Ч', 'С', 'М', 'І', 'Т', 'Ь', 'Б', 'Ю', 'Ї']
    }
};
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
        }
        var date;
        date = new Date();
        date.setTime(date.getTime() + (31 * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toUTCString();
        document.cookie = [name, '=', encodeURIComponent(value), expires].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
var beep = null;
//var blur_timer = null;
$(function () {
    //beeper where mistake
        beep = $("#beep").get(0);
        $('#error, #speed').click(function () {
        $.cookie('keybotrain_speed_error', $('#error .data').has(':visible') ? 'no' : 'yes');
        $('#error .data, #speed .data').fadeToggle();
        $('#intext').focus();
    });
        //if ($.cookie('keybotrain_speed_error') == 'no') {
       // $('#hide_keyboard').hide();
       // $('#error .data, #speed .data').hide();
    //}
    //$('div.title, span.title');
    $('#text div').addClass('empty');
    $('#text div.line2').text('Dictonary loading... | Загрузка словаря...');

    //timer
    //$('#time_sel .close').click(function () {
      //  $('#time_sel').fadeOut();
       // $('#intext').focus();
    //});

    //$('#time a').click(function () {
    //    intext_notblur();
    //    $('div.wind_sel').fadeOut();
    //    $('#time_sel').fadeIn();
    //    return false;
    //});


    ////close select language menu
    //$('#dict_sel .close').click(function () {
    //    $('#dict_sel').fadeOut();
    //    $('#intext').focus();
    //});

    ////close select keyboard type menu
    //$('#layout_sel .close').click(function () {
    //    $('#layout_sel').fadeOut();
    //    $('#intext').focus();
    //});

    //// what??
    //$('#hide_all').click(function () {
    //    $(document.body).toggleClass('dzen');
    //    if ((!$(document.body).is('.dzen')) && (!$('#text div.empty').length)) {
    //        $('#time').data('time', null);
    //        $('#time a').text($('#time').data('minutes'));
    //    }
    //    $('#intext').focus();
    //});

    $('#dict a').click(function () {
        //intext_notblur();
        $('div.wind_sel').fadeOut();
        $('#dict_sel').fadeIn();
        return false;
    });

    $('#layout a').click(function () {
        //intext_notblur();
        $('div.wind_sel').fadeOut();
        $('#layout_sel').fadeIn();
        return false;
    });

    $('#hide_keyboard').click(function () {
        $.cookie('keybotrain_keyboard_hide', 'yes');
        $('#hide_keyboard').hide();
        $('#keyboards').fadeOut();
        $('#show_keyboard').fadeIn();
        $('#intext').focus();
    });

    $('#show_keyboard').click(function () {
        $.cookie('keybotrain_keyboard_hide', '');
        $('#show_keyboard').hide();
        $('#hide_keyboard').fadeIn();
        $('#keyboards').fadeIn();
        $('#intext').data('text', null);
        intext_check();
        $('#intext').focus();
    });
    if ($.cookie('keybotrain_keyboard_hide') == 'yes') {
        $('#hide_keyboard').hide();
        $('#keyboards').hide();
        $('#show_keyboard').show();
    }
    $('#hide_hand').click(function () {
        $.cookie('keybotrain_hand_hide', 'yes');
        $('#hide_hand').hide();
        $('#hands').hide();
        $('#show_hand').fadeIn();
        $('#intext').focus();
    });
    $('#show_hand').click(function () {
        $.cookie('keybotrain_hand_hide', '');
        $('#show_hand').hide();
        $('#hide_hand').fadeIn();
        $('#hands').show();
        $('#intext').data('text', null);
        intext_check();
        $('#intext').focus();
    });
    $('#hide_color').click(function () {
        $.cookie('keybotrain_color_show', '');
        $('#hide_color').hide();
        $('#keyboard').removeClass('fingers');
        $('#show_color').fadeIn();
        $('#intext').focus();
    });
    $('#show_color').click(function () {
        $.cookie('keybotrain_color_show', 'yes');
        $('#show_color').hide();
        $('#hide_color').fadeIn();
        $('#keyboard').addClass('fingers');
        $('#intext').data('text', null);
        intext_check();
        $('#intext').focus();
    });
    $('#hide_sound').click(function () {
        $.cookie('keybotrain_sound_show', '');
        $('#hide_sound').hide();
        $('#show_sound').fadeIn();
        $('#intext').focus();
    });
    $('#show_sound').click(function () {
        $.cookie('keybotrain_sound_show', 'yes');
        $('#show_sound').hide();
        $('#hide_sound').fadeIn();
        $('#intext').data('text', null);
        intext_check();
        $('#intext').focus();
    });
    if ($.cookie('keybotrain_autobackspace') == 'no') {
        $('#hide_autobackspace').hide();
        $('#show_autobackspace').show();
        $('div.keyboard div.backspace').removeClass('off');
    }
    $('#hide_autobackspace').click(function () {
        $.cookie('keybotrain_autobackspace', 'no');
        $('#hide_autobackspace').hide();
        $('#show_autobackspace').fadeIn();
        $('div.keyboard div.backspace').removeClass('off');
        $('#intext').focus();
    });
    $('#show_autobackspace').click(function () {
        $.cookie('keybotrain_autobackspace', 'yes');
        $('#show_autobackspace').hide();
        $('#hide_autobackspace').fadeIn();
        $('div.keyboard div.backspace').addClass('off');
        $('#intext').focus();
    });
    if ($.cookie('keybotrain_hand_hide') == 'yes') {
        $('#hide_hand').hide();
        $('#hands').hide();
        $('#show_hand').show();
    }
    if ($.cookie('keybotrain_color_show') == 'yes') {
        $('#show_color').hide();
        $('#keyboard').addClass('fingers');
        $('#hide_color').show();
    }
    if ($.cookie('keybotrain_sound_show') == 'yes') {
        $('#show_sound').hide();
        $('#hide_sound').show();
    }

    $('#intext').keydown(function (e) {
        console.log(href);
        var href = $('#refresh').attr('href');
        var type = href.split('_')[1];
        if (e.keyCode == 9 && !e.shiftKey) {
            return false;
        }
        if ((e.keyCode == 8 && !(e.shiftKey || e.ctrlKey)) && ($('#hide_autobackspace').is(':visible'))) {
            return false;
        }
    }).keyup(function () {
        intext_check();
    //}).blur(function () {
    //    blur_timer = window.setTimeout(function () { $('#intext').addClass('blur'); }, 100);
    }).focus(function () {
        //intext_notblur();
        $('div.wind_sel').fadeOut();
    });
    //if ($.browser.opera) $('#intext').keydown(function () { window.setTimeout(intext_check, 10); });
    $('#textform').submit(function () {
        $('#intext').val($('#intext').val() + '¶');
        return false;
    });


    $('#dict_sel a').click(function () {
        var href = $(this).attr('href');
        $('#intext').val('');
        return dict_start(href);
    });
    $('#time_sel a').click(function () {
        var href = $(this).attr('href');
        var minutes = parseInt(href.substring(1), 10);
        $.cookie('keybotrain_timer', minutes);
        $('#time a').text(minutes);
        $('#time_sel').fadeOut();
        $('#time').data('minutes', minutes);
        $('#intext').focus();
        return false;
    });
    if ($.cookie('keybotrain_timer')) {
        $('#time a').text($.cookie('keybotrain_timer'));
    }
    $('#my_dict .close').click(function () {
        $('#my_dict').fadeOut();
        $('#intext').focus();
    });
    $(window).resize(function () {
        kbd_hint_timer_init();
    });
    $('#refresh').click(function () {
        dict_refresh();
        $('#intext').focus();
        return false;
    });
    $('#my_dict_ok').click(function () {
        my_dict();
        return false;
    });
    $('<img src="/Content/images/wait.gif">');

    get_location();
    dict_start($('#refresh').attr('href'));
});


//my dictoinary in separate window after press OK button
function my_dict() {
    console.log('my_dict');
    $('#refresh').attr('href', '#mydict');
    $.cookie('keybotrain_dict', '#mydict');
    $('#dict_sel_').text('Мой словарь | My dictionary');
    window.location.href = '#mydict';
    $('#dict a').text($('#dict_sel a[href=\\#mydict]').text());
    var text = $('#dict_data').val();
    dict_cleardata();
    dict_generate(text);
    intext_check();
    $('#my_dict').fadeOut();
    $('#intext').focus();
}

////timer of time when #intext is not blur
//function intext_notblur() {
//    console.log(blur_timer);
//    if (blur_timer != null) {
//        window.clearTimeout(blur_timer);
//        blur_timer = null;
//    }
//    $('#intext').removeClass('blur');
//}

function stat_clear() {
    var href = $('#refresh').attr('href');
    $('#question').removeClass('error');
    $('#intext').removeClass('error');
    $('#intext').val('').data('start', null).data('errors', null).data('sum_linelen', 0).data('sum_len', 0).data('sum_errors', null).data('sum_time', null).data('sum_words', 0);
    $('#text').removeClass('error');
    $('#text div').html('').addClass('empty');
    $('#speed .data').html('<span class="nimp">--/--</span>');
    if ($('#question').css('visibility') == 'visible')
        $('#error .data').html('0%');
    else
        $('#error .data').html('<span class="nimp">--/--</span>');
}

function layout_sel(a) {
    var href = $(a).attr('href');
    var layout = href.substring(1);
    draw_keyboard(layout);
    $('#layout a').text(layout);
    $('#layout_sel').fadeOut();
    kbd_hint_timer_init();
    $('#intext').focus();
    return false;
}
function text2html(text) {
    return text.replace(/</g, '&lt;');
}

////left timer
//var left_timer = null;
//function func_left_timer() {
//    var href = $('#refresh').attr('href');
//    var type = href.split('_')[1];
//    $('#intext').val('').data('line', null);
//    if ((!$('#text div.empty').length) || (href == '#numpad') || (type == 'num') || (type == 'basic') || (type == 'begin') || (type == 'speed')) {
//        $('#time').data('time', null);
//        $('#time a').text($('#time').data('minutes'));
//    }
//    intext_check();
//}

////esperanto
//function epo_ikso(intext, line) {
//    var last = intext.substring(intext.length - 1).toLowerCase();
//    var llast = line.substring(intext.length - 1, intext.length).toLowerCase();
//    if ((last == 's' && llast == 'ŝ') || (last == 'g' && llast == 'ĝ') || (last == 'j' && llast == 'ĵ') || (last == 'c' && llast == 'ĉ') || (last == 'h' && llast == 'ĥ') || (last == 'u' && llast == 'ŭ')) {
//        return '';
//    }
//    if (intext.substring(intext.length - 1).toLowerCase() == 'x') {
//        var prev = intext.substring(intext.length - 2, intext.length - 1).toLowerCase();
//        if (prev == 's' || prev == 'g' || prev == 'j' || prev == 'c' || prev == 'h' || prev == 'u') {
//            prev = intext.substring(intext.length - 2, intext.length - 1);
//            prev = prev.replace('S', 'Ŝ').replace('s', 'ŝ');
//            prev = prev.replace('G', 'Ĝ').replace('g', 'ĝ');
//            prev = prev.replace('J', 'Ĵ').replace('j', 'ĵ');
//            prev = prev.replace('C', 'Ĉ').replace('c', 'ĉ');
//            prev = prev.replace('H', 'Ĥ').replace('h', 'ĥ');
//            prev = prev.replace('U', 'Ŭ').replace('u', 'ŭ');
//            intext = intext.substring(0, intext.length - 2) + prev;
//            $('#intext').val(intext);
//            return intext;
//        }
//    }
//    return intext;
//}


function dict_penalt(index, intext, line, type) {
    console.log('dict_penalt');
    $('#intext').val('');
    var line_index = $('#question').data('line');
    if (index == $('#question').data('index')) {
        $('#intext').data('errors', 0);
        set_stat(line);
        text_generate();
    } else {
        var error_items = $('#intext').data('error_items');
        if (!error_items) error_items = [];
        for (var i = 0; i < 5; i++) error_items[error_items.length] = line_index;
        $('#intext').data('error_items', error_items);
        $('#intext').data('errors', 1);
        var dline = [];
        if (type == 'dictrev') {
            dline = [trim(dict[line_index].split('=')[0])];
        } else {
            dline = dict[line_index].split('=')[1].split(';');
        }
        var tline = $('#text div.line' + $('#question').data('index')).text();
        $('#text div.line1').text(tline.substring(0, tline.length - 1) + '¶').removeClass('empty');
        $('#text div.line2').text(trim(dline[random(dline.length)]).substring(0, 79) + '¶').removeClass('empty');
        $('#text div.line3').text(trim(dline[random(dline.length)]).substring(0, 79) + '¶').removeClass('empty');
        $('#text div.line4').text('').addClass('empty');
        $('#text div.line5').text($('#question').text()).removeClass('empty');
        set_stat(line);
        $('#question').addClass('error').fadeOut('fast', function () {
            $(this).fadeIn('fast', function () { $(this).fadeOut('fast', function () { $(this).fadeIn('fast') }); });
        });
    }
}
function intext_check() {
    //if (left_timer) {
    //    window.clearTimeout(left_timer);
    //}
    //left_timer = window.setTimeout(func_left_timer, 15000);
    var href = $('#refresh').attr('href');
    var lang = href.substring(1).split('_')[0];
    var type = href.split('_')[1];
    var intext = $('#intext').val();
    var is_change = (intext != $('#intext').data('text'));
    $('#intext').data('text', intext);
    var line1 = $('#text div.line1').text();
    var line1_check = line1.replace(/ /g, ' ');
    if (href == '#numpad') intext = intext.replace(/,/g, '.');
    if (lang == 'eng') intext = intext.replace(/`/g, "'");
    line1_check = line1_check.replace(/ё/g, "е").replace(/Ё/g, "Е");
    line1_check = line1_check.replace(/¶/g, " ");
    intext = intext.replace(/ё/g, "е").replace(/Ё/g, "Е");
    intext = intext.replace(/¶/g, " ");
    var is_line1 = false;
    var is_lines = false;
    if (($('#question').css('visibility') == 'visible') && (!$('#question').is('.error'))) {
        for (var i = 1; i <= 5; i++) {
            var line = $('#text div.line' + i).text();
            line = line.replace(/ё/g, "е").replace(/Ё/g, "Е");
            line = line.replace(/¶/g, " ");
            if (lang == 'epo') {
                var intext2 = intext;
                intext = epo_ikso(intext, line);
                if (intext == '') intext = intext2.substring(0, intext2.length - 1);
            }
            if (line.indexOf(intext.substring(0, line.length)) == 0) {
                is_lines = true;
                break;
            }
        }
    } else {
        if (lang == 'epo') {
            var intext2 = intext;
            intext = epo_ikso(intext, line1_check);
            if (intext == '') intext = intext2.substring(0, intext2.length - 1);
        }
        if (line1_check.indexOf(intext.substring(0, line1_check.length)) == 0) {
            is_line1 = true;
        }
    }

    if (intext == '') {
        $('#intext').data('start', null);
        $('#intext').data('errors', 0);
    } else {
        if (!$('#intext').data('start')) {
            var now = new Date();
            $('#intext').data('start', now.getTime());
            $('#intext').data('errors', 0);
        }
        if (!$('#time').data('time')) {
            var now = new Date();
            $('#time').data('time', now.getTime());
        }
    }
    var sym_errors = $('#text').data('sym_errors') ? $('#text').data('sym_errors') : [];
    var checked = $('#text div span.checked').eq(0).text();
    var sym = line1_check.substring(checked.length, checked.length + 1).toLowerCase();

    if (line1 == '') {
    } else if (is_lines) {
        $('#intext').removeClass('error');
        $('#text').removeClass('error');
        for (var i = 1; i <= 5; i++) {
            var line = $('#text div.line' + i).text();
            var line_check = line.replace(/ /g, ' ');
            line_check = line_check.replace(/ё/g, "е").replace(/Ё/g, "Е");
            line_check = line_check.replace(/¶/g, " ");
            if ((line_check.indexOf(intext.substring(0, line.length)) == 0) && (line != '')) {
                $('#text div.line' + i).html((intext.length > 0 ? '<span class="checked">' + text2html(line.substring(0, intext.length)) + '</span>' : '') + text2html(line.substring(intext.length)));
                if (line != '') $('#text div.line' + i).removeClass('empty'); else $('#text div.line' + i).addClass('empty');
                if (intext.length >= line.length) {
                    dict_penalt(i, intext, line, type);
                    break;
                }
            } else {
                $('#text div.line' + i).text(line).removeClass('empty');
            }
        }
    } else if (is_line1) {
        $('#intext').removeClass('error');
        $('#text').removeClass('error');
        if (is_change) {
            sym_errors[sym] = (sym_errors[sym] ? sym_errors[sym] - 1 : 0);
            $('#text').data('sym_errors', sym_errors);
        }
        $('#text div.line1').html((intext.length > 0 ? '<span class="checked">' + text2html(line1.substring(0, intext.length)) + '</span>' : '') + text2html(line1.substring(intext.length)));
        line_errors();
        if (intext.length >= line1.length) {
            set_stat(line1);
            if (type == 'speed') {
                $('#question').removeClass('error');
            }
            for (var i = 1; i < 5; i++) {
                $('#text div.line' + i).html($('#text div.line' + (i + 1)).html());
                if ($('#text div.line' + (i + 1)).is('.empty')) {
                    $('#text div.line' + i).addClass('empty');
                } else {
                    $('#text div.line' + i).removeClass('empty');
                }
            }
            $('#text div.line5').html('').addClass('empty');
            $('#intext').val(intext.substring(line1.length));
            if (($('#question').css('visibility') == 'visible') && ($('#text div.line1').text() == '')) {
                $('#question').removeClass('error');
            }
            if (($('#question').css('visibility') != 'visible') || ($('#text div.line1').text() == '')) {
                text_generate();
            }
        }
    } else {
        if (beep && (!$('#intext').is('.error')) && $('#hide_sound').is(':visible')) beep.play();
        if ((!$('#intext').is('.error')) && (!$('#question').is('.error'))) {
            if (checked) {
                if (!(sym == ' ' || sym == '¶')) {
                    sym_errors[sym] = (sym_errors[sym] ? sym_errors[sym] + 7 : 7);
                }
                line_errors();
                $('#text').data('sym_errors', sym_errors);
                $('#intext').data('errors', $('#intext').data('errors') + 1);
            }
            if ((type == 'begin') && checked) {
                var index = $('#text div.line1 span.checked').text().split(' ').length - 1;
                var word_indexes = $('#text').data('word_indexes');
                var error_indexes = $('#text').data('error_indexes') ? $('#text').data('error_indexes') : [];
                var rand = ((error_indexes > 10) ? random(2) : random(4));
                for (var i = 0; i < rand; i++) {
                    error_indexes.push(word_indexes[index]);
                }
                $('#text').data('error_indexes', error_indexes);
            }
        }
        $('#intext').addClass('error');
        $('#text').addClass('error');
        if (type == 'speed') {
            $('#question').addClass('error');
            $('#intext').val('').data('start', null).removeClass('error');
            $('#text').removeClass('error');
            $('#text div.line1, #text div.line2, #text div.line3').text($('#text div.line1').text()).removeClass('empty');
        }
        if ($('#hide_autobackspace').is(':visible')) {
            window.setTimeout(function () {
                var intext = $('#intext').val();
                $('#intext').val(intext.substring(0, checked.length));
                $('#intext').removeClass('error');
                $('#text').removeClass('error');
                kbd_hint_timer_init();
            }, 200);
        }
    }
    if (is_change)
        kbd_hint_timer_init();
}

function line_errors() {
    var href = $('#refresh').attr('href');
    var type = href.split('_')[1];
    if ((type != 'speed') && (type != 'begin') && (type != 'dict') && (type != 'dictrev')) {
        var sym_errors = $('#text').data('sym_errors') ? $('#text').data('sym_errors') : [];
        var error_symbols = [];
        for (var i in sym_errors) {
            error_symbols[i] = sym_errors[i];
        }
        for (var index = 1; index <= 3; index++) {
            var ret = '';
            var checked = $('#text div.line' + index + ' span.checked').text();
            var text = $('#text div.line' + index).text().substring(checked.length);
            for (var i = 0; i < text.length; i++) {
                var symbol = text.substring(i, i + 1);
                if (error_symbols[symbol.toLowerCase()] > 0) {
                    ret = ret + '<span class="warn">' + text2html(symbol) + '</span>';
                    error_symbols[symbol.toLowerCase()]--;
                } else {
                    ret = ret + text2html(symbol);
                }
            }
            $('#text div.line' + index).html((checked ? '<span class="checked">' + text2html(checked) + '</span>' : '') + ret).removeClass('empty');
            if ((!checked) && (!ret)) $('#text div.line' + index).addClass('empty');
        }
    }
}


// set and count statistic function
function set_stat(text) {
    text = text.replace(/ /g, ' ');
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    var type = href.split('_')[1];
    var errors = $('#intext').data('errors');
    if (type == 'speed') {
        errors = $('#question').is('.error') ? 1 : 0;
    }
    var len = text.length - 1;
    var words = text.split(' ').length;
    if (text.substring(text.length - 1) == ' ') words--;
    var end = new Date();
    var start = $('#intext').data('start');
    var time = (end.getTime() - start) / 1000;
    var speed = (len / time) * 60;
    if (speed < 3000) {
        var wspeed = (words / time) * 60;
        var sum_time = $('#intext').data('sum_time') ? $('#intext').data('sum_time') + time : time;
        var sum_len = $('#intext').data('sum_len') ? $('#intext').data('sum_len') + len : len;
        var sum_linelen = $('#intext').data('sum_linelen') ? $('#intext').data('sum_linelen') : 0;
        if ((!$('#question').is('.error')) || (type == 'speed')) {
            sum_linelen++;
            $('#intext').data('sum_linelen', sum_linelen);
        }
        var sum_words = $('#intext').data('sum_words') ? $('#intext').data('sum_words') + words : words;
        var sum_errors = $('#intext').data('sum_errors') ? $('#intext').data('sum_errors') + errors : errors;
        $('#intext').data('sum_time', sum_time);
        $('#intext').data('sum_len', sum_len);
        $('#intext').data('sum_words', sum_words);
        $('#intext').data('sum_errors', sum_errors);
        $('#intext').data('start', null);
        var sum_speed = (sum_len / sum_time) * 60;
        var sum_wspeed = (sum_words / sum_time) * 60;
        var error = ((errors / len) * 10000) / 100;
        var sum_error = ((sum_errors / sum_len) * 10000) / 100;
        if (lang == 'rus' || lang == 'ukr') {
            $('#speedometer').html((sum_len != len ? '<span class="nimp"><span title="Символов в минуту на предыдущей строке">' + Math.round(speed) + '</span> (<span title="Слов в минуту на предыдущей строке">' + Math.round(speed / 6) + '</span>) / </span>' : '') + '<span title="Всего символов в минуту">' + Math.round(sum_speed) + '</span> (<span title="Всего слов в минуту">' + Math.round(sum_speed / 6) + '</span>' + ((href != '#numpad') && (type != 'num') ? (type != 'code' ? '/<span title="Реальных слов в минуту">' + Math.round(sum_wspeed) + '</span>' : '') : '') + ')');
        } else {
            $('#speedometer').html((sum_len != len ? '<span class="nimp"><span title="Last characters per minute">' + Math.round(speed) + '</span> (<span title="Last words per minute">' + Math.round(speed / 6) + '</span>) / </span>' : '') + '<span title="Characters per minute">' + Math.round(sum_speed) + '</span> (<span title="Words per minute">' + Math.round(sum_speed / 6) + '</span>' + ((href != '#numpad') && (type != 'num') ? (type != 'code' ? '/<span title="Real words per minute">' + Math.round(sum_wspeed) + '</span>' : '') : '') + ')');
        }
        if (($('#question').css('visibility') == 'visible') || (type == 'speed')) {
            var sum_lineerror = ((sum_errors / sum_linelen) * 10000) / 100;
            $('#mistake').html('<span title="' + (lang == 'rus' || lang == 'ukr' ? 'Ошибочных ответов' : 'Error answers') + '">' + Math.round(sum_lineerror) + '%</span> (<span title="' + (lang == 'rus' || lang == 'ukr' ? 'Количество ошибок' : 'Count Errors') + '">' + sum_errors + '</span>/<span title="' + (lang == 'rus' || lang == 'ukr' ? 'Количество слов' : 'Count words') + '">' + sum_linelen + '</span>)');
        } else {
            $('#mistake').html((sum_len != len ? '<span class="nimp"><span title="' + (lang == 'rus' || lang == 'ukr' ? 'Ошибок на предыдущей строке' : 'Errors last') + '">' + error.toFixed(2) + '%</span> / </span>' : '') + '<span title="' + (lang == 'rus' || lang == 'ukr' ? 'Ошибок' : 'Errors') + '">' + sum_error.toFixed(2) + '%</span>');
        }
    }
    //$('#speedometer').append("    ", Math.round(speed), " / ", Math.round(sum_speed));
    //$('#mistake').append("   ", Math.round(error), " / ", Math.round(sum_error));

    console.log('speed ',  speed);
    console.log('sum_speed ', sum_speed);
    console.log('speed ', error);
    console.log('sum_speed ', sum_error);

}
var kbd_hint_timer = null;
function kbd_hint_timer_init() {
    $('div.keyboard:visible div.sel').removeClass('sel');
    $('div.keyboard:visible div.space div').removeClass('sel_left').removeClass('sel_right');
    $('#hands div.hand').hide();
    if (kbd_hint_timer != null) {
        window.clearTimeout(kbd_hint_timer);
    }

    var pause = ($('#hide_hand').is(':visible') ? 0 : 500);

    kbd_hint_timer = window.setTimeout(func_kbd_hint_timer, pause);
}
function func_kbd_hint_timer() {
    var layout = $('#layout_sel').data('layout');
    var href = $('#refresh').attr('href');
    var lang = href.substring(1).split('_')[0];
    var intext = $('#intext').val();
    var line1 = $('#text div.line1').text().replace(/ /g, ' ');
    var line1_check = line1.replace(/ /g, ' ');
    if (href == '#numpad') intext = intext.replace(/,/g, '.');
    if (lang == 'eng') intext = intext.replace(/`/g, "'");
    line1_check = line1_check.replace(/ё/g, "е").replace(/Ё/g, "Е");
    line1_check = line1_check.replace(/¶/g, " ");
    intext = intext.replace(/ё/g, "е").replace(/Ё/g, "Е");
    intext = intext.replace(/¶/g, " ");
    var sym = line1.substring(intext.length, intext.length + 1);
    if ($('#question').not('.error').css('visibility') == 'visible') {
        sym = '';
        for (var i = 1; i <= 5; i++) {
            var line = $('#text div.line' + i).text();
            var line_check = line;
            line_check = line_check.replace(/ё/g, "е").replace(/Ё/g, "Е");
            line_check = line_check.replace(/¶/g, " ");
            if (line_check.indexOf(intext.substring(0, line.length)) == 0) {
                if (sym == '') sym = line.substring(intext.length, intext.length + 1);
                if (line.substring(intext.length, intext.length + 1) != sym) {
                    sym = '~~';
                }
            }
        }
        if (sym == '~~') sym = '';
    }
    if ($('#intext').is('.error')) {
        $('div.keyboard:visible div.keys:visible div.line div.backspace').addClass('sel');
    } else if (sym != '') {
        if (sym == '¶') {
            $('div.keyboard:visible div.keys:visible div.line div.enter').addClass('sel');
        } else if (sym == ' ') {
            var sym_prev = line1.substring(intext.length - 1, intext.length);
            var pos = $("div.keyboard:visible div.keys:visible div.line div:not(.sys):contains('" + sym_prev.toUpperCase() + "')").prevAll('div').length;
            if ($('#keybotrain').is(':visible')) {
                $('div.keyboard:visible div.keys:visible div.line div.space div').addClass('sel_right');
            } else {
                $('div.keyboard:visible div.keys:visible div.line div.space div').addClass(pos <= 5 ? 'sel_right' : 'sel_left');
            }
        } else if (sym == '"') {
            var $key = $("div.keyboard:visible div.keys:visible div.line div:not(.sys):contains('" + sym + "')");
            $key.addClass('sel');
            if ($key.find('sup').is(":contains('" + sym + "')")) {
                sel_shift($key.prevAll('div').length <= 5);
            }
            if ($key.find('sub').is(":contains('" + sym + "')")) {
                sel_fn($key.prevAll('div').length <= 5);
            }
        } else if (sym == '(') {
            var key = ((layout == 'dvorak_program') ? '1' : '9');
            if (layout == 'ant') key = '[';
            if (layout == 'ант') key = '«';
            var $key = $("div.keyboard:visible div.keys:visible div.line div:not(.sys):contains('" + key + "')");
            if ($('#keyboard #keybotrain').is(':visible')) {
                $('div.keyboard:visible div.keys:visible div.line div.lbrack').addClass('sel');
                sel_fn($key.prevAll('div').length <= 5);
            } else {
                $key.addClass('sel');
                if ($key.find('sup').text().indexOf(sym) >= 0) {
                    sel_shift($key.prevAll('div').length <= 5);
                }
            }
        } else if (sym == ')') {
            var key = ((layout == 'dvorak_program') ? '2' : '0');
            if (layout == 'ant') key = ']';
            if (layout == 'ант') key = '»';
            var $key = $("div.keyboard:visible div.keys:visible div.line div:not(.sys):contains('" + key + "')");
            if ($('#keyboard #keybotrain').is(':visible')) {
                $('div.keyboard:visible div.keys:visible div.line div.rbrack').addClass('sel');
                sel_fn($key.prevAll('div').length <= 5);
            } else {
                $key.addClass('sel');
                if ($key.find('sup').text().indexOf(sym) >= 0) {
                    sel_shift($key.prevAll('div').length <= 5);
                }
            }
        } else {
            var $key = $('div.keyboard:visible div.keys:visible div.line div:not(.sys):contains("' + sym + '")');
            if ($key.length == 0) {
                $key = $('div.keyboard:visible div.keys:visible div.line div:not(.sys):contains("' + sym.toUpperCase() + '")');
            }
            $key.addClass('sel');
            if ($key.find('sup').is(':contains("' + sym + '")') || (sym != sym.toLowerCase())) {
                sel_shift($key.prevAll('div').length <= 5);
            }
            if ($key.find('sub').is(':contains("' + sym.toUpperCase() + '")')) {
                sel_fn($key.prevAll('div').length <= 5);
            }
        }
    }
    $('div.keyboard:visible div.keys:visible div.line div.sel').each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        var pos = $(this).prevAll('div').length;
        var lr = 'r';
        var hnum = 4;
        var is_numpad = $('div.keyboard:visible').is('#numkeyboard');
        var x = 0;
        var line = $(this).parent('div.line').prevAll('div.line').length;
        if (is_numpad) {
            if (pos == 0) hnum = 1;
            if (pos == 1) hnum = 2;
            if (pos == 1 && line == 4) {
                hnum = 3;
                top = top - 20;
            }
            if (pos == 2) hnum = 3;
            if (pos == 0 && line == 4) hnum = 0;
            if (pos == 3 && line == 0) hnum = 3;
            if (pos == 3 && (line == 1 || line == 3) && !($.browser.msie && $.browser.version >= 7 && $.browser.version < 8))
                x = x + 153;
        } else {
            if (pos <= 5) lr = 'l';
            if (line == 4) hnum = 0;
            else if (pos == 2 || pos == 9) hnum = 3;
            else if (pos == 3 || pos == 8) hnum = 2;
            else if (pos >= 4 && pos <= 7) hnum = 1;
        }
        if (lr == 'l') {
            x = x - 44 + 11 * hnum + 17;
        } else {
            x = x - 14 + 44 - 11 * hnum - 11;
        }
        var y = 25;
        if (hnum == 2) y = 35;
        if (hnum == 3) y = 30;
        if (hnum == 4) y = 15;
        if (hnum == 0) y = 0;
        $('#' + lr + 'hand' + hnum).css({ top: top + y, left: left + x }).show();
    });
    $('div.keyboard:visible div.keys:visible div.line div.space div.sel_left, div.keyboard:visible div.keys:visible div.line div.space div.sel_right').each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        var hnum = 0;
        var lr = $(this).is('.sel_left') ? 'l' : 'r';
        var left_plus = (lr == 'l' ? -30 : 270);
        if ($('#keyboard #keybotrain').is(':visible')) {
            lr = 'r';
            left_plus = 20;
        }
        $('#' + lr + 'hand' + hnum).css({ top: top - 5, left: left + left_plus }).show();
    });
}
function sel_shift(is_right) {
    if (is_right) {
        $('div.keyboard:visible div.keys:visible div.rshift').addClass('sel');
    } else {
        $('div.keyboard:visible div.keys:visible div.lshift').addClass('sel');
    }
}
function sel_fn(is_right) {
    if (is_right) {
        $('div.keyboard:visible div.keys:visible div.rfn').addClass('sel');
    } else {
        $('div.keyboard:visible div.keys:visible div.lfn').addClass('sel');
    }
}

function get_location() {
    
    var location = document.location.href;
    var href = $('#refresh').attr('href');
    if (location.indexOf('#') >= 0) {
        href = location.substring(location.indexOf('#'));
    } else if ($.cookie('keybotrain_dict')) {
        href = $.cookie('keybotrain_dict');
    } else {
        href = '#eng_basic';
    }
    $('#refresh').attr('href', href);
    $.cookie('keybotrain_dict', href);
    document.location.href = href;
    var minutes = parseInt($('#time a').text(), 10);
    $('#time').data('minutes', minutes);
}

//function rss_load(name) {
//    $('#dict').removeClass('error').addClass('wait');
//    $.ajax({
//        url: '/rss/?name=' + name,
//        success: function (text) {
//            $('#dict').removeClass('wait');
//            dict_generate(text);
//        },
//        error: function () {
//            $('#dict').removeClass('wait').addClass('error');
//            dict = [];
//            draw_keyboard('');
//            intext_check();
//        }
//    });
//}
function dict_start(href) {
    var lang = href.substring(1).split('_')[0];
    var type = href.split('_')[1];
    $('#intext').val('').data('text', ' ');
    $('#time').data('time', null);
    $('#time a').text($('#time').data('minutes'));
    if (href == '#lang_select') {
        $('#dict_sel').show();
        return false;
    } else if (href == '#mydict') {
        dict_mytext();
        return false;
    } else if (lang == 'rss') {
        $('#question').text('');

        var text = ($('#dict_sel a[href=\\' + href + ']').parent('div').find('span').length ? $('#dict_sel a[href=\\' + href + ']').parent('div').find('span').eq(0).text() : '') + $('#dict_sel a[href=\\' + href + ']').text();
        if (!text) text = 'Error | Ошибка';
        $('#dict a').text(text);
        $('#refresh').attr('href', href);
        $.cookie('keybotrain_dict', href);
        $('#dict_sel').fadeOut();
        stat_clear();
        rss_load(type);
        $('#intext').focus();
        return true;
    } else if (href == '#numpad') {
        $(document.body).removeClass('dict');
        var text = ($('#dict_sel a[href=\\' + href + ']').parent('div').find('span').length ? $('#dict_sel a[href=\\' + href + ']').parent('div').find('span').eq(0).text() : '') + $('#dict_sel a[href=\\' + href + ']').text();
        $('#dict a').text(text);
        $('#refresh').attr('href', href);
        $.cookie('keybotrain_dict', href);
        $('#dict_sel').fadeOut();
        dict_cleardata();
        stat_clear();
        dict_numpad();
        $('#intext').focus();
        return true;
    } else if (type == 'num') {
        $(document.body).removeClass('dict');
        var text = ($('#dict_sel a[href=\\' + href + ']').parent('div').find('span').length ? $('#dict_sel a[href=\\' + href + ']').parent('div').find('span').eq(0).text() : '') + $('#dict_sel a[href=\\' + href + ']').text();
        if (!text) text = 'Error | Ошибка';
        $('#dict a').text(text);
        $('#refresh').attr('href', href);
        $.cookie('keybotrain_dict', href);
        $('#dict_sel').fadeOut();
        dict_cleardata();
        stat_clear();
        dict_num();
        $('#intext').focus();
        return true;
    } else {
        $('#question').text('');
        var text = ($('#dict_sel a[href=\\' + href + ']').parent('div').find('span').length ? $('#dict_sel a[href=\\' + href + ']').parent('div').find('span').eq(0).text() : '') + $('#dict_sel a[href=\\' + href + ']').text();
        if (!text) text = 'Error | Ошибка';
        $('#dict a').text(text);
        $('#refresh').attr('href', href);
        $.cookie('keybotrain_dict', href);
        $('#dict_sel').fadeOut();
        stat_clear();
        if (type == 'dictrev') {
            var hrefs = href.substring(1).split('_');
            href = '#' + hrefs[2] + '_dict_' + hrefs[0] + (hrefs[3] ? '_' + hrefs[3] : '');
        }
        if (type == 'speed') {
            var hrefs = href.substring(1).split('_');
            href = '#' + hrefs[0] + '_begin';
        }
        if (type == 'basic') {
            var hrefs = href.substring(1).split('_');
            href = '#' + hrefs[0] + '_begin';
        }
        dict_load(href.substring(1));
        $('#intext').focus();
        return true;
    }
}
function dict_cleardata() {
    $('#question').text('').css('visibility', 'hidden');
    $('#hands div.hand').hide();
    $('#dict').removeClass('error');
    $('#keyboard').hide();
    $('#text').removeClass('penalt').data('sym_errors', null);
    $('#text').data('error_indexes', null);
    $('#text div').html('').addClass('empty');
    $('#text').data('line', null).data('index', null).data('index_line', 0);
}
function dict_refresh() {
    $('#intext').val('').data('text', ' ');
    var href = $('#refresh').attr('href');
    var lang = href.substring(1).split('_')[0];
    var type = href.split('_')[1];
    $('#time').data('time', null);
    $('#time a').text($('#time').data('minutes'));
    if (href == '#mydict') {
        $('#question').text('').removeClass('error');
        $('#intext').val('');
        for (var i = 1; i < 5; i++) {
            $('#text div.line' + i).html($('#text div.line' + (i + 1)).html());
            if ($('#text div.line' + (i + 1)).is('.empty')) $('#text div.line' + i).addClass('empty'); else $('#text div.line' + i).removeClass('empty');
        }
        $('#text div.line5').html('').addClass('empty');
        text_generate();
        $('#intext').hide().fadeIn();
        $('#text').hide().fadeIn();
        $('#intext').focus();
        return false;
    } else if (href == '#numpad') {
        $('#intext').val('');
        dict_numpad();
        $('#intext').focus();
        return true;
    } else if (type == 'num') {
        $('#intext').val('');
        dict_num();
        $('#intext').focus();
        return true;
    } else {
        if (!dict.length) {
            dict_load(href.substring(1));
            return true;
        } else {
            $('#question').text('').removeClass('error');
            $('#intext').val('');
            $('#text').data('line', '').data('index', null);
            $('#text div').html('').addClass('empty');
            text_generate();
            $('#intext').hide().fadeIn();
            $('#text').hide().fadeIn();
            $('#intext').focus();
            return true;
        }
    }
}
function dict_mytext() {
    $('#dict_sel').fadeOut();
    $('#my_dict').fadeIn(function () {
        $('#dict_data').focus();
    });
}
function dict_numpad() {
    dict_cleardata();
    $('#text div.line1').html(numpad_random()).removeClass('empty');
    $('#numkeyboard').fadeIn();
    $('#show_autobackspace').hide();
    $('#hide_autobackspace').show();
    intext_check();
    $('#intext').val('').hide().fadeIn(function () { $(this).focus(); });
    $('#text').hide().fadeIn();
}
function dict_num() {
    dict_cleardata();
    $('#text div.line1').html(num_random()).removeClass('empty');
    $('#numkeyboard').hide();
    show_keyboard();
    $('#keyboard').fadeIn();
    intext_check();
    $('#intext').val('').hide().fadeIn(function () { $(this).focus(); });
    $('#text').hide().fadeIn();
}
function random(num) {
    return Math.floor(Math.random() * num);
}
function numpad_random() {
    var str = '';
    var aop = ['/', '*', '-', '+', '+'];
    while (str.length < 70) {
        if (str != '') {
            str = str + aop[random(aop.length)];
        }
        var len = random(5) + 3;
        var num = (random(9) + 1).toString();
        for (var i = 1; i < len; i++) {
            var rand = random(13);
            if (rand > 9) rand = 0;
            num = num + rand.toString();
        }
        if (random(3) == 0) {
            num = num + '.';
            var len = random(3);
            for (var i = 0; i < len; i++) {
                var rand = random(10);
                num = num + rand.toString();
            }
            num = num + (random(9) + 1).toString();
        }
        str = str + num;
    }
    return str + '¶';
}
function num_random() {
    var str = '';
    while (str.length < 70) {
        if (str != '') {
            str = str + ' ';
        }
        var len = random(5) + 3;
        var num = (random(9) + 1).toString();
        for (var i = 1; i < len; i++) {
            var rand = random(13);
            if (rand > 9) rand = 0;
            num = num + rand.toString();
        }
        if (random(3) == 0) {
            num = num + '.';
            var len = random(3);
            for (var i = 0; i < len; i++) {
                var rand = random(10);
                num = num + rand.toString();
            }
            num = num + (random(9) + 1).toString();
        }
        str = str + num;
    }
    return str + '¶';
}

function dict_load(name) {
    $('#dict').removeClass('error').addClass('wait');
    $.ajax({
        url: '/Content/dict/' + name + '.txt',
        success: function (text) {
            $('#dict').removeClass('wait');
            dict_generate(text);
        },
        error: function () {
            $('#dict').removeClass('wait').addClass('error');
            dict = [];
            draw_keyboard('');
            intext_check();
        }
    });
}

var dict = [];
function dict_generate(text) {
    dict_cleardata();
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    var type = href.split('_')[1];
    if ((type == 'dict') || (type == 'dictrev')) $(document.body).addClass('dict'); else $(document.body).removeClass('dict');
    $('#numkeyboard').hide();
    show_keyboard();
    $('#keyboard').fadeIn();
    dict = text.replace(/[’’]/g, "'").replace(/\r/g, "\n").replace(/\n{2,}/g, "\n").replace(/\t/g, ' ').replace(/ {2,}/g, ' ').replace(/^ +/g, "").replace(/\n +/g, "\n").replace(/ +$/g, "").replace(/ +\n/g, "\n").replace(/`/g, '').replace(/^\n/, '').replace(/[«»„“]/g, '"').replace(/[-—]/g, '-').replace(/[…]/g, '...').split("\n");

    text_generate();
    $('#intext').hide().fadeIn(function () { $(this).focus(); });
    $('#text').hide().fadeIn();
}
function dict_next() {
    $('#text div').html('').addClass('empty');
    $('#time a').text($('#time').data('minutes'));
    $('#time').data('time', null);
    text_generate();
    $('#intext').focus();
    return false;
}
function show_relax() {
    $('#text div').html('').addClass('empty');
    show_relax_text(3);
}
function show_relax_text(num) {
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    if (lang == 'rus' || lang == 'ukr') {
        $('#text div.line' + num).html('Отдохните сейчас. <a href="#next" class="link" onclick="return dict_next();">Продолжить</a>').removeClass('empty');
    } else if (lang == 'epo') {
        $('#text div.line' + num).html('Ripozu nun. <a href="#next" class="link" onclick="return dict_next();">Daŭrigi</a>').removeClass('empty');
    } else {
        $('#text div.line' + num).html('Relax now. <a href="#next" class="link" onclick="return dict_next();">Continue</a>').removeClass('empty');
    }
}
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '');
}
function text_generate() {
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    var type = href.split('_')[1];

    var end = new Date();
    var minutes = $('#time').data('minutes');
    var mperiod = 0;
    if ($('#time').data('time')) {
        var timer = $('#time').data('time');
        var mperiod = ((end.getTime() - timer) / 1000) / 60;
        mperiod = Math.floor(mperiod);
        if (mperiod > minutes) mperiod = minutes;
    }
    $('#time a').text(minutes - mperiod);
    var is_timeend = ((mperiod >= minutes) && ((!$(document.body).is('.dict')) || (!$(document.body).is('.dzen')) || ($('#text div.empty').length > 1)));
    var sum_linelen = $('#intext').data('sum_linelen') ? $('#intext').data('sum_linelen') : 0;

    if ((href == '#numpad') && is_timeend) {
        $('#text div.line1').html('').addClass('empty');
        $('#text div.line3').html('Relax now. <a href="#next" class="link" onclick="return dict_next();">Continue</a>').removeClass('empty');
    } else if (href == '#numpad') {
        $('#text div.line1').html(numpad_random()).removeClass('empty');
    } else if ((type == 'num') && is_timeend) {
        $('#text div.line1').html('').addClass('empty');
        show_relax();
    } else if (type == 'num') {
        $('#text div.line1').html(num_random()).removeClass('empty');
    } else if (((type == 'dict') || (type == 'dictrev')) && ((sum_linelen > 0) && ((sum_linelen % 100) == 0) && $('#text div:not(.empty)').length) && (!$(document.body).is('.dzen'))) {
        $('#question').html('');
        $('#text').removeClass('penalt');
        show_relax();
    } else if ((type == 'dict') && (!$('#question').is('.error'))) {
        var index = rand_dict('');
        var error_items = $('#intext').data('error_items');
        if (error_items && (error_items.length != 0) && (random(50) < error_items.length)) {
            var i = random(error_items.length);
            index = error_items[i];
            error_items.splice(i, 1);
            $('#intext').data('error_items', error_items);
        }
        var line = dict[index];
        $('#text div').css('visibility', 'visible').html('').addClass('empty');
        var eq = line.split('=');
        var pos = random($('#text div').length) + 1;
        $('#question').hide().text(trim(eq[0])).fadeIn().css('visibility', 'visible').data('index', pos).data('line', index);
        var ans = eq[1].split(';');
        $('#text div.line' + pos).text(trim(ans[random(ans.length)]) + '¶').removeClass('empty');
        var tword = trim(eq[0]);
        var notin = '|' + index + '|';
        while ($('#text div.empty').length > 0) {
            var index = rand_dict(notin);
            if (href.split('_')[2] == 'epo') {
                var word = trim(dict[index].split('=')[0]);
                var start = index;
                var tl = tword.substring(tword.length - 1);
                while (word.substring(word.length - 1) != tl || (notin.indexOf('|' + index + '|') >= 0)) {
                    index++;
                    if (index >= dict.length) index = 0;
                    word = trim(dict[index].split('=')[0]);
                    if (index == start) break;
                }
            }
            notin = notin + '|' + index + '|';
            var line = dict[index];
            var eq = line.split('=');
            var ans = eq[1].split(';');
            var text = trim(ans[random(ans.length)]);
            if (text.length > 80) {
                var pos = line.substring(0, 79).lastIndexOf(' ');
                if (pos >= 0) {
                    text = text.substring(0, pos + 1);
                } else {
                    text = text.substring(0, 79);
                }
            }
            $('#text div.empty').eq(0).text(text + '¶').removeClass('empty');
        }
    } else if ((type == 'dictrev') && (!$('#question').is('.error'))) {
        var index = rand_dict('');
        var error_items = $('#intext').data('error_items');
        if (error_items && (error_items.length != 0) && (random(50) < error_items.length)) {
            var i = random(error_items.length);
            index = error_items[i];
            error_items.splice(i, 1);
            $('#intext').data('error_items', error_items);
        }
        var line = dict[index];
        $('#text div').css('visibility', 'visible').html('').addClass('empty');
        var eq = line.split('=');
        var ans = eq[1].split(';');
        var pos = random($('#text div').length) + 1;
        $('#question').hide().text(trim(ans[random(ans.length)])).fadeIn().css('visibility', 'visible').data('index', pos).data('line', index);
        $('#text div.line' + pos).text(trim(eq[0]) + '¶').removeClass('empty');
        var tword = trim(eq[0]);
        var notin = '|' + index + '|';
        while ($('#text div.empty').length > 0) {
            var index = rand_dict(notin);
            if (lang == 'epo') {
                var word = trim(dict[index].split('=')[0]);
                var start = index;
                var tl = tword.substring(tword.length - 1);
                while (word.substring(word.length - 1) != tl || (notin.indexOf('|' + index + '|') >= 0)) {
                    index++;
                    if (index >= dict.length) index = 0;
                    word = trim(dict[index].split('=')[0]);
                    if (index == start) break;
                }
            }
            notin = notin + '|' + index + '|';
            var line = dict[index];
            var eq = line.split('=');
            var text = trim(eq[0]);
            if (text.length > 80) {
                var pos = line.substring(0, 79).lastIndexOf(' ');
                if (pos >= 0) {
                    text = text.substring(0, pos + 1);
                } else {
                    text = text.substring(0, 79);
                }
            }
            $('#text div.empty').eq(0).text(text + '¶').removeClass('empty');
        }
    } else if ((type == 'speed') && is_timeend && ($('#text div.empty').length == 5)) {
        $('#text').removeClass('penalt');
        show_relax();
    } else if ((type == 'speed') && ($('#text div.empty').length == 5)) {
        $('#question').text('').css('visibility', 'hidden').removeClass('error');
        $('#text div.line4, #text div.line5').html('').addClass('empty').css('visibility', 'hidden');
        var index = rand_dict('');
        var words = dict[index].split(' ');
        var word = words[random(words.length)];
        if (random(10) == 0) word = word + ',';
        else if (random(30) == 0) word = word + '.';
        else if (random(60) == 0) word = word + ':';
        else if (random(60) == 0) word = word + ';';
        else if (random(100) == 0) word = word + '!';
        else if (random(100) == 0) word = word + '?';
        word = word + ' ';
        $('#text div.line1, #text div.line2, #text div.line3').removeClass('empty').text(word);
    } else if (type == 'speed') {
    } else if ((type == 'begin' || type == 'basic') && is_timeend) {
        $('#text').removeClass('penalt');
        show_relax();
    } else if (is_timeend) {
        if ($('#text div.empty').length < 2) {
            var line = $('#text').data('line') ? $('#text').data('line') : '';
            $('#text').data('line', $('#text div.line3').text() + $('#text div.line4').text() + $('#text div.line5').text() + line);
            $('#text div.line3').html('').addClass('empty');
            $('#text div.line4').html('').addClass('empty');
            show_relax_text(5);
        }
    } else if (type == 'basic') {
        $('#question').text('').css('visibility', 'hidden');
        $('#text div').html('').addClass('empty');
        $('#text').removeClass('penalt');
        var line = '';
        var word = '';
        while (line.length < 80) {
            if (word == '') {
                var index = random(dict.length);
                var words = dict[index].split(' ');
                word = words[random(words.length)];
                if (word.length > 5) word = '';
            }
            if (word != '') line = line + word + ' ';
        }
        line = line.substring(0, line.lastIndexOf(' ', 79)) + ' ';
        $('#text div.line1').text(line.replace(/ /g, ' ')).removeClass('empty');
    } else if (type == 'begin') {
        $('#question').text('').css('visibility', 'hidden');
        $('#text div').html('').addClass('empty');
        $('#text').removeClass('penalt');
        var line = '';
        var error_indexes = $('#text').data('error_indexes') ? $('#text').data('error_indexes') : [];
        var word_indexes = [];
        while (line.length < 80) {
            var index = 0;
            if (error_indexes.length) {
                index = error_indexes[0];
            } else {
                index = random(dict.length);
            }
            var words = dict[index].split(' ');
            var word = words[random(words.length)];
            if (word != '') {
                if (error_indexes.length) {
                    error_indexes = error_indexes.slice(1);
                    $('#text').addClass('penalt');
                }
                word_indexes.push(index);
                line = line + word + ' ';
            }
        }
        $('#text').data('word_indexes', word_indexes).data('error_indexes', error_indexes);
        line = line.substring(0, line.lastIndexOf(' ', 79)) + ' ';
        $('#text div.line1').text(line.replace(/ /g, ' ')).removeClass('empty');
    } else {
        $('#question').text('').css('visibility', 'hidden');
        $('#text div.line4, #text div.line5').css('visibility', 'hidden');
        var notin = '';
        var line = '';
        while ($('#text div:empty').length && dict[0]) {
            line = '';
            if ($('#text').data('line')) {
                line = $('#text').data('line');
                var index_enter = line.indexOf('¶');
                if (index_enter >= 0) {
                    $('#text').data('line', line.substring(index_enter + 1));
                    line = line.substring(0, index_enter);
                } else {
                    $('#text').data('line', null);
                }
            } else if (href == '#mydict') {
                var index = $('#text').data('index_line');
                if (index >= dict.length) index = 0;
                $('#text').data('index_line', index + 1);
                line = dict[index];
            } else if (lang == 'rss') {
                var index = random(dict.length);
                line = dict[index];
                var index_enter = line.indexOf('¶');
                if (index_enter >= 0) {
                    $('#text').data('line', line.substring(index_enter + 1));
                    line = line.substring(0, index_enter);
                }
            } else if (type == 'code') {
                var index = $('#text').data('index') ? $('#text').data('index') - 1 : rand_dict(notin);
                notin = notin + '|' + index + '|';
                if (index >= dict.length) index = 0;
                $('#text').data('index', index + 2);
                line = dict[index];
            } else {
                var index = rand_dict(notin);
                notin = notin + '|' + index + '|';
                line = dict[index];
            }
            while (line.length > 0) {
                if (line.length > 80) {
                    var pos = line.substring(0, 79).lastIndexOf(' ');
                    if (pos >= 0) {
                        $('#text div.empty').eq(0).text(line.substring(0, pos + 1)).removeClass('empty');
                        line = line.substring(pos + 1);
                    } else {
                        $('#text div.empty').eq(0).text(line.substring(0, 79)).removeClass('empty');
                        line = line.substring(79);
                    }
                    if (!$('#text div.empty').length) {
                        $('#text').data('line', line);
                        line = '';
                    }
                } else {
                    $('#text div.empty').eq(0).text(line + '¶').removeClass('empty');
                    line = '';
                }
            }
        }
    }
    intext_check();
}
function rand_dict(notin) {
    if (!dict.length) return -1;
    var index = random(dict.length);
    var end = index;
    while ((dict[index].length < 5) || (notin.indexOf('|' + index + '|') >= 0)) {
        index++;
        if (index >= dict.length) index = 0;
        if (index == end) break;
    }
    return index;
}

function show_keyboard() {
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    var kbd = href.split('_')[0].substring(1);
    if (!keyboards[kbd]) kbd = '';
    var layout = $.cookie('keybotrain_layout_' + kbd);
    if (layout == 'виндовс') layout = 'йцукен';
    $('#layout_sel div.list').html('');
    if (kbd == '') {
        for (kbd in keyboards) {
            for (keyb in keyboards[kbd]) {
                if (!layout) layout = keyb;
                var html = '<div><a href="#' + keyb + '" class="link" onclick="return layout_sel(this);">' + keyb + '</a></div>';
                $('#layout_sel div.list').append(html);
            }
        }
    } else {
        for (var keyb in keyboards[kbd]) {
            if (!layout) layout = keyb;
            var html = '<div><a href="#' + keyb + '" class="link" onclick="return layout_sel(this);">' + keyb + '</a>';
            if ((lang == 'epo') && (keyb == 'esperanto')) {
                html = html + ' (<a href="http://klava.org/layout/esperanto.zip">setup.exe</a>)';
            }
            if ((lang == 'eng') && (keyb == 'jcuken')) {
                html = html + ' (<a href="http://klava.org/layout/jcuken.zip">setup.exe</a>)';
            }
            html = html + '</div>';
            $('#layout_sel div.list').append(html);
        }
    }
    draw_keyboard(layout);
}

function draw_keyboard(layout) {
    $('#layout_sel').data('layout', layout);
    var href = $('#refresh').attr('href');
    var lang = href.split('_')[0].substring(1);
    $('#layout a').text(layout);
    var kbd = href.split('_')[0].substring(1);
    if (!keyboards[kbd]) kbd = '';
    $.cookie('keybotrain_layout_' + kbd, layout);
    var keyboard = null;
    if (kbd == '') {
        for (kbd in keyboards) {
            if (keyboards[kbd] && keyboards[kbd][layout]) {
                keyboard = keyboards[kbd][layout];
                break;
            }
        }
    } else {
        keyboard = keyboards[kbd][layout];
    }
    if (!keyboard) {
        $('div.keyboard').hide();
        return;
    }
    if (layout.split('_')[0] == 'catboard') {
        $('#keyboard #standart').hide();
        $('#keyboard #keybotrain').show();
        $('#keyboard #keybotrain div.line:eq(0) div:not(.blank):not(.sys)').each(function (i) {
            $(this).html(keyboard[i]);
        });
        $('#keyboard #keybotrain div.line:eq(1) div:not(.blank):not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 13]);
        });
        $('#keyboard #keybotrain div.line:eq(2) div:not(.blank):not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 25]);
        });
        $('#keyboard #keybotrain div.line:eq(3) div:not(.blank):not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 37]);
        });
    } else {
        $('#keyboard #keybotrain').hide();
        $('#keyboard #standart').show();
        $('#keyboard #standart div.line:eq(0) div').each(function (i) {
            if (i < 13) $(this).html(keyboard[i]);
        });
        $('#keyboard #standart div.line:eq(1) div:not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 13]);
        });
        $('#keyboard #standart div.line:eq(2) div:not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 26]);
        });
        $('#keyboard #standart div.line:eq(3) div:not(.sys)').each(function (i) {
            $(this).html(keyboard[i + 37]);
        });
    }
}