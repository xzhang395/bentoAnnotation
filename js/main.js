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

function dragMoveListener (event) {
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

// var topPosition = $('.floating-div').offset().top - 10;
// var floatingDivHeight = $('.floating-div').outerHeight();
// var footerFromTop = $('footer').offset().top;
// var absPosition = footerFromTop - floatingDivHeight - 20;
$('.floating-div').addClass('sticky');
$('.header-container').addClass('stickyTop');

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header-container').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header-container').removeClass('nav-down').addClass('nav-up');
        $('.sticky').removeClass('nav-down').addClass('nav-up-side');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header-container').removeClass('nav-up').addClass('nav-down');
            $('.sticky').removeClass('nav-up-side').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

// var newParent = $('body');
// var oldParent = $('.header-container');
// console.log(oldParent);
// while (oldParent.childNodes.length > 0) {
//     newParent.appendChild(oldParent.childNodes[0]);
// }
function search(ele) {
    if(event.key === 'Enter') {
        // alert(ele.value);        
        $(".header-container").append("<div class='draggable drag'><p>"+ ele.value +"</p></div>")
    }
}

var hltr = new TextHighlighter(document.body);

  var flag = 0;
  var element = document;
  element.addEventListener("mousedown", function(){
      flag = 0;
  }, false);
  element.addEventListener("mousemove", function(){
      flag = 1;
  }, false);
  element.addEventListener("mouseup", function(){
      if(flag === 0){
          console.log("click");
      }
      else if(flag === 1){
          console.log("drag");
          console.log(hltr);
          $("body").append("<div class='popup'></div>")
          $(".popup").css("top",event.pageY);
          $(".popup").css("left",event.pageX);
      }
  }, false);