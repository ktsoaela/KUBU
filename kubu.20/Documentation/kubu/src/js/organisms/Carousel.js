// Adds previous/next buttons, dots and optional autoplay to the CSS scroll-snap carousel.
// Autoplay pauses on hover and focus, and is skipped when the user prefers reduced motion.
const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

export class Carousel {
    constructor(selector, options = {}) {
        this.track = resolve(selector);
        this.items = [...this.track.querySelectorAll('.carousel-item')];
        this.interval = options.interval || 5000;
        this.autoplay = Boolean(options.autoplay) && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.timer = null;
        this.index = 0;
        this.track.setAttribute('tabindex', '0');
        this.track.setAttribute('aria-roledescription', 'carousel');
        this.renderControls();
        this.observe();
        this.setActive(0);
        if (this.autoplay) this.play();
    }

    renderControls() {
        this.controls = document.createElement('div');
        this.controls.className = 'carousel__controls';
        const dots = this.items
            .map((_, i) => `<button type="button" class="carousel__dot" aria-label="Go to slide ${i + 1}"></button>`)
            .join('');
        this.controls.innerHTML = `
            <button type="button" class="carousel__prev" aria-label="Previous slide">&#8249;</button>
            <div class="carousel__dots">${dots}</div>
            <button type="button" class="carousel__next" aria-label="Next slide">&#8250;</button>`;
        this.track.after(this.controls);

        this.dots = [...this.controls.querySelectorAll('.carousel__dot')];
        this.controls.querySelector('.carousel__prev').addEventListener('click', () => this.go(this.index - 1));
        this.controls.querySelector('.carousel__next').addEventListener('click', () => this.go(this.index + 1));
        this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.go(i)));

        ['mouseenter', 'focusin'].forEach((type) => this.track.addEventListener(type, () => this.pause()));
        ['mouseleave', 'focusout'].forEach((type) =>
            this.track.addEventListener(type, () => {
                if (this.autoplay && this.timer === null) this.play();
            })
        );
    }

    observe() {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && this.setActive(this.items.indexOf(entry.target))),
            { root: this.track, threshold: 0.6 }
        );
        this.items.forEach((item) => observer.observe(item));
    }

    setActive(index) {
        this.index = index;
        this.dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    }

    go(index) {
        const next = (index + this.items.length) % this.items.length;
        this.track.scrollTo({ left: this.items[next].offsetLeft - this.track.offsetLeft, behavior: 'smooth' });
        this.setActive(next);
    }

    play() {
        this.timer = setInterval(() => this.go(this.index + 1), this.interval);
    }

    pause() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
