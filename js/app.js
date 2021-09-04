window.onload = function () {
  const navUl = document.getElementById('navbar__list');
  const sections = document.querySelectorAll('section');

  //performance: loops doesnt check sections length every iteration
  const sectionsLength = sections.length;

  buildNav();

  function buildNav() {
    // a fragment to avoid repainting page for each nav
    const navFragment = document.createDocumentFragment();
    //for each section create a list containing an anchor
    for (let index = 0; index < sectionsLength; index++) {
      const navLi = document.createElement('li');
      navLi.classList.add('navbar__menu');
      navLi.innerHTML = `<a href="#${sections[index].id}" class="menu__link">${sections[index].dataset.nav}</a>`;
      navFragment.appendChild(navLi);
    }
    navUl.appendChild(navFragment);
  }

  // making scroll smooth
  navUl.addEventListener('click', (evt) => {
    evt.preventDefault();
    //event deglation (peformance)
    if (evt.target.nodeName === 'A') {
      //find the section of the anchor clicked
      const section = document.querySelector(
        evt.target.getAttribute('href')
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
    for (let i = 0; i < sectionsLength; i++) {
      const section = sections[i];
      const pos = section.getBoundingClientRect();
      //if half of the section is visble activate
      pos.top < window.innerHeight / 2 &&
            pos.bottom > window.innerHeight / 2
        ? section.classList.add('active')
        : section.classList.remove('active');
    }
  });
};
