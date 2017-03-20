
$(document).ready(function() {
  let testimonials = [{'banana': 'What can I say about the 571B Banana Slicer that hasn\'t already been said about the wheel, penicillin, or the iPhone?',
    'author': '-Karen'},
    {'banana': 'This was the best thing I’ve purchased in my entire life. I use it every day and my roommate loves it. I can tell he loves it by the notes he slides under my door every night, like, "stop playing that thing,” or  “I’ll kill you in your sleep.” Cheers, my whistle boys.',
    'author': '-Chad'},
    {'banana': 'Capt. Trimmer\'s advice would have been immensely beneficial to humans, fish, seabirds, and other animals, but I am none of those things. I\'m a big rock.',
    'author': '-Jaime'},
    {'banana': 'They really need to put a warning label on this thing. Apparently, if you put it into your body, it turns into urine. Urine!',
    'author': '-E. Bonheim'}];
  let callback = function(review) {
    $('blockquote').fadeOut(500, function(){
      $('#banana').text(review['banana']);
      $('#author').text(review['author']);
      $('blockquote').fadeIn();
    });
  }
  cycle(5000, callback, testimonials);

  $(document).on('click', 'a', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
  });

  $('.nav > li').on('click', function(){
       $(this).addClass('active').siblings().removeClass('active');
  });

  // cache the navigation links
var $navigationLinks = $('.nav-link a');
// cache (in reversed order) the sections
var $sections = $($("section, header").get().reverse());

// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {};
$sections.each(function() {
    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $('.nav-link a[href="#' + id + '"]');
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval) ) {
            // if we are inside the interval we wait
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                fn.call();
            }, interval - (now - lastCall) );
        } else {
            // otherwise, we directly call the function
            lastCall = now;
            fn.call();
        }
    };
}

function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop();

    // iterate the sections
    $sections.each(function() {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top - 71;

        // if the user has scrolled over the top of the section
        if (scrollPosition >= sectionTop) {
            // get the section id
            var id = currentSection.attr('id');
            // get the corresponding navigation link
            var $navigationLink = sectionIdTonavigationLink[id];
            // if the link is not current
            if (!$navigationLink.hasClass('actove')) {
                // remove .current class from all the links
                $navigationLinks.removeClass('active');
                // add .current class to the current link
                $navigationLink.addClass('active');
            }
            // we have found our section, so we return false to exit the each loop
            return false;
        }
    });
}

$(window).scroll( throttle(highlightNavigation, 100) );


function cycle(delay, f, xs) {
   var run = function(i) {
      setTimeout(function() {
         f(xs[i])
         i += 1
         if (i >= xs.length) {
            i = 0
         }
         run(i)
      }, delay)
   }
  f(xs[0])
  run(1)
};
