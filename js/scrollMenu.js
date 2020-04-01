import ActiveMenu from './activeMenu';
import { ELEMENTS } from './helper';
import { isDocumentBottomReached } from './utils';

export default class ScrollMenu extends ActiveMenu {
  constructor(container, targetClass, activeClass) {
    super(container, targetClass, activeClass);

    this.currentNavigationLink = null;
    this.sectionList = null;
  }

  getCurrentNavigationLink() {
    if (isDocumentBottomReached()) return ELEMENTS.LAST_NAVIGATION_ITEM;

    const { container, currentNavigationLink, sectionsList } = this;
    const headerHeight = ELEMENTS.HEADER.offsetHeight;
    const currentPositionY = window.scrollY + headerHeight;

    const currentSection = sectionsList.find((section) => (section.offsetTop <= currentPositionY)
      && (section.offsetTop + section.offsetHeight > currentPositionY));

    if (!currentSection) return currentNavigationLink;

    const navigationLinkHref = currentSection.dataset.navigation;
    const newCurrentNavigationLink = container.querySelector(`a[href="${navigationLinkHref}"]`);
    return newCurrentNavigationLink;
  }

  scrollHandler() {
    const { currentNavigationLink } = this;
    const target = this.getCurrentNavigationLink();
    if (currentNavigationLink === target) return;

    this.setCurrentNavigationLink(target);
    this.toggleStates(target);
  }

  setCurrentNavigationLink(target) {
    this.currentNavigationLink = target;
  }

  addScrollHandler() {
    document.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  addHandlers() {
    this.addScrollHandler();
  }

  init() {
    this.sectionsList = [...document.querySelectorAll('section[data-navigation]')];
    this.scrollHandler();
    super.init();
  }
}
