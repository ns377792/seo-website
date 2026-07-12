(function ($) {
    "use strict";

    // Auto-highlight the current page's nav link (works even if the
    // hardcoded 'active' class in the HTML is missing/wrong/outdated)
    var setActiveNavLink = function () {
        var currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '') currentPage = 'index.html';

        $('.navbar-nav .nav-link').each(function () {
            var linkHref = $(this).attr('href');
            $(this).toggleClass('active', linkHref === currentPage);
        });
    };
    setActiveNavLink();

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
})(jQuery);





const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  // Guard: only run the portfolio filter logic when the markup actually exists on this page
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // toggle active state on buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          const show = filter === 'all' || filter === category;

          if (show) {
            card.style.display = '';
            // small fade-in animation
            requestAnimationFrame(() => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(8px)';
              requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }




  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('#dotsNav .dot');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Guard: only run the testimonial carousel logic when the markup actually exists on this page
  if (track && slides.length && prevBtn && nextBtn) {
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayTimer;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      // Each slide is (100 / totalSlides)% of the track's width
      track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-index'), 10));
        restartAutoplay();
      });
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      restartAutoplay();
    });

    function restartAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
    }

    // Swipe support for touch devices
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        restartAutoplay();
      }
    }, { passive: true });

    goToSlide(0);
    restartAutoplay();
  }

  // Basic contact / consultation form handling (no backend wired up yet).
  // Prevents a dead-end page reload on submit and gives the user feedback.
  document.querySelectorAll('form').forEach(form => {
    if (form.hasAttribute('data-no-js-handler')) return;
    form.addEventListener('submit', function (e) {
      if (!form.getAttribute('action')) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const originalHTML = btn.innerHTML;
          btn.textContent = 'Message Sent!';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            form.reset();
          }, 2500);
        }
      }
    });
  });