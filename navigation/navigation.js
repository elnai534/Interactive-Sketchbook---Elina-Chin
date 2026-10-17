// Open on hover or at the very top; stay compact elsewhere.
// open on tap or keybaord focus
(() => {
  const nav = document.querySelector('.portfolio-nav');
  if (!nav) return;

  const toggle = nav.querySelector('.portfolio-nav-toggle');
  const links = nav.querySelector('.portfolio-nav-links');
  const assignments = nav.querySelector('.assignments-menu');

  let hovered = false;
  let tapped = false;
  let keyboardFocus = false;

  function update() {
    const open =
      window.scrollY <= 1 ||
      hovered ||
      tapped ||
      keyboardFocus ||
      assignments.open;

    nav.classList.toggle('is-open', open);
    links.inert = !open;
  }

  //event listener: js: wait for mouse hover, click, keyboard focus, and scroll to update nav state
  nav.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') { hovered = true; update(); }// event pointer type === must equal the string 'mouse' for the hover to be true and update the nav state
  });

  nav.addEventListener('pointerleave', () => {
    hovered = false;
    update();
  });

  toggle.addEventListener('click', () => {
    tapped = true;
    update();
    links.querySelector('a').focus({ preventScroll: true });
  });

  nav.addEventListener('focusin', (event) => {
    keyboardFocus = event.target.matches(':focus-visible');
    update();
  });

  nav.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      keyboardFocus =
        nav.contains(document.activeElement) &&
        document.activeElement.matches(':focus-visible');

      update();
    });
  });

  assignments.addEventListener('toggle', update);

  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && assignments.open) {
      assignments.open = false;
      assignments.querySelector('summary').focus();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target)) {
      tapped = false;
      keyboardFocus = false;
      assignments.open = false;
      update();
    }
  });

  window.addEventListener('scroll', () => {
    tapped = false;
    update();
  }, { passive: true });

  window.addEventListener('pageshow', update);
  update();
})();