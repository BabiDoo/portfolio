$('.open-overlay').click(function() {
  var overlay_navigation = $('.overlay-navigation'),
    nav_item_1 = $('nav li:nth-of-type(1)'),
    nav_item_2 = $('nav li:nth-of-type(2)'),
    nav_item_3 = $('nav li:nth-of-type(3)'),
    nav_item_4 = $('nav li:nth-of-type(4)'),
    nav_item_5 = $('nav li:nth-of-type(5)'),
    top_bar = $('.bar-top'),
    middle_bar = $('.bar-middle'),
    bottom_bar = $('.bar-bottom');

  overlay_navigation.toggleClass('overlay-active');
  $(this).toggleClass('menu-open', overlay_navigation.hasClass('overlay-active'));
  if (overlay_navigation.hasClass('overlay-active')) {

    top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
    middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
    bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
    nav_item_1.removeClass('slide-in-nav-item-reverse').addClass('slide-in-nav-item');
    nav_item_2.removeClass('slide-in-nav-item-delay-1-reverse').addClass('slide-in-nav-item-delay-1');
    nav_item_3.removeClass('slide-in-nav-item-delay-2-reverse').addClass('slide-in-nav-item-delay-2');
    nav_item_4.removeClass('slide-in-nav-item-delay-3-reverse').addClass('slide-in-nav-item-delay-3');
    nav_item_5.removeClass('slide-in-nav-item-delay-4-reverse').addClass('slide-in-nav-item-delay-4');
  } else {
    top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
    middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
    bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
    nav_item_1.removeClass('slide-in-nav-item').addClass('slide-in-nav-item-reverse');
    nav_item_2.removeClass('slide-in-nav-item-delay-1').addClass('slide-in-nav-item-delay-1-reverse');
    nav_item_3.removeClass('slide-in-nav-item-delay-2').addClass('slide-in-nav-item-delay-2-reverse');
    nav_item_4.removeClass('slide-in-nav-item-delay-3').addClass('slide-in-nav-item-delay-3-reverse');
    nav_item_5.removeClass('slide-in-nav-item-delay-4').addClass('slide-in-nav-item-delay-4-reverse');
  }
})

const toggle = document.getElementById('langToggle');
const textos = document.querySelectorAll('[data-pt][data-en]');

if (toggle) {
  toggle.addEventListener('change', () => {
    const lang = toggle.checked ? 'en' : 'pt';

    textos.forEach(el => {
      el.textContent = el.dataset[lang];
    });
  });
}

document.querySelectorAll('.work-card[data-project-url]').forEach(card => {
  const openProject = () => window.open(card.dataset.projectUrl, '_blank', 'noopener');

  card.addEventListener('click', event => {
    if (!event.target.closest('a')) openProject();
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  });
});

// On touch screens, mirror the skills-card hover state while a finger glides
// across the grid. This remains passive, so the page can still scroll normally.
const skillsGrid = document.querySelector('.home.skills .skills-grid');

if (skillsGrid && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
  let activeSkillCard;

  const setActiveSkillCard = (clientX, clientY) => {
    const card = document.elementFromPoint(clientX, clientY)?.closest('.skill-card');

    if (card === activeSkillCard) return;
    activeSkillCard?.classList.remove('is-touch-active');
    activeSkillCard = card && skillsGrid.contains(card) ? card : undefined;
    activeSkillCard?.classList.add('is-touch-active');
  };

  const clearActiveSkillCard = () => {
    activeSkillCard?.classList.remove('is-touch-active');
    activeSkillCard = undefined;
  };

  skillsGrid.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') setActiveSkillCard(event.clientX, event.clientY);
  }, { passive: true });

  skillsGrid.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') setActiveSkillCard(event.clientX, event.clientY);
  }, { passive: true });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(eventName => {
    skillsGrid.addEventListener(eventName, clearActiveSkillCard, { passive: true });
  });
}
