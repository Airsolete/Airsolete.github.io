(function () {
  const article = document.querySelector(".post-single");
  if (!article) return;

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = '<span class="reading-progress__bar"></span>';
  document.body.appendChild(progress);

  const progressBar = progress.querySelector(".reading-progress__bar");
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
    progressBar.style.width = `${ratio * 100}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const images = Array.from(document.querySelectorAll(".post-content img"));
  if (images.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML = [
      '<button class="image-lightbox__close" type="button" aria-label="Close image preview">&times;</button>',
      '<figure class="image-lightbox__figure">',
      '<img class="image-lightbox__image" alt="">',
      '<figcaption class="image-lightbox__caption"></figcaption>',
      "</figure>"
    ].join("");
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".image-lightbox__image");
    const caption = lightbox.querySelector(".image-lightbox__caption");
    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      caption.textContent = "";
    };

    images.forEach((image) => {
      image.setAttribute("tabindex", "0");
      image.addEventListener("click", () => {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "";
        caption.textContent = image.alt || "";
        caption.hidden = !image.alt;
        document.body.style.overflow = "hidden";
        lightbox.classList.add("is-open");
      });
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          image.click();
        }
      });
    });

    lightbox.querySelector(".image-lightbox__close").addEventListener("click", close);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  const headings = Array.from(document.querySelectorAll(".post-content h2[id], .post-content h3[id], .post-content h4[id], .post-content h5[id], .post-content h6[id]"));
  const tocLinks = new Map(
    Array.from(document.querySelectorAll('details.toc a[href^="#"]')).map((link) => [
      decodeURIComponent(link.hash.slice(1)),
      link
    ])
  );

  if (headings.length && tocLinks.size) {
    const setActive = (id) => {
      tocLinks.forEach((link) => link.classList.remove("is-active"));
      const active = tocLinks.get(id);
      if (active) active.classList.add("is-active");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0.01 }
    );

    headings.forEach((heading) => observer.observe(heading));

    const current = headings.find((heading) => heading.getBoundingClientRect().top > 0) || headings[0];
    setActive(current.id);
  }
})();
