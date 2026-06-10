document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initMobileMenu();
    initCardTilt();
    initMagneticButtons();
    initSplashScreen();
});

function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    if (revealElements.length === 0) {
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

    if (!menuToggle || !mobileMenuOverlay) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isActive = mobileMenuOverlay.classList.toggle("is-active");
        document.body.style.overflow = isActive ? "hidden" : "";
    });

    mobileMenuOverlay.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    });
}

function initCardTilt() {
    const cards = document.querySelectorAll(".glass-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            card.style.transition = "transform 0.5s ease";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translate(0px, 0px)";
            button.style.transition = "transform 0.3s ease";
        });

        button.addEventListener("mouseenter", () => {
            button.style.transition = "none";
        });
    });
}

function initSplashScreen() {
    const splashWrapper = document.getElementById("splash-wrapper");
    const desktopCta = document.getElementById("desktop-cta");
    const mobileCta = document.getElementById("mobile-cta");

    if (!splashWrapper || (!desktopCta && !mobileCta)) {
        document.body.classList.remove("splash-active", "splash-locked");
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const teardownParticles = initSplashParticles(splashWrapper, prefersReducedMotion);
    let isClosing = false;

    const releasePage = () => {
        document.body.classList.remove("splash-active", "splash-locked");
        if (!document.querySelector(".mobile-menu-overlay.is-active")) {
            document.body.style.overflow = "";
        }
    };

    const revealHero = () => {
        document.querySelectorAll(".hero-section-main .reveal-up").forEach((element) => {
            element.classList.add("is-visible");
        });
    };

    const dismissSplash = () => {
        if (isClosing) {
            return;
        }

        isClosing = true;
        splashWrapper.classList.add("fade-out");
        releasePage();
        revealHero();
        teardownParticles();

        window.setTimeout(() => {
            splashWrapper.remove();
        }, prefersReducedMotion ? 240 : 1450);
    };

    [desktopCta, mobileCta].filter(Boolean).forEach((button) => {
        button.addEventListener("click", dismissSplash);
    });
}

function initSplashParticles(splashWrapper, prefersReducedMotion) {
    const canvas = document.getElementById("splash-particles");

    if (!canvas || prefersReducedMotion) {
        return () => {};
    }

    const context = canvas.getContext("2d");

    if (!context) {
        return () => {};
    }

    const particles = [];
    const pointer = { x: 0, y: 0, active: false };
    const devicePixelRatioValue = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let particleCap = width >= 1024 ? 96 : 56;

    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        particleCap = width >= 1024 ? 96 : 56;
        canvas.width = Math.floor(width * devicePixelRatioValue);
        canvas.height = Math.floor(height * devicePixelRatioValue);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(devicePixelRatioValue, 0, 0, devicePixelRatioValue, 0, 0);
    };

    const spawnParticle = () => {
        particles.push({
            x: Math.random() * width,
            y: height + Math.random() * 120,
            vx: (Math.random() - 0.5) * 0.32,
            vy: -(0.6 + Math.random() * 1.25),
            sway: Math.random() * Math.PI * 2,
            swaySpeed: 0.01 + Math.random() * 0.02,
            radius: 0.8 + Math.random() * 2.4,
            life: 0,
            maxLife: 110 + Math.random() * 80,
            alpha: 0.25 + Math.random() * 0.55
        });
    };

    const updateParticles = () => {
        context.clearRect(0, 0, width, height);

        while (particles.length < particleCap) {
            spawnParticle();
        }

        for (let index = particles.length - 1; index >= 0; index -= 1) {
            const particle = particles[index];
            particle.life += 1;
            particle.sway += particle.swaySpeed;
            particle.x += particle.vx + Math.sin(particle.sway) * 0.18;
            particle.y += particle.vy;

            if (pointer.active) {
                const dx = particle.x - pointer.x;
                const dy = particle.y - pointer.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 140 && distance > 0) {
                    const force = (140 - distance) / 140;
                    particle.x += (dx / distance) * force * 1.2;
                    particle.y += (dy / distance) * force * 0.7;
                }
            }

            const lifeProgress = particle.life / particle.maxLife;
            const opacity = Math.max(0, (1 - lifeProgress) * particle.alpha);

            context.beginPath();
            context.fillStyle = `rgba(255, 164, 48, ${opacity})`;
            context.shadowBlur = 12;
            context.shadowColor = "rgba(245, 158, 11, 0.35)";
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();

            if (particle.life >= particle.maxLife || particle.y < -40) {
                particles.splice(index, 1);
            }
        }

        frameId = window.requestAnimationFrame(updateParticles);
    };

    const handlePointerMove = (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
    };

    const handlePointerLeave = () => {
        pointer.active = false;
    };

    resizeCanvas();
    updateParticles();

    window.addEventListener("resize", resizeCanvas);
    splashWrapper.addEventListener("pointermove", handlePointerMove);
    splashWrapper.addEventListener("pointerleave", handlePointerLeave);

    return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resizeCanvas);
        splashWrapper.removeEventListener("pointermove", handlePointerMove);
        splashWrapper.removeEventListener("pointerleave", handlePointerLeave);
        context.clearRect(0, 0, width, height);
    };
}
