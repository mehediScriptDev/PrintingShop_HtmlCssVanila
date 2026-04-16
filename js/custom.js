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

	// Mobile submenu toggle (tap-to-open) and outside click close
	$('.main-navigation').on('click', '.li-has-sub-menu > a', function(e) {
	  if ($(window).width() < 992) {
	    e.preventDefault();
	    var $li = $(this).parent();
	    if ($li.hasClass('open')) {
	      $li.removeClass('open').find('.sub-menu').first().slideUp(200);
	    } else {
	      // close sibling submenus
	      $li.siblings('.li-has-sub-menu.open').removeClass('open').find('.sub-menu').slideUp(200);
	      $li.addClass('open').find('.sub-menu').first().slideDown(200);
	    }
	  }
	});

	// Close open submenu when clicking outside the navigation (mobile)
	$(document).on('click', function(e) {
		if ($(window).width() < 992) {
			if (!$(e.target).closest('.main-navigation').length) {
				$('.main-navigation .li-has-sub-menu.open').removeClass('open').find('.sub-menu').slideUp(200);
			}
			// close categories panel and any open category submenus when clicking outside it
			if (!$(e.target).closest('.all-categories-wrapper').length && !$(e.target).closest('.toggle-list').length) {
				$('.all-categories-wrapper.open').removeClass('open');
				$('.all-categories-menu li.open').removeClass('open');
			}
		}
	});

	// Keep nav visibility consistent on resize
	$(window).on('resize', function() {
		if ($(window).width() >= 992) {
			$('.main-navigation ul').show();
			$('.main-navigation .li-has-sub-menu .sub-menu').removeAttr('style');
			$('.main-navigation .li-has-sub-menu').removeClass('open');
			$('.all-categories-wrapper').removeClass('open');
			$('.all-categories-menu li.open').removeClass('open');
		} else {
			$('.main-navigation ul').hide();
		}
	});

	// Menu List (mobile): toggle categories panel using `.open` class for smooth CSS animation
	$('.toggle-list').on('click', function(e) {
		e.preventDefault();
		var $wrapper = $(this).closest('.all-categories-wrapper');
		$wrapper.toggleClass('open');
		// always close any open category submenu when toggling the entire panel
		$wrapper.find('li.open').removeClass('open');
	});

	// Category submenu toggle: open / close individual submenus when user clicks the arrow (mobile)
	$('.all-categories-menu').on('click', 'li.li-has-sub-menu > a > span, li.li-has-sub-menu > a > span img', function(e){
		if ($(window).width() < 992) {
			e.preventDefault();
			e.stopPropagation();
			var $li = $(this).closest('li.li-has-sub-menu');
			if ($li.hasClass('open')) {
				$li.removeClass('open');
			} else {
				$li.siblings('.li-has-sub-menu.open').removeClass('open');
				$li.addClass('open');
			}
		}
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

