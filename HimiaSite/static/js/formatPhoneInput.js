$('.art-stranger').mask('+38 (099) 999-99-99');

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$('input[type="tel"]').click(function () {
    var val = $(this).val();
    var new_pos = val.indexOf('0', 5) + 1; // знаходимо позицію після першого 0, після 5 символу
    $(this).setCursorPosition(new_pos);
});


$('.format_number_js').mask('+38 (099) 999-99-99');

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$('input[type="tel"]').click(function () {
    var val = $(this).val();
    var new_pos = val.indexOf('0', 5) + 1; // знаходимо позицію після першого 0, після 5 символу
    $(this).setCursorPosition(new_pos);
});