document.addEventListener('DOMContentLoaded', function () {
	var isBlogArticlePage = !!document.querySelector('.blog-article');

	AOS.init({
		disable: function () {
			return isBlogArticlePage && window.innerWidth < 992;
		}
	});

	if (isBlogArticlePage && window.innerWidth < 992) {
		window.requestAnimationFrame(function () {
			window.requestAnimationFrame(function () {
				setTimeout(function () {
					document.querySelectorAll('.blog-article [data-aos]').forEach(function (el) {
						var delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
						el.style.setProperty('--blog-mobile-delay', delay + 'ms');
						el.classList.add('blog-mobile-motion');
					});
				}, 60);
			});
		});
	}
});

$(document).ready(function () {
	// Initialize Slick
	// Initialize Slick
	$('.banner-slider').slick({
		dots: false,
		arrows: true,
		speed: 0, // Instant slide jump so only our custom animations show
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 4500,
		infinite: true,
		pauseOnHover: false
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var $nextSlide = $(slick.$slides.get(nextSlide));
		// Reset animations for the next slide so they can be re-triggered
		$nextSlide.find('.slider-content').removeClass('animate-hero-text');
		$nextSlide.find('.slider-img').removeClass('animate-hero-visuals');
		$('.hero-bg-blink-layer').removeClass('animate-hero-bg');
	}).on('afterChange', function(event, slick, currentSlide){
		var $currentSlide = $(slick.$slides.get(currentSlide));
		
		// Forced reflow to ensure animations restart
		var content = $currentSlide.find('.slider-content')[0];
		var visuals = $currentSlide.find('.slider-img')[0];
		var bg = $('.hero-bg-blink-layer')[0];
		
		if (content) { void content.offsetWidth; }
		if (visuals) { void visuals.offsetWidth; }
		if (bg) { void bg.offsetWidth; }

		// Trigger animations for the current slide
		$currentSlide.find('.slider-content').addClass('animate-hero-text');
		$currentSlide.find('.slider-img').addClass('animate-hero-visuals');
		$('.hero-bg-blink-layer').addClass('animate-hero-bg');
	});

	// Trigger animations on load for the first active slide
	$('.banner-slider .slick-current .slider-content').addClass('animate-hero-text');
	$('.banner-slider .slick-current .slider-img').addClass('animate-hero-visuals');
	$('.hero-bg-blink-layer').addClass('animate-hero-bg');

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

  // Blog FAQ Accordion — collapsed by default
  $('.faq-section').each(function () {
    $(this).find('.faq-content').hide();
    $(this).find('.chevron i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(this).addClass('is-collapsed');
  });
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }

  $('.faq-header').css('cursor', 'pointer').click(function () {
    var $faqSection = $(this).closest('.faq-section');
    $(this).next('.faq-content').slideToggle({
      duration: 300,
      step: function() {
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      },
      complete: function() {
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }
    });
    $(this).find('.chevron i').toggleClass('fa-chevron-down fa-chevron-up');
    $faqSection.toggleClass('is-collapsed');
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

  // Initialize the first image and info as active immediately
  if ($images.length > 0 && $infos.length > 0) {
    $images.eq(0).addClass('active');
    $infos.eq(0).addClass('dl-active');
  }

  // Track per-image exit timers to prevent race conditions on fast scroll
  const exitTimers = new WeakMap();
  
  // Track the last-activated index during scroll-down to handle scroll-up cleanly
  let lastActivatedIndex = 0;

  // Centralized activator — handles enter animation, exit animation, and race conditions
  function activateHighlight(index) {
    const $newImg = $images.eq(index);
    if (!$newImg.length || $newImg.hasClass('active')) return;

    // Cancel any pending exit timers (prevents stripping 'active' from a re-activated image)
    $images.each(function () {
      const t = exitTimers.get(this);
      if (t) {
        clearTimeout(t);
        exitTimers.delete(this);
      }
    });

    // Mark currently active images as exiting (there may be more than one mid-transition)
    const $exiting = $images.filter('.active').not($newImg);
    $exiting.removeClass('active').addClass('exit-animation');
    $exiting.each(function () {
      const el = this;
      const timer = setTimeout(() => {
        $(el).removeClass('exit-animation');
        exitTimers.delete(el);
      }, 1600);
      exitTimers.set(el, timer);
    });

    // Force reflow so the new image's enter-animation always plays from the start
    $newImg.removeClass('exit-animation');
    void $newImg[0].offsetWidth;
    $newImg.addClass('active');

    // Switch active info panel
    $infos.removeClass('dl-active');
    $infos.eq(index).addClass('dl-active');
    
    // Update last-activated index for scroll-up logic
    lastActivatedIndex = index;
  }

  const observer = new IntersectionObserver((entries) => {
    // Split entries into entering (scroll-down) and exiting-downward (scroll-up)
    const entering = [];
    const exitingDown = [];
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entering.push(entry);
      } else if (entry.boundingClientRect.top > 0) {
        exitingDown.push(entry);
      }
    });

    // Scroll DOWN — process in ascending index order (so lastActivatedIndex climbs naturally)
    entering.sort((a, b) => $(a.target).data('index') - $(b.target).data('index'));
    entering.forEach(entry => {
      activateHighlight($(entry.target).data('index'));
    });

    // Scroll UP — process in descending index order (so lastActivatedIndex steps down one at a time)
    exitingDown.sort((a, b) => $(b.target).data('index') - $(a.target).data('index'));
    exitingDown.forEach(entry => {
      const index = $(entry.target).data('index');
      // Only respond when the LAST-ACTIVATED trigger exits — guarantees clean retrace
      if (index === lastActivatedIndex && lastActivatedIndex > 0) {
        activateHighlight(lastActivatedIndex - 1);
      }
    });
  }, {
    // Detect when the element passes into view with generous top margin
    rootMargin: '200px 0px -100px 0px',
    threshold: 0
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

      const rect = this.getBoundingClientRect();
      const windowHeight = $(window).height();
      if (rect.top < windowHeight * 1.1 && rect.bottom > -windowHeight * 0.1) {
        $img.attr('src', $img.data('src')).removeClass('lazy').addClass('loaded');
      }
    });
  }

  $(window).on('scroll resize', lazyLoad);
  lazyLoad(); // Initial check

  // Scroll Reveal Animations
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        } else { $(entry.target).removeClass('visible');
      }
    });
  }, {
    rootMargin: '0px 0px -150px 0px',
    threshold: 0.1
  });

  $('.scroll-reveal').each(function() {
    revealObserver.observe(this);
  });
});
