/**
 * Stackly — Cloud Business Solutions
 * Production-Ready Interactive Animations
 * - GSAP Cascading Text-Reveal
 * - 3D Interactive Parallax & Wave Slices
 * - Aggressive Statistics Counter with Intersection Observer
 * - Mobile Navigation & Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  // Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic'
    });
  }

  // ==========================================================================
  // Futuristic 3D GSAP Animated Loading Page
  // ==========================================================================
  const initSiteLoader = () => {
    const siteLoader = document.getElementById('siteLoader');
    if (!siteLoader) return;

    // Check if user is instantly restoring scroll from 404
    const urlParams = new URLSearchParams(window.location.search);
    const isRestoring = document.documentElement.classList.contains('instant-restoring') ||
                        sessionStorage.getItem('stackly_instant_restore') === 'true' ||
                        urlParams.get('restore_scroll') !== null;

    if (isRestoring) {
      siteLoader.style.display = 'none';
      return;
    }

    const loaderBrand = document.getElementById('loaderBrand');
    const loaderStage3D = document.getElementById('loaderStage3D');
    const loaderHud = document.getElementById('loaderHud');
    const loaderCounter = document.getElementById('loaderCounter');
    const loaderProgressBar = document.getElementById('loaderProgressBar');
    const loaderStatusText = document.getElementById('loaderStatusText');
    const coreVideo = siteLoader.querySelector('.loader-core-video');

    // Attempt video playback immediately
    if (coreVideo) {
      const playPromise = coreVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    // Lock page scroll while loader is visible
    document.body.style.overflow = 'hidden';

    let isDismissed = false;

    const dismissLoader = () => {
      if (isDismissed) return;
      isDismissed = true;

      if (typeof gsap !== 'undefined') {
        const exitTl = gsap.timeline({
          onComplete: () => {
            siteLoader.style.display = 'none';
            document.body.style.overflow = '';
            if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
            }
          }
        });

        exitTl
          .to(loaderBrand, { opacity: 0, y: -25, scale: 0.92, duration: 0.45, ease: 'power2.in' })
          .to(loaderHud, { opacity: 0, y: 25, duration: 0.45, ease: 'power2.in' }, '<')
          .to(loaderStage3D, { scale: 1.35, opacity: 0, duration: 0.65, ease: 'power2.in' }, '<0.1')
          .to(siteLoader, { opacity: 0, duration: 0.65, ease: 'power2.inOut' }, '-=0.3');
      } else {
        siteLoader.style.opacity = '0';
        siteLoader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
          siteLoader.style.display = 'none';
          document.body.style.overflow = '';
        }, 600);
      }
    };

    // Safety timeout: loader will dismiss after max 3.5 seconds under all conditions
    const safetyTimer = setTimeout(dismissLoader, 3500);

    if (typeof gsap !== 'undefined') {
      // Setup initial 3D GSAP states
      gsap.set(loaderBrand, { opacity: 0, y: -24, scale: 0.94 });
      gsap.set(loaderStage3D, { opacity: 0, scale: 0.75, rotateX: 18 });
      gsap.set(loaderHud, { opacity: 0, y: 24 });

      // Coordinated 3D Entrance Sequence
      const enterTl = gsap.timeline();
      enterTl
        .to(loaderBrand, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' })
        .to(loaderStage3D, { opacity: 1, scale: 1, rotateX: 0, duration: 0.85, ease: 'back.out(1.5)' }, '-=0.45')
        .to(loaderHud, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.45');

      // High-Tech HUD Counter & Status Progression
      const progressProxy = { val: 0 };
      const statusSteps = [
        'INITIALIZING CLOUD FABRIC...',
        'SYNCHRONIZING 3D ORBIT CORES...',
        'CALIBRATING SECURITY MESH...',
        'ENTERPRISE PLATFORM READY'
      ];

      gsap.to(progressProxy, {
        val: 100,
        duration: 2.0,
        ease: 'power1.inOut',
        delay: 0.2,
        onUpdate: () => {
          const currentVal = Math.round(progressProxy.val);
          if (loaderCounter) loaderCounter.textContent = currentVal;
          if (loaderProgressBar) loaderProgressBar.style.width = currentVal + '%';

          if (loaderStatusText) {
            if (currentVal < 28) {
              loaderStatusText.textContent = statusSteps[0];
            } else if (currentVal < 62) {
              loaderStatusText.textContent = statusSteps[1];
            } else if (currentVal < 92) {
              loaderStatusText.textContent = statusSteps[2];
            } else {
              loaderStatusText.textContent = statusSteps[3];
            }
          }
        },
        onComplete: () => {
          clearTimeout(safetyTimer);
          setTimeout(dismissLoader, 180);
        }
      });
    } else {
      let count = 0;
      const interval = setInterval(() => {
        count += 2;
        if (loaderCounter) loaderCounter.textContent = count;
        if (loaderProgressBar) loaderProgressBar.style.width = count + '%';
        if (count >= 100) {
          clearInterval(interval);
          clearTimeout(safetyTimer);
          setTimeout(dismissLoader, 200);
        }
      }, 35);
    }
  };

  initSiteLoader();

  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.classList.toggle('active', !isOpen);
      mobileDrawer.classList.toggle('open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Sticky Navbar Dynamic Scroll State
  const globalNavbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (globalNavbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 20) {
        globalNavbar.classList.add('scrolled');
      } else {
        globalNavbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // Sticky Dashboard Topbar Dynamic Scroll State
  const dashTopbar = document.getElementById('adminTopbar') || document.getElementById('dashTopbar') || document.querySelector('.dash-topbar');
  if (dashTopbar) {
    const handleDashScroll = () => {
      if (window.scrollY > 10) {
        dashTopbar.classList.add('scrolled');
      } else {
        dashTopbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleDashScroll, { passive: true });
    handleDashScroll();
  }

  /* ==========================================================================
     2. 3-Slide Hero Carousel & Kinetic Wave Typography Engine
     ========================================================================== */
  const initHeroSliderEngine = () => {
    const sliderWrapper = document.getElementById('heroSliderWrapper');
    if (!sliderWrapper) {
      return;
    }

    const slides = Array.from(sliderWrapper.querySelectorAll('.hero-slide'));
    const pills = Array.from(document.querySelectorAll('.slide-pill'));
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');

    if (!slides.length) return;

    // Helper: Split text into kinetic wave characters and words
    const buildWordSpans = (text, highlightType = null) => {
      const words = text.trim().split(/\s+/);
      let charIdx = 0;
      return words.map(word => {
        const charsHtml = Array.from(word).map(char => {
          let charClass = 'wave-char';
          if (highlightType === 'route') charClass += ' highlight-route-char';
          else if (highlightType === 'scale') charClass += ' highlight-scale-char';
          else if (highlightType === 'shield') charClass += ' highlight-shield-char';
          const idx = charIdx++;
          return `<span class="${charClass}" style="--char-index: ${idx};">${char}</span>`;
        }).join('');
        return `<span class="heading-word">${charsHtml}</span>`;
      }).join(' ');
    };

    // Pre-process each slide: build responsive kinetic character spans & mouse ripple
    slides.forEach((slide) => {
      const heading = slide.querySelector('.hero-heading');
      const subheading = slide.querySelector('.hero-subheading');
      const headingWrapper = slide.querySelector('.heading-wrapper');
      const headingSpotlight = slide.querySelector('.heading-spotlight');

      if (heading) {
        const line1 = heading.querySelector('.heading-line.line-1');
        const line2 = heading.querySelector('.heading-line.line-2');
        const highlightRoute = heading.querySelector('.highlight-route');
        const highlightScale = heading.querySelector('.highlight-scale');
        const highlightShield = heading.querySelector('.highlight-shield');

        if (line1) {
          const l1Text = line1.textContent.trim();
          line1.innerHTML = buildWordSpans(l1Text, null);
        }

        if (line2) {
          if (highlightRoute) {
            const beforeWords = buildWordSpans('into a', null);
            const highlightWords = buildWordSpans('clear route.', 'route');
            line2.innerHTML = `${beforeWords} <span class="highlight-route">${highlightWords}</span>`;
          } else if (highlightScale) {
            const beforeWords = buildWordSpans('intelligent', null);
            const highlightWords = buildWordSpans('cloud engines.', 'scale');
            line2.innerHTML = `${beforeWords} <span class="highlight-scale">${highlightWords}</span>`;
          } else if (highlightShield) {
            const beforeWords = buildWordSpans('with', null);
            const highlightWords = buildWordSpans('quantum defense.', 'shield');
            line2.innerHTML = `${beforeWords} <span class="highlight-shield">${highlightWords}</span>`;
          }
        }
      }

      if (subheading) {
        const rawText = subheading.textContent.trim();
        const pWords = rawText.split(/\s+/);
        let pCharIdx = 0;
        const subheadHtml = pWords.map(word => {
          const charsHtml = Array.from(word).map(char => {
            const idx = pCharIdx++;
            return `<span class="subheading-char" style="--p-char-index: ${idx};">${char}</span>`;
          }).join('');
          return `<span class="subheading-word">${charsHtml}</span>`;
        }).join(' ');
        subheading.innerHTML = subheadHtml;
      }

      // Spotlight tracking cursor
      if (headingWrapper && headingSpotlight) {
        headingWrapper.addEventListener('mousemove', (e) => {
          const rect = headingWrapper.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          headingSpotlight.style.setProperty('--heading-mouse-x', `${x}px`);
          headingSpotlight.style.setProperty('--heading-mouse-y', `${y}px`);
          headingSpotlight.style.opacity = '1';
        });

        headingWrapper.addEventListener('mouseleave', () => {
          headingSpotlight.style.opacity = '0.8';
        });
      }

      // Cursor Proximity Hover Ripple on Heading
      if (headingWrapper) {
        const headingChars = heading ? heading.querySelectorAll('.wave-char') : [];
        const allChars = Array.from(headingChars);

        headingWrapper.addEventListener('mousemove', (e) => {
          if (!heading || !heading.classList.contains('wave-active')) return;
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          allChars.forEach(charSpan => {
            const cRect = charSpan.getBoundingClientRect();
            const charX = cRect.left + cRect.width / 2;
            const charY = cRect.top + cRect.height / 2;
            const dist = Math.hypot(mouseX - charX, mouseY - charY);

            if (dist < 85) {
              const factor = 1 - dist / 85;
              const liftY = -factor * 11;
              const scaleVal = 1 + factor * 0.14;
              charSpan.style.setProperty('--hover-lift', `${liftY.toFixed(2)}px`);
              charSpan.style.setProperty('--hover-scale', `${scaleVal.toFixed(3)}`);
              charSpan.classList.add('hover-proximity');
            } else {
              charSpan.classList.remove('hover-proximity');
              charSpan.style.removeProperty('--hover-lift');
              charSpan.style.removeProperty('--hover-scale');
            }
          });
        });

        headingWrapper.addEventListener('mouseleave', () => {
          allChars.forEach(charSpan => {
            charSpan.classList.remove('hover-proximity');
            charSpan.style.removeProperty('--hover-lift');
            charSpan.style.removeProperty('--hover-scale');
          });
        });
      }
    });

    // ------------------------------------------------------------------------
    // Carousel State & Timing Engine
    // ------------------------------------------------------------------------
    let currentIndex = 0;
    let isTransitioning = false;
    let isPaused = false;
    const slideDuration = 3800; // Snappy, engaging 3.8s per slide
    let timerStart = Date.now();
    let currentProgress = 0;

    // Reset progress on all indicator pills
    const resetAllProgress = () => {
      pills.forEach(pill => {
        const fill = pill.querySelector('.pill-progress-fill');
        if (fill) fill.style.width = '0%';
      });
    };

    // Play active slide entrance animation
    const animateSlideIn = (slide, isFirstLoad = false) => {
      const heading = slide.querySelector('.hero-heading');
      const subheading = slide.querySelector('.hero-subheading');
      const tagline = slide.querySelector('.hero-tagline');
      const ctas = slide.querySelector('.hero-ctas');
      const badges = slide.querySelector('.trust-badges');
      const headingChars = heading ? heading.querySelectorAll('.wave-char') : [];
      const subheadChars = subheading ? subheading.querySelectorAll('.subheading-char') : [];

      if (typeof gsap === 'undefined') {
        if (heading) heading.classList.add('wave-active');
        if (subheading) {
          subheading.classList.add('wave-active');
          subheading.style.opacity = '1';
        }
        if (ctas) ctas.style.opacity = '1';
        if (badges) badges.style.opacity = '1';
        return;
      }

      // Reset active wave classes
      if (heading) heading.classList.remove('wave-active');
      if (subheading) subheading.classList.remove('wave-active');

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          if (headingChars.length) gsap.set(headingChars, { clearProps: 'transform,opacity,rotateX,scale' });
          if (subheadChars.length) gsap.set(subheadChars, { clearProps: 'transform,opacity' });
          if (heading) heading.classList.add('wave-active');
          if (subheading) subheading.classList.add('wave-active');
          isTransitioning = false;
        }
      });

      const delayBase = isFirstLoad ? 0.08 : 0;

      // 1. Tagline drops in fast
      if (tagline) {
        tl.fromTo(tagline, 
          { y: -14, opacity: 0, scale: 0.98 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.30, ease: 'power2.out' }, 
          delayBase
        );
      }

      // 2. Heading characters wave in snappy with high visibility
      if (headingChars.length) {
        tl.fromTo(headingChars,
          { y: 20, opacity: 0, rotateX: -25, scale: 0.9 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)', stagger: { each: 0.007, from: 'start' } },
          delayBase + 0.05
        );
      }

      // 3. Subheading characters stream in fast
      if (subheading && subheadChars.length) {
        tl.to(subheading, { opacity: 1, y: 0, duration: 0.04 }, delayBase + 0.16);
        tl.fromTo(subheadChars,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, ease: 'power2.out', stagger: { each: 0.002, from: 'start' } },
          delayBase + 0.18
        );
      }

      // 4. CTA buttons slide up fast
      if (ctas) {
        tl.fromTo(ctas,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.30, ease: 'power2.out' },
          delayBase + 0.26
        );
      }

      // 5. Trust Badges slide up fast
      if (badges) {
        tl.fromTo(badges,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.30, ease: 'power2.out' },
          delayBase + 0.30
        );
      }

      // 6. 3D Sliced Media wrapper reveals with soft scale on initial entrance
      const mediaWrapper = document.getElementById('heroMediaWrapper');
      if (mediaWrapper) {
        if (isFirstLoad) {
          tl.fromTo(mediaWrapper,
            { opacity: 0, y: 24, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
            delayBase + 0.35
          );
        } else {
          mediaWrapper.style.opacity = '1';
        }
      }
    };

    // Transition to target slide index
    const goToSlide = (newIndex, isManual = false) => {
      if (newIndex === currentIndex && !isManual) return;
      isTransitioning = true;

      // Deactivate current slide
      const prevSlide = slides[currentIndex];
      if (prevSlide) {
        prevSlide.classList.remove('active');
        const prevHeading = prevSlide.querySelector('.hero-heading');
        const prevSubhead = prevSlide.querySelector('.hero-subheading');
        if (prevHeading) prevHeading.classList.remove('wave-active');
        if (prevSubhead) prevSubhead.classList.remove('wave-active');
      }

      const prevPill = pills[currentIndex];
      if (prevPill) {
        prevPill.classList.remove('active');
        prevPill.setAttribute('aria-selected', 'false');
        const fill = prevPill.querySelector('.pill-progress-fill');
        if (fill) fill.style.width = '0%';
      }

      // Activate new slide
      currentIndex = (newIndex + slides.length) % slides.length;
      const nextSlide = slides[currentIndex];
      if (nextSlide) {
        nextSlide.classList.add('active');
        animateSlideIn(nextSlide, false);
      }

      const nextPill = pills[currentIndex];
      if (nextPill) {
        nextPill.classList.add('active');
        nextPill.setAttribute('aria-selected', 'true');
      }

      // Reset timer
      resetAllProgress();
      timerStart = Date.now();
      currentProgress = 0;

      // Unlock responsive clicking cleanly in 320ms
      setTimeout(() => {
        isTransitioning = false;
      }, 320);
    };

    // Tick progress bar
    const updateProgress = () => {
      if (!isPaused) {
        const elapsed = Date.now() - timerStart;
        currentProgress = Math.min(100, (elapsed / slideDuration) * 100);

        const activePill = pills[currentIndex];
        if (activePill) {
          const fill = activePill.querySelector('.pill-progress-fill');
          if (fill) fill.style.width = `${currentProgress.toFixed(1)}%`;
        }

        if (currentProgress >= 100) {
          goToSlide(currentIndex + 1);
        }
      } else {
        // Shift timer start forward so pausing doesn't eat time
        timerStart = Date.now() - (currentProgress / 100) * slideDuration;
      }

      requestAnimationFrame(updateProgress);
    };

    // Pause on hover
    sliderWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    sliderWrapper.addEventListener('mouseleave', () => { isPaused = false; });

    // Interactive button clicks
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1, true);
      });
    }

    // Pill tab clicks
    pills.forEach((pill, idx) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx, true);
      });
    });

    // Mobile touch swipe handling
    let touchStartX = 0;
    let touchStartY = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isPaused = true;
      }
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            goToSlide(currentIndex + 1, true);
          } else {
            goToSlide(currentIndex - 1, true);
          }
        }
        isPaused = false;
      }
    }, { passive: true });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      const rect = sliderWrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1, true);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1, true);
      }
    });

    // Initialize first slide entrance
    const initialSlide = slides[0];
    if (initialSlide) {
      animateSlideIn(initialSlide, true);
    }
    timerStart = Date.now();
    requestAnimationFrame(updateProgress);
  };

  initHeroSliderEngine();

  /* ==========================================================================
     3. 3D Parallax & Sliced Wave Effect (Segmented Layout)
     ========================================================================== */
  /* ==========================================================================
     3. Continuous 3D Wave Animation Engine & Interactive Parallax
     ========================================================================== */
  const initSlicedWaveEngine = () => {
    const container = document.getElementById('sliceContainer');
    const wrapper = document.getElementById('heroMediaWrapper');
    const sheen = document.getElementById('sheenOverlay');
    const slices = document.querySelectorAll('.image-slice');

    if (!container || !slices.length) return;

    if (wrapper) {
      wrapper.style.opacity = '1';
    }

    const totalSlices = slices.length;
    let time = 0;
    let isHovering = false;

    // Interactive mouse interpolation targets
    let targetMouseNormX = 0;
    let targetMouseNormY = 0;
    let currentMouseNormX = 0;
    let currentMouseNormY = 0;
    let targetSliceFocus = totalSlices / 2;
    let currentSliceFocus = totalSlices / 2;
    let mouseInfluence = 0;
    let currentMouseInfluence = 0;

    // Mouse tracking on container
    const handleMouseMove = (e) => {
      isHovering = true;
      mouseInfluence = 1;

      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Coordinates normalized from center: -1 to 1
      targetMouseNormX = (clientX / rect.width) * 2 - 1;
      targetMouseNormY = (clientY / rect.height) * 2 - 1;

      // Fractional slice position under cursor (0 to totalSlices - 1)
      const ratioX = Math.max(0, Math.min(1, clientX / rect.width));
      targetSliceFocus = ratioX * (totalSlices - 1);

      // Specular sheen highlight follows cursor
      if (sheen) {
        sheen.style.setProperty('--mouse-x', `${clientX}px`);
        sheen.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseInfluence = 0;
      targetMouseNormX = 0;
      targetMouseNormY = 0;
      targetSliceFocus = totalSlices / 2;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Continuous 60fps Harmonic Wave Loop (Balanced Fluid Motion)
    const renderWaveFrame = () => {
      time += 0.022; // Balanced, fluid, lively wave pacing

      // Smooth buttery lerp for mouse interactions
      currentMouseNormX += (targetMouseNormX - currentMouseNormX) * 0.06;
      currentMouseNormY += (targetMouseNormY - currentMouseNormY) * 0.06;
      currentSliceFocus += (targetSliceFocus - currentSliceFocus) * 0.08;
      currentMouseInfluence += (mouseInfluence - currentMouseInfluence) * 0.06;

      // Container overall gentle, breathing 3D levitation
      const containerPitch = -currentMouseNormY * 5.0 + Math.sin(time * 0.8) * 1.4;
      const containerYaw = currentMouseNormX * 6.5 + Math.cos(time * 0.7) * 1.4;
      container.style.transform = `perspective(1400px) rotateX(${containerPitch.toFixed(2)}deg) rotateY(${containerYaw.toFixed(2)}deg)`;

      // Animate each slice along smooth, graceful harmonic curves
      for (let i = 0; i < totalSlices; i++) {
        const slice = slices[i];

        // 1. Primary traveling harmonic wave (active fluid flow)
        const wavePhase1 = time * 1.4 + i * 0.48;
        const wave1 = Math.sin(wavePhase1);

        // 2. Secondary organic harmonic
        const wavePhase2 = time * 0.95 - i * 0.32;
        const wave2 = Math.cos(wavePhase2);

        // Fluid vertical undulation (Y-axis)
        let waveY = (wave1 * 10.5) + (wave2 * 4.2);

        // 3D depth wave (Z-axis push & pull)
        let waveZ = Math.cos(time * 1.25 + i * 0.5) * 20;

        // Elegant 3D slice curvature
        let sliceRotX = Math.cos(time * 0.95 + i * 0.35) * 3.2;
        let sliceRotY = (Math.sin(time * 1.1 + i * 0.4) * 3.8) + (currentMouseNormX * 4.5);

        // 3. Smooth Interactive Ripple on Hover
        if (currentMouseInfluence > 0.01) {
          const distToMouse = Math.abs(i - currentSliceFocus);
          const rippleIntensity = Math.exp(-distToMouse * 0.75) * currentMouseInfluence;

          waveZ += rippleIntensity * 26;
          waveY -= rippleIntensity * 11;
          sliceRotY += (i - currentSliceFocus) * rippleIntensity * 3.5;
        }

        // Apply hardware-accelerated 3D transform directly to slice
        slice.style.transform = `translate3d(0px, ${waveY.toFixed(2)}px, ${waveZ.toFixed(2)}px) rotateX(${sliceRotX.toFixed(2)}deg) rotateY(${sliceRotY.toFixed(2)}deg)`;

        // Wave crest luminescence & saturation
        const crestShine = 1.0 + (wave1 * 0.06) + (currentMouseInfluence * 0.04);
        const crestSaturate = 1.0 + (wave1 * 0.04);
        slice.style.filter = `brightness(${crestShine.toFixed(3)}) saturate(${crestSaturate.toFixed(3)})`;
      }

      requestAnimationFrame(renderWaveFrame);
    };

    // Kick off wave loop
    requestAnimationFrame(renderWaveFrame);

    // Mobile Gyroscope Wave Tilt Support
    if ('ontouchstart' in window) {
      window.addEventListener('deviceorientation', (e) => {
        if (!e.gamma || !e.beta) return;
        targetMouseNormX = Math.max(-1, Math.min(1, e.gamma / 20));
        targetMouseNormY = Math.max(-1, Math.min(1, (e.beta - 45) / 20));
        mouseInfluence = 0.5;
      });
    }
  };

  initSlicedWaveEngine();

  /* ==========================================================================
     4. Bottom Statistics Counter & Scroll Reveal (Intersection Observer)
     ========================================================================== */
  const initStatisticsCounters = () => {
    const statsSection = document.getElementById('statsSection');
    const statCards = document.querySelectorAll('.stat-card');

    if (!statsSection || !statCards.length) return;

    let hasTriggered = false;

    // Aggressive Count-up Animation Helper
    const animateCountUp = (element, target, decimals, durationMs = 1900) => {
      const startTime = performance.now();
      const startValue = 0;

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Aggressive Quartic Ease-Out curve for rapid initial climb and decisive lock-in
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (target - startValue) * easeProgress;

        element.textContent = currentValue.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Guarantee exact target precision at completion
          element.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    // Intersection Observer to trigger entrance when visible in viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;

          statCards.forEach((card, index) => {
            // Staggered slide up & fade in
            setTimeout(() => {
              card.classList.add('visible');

              const numEl = card.querySelector('.stat-number');
              const target = parseFloat(card.dataset.target);
              const decimals = parseInt(card.dataset.decimals, 10) || 0;

              if (numEl && !isNaN(target)) {
                animateCountUp(numEl, target, decimals, 1800 + index * 120);
              }
            }, index * 100);
          });

          // Unobserve once triggered
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(statsSection);
  };

  initStatisticsCounters();

  /* ==========================================================================
     5. Services Section: GSAP Scroll Reveal & Intersection Observer
     ========================================================================== */
  const initServicesScrollReveal = () => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    let hasRevealed = false;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Header elements smoothly slide up and fade in with stagger
            tl.from('#services .services-pill-badge, #services .services-heading, #services .services-subheading', {
              y: 35,
              opacity: 0,
              duration: 0.8,
              stagger: 0.14,
              ease: 'power3.out'
            });

            // 2. Staggered Grid Entry: Cards animate in one by one, scaling from 0.9 to 1 with fade
            tl.from('#services .service-card', {
              y: 45,
              scale: 0.9,
              opacity: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'back.out(1.4)',
              clearProps: 'transform,opacity,scale' // Cleans up so mouse tilt works uninhibited
            }, '-=0.35');
          } else {
            // Fallback if GSAP is unavailable
            const els = servicesSection.querySelectorAll('.services-pill-badge, .services-heading, .services-subheading, .service-card');
            els.forEach(el => {
              el.style.opacity = '1';
              el.style.transform = 'none';
            });
          }

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(servicesSection);
  };

  /* ==========================================================================
     6. Services Section: Interactive 3D Tilt & Dynamic Specular Glare
     ========================================================================== */
  const initServicesTilt = () => {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    cards.forEach(card => {
      let rafId = null;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalized coordinates: -1 to 1 from card center
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        // Subtle, elegant 3D tilt rotation
        const rotX = -normY * 8;
        const rotY = normX * 8;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;

          // Move dynamic specular glare spotlight directly under cursor
          const glare = card.querySelector('.service-card-glare');
          if (glare) {
            glare.style.setProperty('--glare-x', `${x}px`);
            glare.style.setProperty('--glare-y', `${y}px`);
            glare.style.opacity = '1';
          }
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        const glare = card.querySelector('.service-card-glare');
        if (glare) {
          glare.style.opacity = '0';
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  initServicesScrollReveal();
  initServicesTilt();

  /* ==========================================================================
     7. Case Study Section: Stat Counter & Scroll Entry
     ========================================================================== */
  const initCaseStudyAnimations = () => {
    const caseSection = document.getElementById('caseStudy');
    if (!caseSection) return;

    const cards = caseSection.querySelectorAll('.case-stat-card');
    let hasTriggered = false;

    // Smooth count up/down from 0 to negative targets (-31, -44)
    const animateStatNumber = (element, targetValue, durationMs = 1700) => {
      const startTime = performance.now();
      const startValue = 0;

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease out
        const current = Math.round(startValue + (targetValue - startValue) * ease);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = targetValue;
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;

          // Animate text column and stat cards
          if (typeof gsap !== 'undefined') {
            gsap.from('#caseStudy .case-study-content > *', {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out'
            });

            gsap.from('#caseStudy .case-stat-card', {
              y: 35,
              opacity: 0,
              duration: 0.85,
              stagger: 0.15,
              ease: 'back.out(1.4)'
            });
          }

          // Trigger number counter
          cards.forEach((card, idx) => {
            const numEl = card.querySelector('.case-stat-value');
            const target = parseInt(card.dataset.target, 10);
            if (numEl && !isNaN(target)) {
              setTimeout(() => {
                animateStatNumber(numEl, target, 1600 + idx * 200);
              }, 250 + idx * 150);
            }
          });

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(caseSection);
  };

  /* ==========================================================================
     8. "How It Works" Section: Editorial Split-Heading & Timeline Draw
     ========================================================================== */
  const initHowItWorksAnimations = () => {
    const howSection = document.getElementById('howItWorks');
    const heading = document.getElementById('howHeading');
    const timelineGlow = document.getElementById('timelineLineGlow');
    const steps = document.querySelectorAll('.timeline-step');

    if (!howSection) return;

    // Split heading words into masked containers for bottom-stagger reveal
    if (heading) {
      const text = heading.textContent.trim();
      const words = text.split(/\s+/);
      heading.innerHTML = words.map(w => 
        `<span class="how-word-mask"><span class="how-word-inner">${w}</span></span>`
      ).join(' ');
    }

    let hasRevealed = false;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Overline slides up
            tl.from('#howItWorks .how-overline', {
              y: 20,
              opacity: 0,
              duration: 0.6
            }, 0.1);

            // 2. Large heading words stagger in smoothly from bottom with mask
            const wordInners = document.querySelectorAll('#howHeading .how-word-inner');
            if (wordInners.length) {
              tl.from(wordInners, {
                yPercent: 105,
                opacity: 0,
                duration: 0.75,
                stagger: 0.04,
                ease: 'power3.out'
              }, 0.2);
            }

            // 3. Paragraph & Feature items fade & slide in
            tl.from('#howItWorks .how-paragraph', {
              y: 20,
              opacity: 0,
              duration: 0.6
            }, 0.45);

            tl.from('#howItWorks .how-feature-item', {
              x: -20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out'
            }, 0.6);

            // 4. Vertical Glowing Line Draws Downwards
            if (timelineGlow) {
              tl.to(timelineGlow, {
                scaleY: 1,
                duration: 1.2,
                ease: 'power2.inOut'
              }, 0.4);
            }

            // 5. Timeline steps stagger in (fade and slide right) exactly as the line progresses
            steps.forEach((step, index) => {
              tl.to(step, {
                opacity: 1,
                x: 0,
                duration: 0.65,
                ease: 'back.out(1.3)',
                onStart: () => step.classList.add('step-visible')
              }, 0.55 + index * 0.28);
            });

          } else {
            // Fallback
            if (timelineGlow) timelineGlow.style.transform = 'scaleY(1)';
            steps.forEach(step => step.classList.add('step-visible'));
          }

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(howSection);
  };

  initCaseStudyAnimations();
  initHowItWorksAnimations();

  /* ==========================================================================
     9. Upgraded Animated Testimonials Carousel (3D Coverflow & Autoplay)
     ========================================================================== */
  const initTestimonialsCarousel = () => {
    const section = document.getElementById('testimonials');
    const heading = document.getElementById('testimonialsHeading');
    const wrapper = document.getElementById('testimonialsCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const dots = Array.from(document.querySelectorAll('.pagination-dot'));

    if (!section || !cards.length) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoplayTimer = null;

    // Split Heading Words for Mask Reveal (preserving the .highlight-say element)
    if (heading) {
      const words = heading.textContent.trim().split(/\s+/);
      heading.innerHTML = words.map(w => {
        if (w.toLowerCase().includes('say')) {
          return `<span class="test-word-mask"><span class="test-word-inner"><span class="highlight-say">${w}</span></span></span>`;
        }
        return `<span class="test-word-mask"><span class="test-word-inner">${w}</span></span>`;
      }).join(' ');
    }

    // 3D Coverflow Slide Renderer
    const updateCarousel = (animate = true) => {
      const isMobile = window.innerWidth < 768;

      cards.forEach((card, i) => {
        // Calculate shortest cyclical distance (-1, 0, 1, or hidden)
        let offset = (i - currentIndex) % totalCards;
        while (offset > totalCards / 2) offset -= totalCards;
        while (offset < -totalCards / 2) offset += totalCards;

        let targetX = 0;
        let targetScale = 1;
        let targetRotateY = 0;
        let targetOpacity = 1;
        let targetBlur = 0;
        let zIndex = 10;
        let pointerEvents = 'auto';
        let cursor = 'default';

        if (isMobile) {
          // ── MOBILE: simple fade swap — only active card visible ──
          if (offset === 0) {
            targetX = 0;
            targetScale = 1;
            targetRotateY = 0;
            targetOpacity = 1;
            targetBlur = 0;
            zIndex = 10;
            pointerEvents = 'auto';
          } else {
            targetX = 0;
            targetScale = 0.95;
            targetRotateY = 0;
            targetOpacity = 0;
            targetBlur = 0;
            zIndex = 1;
            pointerEvents = 'none';
          }
        } else {
          // ── DESKTOP: full 3D coverflow with absolute horizontal centering ──
          if (offset === 0) {
            // Center active card: exactly at stage center (x = 0)
            targetX = 0;
            targetScale = 1;
            targetRotateY = 0;
            targetOpacity = 1;
            targetBlur = 0;
            zIndex = 10;
            pointerEvents = 'auto';
            cursor = 'default';
          } else if (offset === 1) {
            // Next card on right side
            targetX = 320;
            targetScale = 0.86;
            targetRotateY = -12;
            targetOpacity = 0.35;
            targetBlur = 3;
            zIndex = 5;
            pointerEvents = 'auto';
            cursor = 'pointer';
          } else if (offset === -1) {
            // Previous card on left side
            targetX = -320;
            targetScale = 0.86;
            targetRotateY = 12;
            targetOpacity = 0.35;
            targetBlur = 3;
            zIndex = 5;
            pointerEvents = 'auto';
            cursor = 'pointer';
          } else {
            // Hidden cards
            targetX = offset > 0 ? 680 : -680;
            targetScale = 0.72;
            targetRotateY = 0;
            targetOpacity = 0;
            targetBlur = 6;
            zIndex = 1;
            pointerEvents = 'none';
            cursor = 'default';
          }
        }

        card.style.left = '50%';
        card.style.zIndex = zIndex;
        card.style.pointerEvents = pointerEvents;
        card.style.cursor = cursor;

        if (animate && typeof gsap !== 'undefined') {
          gsap.to(card, {
            left: '50%',
            xPercent: -50,
            x: targetX,
            scale: targetScale,
            rotateY: targetRotateY,
            opacity: targetOpacity,
            filter: `blur(${targetBlur}px)`,
            duration: isMobile ? 0.45 : 0.65,
            ease: isMobile ? 'power2.inOut' : 'power3.out',
            overwrite: 'auto',
            onStart: () => {
              if (targetOpacity > 0) {
                card.style.visibility = 'visible';
              }
            },
            onComplete: () => {
              if (targetOpacity === 0) {
                card.style.visibility = 'hidden';
              } else {
                card.style.visibility = 'visible';
              }
            }
          });
        } else {
          card.style.transform = `translateX(-50%) translate3d(${targetX}px, 0px, 0px) scale(${targetScale}) rotateY(${targetRotateY}deg)`;
          card.style.opacity = targetOpacity;
          card.style.filter = `blur(${targetBlur}px)`;
          card.style.visibility = targetOpacity > 0 ? 'visible' : 'hidden';
          if (typeof gsap !== 'undefined') {
            gsap.set(card, {
              left: '50%',
              xPercent: -50,
              x: targetX,
              scale: targetScale,
              rotateY: targetRotateY,
              opacity: targetOpacity,
              filter: `blur(${targetBlur}px)`
            });
          }
        }
      });

      // Update Pagination Dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    // Go to specific slide with boundary wrap
    const goToSlide = (newIndex) => {
      currentIndex = (newIndex + totalCards) % totalCards;
      updateCarousel(true);
      resetAutoplay();
    };

    // Autoplay Controller (Every 4.5 seconds)
    const startAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4500);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Event Listeners: Navigation Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      });
    }

    // Event Listeners: Pagination Dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
      });
    });

    // Event Listeners: Direct Card Clicks
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (idx !== currentIndex) {
          e.preventDefault();
          goToSlide(idx);
        }
      });
    });

    // Event Listeners: Pause on Hover
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoplay);
      wrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Touch / Swipe Support for Mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;
    const stage = document.getElementById('testimonialsStage');
    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
        stopAutoplay();
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // Only swipe if horizontal movement dominates vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
          if (deltaX < 0) {
            goToSlide(currentIndex + 1); // swipe left = next
          } else {
            goToSlide(currentIndex - 1); // swipe right = prev
          }
        } else {
          startAutoplay();
        }
      }, { passive: true });

      stage.addEventListener('touchcancel', () => {
        isDragging = false;
        startAutoplay();
      }, { passive: true });
    }

    // Resize Handler for Responsive 3D Coverflow adjustments
    window.addEventListener('resize', () => {
      updateCarousel(false);
    });

    // Initialize initial static card positions
    updateCarousel(false);

    // Scroll Reveal with Intersection Observer & GSAP
    let hasRevealed = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Pill badge drops in
            tl.from('#testimonials .testimonials-pill-badge', {
              y: -20,
              opacity: 0,
              duration: 0.7
            }, 0.1);

            // 2. Heading words stagger in from bottom with mask
            const wordInners = document.querySelectorAll('#testimonialsHeading .test-word-inner');
            if (wordInners.length) {
              tl.from(wordInners, {
                yPercent: 110,
                opacity: 0,
                duration: 0.75,
                stagger: 0.05,
                ease: 'power3.out'
              }, 0.2);
            }

            // 3. Carousel container smoothly slides up and fades in
            tl.from('#testimonialsCarousel', {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out'
            }, 0.4);

            tl.from('#carouselPagination', {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out'
            }, 0.6);
          }

          startAutoplay();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(section);
  };

  initTestimonialsCarousel();

  /* ==========================================================================
     BUILT FOR THE HARD PARTS SECTION ANIMATIONS & 3D INTERACTION
     - Bidirectional Slide-In from opposite sides (GSAP + ScrollTrigger)
     - Left Column (Content) slides in from left (x: -220 -> 0)
     - Right Column (Image) slides in from right (x: 220 -> 0)
     - Mobile responsive fallback (y: 50 -> 0, x: 0)
     - Masked character stagger reveal for "Calm systems. Clear decisions."
     - Word-by-word paragraph cascade & feature list stagger
     - Interactive 3D mouse tilt & dynamic specular glare
     ========================================================================== */
  const initHardPartsAnimations = () => {
    const section = document.getElementById('hard-parts');
    const leftCol = document.getElementById('hpLeftCol') || (section ? section.querySelector('.hard-parts-left') : null);
    const rightCol = document.getElementById('hpRightCol') || (section ? section.querySelector('.hard-parts-right') : null);
    const headingEl = document.getElementById('hpHeading');
    const descEl = document.getElementById('hpDescription');
    const featureItems = section ? section.querySelectorAll('.hp-feature-item') : [];
    const ambientGlow = section ? section.querySelector('.hp-ambient-glow') : null;
    const imgCard = document.getElementById('hpImageCard');
    const wrapper = document.getElementById('hpImageWrapper');
    const glare = document.getElementById('hpGlareOverlay');

    if (!section) return;

    // 1. Dynamic Text Splitter for Heading (Awwwards Masked Character Stagger Reveal)
    if (headingEl) {
      const lines = [
        ["Calm", "systems."],
        ["Clear", "decisions."]
      ];

      headingEl.innerHTML = '';
      lines.forEach((lineWords, lineIdx) => {
        const lineWrap = document.createElement('span');
        lineWrap.className = 'hp-line';

        lineWords.forEach((word) => {
          const wordWrap = document.createElement('span');
          wordWrap.className = 'hp-word-wrap';

          const chars = word.split('');
          chars.forEach((char) => {
            const charMask = document.createElement('span');
            charMask.className = 'hp-char-mask';

            const charInner = document.createElement('span');
            charInner.className = 'hp-char-inner';
            charInner.textContent = char;

            charMask.appendChild(charInner);
            wordWrap.appendChild(charMask);
          });

          lineWrap.appendChild(wordWrap);
        });

        headingEl.appendChild(lineWrap);
        if (lineIdx < lines.length - 1) {
          const breakEl = document.createElement('br');
          breakEl.className = 'hp-break';
          headingEl.appendChild(breakEl);
        }
      });
    }

    const charInners = headingEl ? headingEl.querySelectorAll('.hp-char-inner') : [];

    // 2. Paragraph Splitter into Words for smooth cascade
    if (descEl) {
      const rawText = descEl.textContent.trim();
      const words = rawText.split(/\s+/);
      descEl.innerHTML = words.map(word => `<span class="hp-p-word">${word} </span>`).join('');
    }
    const pWords = descEl ? descEl.querySelectorAll('.hp-p-word') : [];

    // 3. Bidirectional Slide-In Animation (GSAP + ScrollTrigger matching FAQ)
    if (leftCol && rightCol && typeof gsap !== 'undefined') {
      const isMobile = window.innerWidth <= 900;

      if (typeof ScrollTrigger !== 'undefined') {
        // Initial state via gsap.set
        if (isMobile) {
          gsap.set(leftCol, { x: 0, y: 50, opacity: 0 });
          gsap.set(rightCol, { x: 0, y: 50, opacity: 0 });
        } else {
          gsap.set(leftCol, { x: -220, y: 0, opacity: 0 });
          gsap.set(rightCol, { x: 220, y: 0, opacity: 0 });
        }

        const hpTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true
          }
        });

        if (isMobile) {
          // Mobile: Fade and slide up from the bottom (y: 50)
          hpTimeline.to([rightCol, leftCol], {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'transform'
          });
        } else {
          // Desktop: Simultaneous Bidirectional Slide-In from opposite sides (1.35s)
          hpTimeline.to(leftCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);

          hpTimeline.to(rightCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);
        }

        // Overline Badge Entrance
        hpTimeline.from('.hard-parts-overline', {
          y: 15,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, 0.2);

        // Heading Characters Stagger Reveal (Cascades gracefully during slide-in)
        if (charInners.length) {
          hpTimeline.to(charInners, {
            y: 0,
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.028,
            ease: 'power4.out'
          }, 0.25);
        }

        // Paragraph Word-by-Word Cascade
        if (pWords.length) {
          hpTimeline.from(pWords, {
            y: 12,
            opacity: 0,
            duration: 0.45,
            stagger: 0.016,
            ease: 'power2.out'
          }, 0.5);
        }

        // Feature Items Cascade from Left
        if (featureItems.length) {
          hpTimeline.from(featureItems, {
            x: -30,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.3)',
            clearProps: 'opacity,transform'
          }, 0.65);
        }

        // Ambient Radial Glow behind image expands
        if (ambientGlow) {
          hpTimeline.from(ambientGlow, {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
          }, 0.3);
        }
      } else {
        // Fallback using Native Intersection Observer
        let hasHpRevealed = false;
        const hpObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !hasHpRevealed) {
              hasHpRevealed = true;
              
              if (isMobile) {
                gsap.fromTo([rightCol, leftCol],
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out', clearProps: 'transform' }
                );
              } else {
                gsap.fromTo(leftCol,
                  { x: -220, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.35, ease: 'power3.out', clearProps: 'transform' }
                );
                gsap.fromTo(rightCol,
                  { x: 220, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.35, ease: 'power3.out', clearProps: 'transform' }
                );
              }

              if (charInners.length) {
                gsap.to(charInners, {
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  duration: 0.95,
                  stagger: 0.028,
                  ease: 'power4.out',
                  delay: 0.25
                });
              }

              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        hpObserver.observe(section);
      }
    } else {
      // Graceful fallback if GSAP is not present at all
      if (leftCol) { leftCol.style.opacity = '1'; leftCol.style.transform = 'none'; }
      if (rightCol) { rightCol.style.opacity = '1'; rightCol.style.transform = 'none'; }
      if (charInners.length) {
        charInners.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      }
    }

    // 4. Interactive 3D Hover & Tilt with Dynamic Moving Specular Glare (Preserved)
    if (wrapper && imgCard) {
      let isHovered = false;

      wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
        if (glare && typeof gsap !== 'undefined') {
          gsap.to(glare, { opacity: 1, duration: 0.35 });
        }
      });

      wrapper.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;

        const rotateX = -yPercent * 11;
        const rotateY = xPercent * 13;

        if (typeof gsap !== 'undefined') {
          gsap.to(imgCard, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle 380px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28), transparent 75%)`;
        }
      });

      wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
        if (typeof gsap !== 'undefined') {
          gsap.to(imgCard, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (glare && typeof gsap !== 'undefined') {
          gsap.to(glare, { opacity: 0, duration: 0.45 });
        }
      });
    }
  };

  initHardPartsAnimations();

  /* ==========================================================================
     INTERACTIVE CLOUD INTELLIGENCE NETWORK SECTION
     ========================================================================== */
  const initNetworkAnimations = () => {
    const section = document.getElementById('intelligence');
    if (!section) return;

    // 1. Drifting Background Particle Canvas
    const canvas = document.getElementById('networkParticlesCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = section.offsetWidth);
      let height = (canvas.height = section.offsetHeight);

      const resizeCanvas = () => {
        if (!canvas) return;
        width = canvas.width = section.offsetWidth;
        height = canvas.height = section.offsetHeight;
      };
      window.addEventListener('resize', resizeCanvas);

      // Create 45 glowing drifting particles
      const particleCount = 45;
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          alpha: Math.random() * 0.6 + 0.25,
          pulse: Math.random() * 0.02 + 0.008,
          pulseDir: 1
        });
      }

      const renderParticles = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Drift
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle alpha twinkle
          p.alpha += p.pulse * p.pulseDir;
          if (p.alpha > 0.85) {
            p.alpha = 0.85;
            p.pulseDir = -1;
          } else if (p.alpha < 0.2) {
            p.alpha = 0.2;
            p.pulseDir = 1;
          }

          // Draw glowing particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 240, 255, ${p.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.fill();
        }

        requestAnimationFrame(renderParticles);
      };

      renderParticles();
    }

    // 2. Continuous 3D Floating Animation with GSAP
    if (typeof gsap !== 'undefined') {
      // Floating Cards & Nodes subtle bobbing with offset durations and infinite yoyo
      gsap.to('#cardOptStrategies', {
        y: -14,
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      gsap.to('#networkNode1', {
        y: 12,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.25
      });

      gsap.to('#networkNodeCenter', {
        y: -9,
        duration: 3.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });

      gsap.to('#networkNode3', {
        y: 13,
        duration: 3.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.75
      });

      gsap.to('#cardSpendGraph', {
        y: -12,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.35
      });
    }

    // 3. Interactive Mousemove 3D Tilt on the Network Stage
    const stage = document.getElementById('networkStage');
    const visualCol = document.getElementById('networkVisualCol');
    if (stage && visualCol) {
      visualCol.addEventListener('mousemove', (e) => {
        const rect = visualCol.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (typeof gsap !== 'undefined') {
          gsap.to(stage, {
            rotateY: x * 10,
            rotateX: -y * 8,
            duration: 0.5,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }
      });

      visualCol.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(stage, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    }

    // 4. Scroll-Triggered Entry Animation with Native Intersection Observer
    let hasRevealed = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Left graphic cards & nodes pop in
            tl.from(['#cardOptStrategies', '#networkNode1', '#networkNodeCenter', '#networkNode3', '#cardSpendGraph'], {
              scale: 0.88,
              opacity: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: 'back.out(1.3)'
            }, 0.1);

            // Right column elements: stagger-reveal (fade in and slide up from 20px below)
            tl.from('#networkHeading', {
              y: 20,
              opacity: 0,
              duration: 0.75
            }, 0.2);

            tl.from('#networkSubheading', {
              y: 20,
              opacity: 0,
              duration: 0.7
            }, 0.32);

            tl.from('#networkFeaturesList .network-feature-item', {
              y: 20,
              opacity: 0,
              duration: 0.65,
              stagger: 0.14
            }, 0.45);

            tl.from('#networkCtaWrap', {
              y: 20,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: 'back.out(1.4)'
            }, 0.65);
          }

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(section);
  };

  initNetworkAnimations();

  /* ==========================================================================
     CLIENT LOGOS & EXPERT ANSWERS (FAQ) SECTION
     - Bidirectional Slide-In Animation with GSAP & ScrollTrigger
     - Left Column slides in from left (x: -220 -> 0)
     - Right Column slides in from right (x: 220 -> 0)
     - Mobile responsive fallback (y: 50 -> 0, x: 0)
     - Masked character stagger reveal for "Expert Answers"
     - Single-open accordion logic with CSS max-height
     ========================================================================== */
  const initClientsFaqAnimations = () => {
    const section = document.getElementById('faq');
    const faqMainBlock = document.getElementById('faqMainBlock');
    const leftCol = document.getElementById('faqLeftCol');
    const rightCol = document.getElementById('faqRightCol');
    const headingEl = document.getElementById('faqHeading');
    const badge = section ? section.querySelector('.faq-badge-wrapper') : null;
    const accordionItems = section ? section.querySelectorAll('#faqAccordion .faq-item') : [];
    const clientLogosBlock = document.getElementById('clientLogosBlock');
    const clientLogosMarquee = document.getElementById('clientLogosMarquee');

    if (!section) return;

    // 1. Dynamic Text Splitter for "Expert Answers" (Awwwards Masked Stagger Reveal)
    if (headingEl) {
      const rawText = headingEl.textContent.trim();
      headingEl.innerHTML = '';

      const words = rawText.split(/\s+/);
      words.forEach((word) => {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'faq-word-wrap';

        // Split word into characters
        const chars = word.split('');
        chars.forEach((char) => {
          const charMask = document.createElement('span');
          charMask.className = 'faq-char-mask';

          const charInner = document.createElement('span');
          charInner.className = 'faq-char-inner';
          charInner.textContent = char;

          charMask.appendChild(charInner);
          wordWrap.appendChild(charMask);
        });

        headingEl.appendChild(wordWrap);
      });
    }

    const charInners = headingEl ? headingEl.querySelectorAll('.faq-char-inner') : [];

    // 2. Accordion Interactive Logic (Smooth max-height & only one open at a time)
    const faqItems = section.querySelectorAll('.faq-item');
    
    // Set initial height for active item
    const initialActive = section.querySelector('.faq-item.active .faq-answer-panel');
    if (initialActive) {
      initialActive.style.maxHeight = initialActive.scrollHeight + 'px';
    }

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-answer-panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('active');

        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        });

        // If clicked item wasn't open, open it
        if (!isOpen) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });

    // 3. Client Logos Click / Tap Interaction
    const logoItems = section.querySelectorAll('.client-logo-item');
    logoItems.forEach(logo => {
      logo.addEventListener('click', () => {
        logoItems.forEach(l => l.classList.remove('active'));
        logo.classList.add('active');
      });
    });

    // 4. Client Logos Entry Reveal
    if (clientLogosBlock && clientLogosMarquee && typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.from(clientLogosMarquee, {
          scrollTrigger: {
            trigger: clientLogosBlock,
            start: 'top 85%',
            once: true
          },
          y: 25,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out'
        });
      } else {
        const logoObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.from(clientLogosMarquee, {
                y: 25,
                opacity: 0,
                duration: 0.85,
                ease: 'power2.out'
              });
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        logoObserver.observe(clientLogosBlock);
      }
    }

    // 5. Bidirectional Slide-In Animation (GSAP + ScrollTrigger)
    if (faqMainBlock && leftCol && rightCol && typeof gsap !== 'undefined') {
      const isMobile = window.innerWidth <= 900;

      if (typeof ScrollTrigger !== 'undefined') {
        // Initial state via gsap.set
        if (isMobile) {
          gsap.set(leftCol, { x: 0, y: 50, opacity: 0 });
          gsap.set(rightCol, { x: 0, y: 50, opacity: 0 });
        } else {
          gsap.set(leftCol, { x: -220, y: 0, opacity: 0 });
          gsap.set(rightCol, { x: 220, y: 0, opacity: 0 });
        }

        const faqTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: faqMainBlock,
            start: 'top 80%',
            once: true
          }
        });

        if (isMobile) {
          // Mobile: Fade and slide up from the bottom (y: 50)
          faqTimeline.to([rightCol, leftCol], {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'transform'
          });
        } else {
          // Desktop: Simultaneous Bidirectional Slide-In from opposite sides (1.35s)
          faqTimeline.to(leftCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);

          faqTimeline.to(rightCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);
        }

        // Heading Characters Stagger Reveal (Cascades into view during slide-in)
        if (charInners.length) {
          faqTimeline.to(charInners, {
            y: 0,
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.032,
            ease: 'power4.out'
          }, 0.25);
        }

        // Accordion Items Cascade
        if (accordionItems.length) {
          faqTimeline.from(accordionItems, {
            y: 20,
            opacity: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power2.out',
            clearProps: 'opacity,transform'
          }, 0.45);
        }

        // Rotating Typography Badge Entrance
        if (badge) {
          faqTimeline.from(badge, {
            scale: 0.6,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(1.6)',
            clearProps: 'opacity'
          }, 0.55);
        }
      } else {
        // Fallback using Native Intersection Observer if ScrollTrigger is not present
        let hasFaqRevealed = false;
        const faqObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !hasFaqRevealed) {
              hasFaqRevealed = true;
              
              if (isMobile) {
                gsap.fromTo([rightCol, leftCol],
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out', clearProps: 'transform' }
                );
              } else {
                gsap.fromTo(leftCol,
                  { x: -220, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.35, ease: 'power3.out', clearProps: 'transform' }
                );
                gsap.fromTo(rightCol,
                  { x: 220, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.35, ease: 'power3.out', clearProps: 'transform' }
                );
              }

              if (charInners.length) {
                gsap.to(charInners, {
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  duration: 0.95,
                  stagger: 0.03,
                  ease: 'power4.out',
                  delay: 0.25
                });
              }

              if (badge) {
                gsap.from(badge, {
                  scale: 0.6,
                  opacity: 0,
                  duration: 0.7,
                  ease: 'back.out(1.6)',
                  delay: 0.5
                });
              }

              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        faqObserver.observe(faqMainBlock);
      }
    } else {
      // Graceful fallback if GSAP is not present at all: ensure all content is visible
      if (leftCol) { leftCol.style.opacity = '1'; leftCol.style.transform = 'none'; }
      if (rightCol) { rightCol.style.opacity = '1'; rightCol.style.transform = 'none'; }
      if (charInners.length) {
        charInners.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      }
    }
  };

  initClientsFaqAnimations();

  /* ==========================================================================
     INTEGRATIONS CONSTELLATION SECTION ANIMATIONS
     - Lightweight Starry Night Canvas Background
     - GSAP Continuous 3D Floating & Anti-Gravity Motion
     - Interactive 3D Parallax Tilt
     ========================================================================== */
  const initIntegrationsSection = () => {
    const section = document.getElementById('integrations');
    const stage = document.getElementById('integrationsStage');
    const canvas = document.getElementById('integrationsStarsCanvas');
    if (!section) return;

    // 1. Starry Night / Particle Canvas
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let stars = [];

      const resizeCanvas = () => {
        const rect = section.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        initStars(rect.width, rect.height);
      };

      const initStars = (width, height) => {
        stars = [];
        const starCount = Math.floor((width * height) / 9500);
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.3 + 0.4,
            alpha: Math.random() * 0.7 + 0.2,
            twinkleSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
            color: Math.random() > 0.75 ? '#38bdf8' : (Math.random() > 0.85 ? '#818cf8' : '#ffffff')
          });
        }
      };

      const renderStars = () => {
        const rect = section.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          // Twinkle
          s.alpha += s.twinkleSpeed;
          if (s.alpha > 0.95 || s.alpha < 0.15) {
            s.twinkleSpeed = -s.twinkleSpeed;
          }

          // Subtle drift
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = s.color === '#ffffff' 
            ? `rgba(255, 255, 255, ${s.alpha})` 
            : (s.color === '#38bdf8' ? `rgba(56, 189, 248, ${s.alpha})` : `rgba(129, 140, 248, ${s.alpha})`);
          ctx.fill();
        }

        requestAnimationFrame(renderStars);
      };

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      renderStars();
    }

    // 2. GSAP Continuous Floating Animation for Satellites
    const pills = section.querySelectorAll('.integration-pill');
    if (pills.length && typeof gsap !== 'undefined') {
      pills.forEach((pill, idx) => {
        // Continuous organic floating motion with random values
        gsap.to(pill, {
          y: 'random(-15, 15)',
          x: 'random(-10, 10)',
          duration: 'random(3, 5)',
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: idx * 0.22
        });

        // Subtle independent rotational sway
        gsap.to(pill, {
          rotation: 'random(-3, 3)',
          duration: 'random(4, 6)',
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: (idx * 0.25) + 0.3
        });
      });
    }

    // 3. Interactive Subtle 3D Mouse Parallax on Constellation Stage
    if (stage && typeof gsap !== 'undefined' && window.innerWidth > 900) {
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - (rect.width / 2);
        const mouseY = e.clientY - rect.top - (rect.height / 2);

        const rotateX = (-mouseY / (rect.height / 2)) * 6;
        const rotateY = (mouseX / (rect.width / 2)) * 6;

        gsap.to(stage, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.6,
          ease: 'power1.out',
          transformPerspective: 1000
        });
      });

      stage.addEventListener('mouseleave', () => {
        gsap.to(stage, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.9,
          ease: 'power2.out'
        });
      });
    }
  };

  initIntegrationsSection();

  /* ==========================================================================
     FINAL CALL TO ACTION (CTA) SECTION ANIMATION
     ========================================================================== */
  const initCtaAnimations = () => {
    const section = document.getElementById('cta');
    const ctaCard = document.getElementById('ctaCard');
    if (!section || !ctaCard) return;

    let hasRevealed = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Entire rounded container scales up gracefully from 0.95 to 1 and fades in
            tl.fromTo(ctaCard, 
              { scale: 0.95, opacity: 0, y: 35 },
              { scale: 1, opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' }
            );

            // 2. Main Heading: words slide up from masked clip-path
            const wordInners = document.querySelectorAll('#ctaHeading .cta-word-inner');
            if (wordInners.length) {
              tl.from(wordInners, {
                yPercent: 115,
                rotate: 2.5,
                opacity: 0,
                duration: 0.8,
                stagger: 0.07,
                ease: 'power4.out'
              }, '-=0.5');
            }

            // 3. Subheading: smooth fade-in and slide-up right after heading finishes
            const subheading = document.getElementById('ctaSubheading');
            if (subheading) {
              tl.from(subheading, {
                y: 18,
                opacity: 0,
                duration: 0.65,
                ease: 'power2.out'
              }, '-=0.35');
            }

            // 4. CTA Pill Button: smooth scale/fade-in entrance
            const buttonWrap = document.getElementById('ctaButtonWrap');
            if (buttonWrap) {
              tl.from(buttonWrap, {
                y: 20,
                scale: 0.92,
                opacity: 0,
                duration: 0.65,
                ease: 'back.out(1.4)'
              }, '-=0.3');
            }
          }

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(section);
  };

  initCtaAnimations();

  /* ==========================================================================
     STACKLY FOOTER ANIMATIONS
     - Staggered column entry reveal
     - Divider line scaleX expansion
     - Respects prefers-reduced-motion
     ========================================================================== */
  const initFooterAnimations = () => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const dividerLine = document.getElementById('footerDivider');
    const cols = footer.querySelectorAll('.footer-col');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (dividerLine) dividerLine.classList.add('revealed');
      cols.forEach(col => {
        col.style.opacity = '1';
        col.style.transform = 'none';
      });
      return;
    }

    let hasRevealed = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;

          // Reveal divider line from left to right
          if (dividerLine) {
            dividerLine.classList.add('revealed');
          }

          // If GSAP is loaded, animate columns smoothly
          if (typeof gsap !== 'undefined' && cols.length) {
            gsap.fromTo(cols, 
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: 'power3.out',
                clearProps: 'transform,opacity'
              }
            );
          } else {
            cols.forEach(col => {
              col.style.opacity = '1';
              col.style.transform = 'none';
            });
          }

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    observer.observe(footer);
  };

  initFooterAnimations();

  /* ==========================================================================
     404 NAVIGATION & MULTI-PAGE POSITION RESTORATION
     - Captures current page, exact scroll position, section ID, and dashboard tab
     - Encodes return metadata into query params and sessionStorage
     - Restores exact section and scroll position with zero hero flash on return
     ========================================================================== */
  const record404ReturnState = (targetElement) => {
    // 1. Current page
    const pathname = window.location.pathname.replace(/\\/g, '/');
    let currentPage = pathname.substring(pathname.lastIndexOf('/') + 1).split('?')[0].split('#')[0] || 'index.html';
    if (!currentPage || currentPage === '/' || currentPage.endsWith('/')) currentPage = 'index.html';
    sessionStorage.setItem('stackly_last_page', currentPage);
    sessionStorage.setItem('stackly_last_url', window.location.href);

    // 2. Exact scroll position
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    sessionStorage.setItem('stackly_last_scroll', Math.round(scrollPos).toString());

    // 3. Find closest element with semantic section ID
    let sectionId = '';
    let el = targetElement ? targetElement.parentElement : null;
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.id && el.id !== 'themeToggle' && el.id !== 'mobileMenu' && !el.id.includes('theme') && !el.id.toLowerCase().includes('btn') && !el.id.toLowerCase().includes('button')) {
        sectionId = el.id;
        break;
      }
      el = el.parentElement;
    }

    if (!sectionId && targetElement) {
      const parentSection = targetElement.closest('section, main, header, footer');
      if (parentSection && parentSection.id) {
        sectionId = parentSection.id;
      }
    }

    if (sectionId) {
      sessionStorage.setItem('stackly_last_section', sectionId);
    }

    // 4. If in dashboard, record active tab
    const activeTabBtn = document.querySelector('.dash-nav-btn.active');
    let activeTab = '';
    if (activeTabBtn && activeTabBtn.getAttribute('data-tab')) {
      activeTab = activeTabBtn.getAttribute('data-tab');
      sessionStorage.setItem('stackly_last_tab', activeTab);
    }

    return { currentPage, scrollPos: Math.round(scrollPos), sectionId, activeTab };
  };

  // Click capture listener for 404 navigation
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a[href*="404.html"]');
    if (targetLink) {
      const state = record404ReturnState(targetLink);
      try {
        const hrefAttr = targetLink.getAttribute('href') || '404.html';
        const searchParams = new URLSearchParams();
        if (hrefAttr.includes('?')) {
          const rawQuery = hrefAttr.substring(hrefAttr.indexOf('?') + 1);
          const pairs = new URLSearchParams(rawQuery);
          pairs.forEach((val, key) => searchParams.set(key, val));
        }
        searchParams.set('return_page', state.currentPage);
        searchParams.set('return_scroll', state.scrollPos.toString());
        if (state.sectionId) searchParams.set('return_section', state.sectionId);
        if (state.activeTab) searchParams.set('return_tab', state.activeTab);
        targetLink.setAttribute('href', '404.html?' + searchParams.toString());
      } catch (err) {}
    }
  }, true);

  // Form submit capture listener (e.g. newsletter signal form or contact form)
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form && (form.action.includes('404.html') || form.getAttribute('action') === '404.html')) {
      record404ReturnState(form);
    }
  }, true);

  const performInstantRestoration = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restoreScroll = urlParams.get('restore_scroll');
    const isRestoring = (sessionStorage.getItem('stackly_instant_restore') === 'true' || 
                         document.documentElement.classList.contains('instant-restoring') ||
                         restoreScroll !== null) && 
                        (document.referrer.includes('404.html') || restoreScroll !== null);

    // If not in a genuine 404 return flow, strictly guarantee page stays at top and exit
    if (!isRestoring && !restoreScroll) {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      document.documentElement.classList.remove('instant-restoring');
      document.documentElement.style.scrollBehavior = '';
      return;
    }

    const targetScroll = sessionStorage.getItem('stackly_target_scroll');
    const targetSection = sessionStorage.getItem('stackly_target_section');
    const targetTab = sessionStorage.getItem('stackly_target_tab');
    
    const restoreTab = urlParams.get('tab') || targetTab;
    const hash = window.location.hash ? window.location.hash.substring(1) : (targetSection || '');

    // Clean up one-time flags immediately
    sessionStorage.removeItem('stackly_instant_restore');
    sessionStorage.removeItem('stackly_target_scroll');
    sessionStorage.removeItem('stackly_target_section');
    sessionStorage.removeItem('stackly_target_tab');
    sessionStorage.removeItem('stackly_last_scroll');
    sessionStorage.removeItem('stackly_last_section');
    sessionStorage.removeItem('stackly_last_tab');

    // If on userdashboard/admindashboard and a tab is requested, switch to that tab
    if (restoreTab) {
      const tabBtn = document.querySelector(`.dash-nav-btn[data-tab="${restoreTab}"]`);
      if (tabBtn) tabBtn.click();
    }

    const scrollToTarget = () => {
      let applied = false;
      const scrollVal = (restoreScroll !== null && restoreScroll !== '') ? restoreScroll : targetScroll;
      const targetEl = hash ? document.getElementById(hash) : null;

      // Exact pixel restoration is the primary source of truth
      if (scrollVal !== null && scrollVal !== '' && parseInt(scrollVal, 10) >= 0) {
        window.scrollTo({ top: parseInt(scrollVal, 10), behavior: 'auto' });
        applied = true;
      } else if (targetEl) {
        const navHeight = 75;
        const elTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, elTop), behavior: 'auto' });
        applied = true;
      }
      return applied;
    };

    document.documentElement.style.scrollBehavior = 'auto';
    scrollToTarget();

    setTimeout(() => {
      scrollToTarget();
      document.documentElement.classList.remove('instant-restoring');
      document.documentElement.style.scrollBehavior = '';
      if (window.location.search.includes('restore_scroll')) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      }
    }, 50);

    setTimeout(() => {
      scrollToTarget();
    }, 200);

    setTimeout(() => {
      scrollToTarget();
      document.documentElement.classList.remove('instant-restoring');
      document.documentElement.style.scrollBehavior = '';
    }, 450);
  };

  performInstantRestoration();

  /* ==========================================================================
     Global Logo & Home Routing Engine: Pure index.html Page Load (Zero Section Scroll)
     ========================================================================== */
  const initLogoAndHomeRouting = () => {
    // Select all logo brand links and Home navigation links (excluding dashboard brand logos)
    const brandSelectors = [
      '.logo-link',
      '.footer-brand-logo',
      '.auth-brand-link',
      '.auth-logo-link',
      '.dash-site-link',
      'a.nav-link[href="index.html"]',
      'a.mobile-nav-link[href="index.html"]',
      'a.footer-link[href="index.html"]',
      'a[href="index.html"]'
    ];
    
    const brandLinks = document.querySelectorAll(brandSelectors.join(', '));

    brandLinks.forEach(link => {
      // Never intercept dashboard brand links — they must stay on their respective dashboard
      if (link.classList.contains('dash-brand-link')) return;

      const text = link.textContent.trim().toLowerCase();
      const isLogo = link.classList.contains('logo-link') || 
                     link.classList.contains('footer-brand-logo') || 
                     link.classList.contains('auth-brand-link') || 
                     link.classList.contains('auth-logo-link') || 
                     link.classList.contains('dash-site-link') ||
                     link.querySelector('img') !== null;
      const isHomeLink = text === 'home' || text.includes('home') || text.includes('main website');

      if (!isLogo && !isHomeLink) return;

      link.addEventListener('click', (e) => {
        // Clear all restoration data so index.html never restores to any section
        sessionStorage.removeItem('stackly_instant_restore');
        sessionStorage.removeItem('stackly_target_scroll');
        sessionStorage.removeItem('stackly_target_section');
        sessionStorage.removeItem('stackly_target_tab');
        sessionStorage.removeItem('stackly_last_scroll');
        sessionStorage.removeItem('stackly_last_section');
        sessionStorage.removeItem('stackly_last_tab');

        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }

        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || !currentPath.includes('.html');

        e.preventDefault();
        window.scrollTo(0, 0);

        if (isIndexPage) {
          // If already on index.html, force a clean reload so user sees index.html loading from top
          if (window.location.hash) {
            window.location.href = 'index.html';
          } else {
            window.location.reload();
          }
        } else {
          // On any other page, navigate directly to index.html
          window.location.href = 'index.html';
        }
      });
    });

    // Dedicated handler for Dashboard Brand Logos: cleans state and reloads the respective dashboard main page
    const dashBrandLinks = document.querySelectorAll('.dash-brand-link');
    dashBrandLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.removeItem('stackly_instant_restore');
        sessionStorage.removeItem('stackly_target_scroll');
        sessionStorage.removeItem('stackly_target_section');
        sessionStorage.removeItem('stackly_target_tab');
        sessionStorage.removeItem('stackly_last_scroll');
        sessionStorage.removeItem('stackly_last_section');
        sessionStorage.removeItem('stackly_last_tab');

        const currentPath = window.location.pathname;
        const targetPage = link.getAttribute('href') || (currentPath.includes('admin') ? 'admindashboard.html' : 'userdashboard.html');

        if (currentPath.endsWith(targetPage) || (targetPage.includes('userdashboard') && currentPath.includes('userdashboard')) || (targetPage.includes('admindashboard') && currentPath.includes('admindashboard'))) {
          if (window.location.hash || window.location.search) {
            window.location.href = targetPage;
          } else {
            window.location.reload();
          }
        } else {
          window.location.href = targetPage;
        }
      });
    });
  };

  initLogoAndHomeRouting();

  /* ==========================================================================
     Service Page: 3D Background Slider, Running Letter Reveal & Magnetic Nav
     ========================================================================== */
  const initServiceHeroSection = () => {
    const serviceHero = document.getElementById('serviceHero');
    const heroHeading = document.getElementById('serviceHeroHeading');
    const sliderContainer = document.getElementById('serviceBgSlider3D');

    // Only run if service hero exists on current page
    if (!serviceHero && !heroHeading && !sliderContainer) return;

    /* 1. Splitting & GSAP Running Letter / Word Reveal */
    if (heroHeading && typeof gsap !== 'undefined') {
      const phrases = heroHeading.querySelectorAll('.heading-phrase');

      phrases.forEach(phrase => {
        const text = phrase.textContent.trim();
        const words = text.split(/\s+/);
        phrase.innerHTML = '';

        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word-wrap';

          // Split word into characters
          for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const mask = document.createElement('span');
            mask.className = 'char-mask';

            const inner = document.createElement('span');
            inner.className = 'char-inner';
            inner.textContent = char;

            mask.appendChild(inner);
            wordSpan.appendChild(mask);
          }

          phrase.appendChild(wordSpan);

          // Add space between words
          if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            phrase.appendChild(space);
          }
        });
      });

      const chars = heroHeading.querySelectorAll('.char-inner');
      const overline = document.getElementById('serviceOverline');
      const subheading = document.getElementById('serviceSubheading');
      const ctaButtons = document.querySelectorAll('.service-cta-group .btn-glass');
      const badges = document.querySelectorAll('.service-trust-badges .trust-badge-item, .service-trust-badges .trust-badge-separator');

      // Create primary entry animation timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      if (overline) gsap.set(overline, { opacity: 0, y: -20 });
      gsap.set(chars, { yPercent: 120, opacity: 0, rotateX: -65, transformPerspective: 600 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      if (ctaButtons.length) gsap.set(ctaButtons, { opacity: 0, y: 25, scale: 0.95 });
      if (badges.length) gsap.set(badges, { opacity: 0, y: 20 });

      // Animate In Sequence
      if (overline) {
        heroTl.to(overline, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
      }

      heroTl.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.022,
        ease: 'power4.out'
      }, 0.25);

      if (subheading) {
        heroTl.to(subheading, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
      }

      if (ctaButtons.length) {
        heroTl.to(ctaButtons, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.14,
          ease: 'back.out(1.4)'
        }, '-=0.45');
      }

      if (badges.length) {
        heroTl.to(badges, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        }, '-=0.35');
      }
    }

    /* 2. Automated 3D Background Slider Engine (Upgraded Cinematic Animation) */
    if (sliderContainer && typeof gsap !== 'undefined') {
      const slides = sliderContainer.querySelectorAll('.slide-item');
      const indicators = document.querySelectorAll('#sliderIndicators .indicator-bar');
      let currentIndex = 0;
      let sliderInterval = null;
      let isTransitioning = false;
      let activeDriftTween = null;

      // Continuous subtle Ken-Burns slow zoom & drift for active image
      const startKenBurnsDrift = (slide) => {
        if (activeDriftTween) activeDriftTween.kill();
        const img = slide.querySelector('.slide-image');
        if (!img) return;

        gsap.set(img, { scale: 1.0, x: 0, y: 0 });
        activeDriftTween = gsap.to(img, {
          scale: 1.09,
          x: 14,
          y: -8,
          duration: 5.6,
          ease: 'sine.out'
        });
      };

      // Set initial 3D transforms (Crisp & clear, no blur)
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          slide.classList.add('active');
          gsap.set(slide, { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0 });
          startKenBurnsDrift(slide);
        } else {
          slide.classList.remove('active');
          gsap.set(slide, { opacity: 0, scale: 1.04, rotateY: 4, rotateX: -2, z: -50 });
        }
      });

      const updateIndicators = (nextIndex) => {
        indicators.forEach((bar, idx) => {
          const fill = bar.querySelector('.progress-fill');
          if (idx === nextIndex) {
            bar.classList.add('active');
            if (fill) {
              gsap.killTweensOf(fill);
              gsap.fromTo(fill, { width: '0%' }, { width: '100%', duration: 5, ease: 'none' });
            }
          } else {
            bar.classList.remove('active');
            if (fill) {
              gsap.killTweensOf(fill);
              gsap.set(fill, { width: '0%' });
            }
          }
        });
      };

      const goToSlide = (nextIndex) => {
        if (isTransitioning || nextIndex === currentIndex || nextIndex >= slides.length) return;
        isTransitioning = true;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[nextIndex];

        if (activeDriftTween) activeDriftTween.kill();

        // 3D slide transition timeline (Crisp focus & fluid cross-dissolve)
        const slideTl = gsap.timeline({
          onComplete: () => {
            currentSlide.classList.remove('active');
            nextSlide.classList.add('active');
            currentIndex = nextIndex;
            isTransitioning = false;
            startKenBurnsDrift(nextSlide);
          }
        });

        // Outgoing slide scales up slightly, tilts gently, and fades out cleanly
        slideTl.to(currentSlide, {
          duration: 1.4,
          opacity: 0,
          scale: 1.10,
          rotateY: -5,
          rotateX: 2,
          z: 40,
          ease: 'power2.inOut'
        }, 0);

        // Incoming slide enters with pristine focus, smooth counter-tilt, and fades in
        slideTl.fromTo(nextSlide, 
          { opacity: 0, scale: 1.05, rotateY: 5, rotateX: -2, z: -50 },
          { duration: 1.4, opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, ease: 'power2.out' },
          0
        );

        updateIndicators(nextIndex);
      };

      const startAutoSlide = () => {
        stopAutoSlide();
        updateIndicators(currentIndex);
        sliderInterval = setInterval(() => {
          const next = (currentIndex + 1) % slides.length;
          goToSlide(next);
        }, 5000);
      };

      const stopAutoSlide = () => {
        if (sliderInterval) {
          clearInterval(sliderInterval);
          sliderInterval = null;
        }
        if (activeDriftTween) activeDriftTween.pause();
      };

      // Clickable indicators
      indicators.forEach((bar, idx) => {
        bar.addEventListener('click', () => {
          if (idx !== currentIndex && !isTransitioning) {
            goToSlide(idx);
            startAutoSlide();
          }
        });
      });

      // Start automated slider
      startAutoSlide();

      // Interactive 3D Parallax Tilt with Depth Offset on Cursor Move
      if (serviceHero) {
        serviceHero.addEventListener('mousemove', (e) => {
          const rect = serviceHero.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(sliderContainer, {
            rotateY: normX * 6,
            rotateX: -normY * 5,
            x: -normX * 12,
            y: -normY * 8,
            transformPerspective: 1200,
            duration: 0.8,
            ease: 'power2.out'
          });
        });

        serviceHero.addEventListener('mouseleave', () => {
          gsap.to(sliderContainer, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'power2.out'
          });
        });
      }

      /* 3. Native Intersection Observer API (Pause slider off-screen) */
      if ('IntersectionObserver' in window && serviceHero) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!sliderInterval) {
                startAutoSlide();
                if (activeDriftTween) activeDriftTween.resume();
              }
            } else {
              stopAutoSlide();
            }
          });
        }, { threshold: 0.15 });

        heroObserver.observe(serviceHero);
      }
    }

    /* 4. Sleek Magnetic Hover Effect for Navigation Items */
    const magneticNavItems = document.querySelectorAll('.magnetic-nav-item');
    if (typeof gsap !== 'undefined') {
      magneticNavItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          gsap.to(item, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }
  };

  // Initialize Service Hero
  initServiceHeroSection();

  /* ==========================================================================
     Enterprise Cloud Disciplines (Capabilities 3x2 Grid Interactive Engine)
     ========================================================================== */
  const initDisciplinesSection = () => {
    const section = document.getElementById('disciplines');
    if (!section) return;

    const heading = document.getElementById('disciplinesHeading');
    const badge = document.getElementById('disciplinesBadge');
    const subheading = document.getElementById('disciplinesSubheading');
    const cards = section.querySelectorAll('.discipline-card');

    // 1. Text Word Splitting for Masked Slide-Up Reveal
    if (heading) {
      const words = heading.querySelectorAll('.disc-word-wrap');
      words.forEach(wrap => {
        const text = wrap.textContent.trim();
        wrap.innerHTML = `<span class="disc-word-inner">${text}</span>`;
      });
    }

    const wordInners = heading ? heading.querySelectorAll('.disc-word-inner') : [];

    // Set initial hidden states
    if (badge) gsap.set(badge, { opacity: 0, y: -20 });
    if (wordInners.length) gsap.set(wordInners, { yPercent: 125, rotateX: -45, opacity: 0, transformPerspective: 700 });
    if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 45, scale: 0.95 });

    let animated = false;
    const triggerSectionReveal = () => {
      if (animated) return;
      animated = true;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badge) {
        tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0);
      }

      if (wordInners.length) {
        tl.to(wordInners, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out'
        }, 0.15);
      }

      if (subheading) {
        tl.to(subheading, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
      }

      if (cards.length) {
        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power2.out'
        }, 0.5);
      }
    };

    // Scroll trigger via Intersection Observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSectionReveal();
            observer.unobserve(section);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(section);
    } else {
      triggerSectionReveal();
    }

    // 2. Interactive 3D Card Hover (Dynamic Tilt & Cursor Glare)
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Position radial glare
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);

        // Fluid 3D tilt with GSAP
        gsap.to(card, {
          rotateY: normX * 14,
          rotateX: -normY * 12,
          y: -8,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    });
  };

  // Initialize Capabilities Section
  initDisciplinesSection();

  /* ==========================================================================
     Step-by-Step Delivery (Alternating Timeline Interactive Engine)
     ========================================================================== */
  const initDeliveryTimelineSection = () => {
    const section = document.getElementById('delivery');
    if (!section) return;

    const heading = document.getElementById('deliveryHeading');
    const badge = document.getElementById('deliveryBadge');
    const subheading = document.getElementById('deliverySubheading');
    const rows = section.querySelectorAll('.delivery-row');
    const imageBoxes = section.querySelectorAll('.delivery-image-box');

    // 1. Text Word Splitting for Header Masked Reveal
    if (heading) {
      const words = heading.querySelectorAll('.delivery-word-wrap');
      words.forEach(wrap => {
        const text = wrap.textContent.trim();
        wrap.innerHTML = `<span class="delivery-word-inner">${text}</span>`;
      });
    }

    const wordInners = heading ? heading.querySelectorAll('.delivery-word-inner') : [];

    // Initial hidden state for header
    if (badge) gsap.set(badge, { opacity: 0, y: -20 });
    if (wordInners.length) gsap.set(wordInners, { yPercent: 125, rotateX: -45, opacity: 0, transformPerspective: 700 });
    if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });

    // Header reveal trigger via Intersection Observer
    let headerAnimated = false;
    const triggerHeaderReveal = () => {
      if (headerAnimated) return;
      headerAnimated = true;

      const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badge) {
        headerTl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0);
      }

      if (wordInners.length) {
        headerTl.to(wordInners, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out'
        }, 0.15);
      }

      if (subheading) {
        headerTl.to(subheading, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
      }
    };

    if ('IntersectionObserver' in window) {
      const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerHeaderReveal();
            headerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      const headerElem = section.querySelector('.delivery-header');
      if (headerElem) headerObserver.observe(headerElem);
    } else {
      triggerHeaderReveal();
    }

    // 2. Alternating Row Entry Animations
    // Left side: x: -100, opacity: 0 -> x: 0, opacity: 1
    // Right side: x: 100, opacity: 0 -> x: 0, opacity: 1
    rows.forEach(row => {
      const children = row.querySelectorAll('.delivery-col');
      if (children.length !== 2) return;

      const leftCol = children[0];
      const rightCol = children[1];

      // Set initial off-screen positions
      gsap.set(leftCol, { x: -100, opacity: 0 });
      gsap.set(rightCol, { x: 100, opacity: 0 });

      if ('IntersectionObserver' in window) {
        const rowObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });
              tl.to(leftCol, { x: 0, opacity: 1 }, 0);
              tl.to(rightCol, { x: 0, opacity: 1 }, 0.12);
              rowObserver.unobserve(row);
            }
          });
        }, { threshold: 0.18 });

        rowObserver.observe(row);
      } else {
        gsap.to(leftCol, { x: 0, opacity: 1, duration: 1 });
        gsap.to(rightCol, { x: 0, opacity: 1, duration: 1 });
      }
    });

    // 3. Interactive 3D Image Hover (Tilt & Glare Effect)
    imageBoxes.forEach(box => {
      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Radial glare follow
        box.style.setProperty('--dglare-x', `${(x / rect.width) * 100}%`);
        box.style.setProperty('--dglare-y', `${(y / rect.height) * 100}%`);

        // 3D Tilt with GSAP
        gsap.to(box, {
          rotateY: normX * 12,
          rotateX: -normY * 10,
          y: -6,
          transformPerspective: 950,
          duration: 0.35,
          ease: 'power1.out'
        });
      });

      box.addEventListener('mouseleave', () => {
        gsap.to(box, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    });
  };

  // Initialize Delivery Timeline Section
  initDeliveryTimelineSection();

  /* ==========================================================================
     THE INTELLIGENCE LAYER FEATURE SECTION ANIMATIONS
     (Bidirectional Slide-In + Masked Reveal + 3D Tilt + Fluid Breathing)
     ========================================================================== */
  const initIntelligenceLayerSection = () => {
    const section = document.getElementById('intel-layer');
    if (!section) return;

    const leftCol = document.getElementById('intelColText');
    const rightCol = document.getElementById('intelColVisual');
    const visualCard = document.getElementById('intelVisualCard');
    const mainImg = document.getElementById('intelMainImg');
    const heading = document.getElementById('intelHeading');
    const badge = document.getElementById('intelBadge');
    const subheading = document.getElementById('intelSubheading');
    const featureList = document.getElementById('intelFeatureList');
    const featureItems = featureList ? featureList.querySelectorAll('.intel-feature-item') : [];
    const ctaBtn = section.querySelector('.intel-actions');

    // 1. Text Word Splitting for Heading Masked Reveal
    if (heading) {
      const words = heading.querySelectorAll('.intel-word-wrap');
      words.forEach(wrap => {
        const text = wrap.textContent.trim();
        wrap.innerHTML = `<span class="intel-word-inner">${text}</span>`;
      });
    }

    const wordInners = heading ? heading.querySelectorAll('.intel-word-inner') : [];

    // Continuous Fluid Breathing Animation on Image
    if (mainImg && typeof gsap !== 'undefined') {
      gsap.to(mainImg, {
        scale: 1.038,
        y: -8,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // 2. Interactive 3D Image Hover (Tilt & Specular Glare)
    if (visualCard) {
      visualCard.addEventListener('mousemove', (e) => {
        const rect = visualCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        visualCard.style.setProperty('--iglare-x', `${(x / rect.width) * 100}%`);
        visualCard.style.setProperty('--iglare-y', `${(y / rect.height) * 100}%`);

        if (typeof gsap !== 'undefined') {
          gsap.to(visualCard, {
            rotateY: normX * 13,
            rotateX: -normY * 11,
            y: -5,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      visualCard.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(visualCard, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out'
          });
        }
      });
    }

    // 3. Trigger Function for Coordinated Entrance
    const isMobile = window.innerWidth <= 992;

    if (typeof gsap !== 'undefined') {
      // Initial state
      if (isMobile) {
        if (leftCol) gsap.set(leftCol, { y: 50, x: 0, opacity: 0 });
        if (rightCol) gsap.set(rightCol, { y: 50, x: 0, opacity: 0 });
      } else {
        if (leftCol) gsap.set(leftCol, { x: -220, opacity: 0 });
        if (rightCol) gsap.set(rightCol, { x: 220, opacity: 0 });
      }

      if (badge) gsap.set(badge, { opacity: 0, y: -20 });
      if (wordInners.length) gsap.set(wordInners, { yPercent: 125, rotateX: -40, opacity: 0, transformPerspective: 700 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 20 });
      if (ctaBtn) gsap.set(ctaBtn, { opacity: 0, y: 20 });

      let sectionAnimated = false;
      const playSectionEntrance = () => {
        if (sectionAnimated) return;
        sectionAnimated = true;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (isMobile) {
          tl.to([leftCol, rightCol], {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            clearProps: 'transform'
          }, 0);
        } else {
          // Bidirectional slide-in simultaneously
          tl.to(leftCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);

          tl.to(rightCol, {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0);
        }

        // Header and text staggered masked reveals
        if (badge) {
          tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
        }

        if (wordInners.length) {
          tl.to(wordInners, {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power4.out'
          }, 0.3);
        }

        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
        }

        if (ctaBtn) {
          tl.to(ctaBtn, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
        }
      };

      // Use ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => playSectionEntrance()
        });
      } else if ('IntersectionObserver' in window) {
        // Native fallback
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              playSectionEntrance();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.18 });

        observer.observe(section);
      } else {
        playSectionEntrance();
      }

      // 4. Secondary Element Reveals for Feature List using native IntersectionObserver
      if (featureList && featureItems.length) {
        if ('IntersectionObserver' in window) {
          const featObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                gsap.to(featureItems, {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  stagger: 0.15,
                  ease: 'power3.out',
                  delay: 0.35,
                  clearProps: 'transform'
                });
                featObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.2 });

          featObserver.observe(featureList);
        } else {
          gsap.to(featureItems, { y: 0, opacity: 1, stagger: 0.1 });
        }
      }
    } else {
      // Graceful fallback if GSAP is unavailable
      if (leftCol) leftCol.style.opacity = '1';
      if (rightCol) rightCol.style.opacity = '1';
      if (wordInners.length) wordInners.forEach(w => w.style.opacity = '1');
      if (featureItems.length) featureItems.forEach(fi => fi.style.opacity = '1');
    }
  };

  // Initialize Intelligence Layer Section
  initIntelligenceLayerSection();

  /* ==========================================================================
     WHAT OUR CLIENTS SAY (ENDORSEMENTS) SECTION ANIMATIONS
     (Masked Reveal + 3D Card Hover & Glare + Left-to-Right Single Line Motion)
     ========================================================================== */
  const initEndorsementsSection = () => {
    const section = document.getElementById('endorsements');
    if (!section) return;

    const heading = document.getElementById('endorsementsHeading');
    const badge = document.getElementById('endorsementsBadge');
    const viewport = document.getElementById('endorsementsViewport');
    const cards = section.querySelectorAll('.endorsements-card');

    // 1. Text Word Splitting for Header Masked Reveal
    if (heading) {
      const words = heading.querySelectorAll('.end-word-wrap');
      words.forEach(wrap => {
        const text = wrap.textContent.trim();
        wrap.innerHTML = `<span class="end-word-inner">${text}</span>`;
      });
    }

    const wordInners = heading ? heading.querySelectorAll('.end-word-inner') : [];

    // 2. Initial States & Reveal on Scroll via Intersection Observer
    if (typeof gsap !== 'undefined') {
      if (badge) gsap.set(badge, { opacity: 0, y: -20 });
      if (wordInners.length) gsap.set(wordInners, { yPercent: 125, rotateX: -40, opacity: 0, transformPerspective: 700 });
      if (viewport) gsap.set(viewport, { opacity: 0, y: 35 });

      let sectionRevealed = false;
      const revealEndorsements = () => {
        if (sectionRevealed) return;
        sectionRevealed = true;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (badge) {
          tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0);
        }

        if (wordInners.length) {
          tl.to(wordInners, {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out'
          }, 0.15);
        }

        if (viewport) {
          tl.to(viewport, { opacity: 1, y: 0, duration: 1 }, 0.35);
        }
      };

      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealEndorsements();
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        obs.observe(section);
      } else {
        revealEndorsements();
      }

      // 3. Interactive 3D Hover Tilt & Specular Glare on Cards
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;

          // Set glare coordinates
          card.style.setProperty('--cglare-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--cglare-y', `${(y / rect.height) * 100}%`);

          gsap.to(card, {
            rotateY: normX * 12,
            rotateX: -normY * 10,
            y: -8,
            transformPerspective: 950,
            duration: 0.3,
            ease: 'power1.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.65,
            ease: 'power2.out'
          });
        });
      });
    } else {
      // Fallback if GSAP is unavailable
      if (badge) badge.style.opacity = '1';
      if (viewport) viewport.style.opacity = '1';
      if (wordInners.length) wordInners.forEach(w => w.style.opacity = '1');
    }
  };

  // Initialize Endorsements Section
  initEndorsementsSection();

  /* ==========================================================================
     PROVEN PERFORMANCE IN PRODUCTION (SUCCESS STORY) ANIMATIONS
     (Left/Right Slide-In + Heading Reveal + 3D Hover & Glare)
     ========================================================================== */
  const initProvenPerformanceSection = () => {
    const section = document.getElementById('proven-performance');
    if (!section) return;

    const heading = document.getElementById('provenHeading');
    const badge = document.getElementById('provenBadge');
    const card = document.getElementById('provenCard');
    const colImage = document.getElementById('provenColImage');
    const colContent = document.getElementById('provenColContent');
    const statCards = section.querySelectorAll('.proven-stat-card');

    // 1. Text Word Splitting for Header Masked Reveal
    if (heading) {
      const words = heading.querySelectorAll('.prov-word-wrap');
      words.forEach(wrap => {
        const text = wrap.textContent.trim();
        wrap.innerHTML = `<span class="prov-word-inner">${text}</span>`;
      });
    }

    const wordInners = heading ? heading.querySelectorAll('.prov-word-inner') : [];

    // 2. Initial Off-screen States (Bidirectional Entry)
    const isMobile = window.innerWidth <= 992;

    if (typeof gsap !== 'undefined') {
      if (badge) gsap.set(badge, { opacity: 0, y: -20 });
      if (wordInners.length) gsap.set(wordInners, { yPercent: 125, rotateX: -40, opacity: 0, transformPerspective: 700 });

      if (isMobile) {
        if (colImage) gsap.set(colImage, { y: 40, x: 0, opacity: 0 });
        if (colContent) gsap.set(colContent, { y: 40, x: 0, opacity: 0 });
      } else {
        // Left & Right sliding in
        if (colImage) gsap.set(colImage, { x: -120, opacity: 0 });
        if (colContent) gsap.set(colContent, { x: 120, opacity: 0 });
      }

      if (statCards.length) gsap.set(statCards, { y: 25, opacity: 0 });

      let sectionRevealed = false;
      const revealProvenPerformance = () => {
        if (sectionRevealed) return;
        sectionRevealed = true;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header reveal
        if (badge) {
          tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0);
        }

        if (wordInners.length) {
          tl.to(wordInners, {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out'
          }, 0.15);
        }

        // Bidirectional card halves reveal
        if (isMobile) {
          tl.to([colImage, colContent], {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            clearProps: 'transform'
          }, 0.3);
        } else {
          tl.to(colImage, {
            x: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0.25);

          tl.to(colContent, {
            x: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0.35);
        }

        // Stat cards reveal
        if (statCards.length) {
          tl.to(statCards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform'
          }, 0.6);
        }
      };

      // Scroll Trigger via Intersection Observer
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealProvenPerformance();
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        obs.observe(section);
      } else {
        revealProvenPerformance();
      }

      // 3. Interactive 3D Perspective Tilt on Card
      if (card) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;

          card.style.setProperty('--pglare-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--pglare-y', `${(y / rect.height) * 100}%`);

          gsap.to(card, {
            rotateY: normX * 8,
            rotateX: -normY * 7,
            y: -5,
            transformPerspective: 1100,
            duration: 0.35,
            ease: 'power1.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          });
        });
      }
    } else {
      // Fallback if GSAP is unavailable
      if (badge) badge.style.opacity = '1';
      if (colImage) colImage.style.opacity = '1';
      if (colContent) colContent.style.opacity = '1';
      if (wordInners.length) wordInners.forEach(w => w.style.opacity = '1');
      if (statCards.length) statCards.forEach(sc => sc.style.opacity = '1');
    }
  };

  // Initialize Proven Performance Section
  initProvenPerformanceSection();

  // ==========================================================================
  // BENTO GRID SECTION: Interactive Spotlight, 3D Tilt & Scroll Reveals
  // ==========================================================================
  const initBentoGridSection = () => {
    const section = document.getElementById('cloud-mesh-bento');
    if (!section) return;

    const badge = document.getElementById('bentoBadge');
    const words = section.querySelectorAll('.bento-word-wrap');
    const subheading = document.getElementById('bentoSubheading');
    const cards = section.querySelectorAll('.bento-card');

    // 1. Hover Spotlight & 3D Tilt for Bento Cards
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spot-x', `${x}px`);
        card.style.setProperty('--spot-y', `${y}px`);

        if (typeof gsap !== 'undefined') {
          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 6,
            rotateX: -normY * 5,
            y: -4,
            transformPerspective: 1200,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          });
        }
      });
    });

    // 2. Scroll-Triggered Entrance Reveal
    if (typeof gsap !== 'undefined') {
      gsap.set(badge, { opacity: 0, y: -20, scale: 0.95 });
      gsap.set(words, { opacity: 0, y: 35 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      gsap.set(cards, { opacity: 0, y: 45 });

      const revealBento = () => {
        const tl = gsap.timeline();
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' })
          .to(words, { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' }, '-=0.35');
        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        }
        tl.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,visibility'
        }, '-=0.45');
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealBento();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        revealBento();
      }
    } else {
      if (badge) badge.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (subheading) subheading.style.opacity = '1';
      cards.forEach(c => c.style.opacity = '1');
    }
  };

  // ==========================================================================
  // MIGRATION PATHWAYS SECTION: Tab Switcher, 3D Flip Cards & Scroll Reveal
  // ==========================================================================
  const initMigrationPathwaysSection = () => {
    const section = document.getElementById('migration-pathways');
    if (!section) return;

    const badge = document.getElementById('pathwaysBadge');
    const words = section.querySelectorAll('.path-word-wrap');
    const subheading = document.getElementById('pathwaysSubheading');
    const tabs = section.querySelectorAll('.pathway-tab');
    const cards = section.querySelectorAll('.pathway-flip-card');
    const flipBtns = section.querySelectorAll('.flip-toggle-btn');

    // 1. Tab Switching Functionality
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetIdx = tab.getAttribute('data-target');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Update cards
        cards.forEach(c => {
          c.classList.remove('active');
          c.classList.remove('flipped'); // Reset flip state when switching tabs
        });

        const activeCard = section.querySelector(`.pathway-flip-card[data-index="${targetIdx}"]`);
        if (activeCard) {
          activeCard.classList.add('active');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(activeCard, 
              { opacity: 0, scale: 0.96, y: 15 },
              { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'transform,scale' }
            );
          }
        }
      });
    });

    // 2. 3D Flip Card Toggle Mechanism
    flipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.tagName.toLowerCase() === 'a' && btn.getAttribute('href')) {
          return; // Allow standard navigation to 404.html
        }
        e.stopPropagation();
        const flipCard = btn.closest('.pathway-flip-card');
        if (flipCard) {
          flipCard.classList.toggle('flipped');
        }
      });
    });

    // 3. Scroll Reveal Entrance
    if (typeof gsap !== 'undefined') {
      gsap.set(badge, { opacity: 0, y: -20, scale: 0.95 });
      gsap.set(words, { opacity: 0, y: 35 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      gsap.set(tabs, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      const revealPathways = () => {
        const tl = gsap.timeline();
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' })
          .to(words, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, '-=0.35');
        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        }
        tl.to(tabs, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.35')
          .to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'opacity,visibility'
          }, '-=0.3');
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealPathways();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        revealPathways();
      }
    } else {
      if (badge) badge.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (subheading) subheading.style.opacity = '1';
      tabs.forEach(t => t.style.opacity = '1');
      cards.forEach(c => c.style.opacity = '1');
    }
  };

  // ==========================================================================
  // FAQ & ADVISORY SECTION: Accordion Expansion & 3D Visual Pod Tilt
  // ==========================================================================
  const initFaqAdvisorySection = () => {
    const section = document.getElementById('cloud-faq-advisory');
    if (!section) return;

    const badge = document.getElementById('faqBadge');
    const words = section.querySelectorAll('.faq-word-wrap');
    const subheading = document.getElementById('faqSubheading');
    const visualCard = document.getElementById('faqVisualCard');
    const accordionItems = section.querySelectorAll('.faq-accordion-item');

    // 1. Accordion Toggle Behavior
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.faq-accordion-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');

        // Close other accordion items for clean single-expand accordion experience
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-accordion-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item
        if (isCurrentlyActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 2. Visual Pod 3D Tilt on Hover
    if (visualCard) {
      visualCard.addEventListener('mousemove', (e) => {
        const rect = visualCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        if (typeof gsap !== 'undefined') {
          gsap.to(visualCard, {
            rotateY: normX * 8,
            rotateX: -normY * 7,
            y: -5,
            transformPerspective: 1100,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      visualCard.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(visualCard, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          });
        }
      });
    }

    // 3. Scroll Reveal
    if (typeof gsap !== 'undefined') {
      gsap.set(badge, { opacity: 0, y: -20, scale: 0.95 });
      gsap.set(words, { opacity: 0, y: 35 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      if (visualCard) gsap.set(visualCard, { opacity: 0, x: -40 });
      gsap.set(accordionItems, { opacity: 0, y: 30 });

      const revealFaq = () => {
        const tl = gsap.timeline();
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' })
          .to(words, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, '-=0.35');
        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        }
        if (visualCard) {
          tl.to(visualCard, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform' }, '-=0.35');
        }
        tl.to(accordionItems, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform'
        }, '-=0.5');
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealFaq();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        revealFaq();
      }
    } else {
      if (badge) badge.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (subheading) subheading.style.opacity = '1';
      if (visualCard) visualCard.style.opacity = '1';
      accordionItems.forEach(item => item.style.opacity = '1');
    }
  };

  // Initialize the 3 New Sections
  initBentoGridSection();
  initMigrationPathwaysSection();
  initFaqAdvisorySection();

  // ==========================================================================
  // ABOUT HERO SECTION: Bidirectional "Meet in the Middle" & 3D Spatial Tilt
  // ==========================================================================
  const initAboutHeroSection = () => {
    const section = document.getElementById('aboutHero');
    if (!section) return;

    const leftCol = document.getElementById('aboutHeroLeft');
    const rightCol = document.getElementById('aboutHeroRight');
    const imageCard = document.getElementById('aboutImageCard');
    const overline = document.getElementById('aboutOverline');
    const words = section.querySelectorAll('.about-word');
    const subheading = document.getElementById('aboutSubheading');
    const btnGroup = document.getElementById('aboutBtnGroup');
    const trustBadges = document.getElementById('aboutTrustBadges');

    // 1. Bidirectional "Meet in the Middle" GSAP Entrance Animation
    if (typeof gsap !== 'undefined') {
      // Set initial off-screen states
      gsap.set(leftCol, { x: -150, opacity: 0 });
      gsap.set(rightCol, { x: 150, opacity: 0, scale: 1.1 });
      gsap.set(words, { yPercent: 120, opacity: 0 });
      if (overline) gsap.set(overline, { opacity: 0, y: -20 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      if (btnGroup) gsap.set(btnGroup, { opacity: 0, y: 25 });
      if (trustBadges) gsap.set(trustBadges, { opacity: 0, y: 20 });

      // Run simultaneous entrance on window load / instant trigger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left and Right simultaneously slide to center over 1.5s
      tl.to(leftCol, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        clearProps: 'transform'
      }, 0)
      .to(rightCol, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        clearProps: 'transform,scale'
      }, 0)
      // Staggered word-by-word reveal sliding up from clip mask
      .to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        clearProps: 'transform'
      }, 0.25)
      // Supporting elements reveal
      .to(overline, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'back.out(1.7)'
      }, 0.3)
      .to(subheading, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, 0.45)
      .to(btnGroup, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, 0.6)
      .to(trustBadges, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.75);

    } else {
      // Fallback if GSAP is not loaded
      if (leftCol) leftCol.style.opacity = '1';
      if (rightCol) rightCol.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (overline) overline.style.opacity = '1';
      if (subheading) subheading.style.opacity = '1';
      if (btnGroup) btnGroup.style.opacity = '1';
      if (trustBadges) trustBadges.style.opacity = '1';
    }

    // 2. Continuous 3D Perspective Tilt on Right Column Image Card
    if (imageCard && rightCol) {
      rightCol.addEventListener('mousemove', (e) => {
        const rect = rightCol.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        imageCard.style.setProperty('--aglare-x', `${(x / rect.width) * 100}%`);
        imageCard.style.setProperty('--aglare-y', `${(y / rect.height) * 100}%`);

        if (typeof gsap !== 'undefined') {
          gsap.to(imageCard, {
            rotateY: normX * 14,
            rotateX: -normY * 12,
            y: -8,
            transformPerspective: 1100,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      rightCol.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(imageCard, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  // Initialize About Hero Section
  initAboutHeroSection();

  // ==========================================================================
  // ABOUT PURPOSE & CORE SIGNAL SECTION ("Why We Exist")
  // ==========================================================================
  const initAboutPurposeSection = () => {
    const section = document.getElementById('aboutPurpose');
    if (!section) return;

    const leftCard = document.getElementById('purposeCardLeft');
    const rightCard = document.getElementById('purposeCardRight');
    const bgImg = document.getElementById('purposeBgImg');
    const words = section.querySelectorAll('.pword');
    const metricVal = document.getElementById('purposeMetricVal');

    // 1. Scroll-Triggered Entrance Reveal (Bidirectional Slide-In)
    if (typeof gsap !== 'undefined') {
      gsap.set(leftCard, { x: -140, opacity: 0 });
      gsap.set(rightCard, { x: 140, opacity: 0 });
      if (bgImg) gsap.set(bgImg, { scale: 1.12 });
      gsap.set(words, { yPercent: 120, opacity: 0 });

      const revealPurpose = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Background image settle
        if (bgImg) {
          tl.to(bgImg, {
            scale: 1.02,
            duration: 1.8,
            ease: 'power2.out'
          }, 0);
        }

        // Left card slides in from left
        tl.to(leftCard, {
          x: 0,
          opacity: 1,
          duration: 1.25,
          clearProps: 'transform'
        }, 0.1);

        // Right card slides in from right
        tl.to(rightCard, {
          x: 0,
          opacity: 1,
          duration: 1.25,
          clearProps: 'transform'
        }, 0.25);

        // Heading word reveal
        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.045,
          ease: 'power4.out',
          clearProps: 'transform'
        }, 0.4);

        // Metric Counter Animation (00.00% -> 99.99%)
        if (metricVal) {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: 99.99,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              metricVal.textContent = counterObj.val.toFixed(2) + '%';
            }
          });
        }
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealPurpose();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        observer.observe(section);
      } else {
        revealPurpose();
      }
    } else {
      if (leftCard) leftCard.style.opacity = '1';
      if (rightCard) rightCard.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
    }

    // 2. Interactive 3D Perspective Tilt on Hover for Both Cards
    const cards = [leftCard, rightCard].filter(Boolean);
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        card.style.setProperty('--cglare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--cglare-y', `${(y / rect.height) * 100}%`);

        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: normX * 12,
            rotateX: -normY * 10,
            y: -6,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out'
          });
        }
      });
    });
  };

  // Initialize About Purpose Section
  initAboutPurposeSection();

  // ==========================================================================
  // ABOUT IMPACT SECTION: "Proven Reliability in Numbers"
  // ==========================================================================
  const initAboutImpactSection = () => {
    const section = document.getElementById('aboutImpact');
    if (!section) return;

    const badge = document.getElementById('impactBadge');
    const words = section.querySelectorAll('.iword');
    const subheading = document.getElementById('impactSubheading');
    const cards = section.querySelectorAll('.impact-card');
    const fills = section.querySelectorAll('.telemetry-fill');

    // 1. Hover Spotlight & 3D Tilt for Impact Cards
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        card.style.setProperty('--ispot-x', `${x}px`);
        card.style.setProperty('--ispot-y', `${y}px`);
        card.style.setProperty('--iglare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--iglare-y', `${(y / rect.height) * 100}%`);

        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: normX * 10,
            rotateX: -normY * 9,
            y: -6,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out'
          });
        }
      });
    });

    // 2. Scroll-Triggered Entrance Reveal & Stat Counter Animations
    if (typeof gsap !== 'undefined') {
      gsap.set(badge, { opacity: 0, y: -20, scale: 0.9 });
      gsap.set(words, { yPercent: 120, opacity: 0 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      gsap.set(cards, { opacity: 0, y: 55, scale: 0.95 });

      const revealImpact = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' })
          .to(words, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'power4.out', clearProps: 'transform' }, '-=0.35');
        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        }
        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,visibility'
        }, '-=0.4');

        // Telemetry Bars Expansion
        fills.forEach(fill => {
          const targetW = fill.getAttribute('data-width') || '75%';
          fill.style.width = targetW;
        });

        // Rolling Numbers Animation
        const stat1 = document.getElementById('statNum1');
        const stat2 = document.getElementById('statNum2');
        const stat3 = document.getElementById('statNum3');
        const stat4 = document.getElementById('statNum4');

        if (stat1) {
          const c1 = { val: 0 };
          gsap.to(c1, {
            val: 4.2,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { stat1.textContent = c1.val.toFixed(1) + '×'; }
          });
        }

        if (stat2) {
          const c2 = { val: 0 };
          gsap.to(c2, {
            val: 44,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { stat2.textContent = '−' + Math.round(c2.val) + '%'; }
          });
        }

        if (stat3) {
          const c3 = { val: 0 };
          gsap.to(c3, {
            val: 99.99,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => { stat3.textContent = c3.val.toFixed(2) + '%'; }
          });
        }

        if (stat4) {
          const c4 = { val: 0 };
          gsap.to(c4, {
            val: 180,
            duration: 1.7,
            ease: 'power2.out',
            onUpdate: () => { stat4.textContent = Math.round(c4.val) + '+'; }
          });
        }
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealImpact();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        revealImpact();
      }
    } else {
      if (badge) badge.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (subheading) subheading.style.opacity = '1';
      cards.forEach(c => c.style.opacity = '1');
      fills.forEach(f => { f.style.width = f.getAttribute('data-width') || '75%'; });
    }
  };

  // Initialize About Impact Section
  initAboutImpactSection();

  // ==========================================================================
  // ABOUT OPERATING PRINCIPLES SECTION: "Our Values"
  // ==========================================================================
  const initAboutPrinciplesSection = () => {
    const section = document.getElementById('aboutPrinciples');
    if (!section) return;

    const badge = document.getElementById('principlesBadge');
    const words = section.querySelectorAll('.vword');
    const subheading = document.getElementById('principlesSubheading');
    const cards = section.querySelectorAll('.principle-card');
    const icons = section.querySelectorAll('.principle-icon-badge');

    // 1. Hover Spotlight & 3D Tilt for Principle Cards
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        card.style.setProperty('--vspot-x', `${x}px`);
        card.style.setProperty('--vspot-y', `${y}px`);
        card.style.setProperty('--vglare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--vglare-y', `${(y / rect.height) * 100}%`);

        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: normX * 10,
            rotateX: -normY * 9,
            y: -6,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.75,
            ease: 'power2.out'
          });
        }
      });
    });

    // 2. Scroll-Triggered Entrance Reveal (GSAP + Intersection Observer)
    if (typeof gsap !== 'undefined') {
      gsap.set(badge, { opacity: 0, y: -20, scale: 0.9 });
      gsap.set(words, { yPercent: 120, opacity: 0 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 25 });
      gsap.set(cards, { opacity: 0, y: 55, scale: 0.95 });
      gsap.set(icons, { scale: 0.8, opacity: 0 });

      const revealPrinciples = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' })
          .to(words, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'power4.out', clearProps: 'transform' }, '-=0.35');
        if (subheading) {
          tl.to(subheading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        }
        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'opacity,visibility'
        }, '-=0.4')
        .to(icons, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.14,
          ease: 'back.out(1.8)',
          clearProps: 'transform'
        }, '-=0.6');
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealPrinciples();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        revealPrinciples();
      }
    } else {
      if (badge) badge.style.opacity = '1';
      words.forEach(w => w.style.opacity = '1');
      if (subheading) subheading.style.opacity = '1';
      cards.forEach(c => c.style.opacity = '1');
      icons.forEach(i => i.style.opacity = '1');
    }
  };

  // Initialize About Principles Section
  initAboutPrinciplesSection();

  /* --------------------------------------------------------------------------
     ABOUT PAGE: SECTION 6 - EVOLUTION OF THE COMPANY (INTERACTIVE TIMELINE & 3D CARDS)
     -------------------------------------------------------------------------- */
  const initAboutEvolutionSection = () => {
    const section = document.getElementById('aboutEvolution');
    if (!section) return;

    const badge = section.querySelector('.evolution-pill-badge, .evolution-badge, #evolutionBadge');
    const words = section.querySelectorAll('.eword, .evo-word');
    const subheading = section.querySelector('.evolution-subheading, #evolutionSubheading');
    const leftCards = section.querySelectorAll('.evolution-feature-card');
    const timelineItems = section.querySelectorAll('.timeline-item');
    const timelineCards = section.querySelectorAll('.timeline-card');
    const railFill = document.getElementById('timelineRailProgress');
    const stream = section.querySelector('.timeline-list, .timeline-stream');

    // 1. Initial State Setup
    if (window.gsap) {
      if (badge) gsap.set(badge, { opacity: 0, y: 25, scale: 0.95 });
      if (words.length) gsap.set(words, { opacity: 0, y: 35, rotateX: 30 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 20 });
      if (leftCards.length) gsap.set(leftCards, { opacity: 0, x: -60, scale: 0.97 });
      if (timelineCards.length) gsap.set(timelineCards, { opacity: 0, x: 60, scale: 0.97 });
    }

    // 2. Entrance Animation Trigger
    const playEntrance = () => {
      if (!window.gsap) {
        if (badge) badge.style.opacity = '1';
        words.forEach(w => w.style.opacity = '1');
        if (subheading) subheading.style.opacity = '1';
        leftCards.forEach(c => c.style.opacity = '1');
        timelineCards.forEach(c => c.style.opacity = '1');
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badge) {
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.6 });
      }

      if (words.length) {
        tl.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08
        }, '-=0.35');
      }

      if (subheading) {
        tl.to(subheading, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
      }

      if (leftCards.length) {
        tl.to(leftCards, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.2
        }, '-=0.3');
      }

      if (timelineCards.length) {
        tl.to(timelineCards, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15
        }, '-=0.6');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playEntrance();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(section);
    } else {
      playEntrance();
    }

    // 3. 3D Hover Tilt & Spotlight for Left Column Feature Cards
    leftCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--espot-x', `${x}px`);
        card.style.setProperty('--espot-y', `${y}px`);
        card.style.setProperty('--eglare-x', `${x}px`);
        card.style.setProperty('--eglare-y', `${y}px`);

        if (window.gsap) {
          const xPercent = (x / rect.width) - 0.5;
          const yPercent = (y / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: xPercent * 10,
            rotateX: -yPercent * 10,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.55,
            ease: 'power2.out'
          });
        }
      });
    });

    // 4. 3D Hover Tilt & Spotlight for Right Column Timeline Cards
    timelineCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--tspot-x', `${x}px`);
        card.style.setProperty('--tspot-y', `${y}px`);
        card.style.setProperty('--tglare-x', `${x}px`);
        card.style.setProperty('--tglare-y', `${y}px`);

        if (window.gsap) {
          const xPercent = (x / rect.width) - 0.5;
          const yPercent = (y / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: xPercent * 6,
            rotateX: -yPercent * 6,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power2.out'
          });
        }
      });
    });

    // 5. Timeline Rail Dynamic Scroll Fill & Active Pin Tracking
    let ticking = false;
    const updateTimelineProgress = () => {
      if (!stream || !railFill) return;
      const rect = stream.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress through stream
      const startOffset = viewportHeight * 0.7;
      const totalDist = rect.height;
      const currentPos = startOffset - rect.top;
      
      let progress = (currentPos / totalDist) * 100;
      progress = Math.max(0, Math.min(100, progress));
      railFill.style.height = `${progress}%`;

      // Update active pin items
      const centerTrigger = viewportHeight * 0.55;
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top <= centerTrigger) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTimelineProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial check on load
    setTimeout(updateTimelineProgress, 300);
  };

  // Initialize Evolution Section
  initAboutEvolutionSection();

  /* --------------------------------------------------------------------------
     ABOUT PAGE: SECTION 7 - THE TEAM ("The operators behind Stackly")
     Continuous Left-to-Right Marquee & 3D Interactive Team Cards
     -------------------------------------------------------------------------- */
  const initAboutTeamSection = () => {
    const section = document.getElementById('aboutTeam');
    if (!section) return;

    const badge = section.querySelector('.team-pill-badge, #teamBadge');
    const words = section.querySelectorAll('.tword');
    const subheading = section.querySelector('.team-subheading, #teamSubheading');
    const controls = section.querySelector('.team-controls-bar');
    const viewport = document.getElementById('teamMarqueeViewport');
    const track = document.getElementById('teamMarqueeTrack');
    const cards = section.querySelectorAll('.team-card');
    const prevBtn = document.getElementById('teamPrevBtn');
    const nextBtn = document.getElementById('teamNextBtn');
    const toggleBtn = document.getElementById('teamToggleBtn');
    const toggleIcon = document.getElementById('teamToggleIcon');

    // 1. Initial State Setup
    if (window.gsap) {
      if (badge) gsap.set(badge, { opacity: 0, y: 20, scale: 0.95 });
      if (words.length) gsap.set(words, { opacity: 0, y: 30, rotateX: 25 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 20 });
      if (controls) gsap.set(controls, { opacity: 0, y: 15 });
      if (viewport) gsap.set(viewport, { opacity: 0, y: 30 });
    }

    // 2. Entrance Animation Trigger
    const playEntrance = () => {
      if (!window.gsap) {
        if (badge) badge.style.opacity = '1';
        words.forEach(w => w.style.opacity = '1');
        if (subheading) subheading.style.opacity = '1';
        if (controls) controls.style.opacity = '1';
        if (viewport) viewport.style.opacity = '1';
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badge) {
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.55 });
      }

      if (words.length) {
        tl.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.08
        }, '-=0.3');
      }

      if (subheading) {
        tl.to(subheading, { opacity: 1, y: 0, duration: 0.55 }, '-=0.3');
      }

      if (controls) {
        tl.to(controls, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25');
      }

      if (viewport) {
        tl.to(viewport, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playEntrance();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(section);
    } else {
      playEntrance();
    }

    // 3. Play / Pause Toggle Interaction
    if (toggleBtn && track) {
      let isPaused = false;
      toggleBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
          track.classList.add('is-paused');
          if (toggleIcon) {
            toggleIcon.classList.remove('fa-pause');
            toggleIcon.classList.add('fa-play');
          }
        } else {
          track.classList.remove('is-paused');
          if (toggleIcon) {
            toggleIcon.classList.remove('fa-play');
            toggleIcon.classList.add('fa-pause');
          }
        }
      });
    }

    // 4. Prev & Next Nudge Buttons
    if (prevBtn && track && window.gsap) {
      prevBtn.addEventListener('click', () => {
        gsap.to(track, {
          x: '+=380',
          duration: 0.6,
          ease: 'power2.out',
          modifiers: {
            x: (x) => `${parseFloat(x)}px`
          }
        });
      });
    }

    if (nextBtn && track && window.gsap) {
      nextBtn.addEventListener('click', () => {
        gsap.to(track, {
          x: '-=380',
          duration: 0.6,
          ease: 'power2.out',
          modifiers: {
            x: (x) => `${parseFloat(x)}px`
          }
        });
      });
    }

    // 5. 3D Hover Tilt & Cursor Spotlight on Team Cards
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--tspot-x', `${x}px`);
        card.style.setProperty('--tspot-y', `${y}px`);
        card.style.setProperty('--tglare-x', `${x}px`);
        card.style.setProperty('--tglare-y', `${y}px`);

        if (window.gsap) {
          const xPercent = (x / rect.width) - 0.5;
          const yPercent = (y / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: xPercent * 8,
            rotateX: -yPercent * 8,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
  };

  // Initialize Team Section
  initAboutTeamSection();

  /* --------------------------------------------------------------------------
     ABOUT PAGE: SECTION 8 - FINAL CTA ("Ready to find your clear route?")
     Fluid Wave Motion & 3D Interactive Depth
     -------------------------------------------------------------------------- */
  const initAboutCtaSection = () => {
    const section = document.getElementById('aboutCta');
    const ctaCard = document.getElementById('aboutCtaCard');
    if (!section || !ctaCard) return;

    const badge = document.getElementById('aboutCtaBadge');
    const words = section.querySelectorAll('#aboutCtaHeading .cword');
    const subheading = document.getElementById('aboutCtaSubheading');
    const buttonWrap = document.getElementById('aboutCtaButtonWrap');
    const trustRow = document.getElementById('aboutCtaTrustRow');
    const waveImg = document.getElementById('aboutCtaWaveImg');

    // 1. Initial State Setup
    if (window.gsap) {
      gsap.set(ctaCard, { scale: 0.94, opacity: 0, y: 35 });
      if (badge) gsap.set(badge, { scale: 0.9, opacity: 0, y: 20 });
      if (words.length) gsap.set(words, { yPercent: 120, rotate: 3, opacity: 0 });
      if (subheading) gsap.set(subheading, { opacity: 0, y: 18 });
      if (buttonWrap) gsap.set(buttonWrap, { opacity: 0, y: 20, scale: 0.95 });
      if (trustRow) gsap.set(trustRow, { opacity: 0, y: 15 });
    }

    // 2. Entrance Animation Trigger
    const playEntrance = () => {
      if (!window.gsap) {
        ctaCard.style.opacity = '1';
        if (badge) badge.style.opacity = '1';
        words.forEach(w => w.style.opacity = '1');
        if (subheading) subheading.style.opacity = '1';
        if (buttonWrap) buttonWrap.style.opacity = '1';
        if (trustRow) trustRow.style.opacity = '1';
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Card scale & fade in
      tl.to(ctaCard, { scale: 1, opacity: 1, y: 0, duration: 0.95 });

      // Badge pop-in
      if (badge) {
        tl.to(badge, { scale: 1, opacity: 1, y: 0, duration: 0.5 }, '-=0.55');
      }

      // Words masked slide-up reveal
      if (words.length) {
        tl.to(words, {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power4.out'
        }, '-=0.45');
      }

      // Subheading fade-up
      if (subheading) {
        tl.to(subheading, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35');
      }

      // Button scale & bounce
      if (buttonWrap) {
        tl.to(buttonWrap, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'back.out(1.6)'
        }, '-=0.3');
      }

      // Trust row fade-in
      if (trustRow) {
        tl.to(trustRow, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playEntrance();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      observer.observe(section);
    } else {
      playEntrance();
    }

    // 3. Interactive 3D Card Tilt & Parallax Wave Shift
    ctaCard.addEventListener('mousemove', (e) => {
      const rect = ctaCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctaCard.style.setProperty('--cspot-x', `${x}px`);
      ctaCard.style.setProperty('--cspot-y', `${y}px`);
      ctaCard.style.setProperty('--cglare-x', `${x}px`);
      ctaCard.style.setProperty('--cglare-y', `${y}px`);

      if (window.gsap) {
        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;

        // Subtle 3D tilt on card
        gsap.to(ctaCard, {
          rotateY: xPercent * 5,
          rotateX: -yPercent * 5,
          transformPerspective: 1200,
          duration: 0.35,
          ease: 'power2.out'
        });

        // Parallax depth shift on wave background
        if (waveImg) {
          gsap.to(waveImg, {
            x: -xPercent * 25,
            y: -yPercent * 15,
            duration: 0.45,
            ease: 'power2.out'
          });
        }
      }
    });

    ctaCard.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(ctaCard, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.out'
        });

        if (waveImg) {
          gsap.to(waveImg, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      }
    });
  };

  // Initialize About CTA Section
  initAboutCtaSection();

  /* --------------------------------------------------------------------------
     BLOG PAGE: SPLIT-SCREEN ANIMATED HERO SLIDER (LEFT TEXT, RIGHT IMAGE)
     -------------------------------------------------------------------------- */
  const initBlogHeroSection = () => {
    const heroSection = document.getElementById('blogHero');
    if (!heroSection) return;

    const textSlides = Array.from(heroSection.querySelectorAll('.blog-text-slide'));
    const visualSlides = Array.from(heroSection.querySelectorAll('.blog-visual-slide'));
    const segments = Array.from(heroSection.querySelectorAll('.dock-segment'));
    const currentNumEl = document.getElementById('dockCurrentNum');
    const prevBtn = document.getElementById('blogSliderPrev');
    const nextBtn = document.getElementById('blogSliderNext');
    const playPauseBtn = document.getElementById('blogSliderPlayPause');
    const accentGlow = document.getElementById('blogAccentGlow');
    const visualGlowHalo = document.getElementById('blogVisualGlowHalo');
    const visualShell = document.getElementById('blogVisualShell');
    const overline = document.getElementById('blogOverline');
    const sliderDock = document.getElementById('blogSliderDock');

    if (!textSlides.length || !visualSlides.length) return;

    let currentIndex = 0;
    const totalSlides = textSlides.length;
    let isTransitioning = false;
    let isPaused = false;
    let userPaused = false;
    const SLIDE_DURATION = 3.6; // Fast, lively auto-advance interval
    let progressTween = null;

    // Helper: get accent color for a slide
    const getAccentColor = (idx) => {
      return textSlides[idx]?.dataset.accent || '#38bdf8';
    };

    // Update ambient accent background glows smoothly
    const updateAccentAtmosphere = (accent) => {
      if (accentGlow) {
        accentGlow.style.background = `radial-gradient(circle, ${accent} 0%, #2563eb 50%, transparent 75%)`;
      }
      if (visualGlowHalo) {
        visualGlowHalo.style.background = `radial-gradient(circle at 60% 40%, ${accent} 0%, #2563eb 50%, transparent 75%)`;
      }
      if (currentNumEl) {
        currentNumEl.style.color = accent;
      }
    };

    // Update progress bars
    const updateProgressBars = (activeIdx) => {
      const activeAccent = getAccentColor(activeIdx);

      segments.forEach((seg, i) => {
        const fill = seg.querySelector('.dock-bar-fill');
        if (fill) {
          fill.style.background = activeAccent;
          gsap.killTweensOf(fill);
        }

        if (i < activeIdx) {
          seg.classList.remove('active');
          seg.classList.add('completed');
          seg.setAttribute('aria-selected', 'false');
          if (fill) fill.style.width = '100%';
        } else if (i === activeIdx) {
          seg.classList.add('active');
          seg.classList.remove('completed');
          seg.setAttribute('aria-selected', 'true');
          if (fill) fill.style.width = '0%';
        } else {
          seg.classList.remove('active');
          seg.classList.remove('completed');
          seg.setAttribute('aria-selected', 'false');
          if (fill) fill.style.width = '0%';
        }
      });
    };

    // Start auto-advance progress tween
    const startProgressTimer = () => {
      if (progressTween) progressTween.kill();
      if (userPaused) return;

      const activeSeg = segments[currentIndex];
      if (!activeSeg) return;
      const fill = activeSeg.querySelector('.dock-bar-fill');
      if (!fill) return;

      gsap.set(fill, { width: '0%' });

      progressTween = gsap.to(fill, {
        width: '100%',
        duration: SLIDE_DURATION,
        ease: 'none',
        onComplete: () => {
          if (!userPaused) {
            goToSlide((currentIndex + 1) % totalSlides, 1);
          }
        }
      });

      if (isPaused) {
        progressTween.pause();
      }
    };

    // Fast, Synchronized Slide Transition (Snappy & Beautiful)
    const goToSlide = (newIndex, direction = 1) => {
      if (isTransitioning || newIndex === currentIndex) return;
      isTransitioning = true;

      const prevIndex = currentIndex;
      const outgoingText = textSlides[prevIndex];
      const incomingText = textSlides[newIndex];
      const outgoingVisual = visualSlides[prevIndex];
      const incomingVisual = visualSlides[newIndex];
      const newAccent = getAccentColor(newIndex);

      // Kill active progress timer
      if (progressTween) progressTween.kill();

      // 1. Counter update with quick flip
      if (currentNumEl) {
        if (window.gsap) {
          gsap.timeline()
            .to(currentNumEl, {
              y: direction > 0 ? -6 : 6,
              opacity: 0,
              duration: 0.1,
              ease: 'power2.in',
              onComplete: () => {
                currentNumEl.textContent = `0${newIndex + 1}`;
                currentNumEl.style.color = newAccent;
              }
            })
            .fromTo(currentNumEl, 
              { y: direction > 0 ? 6 : -6, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.14, ease: 'power2.out' }
            );
        } else {
          currentNumEl.textContent = `0${newIndex + 1}`;
          currentNumEl.style.color = newAccent;
        }
      }

      // 2. Ambient glows update
      updateAccentAtmosphere(newAccent);

      // 3. Progress segments UI update
      updateProgressBars(newIndex);

      if (!window.gsap) {
        outgoingText.classList.remove('active');
        incomingText.classList.add('active');
        outgoingVisual.classList.remove('active');
        incomingVisual.classList.add('active');
        currentIndex = newIndex;
        isTransitioning = false;
        startProgressTimer();
        return;
      }

      // Ultra-Fast Master Transition Timeline (~0.35s total)
      const masterTl = gsap.timeline({
        onComplete: () => {
          currentIndex = newIndex;
          isTransitioning = false;
          startProgressTimer();
        }
      });

      // --- TEXT SLIDE OUTGOING ---
      masterTl.to(outgoingText, {
        y: direction > 0 ? -18 : 18,
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          outgoingText.classList.remove('active');
          gsap.set(outgoingText, { clearProps: 'transform,opacity,filter' });
        }
      }, 0);

      // --- TEXT SLIDE INCOMING (Starts at 0.05s for seamless overlap) ---
      incomingText.classList.add('active');
      const incomingChildren = Array.from(incomingText.children);
      
      gsap.set(incomingText, { opacity: 1, visibility: 'visible' });
      masterTl.fromTo(incomingChildren,
        {
          y: direction > 0 ? 20 : -20,
          opacity: 0,
          filter: 'blur(4px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.03,
          duration: 0.32,
          ease: 'power3.out',
          clearProps: 'transform,filter'
        },
        0.05
      );

      // --- VISUAL SLIDE OUTGOING ---
      const outImg = outgoingVisual.querySelector('.visual-main-img');
      const outChips = outgoingVisual.querySelectorAll('.visual-chip');

      if (outImg) {
        masterTl.to(outImg, {
          scale: 1.04,
          duration: 0.22,
          ease: 'power2.in'
        }, 0);
      }

      if (outChips.length) {
        masterTl.to(outChips, {
          scale: 0.9,
          opacity: 0,
          duration: 0.16,
          ease: 'power2.in'
        }, 0);
      }

      masterTl.to(outgoingVisual, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          outgoingVisual.classList.remove('active');
          gsap.set(outgoingVisual, { clearProps: 'all' });
          if (outImg) gsap.set(outImg, { clearProps: 'all' });
          outChips.forEach(c => gsap.set(c, { clearProps: 'all' }));
        }
      }, 0);

      // --- VISUAL SLIDE INCOMING (Starts at 0.04s) ---
      incomingVisual.classList.add('active');
      const inImg = incomingVisual.querySelector('.visual-main-img');
      const inChips = incomingVisual.querySelectorAll('.visual-chip');

      gsap.set(incomingVisual, { opacity: 0, visibility: 'visible' });
      masterTl.to(incomingVisual, {
        opacity: 1,
        duration: 0.28,
        ease: 'power2.out'
      }, 0.04);

      if (inImg) {
        masterTl.fromTo(inImg,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.34, ease: 'power3.out' },
          0.04
        );
      }

      if (inChips.length) {
        masterTl.fromTo(inChips,
          { scale: 0.85, opacity: 0, y: direction > 0 ? 12 : -12 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'back.out(1.5)', clearProps: 'transform' },
          0.08
        );
      }
    };

    // Navigation Controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % totalSlides, 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides, -1);
      });
    }

    // Segment tab clicks
    segments.forEach((seg, idx) => {
      seg.addEventListener('click', () => {
        if (idx === currentIndex) return;
        goToSlide(idx, idx > currentIndex ? 1 : -1);
      });
    });

    // Play / Pause Toggle
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        userPaused = !userPaused;
        const icon = playPauseBtn.querySelector('i');
        if (userPaused) {
          if (progressTween) progressTween.pause();
          if (icon) icon.className = 'fa-solid fa-play';
          playPauseBtn.setAttribute('title', 'Resume Auto-Play');
          playPauseBtn.setAttribute('aria-label', 'Resume Auto-Play');
        } else {
          if (progressTween) progressTween.resume();
          else startProgressTimer();
          if (icon) icon.className = 'fa-solid fa-pause';
          playPauseBtn.setAttribute('title', 'Pause Auto-Play');
          playPauseBtn.setAttribute('aria-label', 'Pause Auto-Play');
        }
      });
    }

    // Hover Pause on desktop
    heroSection.addEventListener('mouseenter', () => {
      if (!userPaused && progressTween) {
        isPaused = true;
        progressTween.pause();
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (!userPaused && progressTween) {
        isPaused = false;
        progressTween.resume();
      }
    });

    // Keyboard navigation (ArrowLeft & ArrowRight)
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight') {
        goToSlide((currentIndex + 1) % totalSlides, 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides, -1);
      }
    });

    // 3D Interactive Mouse Tilt on Right Visual Card
    if (visualShell) {
      const handleVisualMouseMove = (e) => {
        if (!window.gsap || window.innerWidth < 1024) return;
        const rect = visualShell.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(visualShell, {
          rotateY: x * 14,
          rotateX: -y * 12,
          transformPerspective: 1000,
          ease: 'power1.out',
          duration: 0.35
        });
      };

      const handleVisualMouseLeave = () => {
        if (!window.gsap || window.innerWidth < 1024) return;
        gsap.to(visualShell, {
          rotateX: 0,
          rotateY: 0,
          ease: 'power2.out',
          duration: 0.7
        });
      };

      visualShell.addEventListener('mousemove', handleVisualMouseMove);
      visualShell.addEventListener('mouseleave', handleVisualMouseLeave);
    }

    // Initial Orchestrated Entrance Animation
    const playInitialEntrance = () => {
      updateAccentAtmosphere(getAccentColor(0));
      updateProgressBars(0);

      if (!window.gsap) {
        startProgressTimer();
        return;
      }

      const initTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          startProgressTimer();
        }
      });

      // Overline and status badge drop in
      if (overline) {
        initTl.fromTo(overline,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
        );
      }

      // Initial active text slide elements stagger up
      const initialActiveText = textSlides[0];
      if (initialActiveText) {
        initTl.fromTo(Array.from(initialActiveText.children),
          { opacity: 0, y: 35, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.09, duration: 0.85, clearProps: 'transform,filter' },
          '-=0.4'
        );
      }

      // 3D Visual card enters with perspective scale
      if (visualShell) {
        initTl.fromTo(visualShell,
          { opacity: 0, scale: 0.92, rotateY: 8 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 0.95, ease: 'power3.out', clearProps: 'transform' },
          '-=0.7'
        );
      }

      // Floating chips pop-in with bouncy spring
      const initialChips = visualSlides[0]?.querySelectorAll('.visual-chip');
      if (initialChips && initialChips.length) {
        initTl.fromTo(initialChips,
          { opacity: 0, scale: 0.75, y: 15 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(2)', clearProps: 'transform' },
          '-=0.5'
        );
      }

      // Control Dock rises into view
      if (sliderDock) {
        initTl.fromTo(sliderDock,
          { opacity: 0, y: 24, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', clearProps: 'transform' },
          '-=0.5'
        );
      }
    };

    // Start hero experience
    playInitialEntrance();
  };

  // Initialize Blog Hero Section
  initBlogHeroSection();

  /* --------------------------------------------------------------------------
     BLOG PAGE: LATEST ENGINEERING DEEP DIVES (Filter, Search & 3D Cards)
     -------------------------------------------------------------------------- */
  const initBlogFeedSection = () => {
    const feedSection = document.getElementById('blogFeed');
    if (!feedSection) return;

    const filterPills = Array.from(feedSection.querySelectorAll('.feed-pill'));
    const searchInput = document.getElementById('feedSearchInput');
    const searchClear = document.getElementById('feedSearchClear');
    const allArticles = Array.from(feedSection.querySelectorAll('.feed-article-item'));
    const noResults = document.getElementById('feedNoResults');
    const resetBtn = document.getElementById('feedResetBtn');

    let activeFilter = 'all';
    let searchQuery = '';

    // Filter & search logic
    const applyFilters = (animate = true) => {
      const q = searchQuery.toLowerCase().trim();
      let visibleCount = 0;

      const toShow = [];
      const toHide = [];

      allArticles.forEach(item => {
        const cat = (item.dataset.category || '').toLowerCase();
        const keywords = (item.dataset.keywords || '').toLowerCase();
        const title = (item.querySelector('.feed-card-title, .sub-card-title')?.textContent || '').toLowerCase();
        const excerpt = (item.querySelector('.feed-card-excerpt, .sub-card-excerpt')?.textContent || '').toLowerCase();
        const author = (item.querySelector('.feed-author-name')?.textContent || '').toLowerCase();

        const matchesCat = activeFilter === 'all' || cat === activeFilter;
        const matchesQuery = !q || title.includes(q) || excerpt.includes(q) || keywords.includes(q) || author.includes(q) || cat.includes(q);

        if (matchesCat && matchesQuery) {
          toShow.push(item);
          visibleCount++;
        } else {
          toHide.push(item);
        }
      });

      // Show/Hide no results box
      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = 'block';
          if (window.gsap && animate) {
            gsap.fromTo(noResults, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          } else {
            noResults.style.opacity = '1';
          }
        } else {
          noResults.style.display = 'none';
        }
      }

      // Hide non-matching items
      toHide.forEach(item => {
        if (window.gsap && animate) {
          gsap.to(item, {
            opacity: 0,
            scale: 0.96,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });

      // Show matching items
      toShow.forEach((item, idx) => {
        item.style.display = item.classList.contains('feed-featured-card') ? 'block' : 'flex';
        if (window.gsap && animate) {
          gsap.fromTo(item,
            { opacity: 0, y: 20, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.32, delay: idx * 0.04, ease: 'power2.out', clearProps: 'transform' }
          );
        } else {
          item.style.opacity = '1';
        }
      });
    };

    // Category button clicks
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        activeFilter = pill.dataset.filter || 'all';
        applyFilters(true);

        if (window.gsap) {
          gsap.fromTo(pill, { scale: 0.94 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
        }
      });
    });

    // Real-time search filter
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (searchClear) {
          searchClear.style.display = searchQuery ? 'inline-flex' : 'none';
        }
        applyFilters(true);
      });
    }

    // Search clear button
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        applyFilters(true);
      });
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        if (searchClear) searchClear.style.display = 'none';
        
        filterPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        const allBtn = filterPills.find(p => p.dataset.filter === 'all');
        if (allBtn) {
          allBtn.classList.add('active');
          allBtn.setAttribute('aria-selected', 'true');
        }
        activeFilter = 'all';
        applyFilters(true);
      });
    }

    // Interactive 3D Card Hover Tilt
    allArticles.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!window.gsap || window.innerWidth < 1024) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 1200,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!window.gsap || window.innerWidth < 1024) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    // Heading and overline ScrollTrigger reveal
    if (window.gsap && window.ScrollTrigger) {
      const overline = feedSection.querySelector('.feed-overline');
      const title = feedSection.querySelector('.feed-main-title');
      const desc = feedSection.querySelector('.feed-main-desc');

      gsap.timeline({
        scrollTrigger: {
          trigger: feedSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(overline, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    }
  };

  // Initialize Blog Feed Section
  initBlogFeedSection();

  /* --------------------------------------------------------------------------
     Blog Archive Section Logic (Interactive 3D Tilt, Pagination & GSAP)
     -------------------------------------------------------------------------- */
  const initBlogArchiveSection = () => {
    const archiveSection = document.getElementById('blogArchive');
    if (!archiveSection) return;

    const cards = archiveSection.querySelectorAll('.archive-card');
    const pageButtons = archiveSection.querySelectorAll('.page-num');
    const prevBtn = document.getElementById('paginationPrev');
    const nextBtn = document.getElementById('paginationNext');

    // Interactive 3D Card Hover Tilt
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!window.gsap || window.innerWidth < 1024) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 5,
          rotateX: -y * 5,
          transformPerspective: 1200,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!window.gsap || window.innerWidth < 1024) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    // Heading & cards reveal via GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      const title = archiveSection.querySelector('.archive-title');
      const subtitle = archiveSection.querySelector('.archive-subtitle');

      gsap.timeline({
        scrollTrigger: {
          trigger: archiveSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(subtitle, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.2');
    }

  };

  // Initialize Blog Archive Section
  initBlogArchiveSection();

  /* --------------------------------------------------------------------------
     Blog Runbooks Section Logic (Auto-Moving Carousel, 3D Tilt & GSAP Reveal)
     -------------------------------------------------------------------------- */
  const initRunbooksSection = () => {
    const runbooksSection = document.getElementById('blogRunbooks');
    if (!runbooksSection) return;

    const cards = runbooksSection.querySelectorAll('.runbook-card');
    const track = document.getElementById('runbooksTrack');
    const prevBtn = document.getElementById('runbooksPrevBtn');
    const nextBtn = document.getElementById('runbooksNextBtn');

    // Interactive 3D Card Hover Tilt Physics
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!window.gsap || window.innerWidth < 1024) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 1200,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!window.gsap || window.innerWidth < 1024) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    // Header & Track Entrance Reveal via GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      const title = runbooksSection.querySelector('.runbooks-title');
      const navBtns = runbooksSection.querySelector('.runbooks-nav-btns');
      const viewAll = runbooksSection.querySelector('.runbooks-view-all');
      const carouselWrap = runbooksSection.querySelector('.runbooks-carousel-wrap');

      gsap.timeline({
        scrollTrigger: {
          trigger: runbooksSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(navBtns, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.3')
      .fromTo(viewAll, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(carouselWrap, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2');
    }

    // Manual Arrow Navigation Controls
    let resumeTimeout;
    const nudgeDistance = 424; // Card width 400px + gap 24px

    const pauseAndNudge = (delta) => {
      if (!track) return;
      clearTimeout(resumeTimeout);
      track.style.animationPlayState = 'paused';

      const currentTransform = window.getComputedStyle(track).transform;
      let currentX = 0;
      if (currentTransform && currentTransform !== 'none') {
        const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
        if (matrixValues) {
          const values = matrixValues[1].split(', ');
          currentX = parseFloat(values[4]) || 0;
        }
      }

      if (window.gsap) {
        gsap.to(track, {
          x: currentX + delta,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            resumeTimeout = setTimeout(() => {
              gsap.set(track, { clearProps: 'x' });
              track.style.animationPlayState = 'running';
            }, 2500);
          }
        });
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => pauseAndNudge(nudgeDistance));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => pauseAndNudge(-nudgeDistance));
    }
  };

  // Initialize Blog Runbooks Section
  initRunbooksSection();

  /* --------------------------------------------------------------------------
     Blog Newsletter Signal Section Logic (Form Feedback & GSAP Reveal)
     -------------------------------------------------------------------------- */
  const initSignalSection = () => {
    const signalSection = document.getElementById('blogSignal');
    if (!signalSection) return;

    const form = document.getElementById('signalForm');
    const emailInput = document.getElementById('signalEmail');
    const feedback = document.getElementById('signalFeedback');
    const submitBtn = document.getElementById('signalSubmitBtn');

    // GSAP ScrollTrigger Entrance Reveal
    if (window.gsap && window.ScrollTrigger) {
      const card = signalSection.querySelector('.signal-card');
      const title = signalSection.querySelector('.signal-title');
      const desc = signalSection.querySelector('.signal-desc');
      const actionCol = signalSection.querySelector('.signal-action-col');

      gsap.timeline({
        scrollTrigger: {
          trigger: signalSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(card, { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .fromTo(desc, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(actionCol, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    // Form Submission Handling (Direct Redirect to 404.html on Valid Email)
    if (form && emailInput) {
      emailInput.addEventListener('input', () => {
        if (feedback) {
          feedback.className = 'signal-feedback';
          feedback.textContent = '';
        }
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          if (feedback) {
            feedback.className = 'signal-feedback error';
            feedback.textContent = 'Please enter a valid work email address.';
          }
          emailInput.focus();
          return;
        }

        // Directly navigate to 404.html with complete return state
        const state = record404ReturnState(form);
        window.location.href = '404.html?from=signal-form&return_page=blog.html&return_scroll=' + state.scrollPos + '&return_section=blogSignal';
      });
    }
  };

  // Initialize Blog Signal Section
  initSignalSection();

  /* --------------------------------------------------------------------------
     5. Architecture Playbooks Section (Interactive 3D Tilt & GSAP ScrollTrigger)
     -------------------------------------------------------------------------- */
  const initPlaybooksSection = () => {
    const playbooksSection = document.getElementById('blogPlaybooks');
    if (!playbooksSection) return;

    const cards = playbooksSection.querySelectorAll('.playbook-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight CSS variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D Perspective Tilt on desktop
        if (window.gsap && window.innerWidth >= 1024) {
          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 8,
            rotateX: -normY * 8,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.gsap && window.innerWidth >= 1024) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });

    // GSAP ScrollTrigger reveal
    if (window.gsap && window.ScrollTrigger) {
      const header = playbooksSection.querySelector('.compact-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: playbooksSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
    }
  };

  /* --------------------------------------------------------------------------
     6. Enterprise Field Reports Section (Stagger Reveal & Metric Pop)
     -------------------------------------------------------------------------- */
  const initFieldReportsSection = () => {
    const fieldReportsSection = document.getElementById('blogFieldReports');
    if (!fieldReportsSection) return;

    const cards = fieldReportsSection.querySelectorAll('.report-card');

    // GSAP ScrollTrigger reveal
    if (window.gsap && window.ScrollTrigger) {
      const header = fieldReportsSection.querySelector('.compact-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: fieldReportsSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
    }
  };

  /* --------------------------------------------------------------------------
     7. Cloud Security Matrix Section (Horizontal Stagger Reveal & Hover Sync)
     -------------------------------------------------------------------------- */
  const initSecurityMatrixSection = () => {
    const secMatrixSection = document.getElementById('blogSecurityMatrix');
    if (!secMatrixSection) return;

    const cards = secMatrixSection.querySelectorAll('.matrix-card');

    // GSAP ScrollTrigger reveal
    if (window.gsap && window.ScrollTrigger) {
      const header = secMatrixSection.querySelector('.compact-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: secMatrixSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
    }
  };

  // Initialize All 3 Compact Sections
  initPlaybooksSection();
  initFieldReportsSection();
  initSecurityMatrixSection();

  /* ==========================================================================
     18. Contact Hero Section (Meet-in-the-Middle, 3D Hover & Continuous Fluid Breathing)
     ========================================================================== */
  const initContactHero = () => {
    const contactHero = document.getElementById('contactHero');
    if (!contactHero) return;

    const leftCol = document.getElementById('contactHeroLeft');
    const rightCol = document.getElementById('contactHeroRight');
    const card3D = document.getElementById('contactCard3D');
    const fluidImg = document.getElementById('contactFluidImg');
    const words = contactHero.querySelectorAll('.contact-word');
    const subheading = document.getElementById('contactHeroSubheading');
    const infoItems = contactHero.querySelectorAll('.contact-info-item');

    if (!window.gsap) return;

    // 1. Initial State for "Meet in the Middle" bidirectional entrance
    gsap.set(leftCol, { x: -150, opacity: 0 });
    gsap.set(rightCol, { x: 150, opacity: 0, scale: 1.1 });
    if (words.length) {
      gsap.set(words, { yPercent: 110, opacity: 0 });
    }
    if (subheading) {
      gsap.set(subheading, { opacity: 0, y: 20 });
    }
    if (infoItems.length) {
      gsap.set(infoItems, { opacity: 0, x: -30 });
    }

    // 2. Meet in the Middle Entry Timeline (1.5s simultaneously, power3.out)
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Left Column slides in from x: -150
    tl.to(leftCol, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      clearProps: 'transform'
    }, 0);

    // Right Column slides in from x: 150 and scales down from 1.1 to 1
    tl.to(rightCol, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      clearProps: 'transform'
    }, 0);

    // Staggered word-by-word reveal sliding up from mask
    if (words.length) {
      tl.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out'
      }, 0.2);
    }

    // Subheading fade & slide in
    if (subheading) {
      tl.to(subheading, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.45);
    }

    // Contact list items staggered fade & slide in
    if (infoItems.length) {
      tl.to(infoItems, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.6);
    }

    // 3. Continuous slow-breathing animation on the fluid image
    if (fluidImg) {
      gsap.to(fluidImg, {
        scale: 1.025,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    // 4. Interactive 3D hover tilt on Right Column (mousemove & mouseleave)
    if (card3D && rightCol) {
      rightCol.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1024) return;
        const rect = card3D.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        gsap.to(card3D, {
          rotateY: normX * 16,
          rotateX: -normY * 16,
          transformPerspective: 1200,
          duration: 0.35,
          ease: 'power1.out'
        });
      });

      rightCol.addEventListener('mouseleave', () => {
        gsap.to(card3D, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    }

    // 5. Intersection Observer fallback for scroll-triggered elements below the fold
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.site-footer, .footer-col').forEach(el => observer.observe(el));
    }
  };

  /* --------------------------------------------------------------------------
     Sleek Magnetic Navigation Links Hover Effect
     -------------------------------------------------------------------------- */
  const initMagneticNav = () => {
    const magneticItems = document.querySelectorAll('.magnetic-nav-item');
    if (!window.gsap || window.innerWidth < 1024) return;

    magneticItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(item, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  };

  /* --------------------------------------------------------------------------
     19. Route Audit Request Section (3D Form Card Tilt, Feedback & GSAP)
     -------------------------------------------------------------------------- */
  const initContactAuditSection = () => {
    const auditSection = document.getElementById('contactAudit');
    if (!auditSection) return;

    // 3D Tilt on Form Card
    const formCard = document.getElementById('auditFormCard');
    if (formCard && window.innerWidth >= 1024 && window.gsap) {
      formCard.addEventListener('mousemove', (e) => {
        const rect = formCard.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
        const normY = ((e.clientY - rect.top) / rect.height) - 0.5;

        gsap.to(formCard, {
          rotateY: normX * 8,
          rotateX: -normY * 8,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      formCard.addEventListener('mouseleave', () => {
        gsap.to(formCard, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }

    // Client-side Form Interaction with full validation & 404 redirect
    const form = document.getElementById('routeAuditForm');
    const submitBtn = document.getElementById('btnSendInquiry');

    if (form && submitBtn) {
      const nameInput = document.getElementById('auditName');
      const emailInput = document.getElementById('auditEmail');
      const companyInput = document.getElementById('auditCompany');
      const roleInput = document.getElementById('auditRole');
      const solvingInput = document.getElementById('auditSolving');

      const fields = [
        { input: nameInput, errId: 'err-auditName' },
        { input: emailInput, errId: 'err-auditEmail', isEmail: true },
        { input: companyInput, errId: 'err-auditCompany' },
        { input: roleInput, errId: 'err-auditRole' },
        { input: solvingInput, errId: 'err-auditSolving' }
      ];

      const showError = (item, message) => {
        if (!item || !item.input) return;
        item.input.classList.add('input-error');
        let errEl = document.getElementById(item.errId);
        if (!errEl) {
          errEl = document.createElement('span');
          errEl.id = item.errId;
          errEl.className = 'form-field-error';
          item.input.parentNode.appendChild(errEl);
        }
        errEl.textContent = message;
        errEl.style.display = 'block';
      };

      const clearError = (item) => {
        if (!item || !item.input) return;
        item.input.classList.remove('input-error');
        const errEl = document.getElementById(item.errId);
        if (errEl) {
          errEl.textContent = '';
          errEl.style.display = 'none';
        }
      };

      // Real-time error clearing when user types
      fields.forEach((item) => {
        if (!item.input) return;
        item.input.addEventListener('input', () => {
          const val = item.input.value.trim();
          if (item.isEmail) {
            const hasAt = val.includes('@');
            const hasCom = val.toLowerCase().includes('.com');
            const validPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            if (!val) {
              // Still empty, keep or reset
            } else if (!hasAt || !hasCom || !validPattern) {
              showError(item, 'Please enter a valid email address (must include @ and .com)');
            } else {
              clearError(item);
            }
          } else {
            if (val) {
              clearError(item);
            }
          }
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let firstInvalid = null;

        fields.forEach((item) => {
          if (!item.input) return;
          const val = item.input.value.trim();
          if (!val) {
            showError(item, 'Please fill all fields');
            isValid = false;
            if (!firstInvalid) firstInvalid = item.input;
          } else if (item.isEmail) {
            const hasAt = val.includes('@');
            const hasCom = val.toLowerCase().includes('.com');
            const validPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            if (!hasAt || !hasCom || !validPattern) {
              showError(item, 'Please enter a valid email address (must include @ and .com)');
              isValid = false;
              if (!firstInvalid) firstInvalid = item.input;
            } else {
              clearError(item);
            }
          } else {
            clearError(item);
          }
        });

        if (!isValid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // All details valid: record return state and redirect to 404 page
        const state = record404ReturnState(form);
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Redirecting...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
          window.location.href = '404.html?from=contact-inquiry&return_page=contact.html&return_scroll=' + state.scrollPos + '&return_section=contactAudit';
        }, 350);
      });
    }

    // GSAP ScrollTrigger Entrance
    if (window.gsap && window.ScrollTrigger) {
      const leftCol = auditSection.querySelector('.audit-left');
      const channels = auditSection.querySelectorAll('.channel-col');

      gsap.timeline({
        scrollTrigger: {
          trigger: auditSection,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(leftCol, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .fromTo(formCard, { opacity: 0, y: 35, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo(channels, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, '-=0.2');
    }
  };

  /* --------------------------------------------------------------------------
     20. How We Work & Common First Questions Section (GSAP Stagger & 3D Tilt)
     -------------------------------------------------------------------------- */
  const initContactProcessFaqSection = () => {
    const section = document.getElementById('contactProcessFaq');
    if (!section) return;

    // Interactive 3D tilt on support card
    const supportCard = section.querySelector('.faq-support-card');
    if (supportCard && window.innerWidth >= 1024 && window.gsap) {
      supportCard.addEventListener('mousemove', (e) => {
        const rect = supportCard.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
        const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
        gsap.to(supportCard, {
          rotateY: normX * 8,
          rotateX: -normY * 8,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
      supportCard.addEventListener('mouseleave', () => {
        gsap.to(supportCard, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
      });
    }

    // GSAP ScrollTrigger Entrance
    if (window.gsap && window.ScrollTrigger) {
      const steps = section.querySelectorAll('.process-step');
      const faqLeft = section.querySelector('.faq-left');
      const faqItems = section.querySelectorAll('.faq-item');

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(steps, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' })
      .fromTo(faqLeft, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(faqItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
    }
  };

  // Initialize Contact Hero, Magnetic Nav, Route Audit & Process FAQ
  initContactHero();
  initMagneticNav();
  initContactAuditSection();
  initContactProcessFaqSection();

  /* --------------------------------------------------------------------------
     21. Global Operations Hubs Section (3D Tilt & GSAP Stagger)
     -------------------------------------------------------------------------- */
  const initContactHubsSection = () => {
    const section = document.getElementById('contactHubs');
    if (!section) return;

    const cards = section.querySelectorAll('.hub-card');
    if (window.innerWidth >= 1024 && window.gsap) {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
          const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 8,
            rotateX: -normY * 8,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      const header = section.querySelector('.contact-section-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
    }
  };

  /* --------------------------------------------------------------------------
     22. Engineering SLA Matrix Section (3D Tilt & GSAP Stagger)
     -------------------------------------------------------------------------- */
  const initContactSlaSection = () => {
    const section = document.getElementById('contactSlaMatrix');
    if (!section) return;

    const cards = section.querySelectorAll('.sla-card');
    if (window.innerWidth >= 1024 && window.gsap) {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
          const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 8,
            rotateX: -normY * 8,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      const header = section.querySelector('.contact-section-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
    }
  };

  /* --------------------------------------------------------------------------
     23. Direct Architect Dispatch Section (3D Tilt & GSAP Stagger)
     -------------------------------------------------------------------------- */
  const initContactDispatchSection = () => {
    const section = document.getElementById('contactDispatch');
    if (!section) return;

    const cards = section.querySelectorAll('.dispatch-card');
    if (window.innerWidth >= 1024 && window.gsap) {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
          const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 8,
            rotateX: -normY * 8,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      const header = section.querySelector('.contact-section-header');
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
      .fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
    }
  };

  // Initialize Hubs, SLA Matrix, and Dispatch Sections
  initContactHubsSection();
  initContactSlaSection();
  initContactDispatchSection();

  /* --------------------------------------------------------------------------
     24. Dual Authentication Page (Sign In & Sign Up with Role Privilege)
     -------------------------------------------------------------------------- */
  const initAuthPage = () => {
    const authSection = document.getElementById('authSection');
    if (!authSection) return;

    // Elements
    const tabBtnSignIn = document.getElementById('tabBtnSignIn');
    const tabBtnSignUp = document.getElementById('tabBtnSignUp');
    const switchToSignUpBtn = document.getElementById('switchToSignUpBtn');
    const switchToSignInBtn = document.getElementById('switchToSignInBtn');
    const signInFormView = document.getElementById('signInFormView');
    const signUpFormView = document.getElementById('signUpFormView');
    const curtainHeadline = document.getElementById('curtainHeadline');

    // Role privilege elements
    const roleBtnUser = document.getElementById('roleBtnUser');
    const roleBtnAdmin = document.getElementById('roleBtnAdmin');
    const privilegeInfoBox = document.getElementById('privilegeInfoBox');
    const privilegeInfoText = document.getElementById('privilegeInfoText');
    let currentRole = 'user';

    // Alerts
    const authAlert = document.getElementById('authAlert');
    const authAlertMessage = document.getElementById('authAlertMessage');

    const showAlert = (message, type = 'error') => {
      if (!authAlert || !authAlertMessage) return;
      authAlert.className = `auth-alert ${type}`;
      authAlertMessage.textContent = message;
      authAlert.style.display = 'flex';
      
      // Auto-hide error alerts after 5 seconds
      if (type === 'error') {
        clearTimeout(authAlert._timer);
        authAlert._timer = setTimeout(() => {
          authAlert.style.display = 'none';
        }, 5000);
      }
    };

    const clearAlert = () => {
      if (!authAlert) return;
      authAlert.style.display = 'none';
    };

    // Role switcher logic
    const setRole = (role) => {
      currentRole = role;
      if (role === 'admin') {
        if (roleBtnAdmin) {
          roleBtnAdmin.classList.add('active');
          roleBtnAdmin.setAttribute('aria-pressed', 'true');
        }
        if (roleBtnUser) {
          roleBtnUser.classList.remove('active');
          roleBtnUser.setAttribute('aria-pressed', 'false');
        }
        if (privilegeInfoBox) privilegeInfoBox.classList.add('admin-mode');
        if (privilegeInfoText) {
          privilegeInfoText.innerHTML = '<strong>Multi-Cloud Governance Suite:</strong> Complete cluster orchestration, automated FinOps cost guardrails, zero-trust IAM security policies, and 99.999% SLA war-room bridge dispatch.';
        }
      } else {
        if (roleBtnUser) {
          roleBtnUser.classList.add('active');
          roleBtnUser.setAttribute('aria-pressed', 'true');
        }
        if (roleBtnAdmin) {
          roleBtnAdmin.classList.remove('active');
          roleBtnAdmin.setAttribute('aria-pressed', 'false');
        }
        if (privilegeInfoBox) privilegeInfoBox.classList.remove('admin-mode');
        if (privilegeInfoText) {
          privilegeInfoText.innerHTML = '<strong>Enterprise Workload Suite:</strong> Access real-time workload telemetry, track cloud migration stages, approve monthly FinOps cost allocations, and submit architecture tickets.';
        }
      }
    };

    if (roleBtnUser && roleBtnAdmin) {
      roleBtnUser.addEventListener('click', () => setRole('user'));
      roleBtnAdmin.addEventListener('click', () => setRole('admin'));
    }

    // Switch between Sign In and Sign Up views
    const switchToView = (viewName) => {
      clearAlert();
      if (viewName === 'signup') {
        if (tabBtnSignUp) tabBtnSignUp.classList.add('active');
        if (tabBtnSignIn) tabBtnSignIn.classList.remove('active');

        if (window.gsap && signInFormView && signUpFormView) {
          gsap.to(signInFormView, {
            opacity: 0,
            y: -10,
            duration: 0.25,
            onComplete: () => {
              signInFormView.style.display = 'none';
              signUpFormView.style.display = 'block';
              gsap.fromTo(signUpFormView, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
            }
          });
        } else if (signInFormView && signUpFormView) {
          signInFormView.style.display = 'none';
          signUpFormView.style.display = 'block';
        }

        if (curtainHeadline) {
          curtainHeadline.textContent = 'Ready to find your clear route?';
        }
      } else {
        if (tabBtnSignIn) tabBtnSignIn.classList.add('active');
        if (tabBtnSignUp) tabBtnSignUp.classList.remove('active');

        if (window.gsap && signInFormView && signUpFormView) {
          gsap.to(signUpFormView, {
            opacity: 0,
            y: -10,
            duration: 0.25,
            onComplete: () => {
              signUpFormView.style.display = 'none';
              signInFormView.style.display = 'block';
              gsap.fromTo(signInFormView, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
            }
          });
        } else if (signInFormView && signUpFormView) {
          signUpFormView.style.display = 'none';
          signInFormView.style.display = 'block';
        }

        if (curtainHeadline) {
          curtainHeadline.textContent = 'Compact, Efficient, and Very Simple Tools';
        }
      }
    };

    if (tabBtnSignIn) tabBtnSignIn.addEventListener('click', () => switchToView('signin'));
    if (tabBtnSignUp) tabBtnSignUp.addEventListener('click', () => switchToView('signup'));
    if (switchToSignUpBtn) switchToSignUpBtn.addEventListener('click', () => switchToView('signup'));
    if (switchToSignInBtn) switchToSignInBtn.addEventListener('click', () => switchToView('signin'));

    // Check URL parameters (e.g. ?mode=signup)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'signup' || window.location.hash === '#signup') {
      switchToView('signup');
    }

    // Password visibility toggles
    const toggleBtns = authSection.querySelectorAll('.password-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const inputWrap = btn.closest('.input-with-icon');
        const input = inputWrap ? inputWrap.querySelector('input') : null;
        const icon = btn.querySelector('.toggle-icon');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        }
      });
    });

    // Helper: Email format validator
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Sign In Form submission
    const signInForm = document.getElementById('signInForm');
    const signInEmail = document.getElementById('signInEmail');
    const signInPassword = document.getElementById('signInPassword');
    const signInBtn = document.getElementById('signInBtn');

    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAlert();

        const email = signInEmail ? signInEmail.value.trim() : '';
        const password = signInPassword ? signInPassword.value.trim() : '';

        if (!email) {
          showAlert('Please enter your email address.', 'error');
          if (signInEmail) signInEmail.focus();
          return;
        }

        if (!isValidEmail(email)) {
          showAlert('Please enter a valid email address.', 'error');
          if (signInEmail) signInEmail.focus();
          return;
        }

        if (!password) {
          showAlert('Please enter your password.', 'error');
          if (signInPassword) signInPassword.focus();
          return;
        }

        if (password.length < 8) {
          showAlert('Password must be at least 8 characters long.', 'error');
          if (signInPassword) signInPassword.focus();
          return;
        }

        // Simulate login process
        if (signInBtn) signInBtn.classList.add('loading');
        setTimeout(() => {
          if (signInBtn) signInBtn.classList.remove('loading');
          const roleLabel = currentRole === 'admin' ? 'Administrator' : 'Client';
          showAlert(`Welcome back, ${roleLabel}! Authenticated successfully. Redirecting...`, 'success');

          // Store email in localStorage & sessionStorage
          try {
            if (email) {
              localStorage.setItem('stacklyUserEmail', email);
              sessionStorage.setItem('stacklyUserEmail', email);
              if (currentRole === 'admin') {
                localStorage.setItem('stacklyAdminEmail', email);
              } else {
                localStorage.setItem('stacklyClientEmail', email);
              }
            }
          } catch (err) {}

          // Smooth redirect: Admin -> admindashboard.html, Client -> userdashboard.html
          setTimeout(() => {
            if (currentRole === 'admin') {
              window.location.href = 'admindashboard.html';
            } else {
              window.location.href = 'userdashboard.html';
            }
          }, 1200);
        }, 800);
      });
    }

    // Sign Up Form submission (Fill all valid details -> redirects to login section)
    const signUpForm = document.getElementById('signUpForm');
    const signUpName = document.getElementById('signUpName');
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    const signUpBtn = document.getElementById('signUpBtn');

    if (signUpForm) {
      signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAlert();

        const name = signUpName ? signUpName.value.trim() : '';
        const email = signUpEmail ? signUpEmail.value.trim() : '';
        const password = signUpPassword ? signUpPassword.value : '';
        const confirmPassword = signUpConfirmPassword ? signUpConfirmPassword.value : '';

        // Validation 1: Name
        if (!name) {
          showAlert('Please enter your full name.', 'error');
          if (signUpName) signUpName.focus();
          return;
        }

        // Validation 2: Email
        if (!email) {
          showAlert('Please enter your email address.', 'error');
          if (signUpEmail) signUpEmail.focus();
          return;
        }
        if (!isValidEmail(email)) {
          showAlert('Please enter a valid email address (e.g. name@company.com).', 'error');
          if (signUpEmail) signUpEmail.focus();
          return;
        }

        // Validation 3: Password >= 8 chars
        if (password.length < 8) {
          showAlert('Password must be at least 8 characters long.', 'error');
          if (signUpPassword) signUpPassword.focus();
          return;
        }

        // Validation 4: Password Match
        if (password !== confirmPassword) {
          showAlert('Passwords do not match. Please verify both passwords.', 'error');
          if (signUpConfirmPassword) signUpConfirmPassword.focus();
          return;
        }

        // Validation 5: Terms
        if (agreeTerms && !agreeTerms.checked) {
          showAlert('Please accept the Terms & Privacy Policy to proceed.', 'error');
          agreeTerms.focus();
          return;
        }

        // All validations passed! Show loading state
        if (signUpBtn) signUpBtn.classList.add('loading');

        setTimeout(() => {
          if (signUpBtn) signUpBtn.classList.remove('loading');
          const roleLabel = currentRole === 'admin' ? 'Admin (Director)' : 'User (Client)';
          
          // Show success toast
          showAlert(`Account registered successfully as ${roleLabel}! Redirecting to Sign In...`, 'success');

          // Store email in storage
          try {
            if (email) {
              localStorage.setItem('stacklyUserEmail', email);
              sessionStorage.setItem('stacklyUserEmail', email);
              if (currentRole === 'admin') {
                localStorage.setItem('stacklyAdminEmail', email);
              } else {
                localStorage.setItem('stacklyClientEmail', email);
              }
            }
          } catch (err) {}

          // Switch automatically to Sign In tab after brief confirmation
          setTimeout(() => {
            switchToView('signin');
            if (signInEmail) {
              signInEmail.value = email;
            }
            if (signInPassword) {
              signInPassword.focus();
            }
            // Keep the success alert visible on Sign In view for feedback
            showAlert(`Account ready! Please enter your password to sign in as ${roleLabel}.`, 'success');
          }, 900);
        }, 700);
      });
    }

    // Enterprise Auth Provider Click Handlers (Cloud SSO, Biometric Passkey, Hardware Security Key)
    const authProviderBtns = authSection.querySelectorAll('.social-auth-btn');
    authProviderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.getAttribute('data-provider');
        let fromParam = 'cloud_sso';
        if (provider === 'passkey') fromParam = 'biometric_passkey';
        if (provider === 'key') fromParam = 'security_key';

        const state = record404ReturnState(btn);
        window.location.href = `404.html?from=${fromParam}&return_page=login.html&return_scroll=${state.scrollPos}&return_section=authSection`;
      });
    });

    // 3D Perspective Tilt on Role Cards and Social Buttons
    if (window.innerWidth >= 1024 && window.gsap) {
      const interactiveCards = authSection.querySelectorAll('.privilege-card, .social-auth-btn');
      interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
          const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
          gsap.to(card, {
            rotateY: normX * 10,
            rotateX: -normY * 10,
            transformPerspective: 800,
            duration: 0.25,
            ease: 'power1.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
        });
      });
    }
  };

  // Initialize Auth Page
  initAuthPage();

  // ==========================================================================
  // USER DASHBOARD MODULE (Tabs, Mobile Drawer, Telemetry & Filter)
  // ==========================================================================
  const initUserDashboard = () => {
    const dashSidebar = document.getElementById('dashSidebar');
    if (!dashSidebar) return; // Only execute on userdashboard.html

    const hamburgerBtn = document.getElementById('dashHamburgerBtn');
    const closeBtn = document.getElementById('dashSidebarClose');
    const backdrop = document.getElementById('dashBackdrop');
    const navBtns = document.querySelectorAll('.dash-nav-btn');
    const tabSections = document.querySelectorAll('.dash-tab-section');
    const crumbActive = document.getElementById('dashCrumbActive');
    const viewTitle = document.getElementById('dashViewTitle');
    const searchInput = document.getElementById('dashSearchInput');

    // Populate user email from storage or URL parameter
    const userNames = document.querySelectorAll('.dash-user-name');
    let savedEmail = '';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      savedEmail = urlParams.get('email') || 
                   localStorage.getItem('stacklyClientEmail') || 
                   localStorage.getItem('stacklyUserEmail') || 
                   sessionStorage.getItem('stacklyUserEmail') || 
                   'client@stackly.io';
    } catch (e) {
      savedEmail = 'client@stackly.io';
    }
    if (savedEmail) {
      userNames.forEach(el => {
        el.textContent = savedEmail;
        el.setAttribute('title', savedEmail);
      });
    }

    // Tab Metadata for breadcrumbs & page header
    const tabMeta = {
      'overview': {
        crumb: 'Overview & Fleet',
        title: 'Cloud Workload & Telemetry Overview'
      },
      'workloads': {
        crumb: 'Workload & Compute',
        title: 'Kubernetes Workload & Node Telemetry'
      },
      'finops': {
        crumb: 'FinOps & Savings',
        title: 'FinOps Analytics & Multi-Cloud Cost Optimization'
      },
      'migration': {
        crumb: 'Migration & CDC Hub',
        title: 'CDC Migration Pipeline & Database Sync'
      },
      'security': {
        crumb: 'Security & SOC 2',
        title: 'Zero-Trust Security & SOC 2 Compliance Shield'
      },
      'support': {
        crumb: 'Support & War-Room',
        title: 'Dedicated DevOps War-Room & Escalation Desk'
      }
    };

    // Mobile Sidebar Drawer Handlers
    const openSidebar = () => {
      dashSidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeSidebar = () => {
      dashSidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dashSidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeSidebar);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dashSidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Tab Switching Function
    const switchTab = (tabId) => {
      if (!tabMeta[tabId]) return;

      // Update Nav Buttons
      navBtns.forEach((btn) => {
        const isTarget = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isTarget);
        btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      // Update Tab Content Sections
      tabSections.forEach((section) => {
        const isTarget = section.id === `view-${tabId}` || section.id === `tab-${tabId}` || section.id === tabId;
        if (isTarget) {
          section.classList.add('active');
          section.style.display = 'block';
          section.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
          if (window.gsap) {
            gsap.fromTo(section, 
              { opacity: 0, y: 14 }, 
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
            );
          }
          if (window.AOS) {
            setTimeout(() => { window.AOS.refresh(); }, 50);
          }
        } else {
          section.classList.remove('active');
          section.style.display = 'none';
        }
      });

      // Update Breadcrumbs & View Title
      if (crumbActive) crumbActive.textContent = tabMeta[tabId].crumb;
      if (viewTitle) viewTitle.textContent = tabMeta[tabId].title;

      // Close mobile sidebar if open
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }

      // Reset search if any
      if (searchInput) {
        searchInput.value = '';
        const allCards = document.querySelectorAll('.dash-panel-card, .dash-stat-card, .dash-cluster-card, .dash-pipeline-step, .dash-cost-breakdown-card');
        allCards.forEach(c => c.style.display = '');
      }

      // Scroll to top of dashboard content smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Attach click to tab buttons
    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) {
          switchTab(tab);
        }
      });
    });

    // Logo Click Handler: Clean reload and open userdashboard.html main page
    const dashBrandLinks = document.querySelectorAll('.dash-brand-link');
    dashBrandLinks.forEach((brandLink) => {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.removeItem('stackly_instant_restore');
        sessionStorage.removeItem('stackly_target_scroll');
        sessionStorage.removeItem('stackly_target_section');
        sessionStorage.removeItem('stackly_target_tab');
        sessionStorage.removeItem('stackly_last_scroll');
        sessionStorage.removeItem('stackly_last_section');
        sessionStorage.removeItem('stackly_last_tab');

        if (window.location.hash || window.location.search) {
          window.location.href = 'userdashboard.html';
        } else {
          window.location.reload();
        }
      });
    });

    // URL Hash or Query param deep-linking (e.g. #workloads or ?tab=finops)
    const hash = window.location.hash.replace('#view-', '').replace('#tab-', '').replace('#', '');
    const urlParams = new URLSearchParams(window.location.search);
    const queryTab = urlParams.get('tab') || sessionStorage.getItem('stackly_target_tab') || sessionStorage.getItem('stackly_last_tab');
    const initialTab = queryTab || hash;
    if (initialTab && tabMeta[initialTab]) {
      switchTab(initialTab);
    }

    // Quick Search Filtering
    if (searchInput) {
      // Shortcut: Ctrl+K or Cmd+K to focus
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          searchInput.focus();
        }
      });

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const activeSection = document.querySelector('.dash-tab-section.active');
        if (!activeSection) return;

        const searchableCards = activeSection.querySelectorAll('.dash-stat-card, .dash-panel-card, .dash-cluster-card, .dash-pipeline-step, .dash-cost-breakdown-card, .dash-telemetry-row');
        
        searchableCards.forEach((card) => {
          if (!query) {
            card.style.display = '';
          } else {
            const text = (card.textContent || '').toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
          }
        });
      });
    }

    // Refresh telemetry pulse animation on live metrics
    setInterval(() => {
      const pulseDots = document.querySelectorAll('.dash-status-dot');
      pulseDots.forEach(dot => {
        dot.style.opacity = '0.5';
        setTimeout(() => { dot.style.opacity = '1'; }, 300);
      });
    }, 4000);
  };

  // Initialize User Dashboard
  initUserDashboard();

  // ==========================================================================
  // SUPERADMIN DASHBOARD MODULE (Master Control, Responsive Drawer, Tabs & Ops)
  // ==========================================================================
  const initAdminDashboard = () => {
    const adminSidebar = document.getElementById('adminSidebar');
    if (!adminSidebar) return; // Only execute on admindashboard.html

    const hamburgerBtn = document.getElementById('adminHamburgerBtn');
    const closeBtn = document.getElementById('adminSidebarClose');
    const backdrop = document.getElementById('adminBackdrop');
    const navBtns = adminSidebar.querySelectorAll('.dash-nav-btn');
    const tabSections = document.querySelectorAll('.dash-tab-section');
    const viewTitle = document.getElementById('adminViewTitle');

    // Populate admin email from storage or URL parameter
    const adminNames = document.querySelectorAll('.dash-user-name');
    let savedAdminEmail = '';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      savedAdminEmail = urlParams.get('email') || 
                        localStorage.getItem('stacklyAdminEmail') || 
                        localStorage.getItem('stacklyUserEmail') || 
                        sessionStorage.getItem('stacklyUserEmail') || 
                        'admin@stackly.io';
    } catch (e) {
      savedAdminEmail = 'admin@stackly.io';
    }
    if (savedAdminEmail) {
      adminNames.forEach(el => {
        el.textContent = savedAdminEmail;
        el.setAttribute('title', savedAdminEmail);
      });
    }

    // Admin Tab Titles for page header
    const tabMeta = {
      'ctrl-plane': {
        title: 'Global Multi-Cloud Control Plane & Fleet Orchestration'
      },
      'tenants': {
        title: 'Multi-Tenant Enterprise Organizations & Quotas'
      },
      'finops-gov': {
        title: 'FinOps & Infrastructure Gross Margin Governance'
      },
      'bare-metal': {
        title: 'Compute Fleet & Bare-Metal Hypervisors'
      },
      'sec-ops': {
        title: 'Zero-Trust Operations & CVE Vulnerability Radar'
      },
      'sre-warroom': {
        title: 'SRE Incident Command & War-Room Dispatch'
      }
    };

    // Mobile Sidebar Drawer Handlers
    const openSidebar = () => {
      adminSidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeSidebar = () => {
      adminSidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (adminSidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSidebar();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSidebar();
      });
    }

    // Prevent clicks inside the sidebar from closing it
    adminSidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && adminSidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Tab Switching Function
    const switchTab = (tabId) => {
      if (!tabMeta[tabId]) return;

      // Update Sidebar Nav Buttons
      navBtns.forEach((btn) => {
        const isTarget = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isTarget);
        btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      // Update Tab Content Sections
      tabSections.forEach((section) => {
        const isTarget = section.id === `view-${tabId}` || section.id === `tab-${tabId}` || section.id === tabId;
        if (isTarget) {
          section.classList.add('active');
          section.style.display = 'block';
          section.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
          if (window.gsap) {
            gsap.fromTo(section, 
              { opacity: 0, y: 14 }, 
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
            );
          }
          if (window.AOS) {
            setTimeout(() => { window.AOS.refresh(); }, 50);
          }
        } else {
          section.classList.remove('active');
          section.style.display = 'none';
        }
      });

      // Update View Title
      if (viewTitle && tabMeta[tabId]) {
        viewTitle.textContent = tabMeta[tabId].title;
      }

      // Close mobile sidebar if open
      if (adminSidebar.classList.contains('open')) {
        closeSidebar();
      }

      // Scroll to top of dashboard content smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Attach click to sidebar tab buttons
    navBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tab = btn.getAttribute('data-tab');
        if (tab) {
          switchTab(tab);
          closeSidebar();
        }
      });
    });

    // Logo Click Handler: Clean reload and open admindashboard.html main page
    const dashBrandLinks = document.querySelectorAll('.dash-brand-link');
    dashBrandLinks.forEach((brandLink) => {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.removeItem('stackly_instant_restore');
        sessionStorage.removeItem('stackly_target_scroll');
        sessionStorage.removeItem('stackly_target_section');
        sessionStorage.removeItem('stackly_target_tab');
        sessionStorage.removeItem('stackly_last_scroll');
        sessionStorage.removeItem('stackly_last_section');
        sessionStorage.removeItem('stackly_last_tab');

        if (window.location.hash || window.location.search) {
          window.location.href = 'admindashboard.html';
        } else {
          window.location.reload();
        }
      });
    });

    // URL Hash or Query param deep-linking (e.g. #sec-ops or ?tab=finops-gov)
    const hash = window.location.hash.replace('#view-', '').replace('#tab-', '').replace('#', '');
    const urlParams = new URLSearchParams(window.location.search);
    const queryTab = urlParams.get('tab') || sessionStorage.getItem('stackly_target_tab') || sessionStorage.getItem('stackly_last_tab');
    const initialTab = queryTab || hash;
    if (initialTab && tabMeta[initialTab]) {
      switchTab(initialTab);
    }
  };

  // Initialize Admin Dashboard
  initAdminDashboard();

});





