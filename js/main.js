"use strict";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => (motionQuery.matches ? "auto" : "smooth");

const projects = {
  solace: {
    title: "Solace",
    category: "Brand identity · Packaging",
    year: "2026",
    image: "assets/images/work-solace.svg",
    alt: "Solace identity artwork with terracotta and sage arches and a gold sun",
    summary: "A modern apothecary brand built around the idea that calm is a daily practice.",
    description:
      "Solace came to us with a strong product and a forgettable shelf presence. We rebuilt the brand around one tension — clinical trust, human warmth — and designed a packaging system that feels like a deep breath in a crowded aisle. The identity flexes across more than 40 products without losing its voice.",
    scope: ["Brand strategy", "Naming architecture", "Identity system", "Packaging", "Art direction", "Guidelines"],
    results: [
      { value: "+38%", label: "Shelf conversion" },
      { value: "2.4×", label: "Retail reorders" },
      { value: "9 wks", label: "To launch" }
    ],
    quote: {
      text: "“Aurum turned a messy idea into a brand our customers actually talk about. The process was calm, sharp and genuinely fun.”",
      author: "Mira Kapoor, Founder, Solace"
    }
  },
  orbit: {
    title: "Orbit",
    category: "Product design · Website",
    year: "2025",
    image: "assets/images/work-orbit.svg",
    alt: "Orbit fintech app on a phone with a mint chart on a deep blue background",
    summary: "A fintech app that makes long-term investing feel less like homework.",
    description:
      "Orbit's product was powerful but spoke fluent spreadsheet. We reframed the experience around small, confident decisions — then designed an interface and marketing site that make compounding feel tangible. The design system now powers web and mobile from one source.",
    scope: ["Product strategy", "UX research", "UI design", "Design system", "Marketing site", "Prototyping"],
    results: [
      { value: "+52%", label: "Activation rate" },
      { value: "−31%", label: "Support tickets" },
      { value: "4.8★", label: "App store rating" }
    ],
    quote: {
      text: "“The team moves like a partner, not a vendor. Every detail had a reason — and the launch numbers showed it.”",
      author: "Daniel Rhodes, CMO, Orbit"
    }
  },
  nocturne: {
    title: "Nocturne",
    category: "Identity · Art direction",
    year: "2025",
    image: "assets/images/work-nocturne.svg",
    alt: "Nocturne restaurant wordmark in cream serif on a burgundy background with a gold moon",
    summary: "A late-night dining room with the confidence to keep the lights low.",
    description:
      "Nocturne needed a brand as considered as its tasting menu. We built an identity around moonlight, ink and quiet luxury — from the wordmark and menus to the photography direction and the room's smallest details. It launched fully booked and stayed that way.",
    scope: ["Identity", "Wordmark", "Menu system", "Art direction", "Photography", "Signage"],
    results: [
      { value: "100%", label: "Booked first month" },
      { value: "+27%", label: "Average spend" },
      { value: "3", label: "Design awards" }
    ],
    quote: {
      text: "“We raised our prices after the rebrand. Nobody blinked. That is what good design does.”",
      author: "Anika Rao, Co-founder, Nocturne"
    }
  },
  atlas: {
    title: "Atlas",
    category: "Digital experience · Strategy",
    year: "2024",
    image: "assets/images/work-atlas.svg",
    alt: "Atlas architecture artwork with black building forms, a terracotta sun and dimension lines",
    summary: "An architecture practice's first digital home — precise, generous and unhurried.",
    description:
      "Atlas had 20 years of extraordinary work and a website that hid it. We rebuilt the digital experience around the projects themselves: large-format imagery, deliberate pacing and a structure that lets the work breathe. The site is now their strongest new-business tool.",
    scope: ["Digital strategy", "Content architecture", "UX design", "Web design", "Development", "CMS"],
    results: [
      { value: "+64%", label: "Inbound enquiries" },
      { value: "2:06", label: "Avg. session" },
      { value: "98", label: "Lighthouse score" }
    ],
    quote: {
      text: "“They understood the practice before they designed a single screen. The site feels like us — only clearer.”",
      author: "Jonas Berg, Partner, Atlas"
    }
  }
};

const projectOrder = ["solace", "orbit", "nocturne", "atlas"];
const planBudgets = {
  sprint: "$5k–$15k",
  brand: "$15k–$30k",
  retainer: "Ongoing retainer"
};

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mainEl = document.getElementById("main");
const footerEl = document.querySelector(".site-footer");
const backToTop = document.getElementById("back-to-top");
const yearEl = document.getElementById("year");
const navLinks = Array.from(document.querySelectorAll(".desktop-nav .nav-link"));

let menuOpen = false;

function setMenu(open, returnFocus = true) {
  menuOpen = open;
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
  if (mainEl) mainEl.inert = open;
  if (footerEl) footerEl.inert = open;
  if (open) {
    window.requestAnimationFrame(() => {
      const firstLink = mobileMenu.querySelector(".mobile-nav a");
      if (firstLink) firstLink.focus();
    });
  } else if (returnFocus) {
    menuToggle.focus();
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => setMenu(!menuOpen));

  mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      setMenu(false, false);
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      window.setTimeout(() => {
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
          target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        }
        target.focus({ preventScroll: true });
      }, 0);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) setMenu(false);
  });

  const desktopQuery = window.matchMedia("(min-width: 861px)");
  const handleDesktopChange = (event) => {
    if (event.matches && menuOpen) setMenu(false, false);
  };
  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleDesktopChange);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(handleDesktopChange);
  }
}

let navCurrent = null;

function updateNav() {
  const threshold = window.innerHeight * 0.35;
  let current = null;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.getBoundingClientRect().top <= threshold) current = section;
  });
  if (current === navCurrent) return;
  navCurrent = current;
  navLinks.forEach((link) => {
    const active = current !== null && link.getAttribute("href") === "#" + current.id;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

let scrollTicking = false;

function handleScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
    updateNav();
    scrollTicking = false;
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const counters = Array.from(document.querySelectorAll(".stat-number[data-count]"));
const countersReduced = motionQuery.matches;

function animateCounter(element) {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;
  if (countersReduced) {
    element.textContent = String(target);
    return;
  }
  const duration = 1500;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) window.requestAnimationFrame(frame);
    else element.textContent = String(target);
  }
  window.requestAnimationFrame(frame);
}

if (counters.length) {
  if (!countersReduced) counters.forEach((counter) => { counter.textContent = "0"; });
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".quote-slide"));
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  const currentLabel = carousel.querySelector("[data-carousel-current]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = [];
  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

  if (dotsWrap) dotsWrap.setAttribute("role", "group");

  function goTo(nextIndex) {
    if (!slides.length) return;
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (currentLabel) currentLabel.textContent = String(index + 1).padStart(2, "0");
  }

  if (dotsWrap) {
    slides.forEach((slide, slideIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show testimonial " + (slideIndex + 1) + " of " + slides.length);
      dot.addEventListener("click", () => goTo(slideIndex));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  if (prevButton) prevButton.addEventListener("click", () => goTo(index - 1));
  if (nextButton) nextButton.addEventListener("click", () => goTo(index + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  goTo(index);
}

document.querySelectorAll(".faq-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".faq-item");
    const willOpen = !item.classList.contains("is-open");
    document.querySelectorAll(".faq-trigger").forEach((otherTrigger) => {
      const otherItem = otherTrigger.closest(".faq-item");
      if (otherItem !== item && otherItem.classList.contains("is-open")) {
        otherItem.classList.remove("is-open");
        otherTrigger.setAttribute("aria-expanded", "false");
      }
    });
    item.classList.toggle("is-open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

const dialog = document.getElementById("project-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogCategory = document.getElementById("dialog-category");
const dialogYear = document.getElementById("dialog-year");
const dialogTitle = document.getElementById("dialog-title");
const dialogSummary = document.getElementById("dialog-summary");
const dialogDesc = document.getElementById("dialog-desc");
const dialogScope = document.getElementById("dialog-scope");
const dialogResults = document.getElementById("dialog-results");
const dialogQuote = document.getElementById("dialog-quote");
const dialogNext = document.getElementById("dialog-next");
const dialogContent = document.getElementById("dialog-content");
let currentProject = null;

function fillProject(id) {
  const project = projects[id];
  if (!project) return;
  currentProject = id;
  if (dialogImage) {
    dialogImage.src = project.image;
    dialogImage.alt = project.alt;
  }
  if (dialogCategory) dialogCategory.textContent = project.category;
  if (dialogYear) dialogYear.textContent = project.year;
  if (dialogTitle) dialogTitle.textContent = project.title;
  if (dialogSummary) dialogSummary.textContent = project.summary;
  if (dialogDesc) dialogDesc.textContent = project.description;
  if (dialogScope) {
    dialogScope.replaceChildren(
      ...project.scope.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );
  }
  if (dialogResults) {
    dialogResults.replaceChildren(
      ...project.results.map((result) => {
        const wrapper = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");
        term.textContent = result.value;
        description.textContent = result.label;
        wrapper.append(term, description);
        return wrapper;
      })
    );
  }
  if (dialogQuote) {
    const quoteText = document.createElement("p");
    const cite = document.createElement("cite");
    quoteText.textContent = project.quote.text;
    cite.textContent = project.quote.author;
    dialogQuote.replaceChildren(quoteText, cite);
  }
  if (dialogContent) dialogContent.scrollTop = 0;
}

function openProject(id) {
  if (!dialog) return;
  fillProject(id);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  document.body.classList.add("dialog-open");
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

if (dialogNext) {
  dialogNext.addEventListener("click", () => {
    if (!currentProject) return;
    const nextIndex = (projectOrder.indexOf(currentProject) + 1) % projectOrder.length;
    fillProject(projectOrder[nextIndex]);
  });
}

if (dialog) {
  dialog.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    currentProject = null;
  });
}

const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const successTitle = document.getElementById("success-title");
const successMeta = document.getElementById("success-meta");
const resetButton = document.getElementById("form-reset");
const submitButton = document.getElementById("form-submit");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const budgetSelect = document.getElementById("budget");
const contactPanel = document.getElementById("contact-panel");
const submitMarkup = submitButton ? submitButton.innerHTML : "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let submitTimer = 0;
let highlightTimer = 0;

function fieldOf(input) {
  return input.closest(".field");
}

function setFieldError(input, message) {
  const field = fieldOf(input);
  if (!field) return;
  const error = field.querySelector(".field-error");
  if (message) {
    field.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  } else {
    field.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }
}

function validateForm() {
  let firstInvalid = null;
  const checks = [
    { input: nameInput, message: "Please tell us your name." },
    {
      input: emailInput,
      message: "Please enter a valid email address.",
      test: (value) => emailPattern.test(value)
    },
    { input: messageInput, message: "Please tell us a little about the project." },
    {
      input: consentInput,
      message: "Please confirm we can contact you.",
      test: (value, input) => input.checked
    }
  ];

  checks.forEach(({ input, message, test }) => {
    if (!input) return;
    const value = input.type === "checkbox" ? "" : input.value.trim();
    const valid = test ? test(value, input) : value.length > 0;
    setFieldError(input, valid ? "" : message);
    if (!valid && !firstInvalid) firstInvalid = input;
  });

  return firstInvalid;
}

if (form) {
  const clearFieldError = (event) => {
    const field = fieldOf(event.target);
    if (!field || !field.classList.contains("has-error")) return;
    const input = field.querySelector("input, select, textarea");
    if (input) setFieldError(input, "");
  };

  form.addEventListener("input", clearFieldError);
  form.addEventListener("change", clearFieldError);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstInvalid = validateForm();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    if (!submitButton || !success) return;

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    window.clearTimeout(submitTimer);
    submitTimer = window.setTimeout(() => {
      const fullName = nameInput ? nameInput.value.trim() : "";
      const firstName = fullName.split(/\s+/)[0];
      const email = emailInput ? emailInput.value.trim() : "";
      const budget = budgetSelect ? budgetSelect.value : "";
      if (successTitle) {
        successTitle.textContent = firstName ? "Thank you, " + firstName + "." : "Thank you.";
      }
      if (successMeta) {
        successMeta.textContent =
          "Reply to " + email + (budget ? " · Budget: " + budget : "") + " · Demo only — nothing was sent.";
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
      submitButton.disabled = false;
      submitButton.innerHTML = submitMarkup;
    }, 700);
  });
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    window.clearTimeout(submitTimer);
    if (form) {
      form.reset();
      form.querySelectorAll(".field.has-error").forEach((field) => {
        field.classList.remove("has-error");
        const input = field.querySelector("input, select, textarea");
        if (input) input.removeAttribute("aria-invalid");
        const error = field.querySelector(".field-error");
        if (error) error.textContent = "";
      });
      form.hidden = false;
    }
    if (success) success.hidden = true;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = submitMarkup;
    }
    if (nameInput) nameInput.focus();
  });
}

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    if (form && form.hidden) {
      form.hidden = false;
      if (success) success.hidden = true;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = submitMarkup;
      }
    }
    const budget = planBudgets[button.dataset.plan];
    if (budget && budgetSelect) budgetSelect.value = budget;
    if (contactPanel) {
      window.clearTimeout(highlightTimer);
      contactPanel.classList.add("is-highlighted");
      contactPanel.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      highlightTimer = window.setTimeout(() => contactPanel.classList.remove("is-highlighted"), 2400);
    }
    if (nameInput) {
      window.setTimeout(
        () => nameInput.focus({ preventScroll: true }),
        motionQuery.matches ? 0 : 500
      );
    }
  });
});

const hero = document.querySelector(".hero");
if (hero && window.matchMedia("(pointer: fine)").matches && !motionQuery.matches) {
  let spotlightFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  hero.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (spotlightFrame) return;
    spotlightFrame = window.requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = ((pointerX - rect.left) / rect.width) * 100;
      const y = ((pointerY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", x.toFixed(2) + "%");
      hero.style.setProperty("--my", y.toFixed(2) + "%");
      spotlightFrame = 0;
    });
  });
}

if (yearEl) yearEl.textContent = String(new Date().getFullYear());
