const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".section-nav a[data-section]")];

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    },
    { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
  setActiveSection(sections[0].id);
}
