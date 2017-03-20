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

});

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
}
