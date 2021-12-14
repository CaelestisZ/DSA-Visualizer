var mode = "exploration";
var codetraceColor = 'white';
actionsWidth = 0;

function highlightLine(lineNumbers) {
    $('#codetrace p').css('background-color', colourTheThird).css('color', codetraceColor);
    if (lineNumbers instanceof Array) {
        for (var i = 0; i < lineNumbers.length; i++)
            if (lineNumbers[i] != 0)
                $('#code' + lineNumbers[i]).css('background-color', 'black').css('color', 'white');
    } else
        $('#code' + lineNumbers).css('background-color', 'black').css('color', 'white');
}
var isPlaying = false;
var cur_slide = null;
var last_click = 0;

function isActionsOpen() {
    return $('#actions-hide img').hasClass('rotateRight');
}

function isStatusOpen() {
    return $('#status-hide img').hasClass('rotateRight');
}

function isCodetraceOpen() {
    return $('#codetrace-hide img').hasClass('rotateRight');
}

function showActionsPanel() {
    if (!isActionsOpen()) {
        $('#actions-hide img').removeClass('rotateLeft').addClass('rotateRight');
        $('#actions').animate({
            width: "+=" + actionsWidth,
        });
    }
}

function hideActionsPanel() {
    if (isActionsOpen()) {
        $('#actions-hide img').removeClass('rotateRight').addClass('rotateLeft');
        $('#actions').animate({
            width: "-=" + actionsWidth,
        });
    }
}

function showStatusPanel() {
    if (!isStatusOpen()) {
        $('#status-hide img').removeClass('rotateLeft').addClass('rotateRight');
        $('#current-action').show();
        $('#status').animate({
            width: "+=" + statusCodetraceWidth,
        });
    }
}

function hideStatusPanel() {
    if (isStatusOpen()) {
        $('#status-hide img').removeClass('rotateRight').addClass('rotateLeft');
        $('#current-action').hide();
        $('#status').animate({
            width: "-=" + statusCodetraceWidth,
        });
    }
}

function showCodetracePanel() {
    if (!isCodetraceOpen()) {
        $('#codetrace-hide img').removeClass('rotateLeft').addClass('rotateRight');
        $('#codetrace').animate({
            width: "+=" + statusCodetraceWidth,
        });
    }
}

function hideCodetracePanel() {
    if (isCodetraceOpen()) {
        $('#codetrace-hide img').removeClass('rotateRight').addClass('rotateLeft');
        $('#codetrace').animate({
            width: "-=" + statusCodetraceWidth,
        });
    }
}

function triggerRightPanels() {
    hideEntireActionsPanel();
    showStatusPanel();
    showCodetracePanel();
}


function initUI() {
    var actionsHeight = ($('#actions p').length) * 27 + 10;
    $('#actions').css('height', actionsHeight);
    $('#actions').css('width', actionsWidth);
    var actionsHideTop = Math.floor((actionsHeight - 16) / 2);
    var actionsHideBottom = (actionsHeight - 16) - actionsHideTop;
    $('#actions-hide').css('padding-top', actionsHideTop);
    $('#actions-hide').css('padding-bottom', actionsHideBottom);
    $('#current-action').hide();
    $('#actions-hide img').addClass('rotateRight');
    $('#hide-popup').css('background-color', surpriseColour);
    $('#progress-bar .ui-slider-range').css("background-color", surpriseColour);
    $('#actions').css("background-color", colourTheSecond);
    $('#actions-hide').css("background-color", colourTheSecond);
    $('.action-menu-pullout').css('left', actionsWidth + 43 + 'px');
    $('.action-menu-pullout').children().css('float', 'left');
    $('.coloured-menu-option').css("background-color", colourTheSecond).css('color', 'white');
    $('#codetrace').css("background-color", colourTheThird);
    $('#codetrace-hide').css("background-color", colourTheThird);
    if (colourTheThird == '#fec515' || colourTheThird == '#a7d41e') {
        $('#codetrace').css('color', 'black');
        var imgUrl = $('#codetrace-hide img').attr('src');
        if (imgUrl) {
            $('#codetrace-hide img').attr('src', imgUrl.replace('white', 'black'));
        }
        codetraceColor = 'black';
    }
    $('#status').css("background-color", colourTheFourth);
    $('#status-hide').css("background-color", colourTheFourth);
    if (colourTheFourth == '#fec515' || colourTheFourth == '#a7d41e') {
        $('#status').css('color', 'black');
        var imgUrl = $('#status-hide img').attr('src');
        if (imgUrl) {
            $('#status-hide img').attr('src', imgUrl.replace('white', 'black'));
        }
    }
}

$(function() {
    $("#speed-input").slider({
        min: 200,
        max: 2000,
        value: 1500,
        change: function(event, ui) {
            gw.setAnimationDuration(2200 - ui.value);
        }
    });
    $("#progress-bar").slider({
        range: "min",
        min: 0,
        value: 0,
        slide: function(event, ui) {
            gw.pause();
            gw.jumpToIteration(ui.value, 0);
        },
        stop: function(event, ui) {
            if (!isPaused) {
                setTimeout(function() {
                    gw.play();
                }, 500);
            }
        }
    });
    initUI();
    $('#mode-button').click(function() {
        $('#other-modes').toggle();
    });
    $('#mode-menu').hover(function() {
        $('#other-modes').show();
    }, function() {
        $('#other-modes').hide();
    });
    $('#mode-menu a').hover(function() {
        $(this).css("background", surpriseColour);
    }, function() {
        $(this).css("background", "black");
    });
    $('#other-modes a').click(function() {
        var currentMode = $('#mode-button').attr('title');
        var newMode = $(this).attr('title');
        var tmp = $('#mode-button').html().substring(0, $('#mode-button').html().length - 2);
        $('#mode-button').html($(this).html() + ' &#9663;');
        $(this).html(tmp);
        $('#mode-button').attr('title', newMode);
        $(this).attr('title', currentMode);
		if (newMode == "exploration") {
            makeOverlayTransparent();
            mode = "exploration";
            $('.electure-dialog').hide();
            hideStatusPanel();
            hideCodetracePanel();
            showActionsPanel();
            pushState();
            ENTER_EXPLORE_MODE();
        }
        $('#other-modes').hide();
    });
    $('#status-hide').click(function() {
        if (isStatusOpen())
            hideStatusPanel();
        else
            showStatusPanel();
    });
    $('#codetrace-hide').click(function() {
        if (isCodetraceOpen())
            hideCodetracePanel();
        else
            showCodetracePanel();
    });
    $('#actions-hide').click(function() {
        if (isActionsOpen())
            hideEntireActionsPanel();
        else
            showActionsPanel();
    });
});
var isPaused = false;

function isAtEnd() {
    return (gw.getCurrentIteration() == (gw.getTotalIteration() - 1));
}

function pause() {
    if (isPlaying) {
        isPaused = true;
        gw.pause();
        $('#play').show();
        $('#pause').hide();
    }
}

function play() {
    if (isPlaying) {
        isPaused = false;
        $('#pause').show();
        $('#play').hide();
        if (isAtEnd())
            gw.replay();
        else
            gw.play();
    }
}

function stepForward() {
    if (isPlaying) {
        pause();
        gw.forceNext(250);
    }
}

function stepBackward() {
    if (isPlaying) {
        pause();
        gw.forcePrevious(250);
    }
}

function goToBeginning() {
    if (isPlaying) {
        gw.jumpToIteration(0, 0);
        pause();
    }
}

function goToEnd() {
    if (isPlaying) {
        gw.jumpToIteration(gw.getTotalIteration() - 1, 0);
        pause();
    }
}

function stop() {
    try {
        gw.stop();
    } catch (err) {}
    isPaused = false;
    isPlaying = false;
    $('#pause').show();
    $('#play').hide();
}