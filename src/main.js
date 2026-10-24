import './style.css';
import Swiper from 'swiper';
import { Autoplay, Keyboard } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';

const currentEl = document.querySelector('[data-hero-current]');
const progressEl = document.querySelector('[data-hero-progress]');
const heroSection = document.querySelector('[data-hero-section]');

const formatIndex = (index) => String(index + 1).padStart(2, '0');

const heroSwiper = new Swiper('[data-hero-swiper]', {
  modules: [Autoplay, Keyboard],
  loop: true,
  speed: 700,
  simulateTouch: true,
  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange(swiper) {
      currentEl.textContent = formatIndex(swiper.realIndex);
    },
    autoplayTimeLeft(swiper, timeLeft, progress) {
      progressEl.style.transform = `scaleX(${1 - progress})`;
    },
  },
});

if (window.matchMedia('(hover: hover)').matches) {
  heroSection.addEventListener('mouseenter', () => heroSwiper.autoplay.stop());
  heroSection.addEventListener('mouseleave', () => heroSwiper.autoplay.start());
}

const testimonialQuote = document.querySelector('[data-testimonial-quote]');
const testimonialName = document.querySelector('[data-testimonial-name]');
const testimonialRole = document.querySelector('[data-testimonial-role]');
const testimonialDots = [...document.querySelectorAll('[data-testimonial-dot]')];
const testimonialPrev = document.querySelector('[data-testimonial-prev]');
const testimonialNext = document.querySelector('[data-testimonial-next]');

const testimonials = [
  {
    quote:
      '“Studying at WOC is fun, the curriculum is complete, the instructors are competent, and the assignments given are also relevant to the current scope of work.”',
    name: 'Resky Fernanda',
    role: 'Product Designer at Tokopedia',
  },
  {
    quote:
      '“Lorem ipsum dolor sit amet consectetur. Suspendisse suspendisse tempor et ipsum sit egestas nunc. Diam in cum a in.”',
    name: 'Lorem Ipsum',
    role: 'Role at Company',
  },
  {
    quote:
      '“Lorem ipsum dolor sit amet consectetur. Suspendisse suspendisse tempor et ipsum sit egestas nunc. Diam in cum a in.”',
    name: 'Lorem Ipsum',
    role: 'Role at Company',
  },
  {
    quote:
      '“Lorem ipsum dolor sit amet consectetur. Suspendisse suspendisse tempor et ipsum sit egestas nunc. Diam in cum a in.”',
    name: 'Lorem Ipsum',
    role: 'Role at Company',
  },
];

let testimonialIndex = 0;

const showTestimonial = (index) => {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  const t = testimonials[testimonialIndex];
  testimonialQuote.setAttribute('data-hidden', '');
  window.setTimeout(() => {
    testimonialQuote.textContent = t.quote;
    testimonialName.textContent = t.name;
    testimonialRole.textContent = t.role;
    testimonialQuote.removeAttribute('data-hidden');
  }, 180);
  testimonialDots.forEach((dot, i) => {
    if (i === testimonialIndex) {
      dot.setAttribute('data-active', '');
    } else {
      dot.removeAttribute('data-active');
    }
  });
};

testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));
testimonialPrev.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
testimonialNext.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

const newsletterForm = document.querySelector('[data-newsletter]');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  const button = newsletterForm.querySelector('button');
  if (!input.value.trim()) {
    input.focus();
    return;
  }
  const originalText = button.textContent;
  button.textContent = 'Thanks!';
  button.disabled = true;
  input.value = '';
  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2500);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const heroParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-hero-section]',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  heroParallax
    .to('[data-hero-swiper]', { yPercent: 18, ease: 'none' }, 0)
    .to('[data-hero-content]', { yPercent: -14, autoAlpha: 0, ease: 'none' }, 0);

  gsap.utils.toArray('[data-animate]').forEach((el) => {
    const kind = el.dataset.animate || 'up';
    const from = { opacity: 0 };
    if (kind === 'up') from.y = 80;
    if (kind === 'left') from.x = 96;
    if (kind === 'right') from.x = -96;
    if (kind === 'zoom') from.scale = 0.88;

    gsap.from(el, {
      ...from,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'restart none none reverse',
      },
    });
  });

  gsap.utils.toArray('[data-animate-group]').forEach((group) => {
    const stagger = parseFloat(group.dataset.animateStagger || '0.15');

    gsap.from(group.children, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: group,
        start: 'top 88%',
        toggleActions: 'restart none none reverse',
      },
    });
  });
}

const burger = document.querySelector('[data-burger]');
const menu = document.querySelector('#mobile-menu');
const iconOpen = burger.querySelector('[data-icon-open]');
const iconClose = burger.querySelector('[data-icon-close]');

const setMenu = (open) => {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
};

burger.addEventListener('click', () => setMenu(menu.hidden));

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});
