var tags = [];
var flagtag = 0;
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        //   restrict: {
        //     restriction: "parent",
        //     endOnly: true,
        //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        //   },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            // var textEl = event.target.querySelector('p');

            // textEl && (textEl.textContent =
            //   'moved a distance of '
            //   + (Math.sqrt(event.dx * event.dx +
            //                event.dy * event.dy)|0) + 'px');
        }
    });

function dragMoveListener(event) {
    var target = event.target;
    //   var offset = this.offset();
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // pagex = offset.left;
    // pagey = offset.top;
    // console.log("pagex"+pagex+"pagey"+pagey);
    // console.log(target);

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
        }
    }
    else if (flag === 1) {
        $(".popup").remove();
        $("body").append("<div class='popup'><input type='text' placeholder='Hit enter to add tag' class='search' onkeydown='search(this)'/> <br/></div>")
        $(".popup").css("top", event.pageY);
        $(".popup").css("left", event.pageX);
        popx = event.pageX;
        popy = event.pageY;
        updateTags()
    }
}, false);
function search(ele) {
    if (event.key === 'Enter') {
        // alert(ele.value);        
        $(".header-container").append("<div class='draggable tag'><p>" + ele.value + "</p></div>")
        $(".popup").append("<div class='tag'><p>" + ele.value + "</p></div>")
        tags.push(ele.value);
        console.log(tags);
    }
}

    $(document).on('mousedown', '.tag', function(e) {
        flagtag = 0;
        console.log("mousedown");
        console.log(this);
        $('body').append(this);
        // $("body").append("<div class='drag draggable tagnew'><p>" + "drag" + "</p></div>")
        $(this).css("position", "absolute");
        $(this).css("top", e.pageY);
        $(this).css("left", e.pageX);
        $(this).removeClass( "tag" ).addClass( "tagnew" );
        updateTags(); 
        
      });

    function updateTags() {
        $(".tag").remove();
        for (var i = 0; i < tags.length; i++) {
            $(".header-container").append("<div class='draggable tag'><p>" + tags[i] + "</p></div>")
            $(".popup").append("<div class='tag'><p>" + tags[i] + "</p></div>")
        }

    }

    function updateEmoji() {
        $(".emoji").remove();
            $(".floating-div").append("<img class='emoji draggable' src='img/love.png'><img class='emoji draggable' src='img/happiness.png'><img class='emoji draggable' src='img/indifferent.png'><img class='emoji draggable'src='img/sad.png'>")


    }
    $(document).on('mousedown', '.emoji', function(e) {
        $('body').append(this);
        $(this).css("position", "absolute");
        $(this).css("top", e.pageY);
        $(this).css("left", e.pageX);
        $(this).removeClass( "emoji" ).addClass( "emojinew" );
        updateEmoji(); 
        
      });