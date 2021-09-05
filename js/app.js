window.onload = function () {
  const navUl = document.getElementById('navbar__list');
  const sections = document.querySelectorAll('section');

  buildNav();

  function buildNav() {
    // a fragment to avoid repainting page for each nav
    const navFragment = document.createDocumentFragment();
    //for each section create a list containing an anchor
    for (section of sections) {
      const navLi = document.createElement('li');
      navLi.classList.add('navbar__menu');
      // (data-section-id) is used for finding the section in smooth scroll (window.scrollTo)
      navLi.innerHTML = `<a class="menu__link" data-section-id="#${section.id}">${section.dataset.nav}</a>`;
      navFragment.appendChild(navLi);
    }
    navUl.appendChild(navFragment);
  }

  // making scroll smooth
  navUl.addEventListener('click', (evt) => {
    evt.preventDefault();
    //event delegation (peformance: 1 event listener instead of 4)
    if (evt.target.nodeName === 'A') {
      //find the section of the anchor clicked
      const section = document.querySelector(
        evt.target.dataset.sectionId
      );
      //smooth scroll
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  });

  // Add class 'active' to section when near top of viewport

  document.addEventListener('scroll', () => {
    for (section of sections) {
      const pos = section.getBoundingClientRect();
      const anchor = document.querySelector(`[data-section-id="#${section.id}"]`);
      //if half of the section is visble activate
      if (
        pos.top < window.innerHeight / 2 &&
                pos.bottom > window.innerHeight / 2
      ) {
        section.classList.add('active');
        anchor.classList.add('activeNav');
      } else {
        section.classList.remove('active');
        anchor.classList.remove('activeNav');
      }
    }
  });
};
