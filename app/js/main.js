$(function(){

    $('.top-slider__inner').slick({
        dots:true,
        arrows:false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000
    })

    $('.star').rateYo({
        rating: 3.6,
        numStars: 5,
        starWidth:"17px",
        normalFill: "#ccccce",
        ratedFill: "#ffc35b",
        readOnly: true
      });

});