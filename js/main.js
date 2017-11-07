var tags = ["price"];
$( document ).ready(function() {
    updateTags();
});
var flagtag = 0;
interact('.draggable')
    .draggable({
        inertia: true,
        autoScroll: true,
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
        }
    })
    // .resizable({
    //     preserveAspectRatio: true,
    //     edges: { left: true, right: true, bottom: true, top: true }
    // });

function dragMoveListener(event) {
    var target = event.target;
    //   var offset = this.offset();
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
$('.floating-div').addClass('sticky');
$('.header-container').addClass('stickyTop');

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header-container').outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.header-container').removeClass('nav-down').addClass('nav-up');
        $('.sticky').removeClass('nav-down').addClass('nav-up-side');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('.header-container').removeClass('nav-up').addClass('nav-down');
            $('.sticky').removeClass('nav-up-side').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

var popx;
var popy;



var hltr = new TextHighlighter(document.body);

var flag = 0;
var element = document;
element.addEventListener("mousedown", function () {
    flag = 0;
}, false);
element.addEventListener("mousemove", function () {
    flag = 1;
}, false);
var popup;
element.addEventListener("mouseup", function (e) {
    flagtag = 1;
    if (flag === 0) {
        var cx = event.pageX;
        var cy = event.pageY;
        if ((cx < popx || cx > (popx + 500)) || (cy < popy || cy > (popy + 200))) {
            $(".popup").remove();
            $(".comment").css("visibility", "hidden");
        }
    }
    else if (flag === 1) {
        $(".popup").remove();
        $("body").append("<div class='popup'><i class='fa fa-plus-circle' aria-hidden='true'></i><input type='text' placeholder='Hit enter to add tag' class='search' onkeydown='search(this)'/> <br/></div>")
        $(".popup").css("top", event.pageY);
        $(".popup").css("left", event.pageX);
        popx = event.pageX;
        popy = event.pageY;
        updateTagsComment();
    }
}, false);
$(document).on('click', '.tagc', function (e) {
    $('body').append(this);
    $(this).css("position", "absolute");
    $(this).css("top", popy);
    $(this).css("left", popx);
    $(this).removeClass("tagc").addClass("tagnew");
    $(".popup").remove();
});
function search(ele) {
    if (event.key === 'Enter') {
        // alert(ele.value);        
        $(".header-container").append("<div class='draggable tag'><p>" + ele.value + "</p></div>")
        $(".popup").append("<div class='tagc'><p>" + ele.value + "</p></div>")
        tags.push(ele.value);
        console.log(tags);
    }
}

function saveComment(ele) {
    if (event.key === 'Enter') {
        var commentbx = $(".comment");
        var textarea = $(".comment textarea");


        $(".emojinew").data("comment", ele.value);
        // var data = $( ".emojinew" ).data( "comment" );
        // console.log(data);
        // $(savedcomment).css("position", e.pageX);
    }
}
$(document).on('mouseup', '.tagnew', function (e) {
    $(".popup").remove();
});

var firstDragTag = true;

$(document).on('mousedown', '.tag', function (e) {
    $('body').append(this);
    $(this).css("position", "absolute");
    $(this).css("top", e.pageY-20);
    $(this).css("left", e.pageX-30);
    $(this).removeClass("tag").addClass("tagnew");
    updateTags();
    firstDragTag = true;
});

function updateTags() {
    $(".tag").remove();
    for (var i = 0; i < tags.length; i++) {
        $(".header-container").append("<div class='draggable tag'><p>" + tags[i] + "</p></div>");
    }

}

function updateTagsComment() {
    $(".tag").remove();
    for (var i = 0; i < tags.length; i++) {
        $(".header-container").append("<div class='draggable tag'><p>" + tags[i] + "</p></div>");
        $(".popup").append("<div class='tagc'><p>" + tags[i] + "</p></div>");
    }

}

function updateEmoji() {
    $(".emoji").remove();
    $(".floating-div").append(
        " <div class= 'emoji draggable ' ><img src= 'img/love.png '></div> <div class= 'emoji draggable ' ><img src= 'img/happiness.png '></div> <div class= 'emoji draggable ' ><img src= 'img/indifferent.png '></div> <div class= 'emoji draggable ' ><img src= 'img/sad.png '></div> <div class= 'emoji draggable ' ><img src= 'img/check.png '></div> <div class= 'emoji draggable ' ><img src= 'img/cross.png '></div> <div class= 'emoji draggable ' ><img src= 'img/question.png '></div>"
    )
}
var firstDrag = true;


$(document).on('mousedown', '.emoji', function (e) {
    $('body').append(this);
    $(this).css("position", "absolute");
    $(this).css("top", e.pageY-20);
    $(this).css("left", e.pageX-20);
    $(this).removeClass("emoji").addClass("emojinew");
    updateEmoji();
    firstDrag = true;
});
//   $(document).on('mouseup', '.emoji', function(e) {
//     $(".popup").remove();
//     console.log("hey");
//   });
$(document).on('mouseup', '.emojinew', function (e) {
    $(".popup").remove();
    if (firstDrag) {
        // $(".comment").remove();
        $("body").append("<div class='comment'><textarea rows='4' cols='50' onkeydown='saveComment(this)' placeholder='Add comment or note'/> <br/></div>")
        $(".comment:last").css("top", event.pageY);
        $(".comment:last").css("left", event.pageX + 46);
        firstDrag = false;
        $(".popup").remove();
    } else {
        $(this).next().css("top", event.pageY);
        $(this).next().css("left", event.pageX + 46);
        // $(".comment").remove();
        popx = event.pageX;
        popy = event.pageY;
        $(".popup").remove();
    }
});

$(document).on('click', '.emojinew', function (e) {
    $(".popup").remove();
    $(this).next().css("visibility", "visible");
    // $(".comment").remove();
    // var data = $(this).data("comment");
    // $("body").append("<div class='comment'><textarea rows='4' cols='50' onkeydown='saveComment(this)' placeholder='Add comment or note'>" + data + "</textarea></div>")
    // $(".comment").css("top", event.pageY);
    // $(".comment").css("left", event.pageX + 46);
    //
});
$(document).on('mouseup', '.tagnew', function (e) {
    $(".popup").remove();
    if (firstDragTag) {
        // $(".comment").remove();
        firstDragTag = false;
        $(".popup").remove();
    } else {
        $(".popup").remove();
    }
});
$(document).on('mousemove', '.tagnew', function (e) {
    $(".popup").remove();
});
