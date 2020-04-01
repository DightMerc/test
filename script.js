import './scss/style.scss';

import { ELEMENTS } from './js/helper';
import ActiveMenu from './js/activeMenu';
import ScrollMenu from './js/scrollMenu';
import TagsMenu from './js/tagsMenu';
import Slider from './js/slider';
import Form from './js/form';
import BurgerMenu from './js/burger';

window.onload = () => {
  // const mainNavigation = document.querySelector('#mainNavigation');
  const mainNavigationActiveMenu = new ScrollMenu(ELEMENTS.NAVIGATION, 'navigation__link', 'navigation__link_active');
  mainNavigationActiveMenu.init();

  const portfolioImages = document.querySelector('#portfolioImages');
  const portfolioImagesActiveMenu = new ActiveMenu(portfolioImages, 'portfolio__image', 'portfolio__image_active');
  portfolioImagesActiveMenu.init();

  const tagsList = document.querySelector('#tagsList');
  const tagsListActiveMenu = new TagsMenu(tagsList, 'tags__button', 'tags__button_active');
  tagsListActiveMenu.init();

  const slider = new Slider();
  slider.init();

  const form = new Form();
  form.init();

  const burger = new BurgerMenu(document.body, 'burger__navigation');
  burger.init();
};
