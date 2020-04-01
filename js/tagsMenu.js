import ActiveMenu from './activeMenu';

export default class TagsMenu extends ActiveMenu {
  constructor(container, targetClass, activeClass) {
    super(container, targetClass, activeClass);

    this.currentTag = null;
    this.portfolioImages = null;
    this.imageItems = null;
  }

  toggleStates(target) {
    if (this.currentTag === target) return;

    super.toggleStates(target);
    this.currentTag = target;
    this.changePortfolioImages(target);
  }

  getNewPortfolioImages() {
    const imageItems = [...this.portfolioImages.querySelectorAll('.images__item')];

    const firstImage = imageItems[0];
    const restImages = imageItems.slice(1);
    const newPortfolioImages = restImages.concat(firstImage);

    const newPortfolio = document.createDocumentFragment();
    newPortfolioImages.forEach((item) => newPortfolio.append(item));

    return newPortfolio;
  }

  changePortfolioImages() {
    const { portfolioImages } = this;
    const newPortfolio = this.getNewPortfolioImages();

    portfolioImages.innerHTML = '';
    portfolioImages.append(newPortfolio);
  }

  init() {
    this.currentTag = document.querySelector('.tags__button_active');
    this.portfolioImages = document.querySelector('#portfolioImages');
    super.init();
  }
}
