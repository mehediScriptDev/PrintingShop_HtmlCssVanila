document.addEventListener('DOMContentLoaded', function () {
	AOS.init();
});

$(document).ready(function () {
	// Initialize Slick
	$('.banner-slider').slick({
		dots: false,
		arrows: true,
		speed: 300,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: true
	});

	$('.post-slider').slick({
	  dots: false,
      arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});
	
	$('.gallery-slider').slick({
		dots: true,
		arrows: true,
		speed: 500,
		fade: false,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 3000,
		infinite: true
	});

	$('.staff-slider').slick({
	  dots: false,
      arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 3000,
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});

	$('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  asNavFor: '.slider-for',
	  arrows: true,
	  dots: false,
	  centerMode: false,
	  focusOnSelect: true
	});

	// Read More Text
  $('.toggle-header').click(function () {
    $(this).next('.toggle-content').slideToggle(300);
    $(this).find('.arrow').toggleClass('flipped');
  });

  // Main Navigation 
	$('.menu-icon').on('click', function() {
	  $('.main-navigation ul').slideToggle(300);
	});

  // Menu List 
	$('.toggle-list').on('click', function() {
	  $('.all-categories-menu').slideToggle(300);
	});

  // Tabs Content
	$('.section-detailed-description ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.section-detailed-description ul.tabs li').removeClass('current');
		$('.section-detailed-description .tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

	// Flip Products
	$('.flip-product-icon').on('click', function() {
    $('.product-images .product-images-holder').slideToggle();
    $('.flip-product-icon').toggleClass('flipped');
  });

	// Products Horizontal Scroll Effect
  const $images = $('.highlights-image');
  const $infos = $('.highlights-info');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = $(entry.target).data('index');
        $images.removeClass('active').eq(index).addClass('active');
        $infos.removeClass('dl-active').eq(index).addClass('dl-active');
      }
    });
  }, {
    threshold: 0.5
  });

  $('.highlight-trigger').each(function () {
    observer.observe(this);
  });  

});

$(function () {
  function lazyLoad() {
    $('.lazy').each(function () {
      const $img = $(this);
      if ($img.attr('src')) return; // Already loaded

      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const imgTop = $img.offset().top;

      if (imgTop < scrollTop + windowHeight + 100) {
        $img.attr('src', $img.data('src')).addClass('loaded');
      }
    });
  }

  $(window).on('scroll resize', lazyLoad);
  $(window).trigger('scroll'); // Load images in view on page load
});

