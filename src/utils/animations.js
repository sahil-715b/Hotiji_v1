import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animate elements on initial mount (fade in and slide up)
 */
export const animateFadeUp = (target, options = {}) => {
  if (!target) return;
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: options.y || 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      delay: options.delay || 0,
      stagger: options.stagger || 0,
      ease: options.ease || 'power3.out',
    }
  );
};

/**
 * Animate staggered grid children when scrolled into view
 */
export const animateStaggerGrid = (container, itemSelector = '.grid-item', options = {}) => {
  if (!container) return;

  const items = container.querySelectorAll(itemSelector);
  if (!items || items.length === 0) return;

  return gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.7,
      stagger: options.stagger || 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Subtle pulse/float effect for CTA or floating widgets
 */
export const animateFloating = (target) => {
  if (!target) return;
  return gsap.to(target, {
    y: -6,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export default {
  animateFadeUp,
  animateStaggerGrid,
  animateFloating,
};
