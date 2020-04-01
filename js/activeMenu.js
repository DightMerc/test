import { ENTER_KEY } from './helper';

export default class ActiveMenu {
  constructor(container, targetClass, activeClass) {
    this.container = container;
    this.targetClass = targetClass;
    this.activeClass = activeClass;
  }

  removeActiveState() {
    const { container, targetClass, activeClass } = this;

    container.querySelectorAll(`.${targetClass}`)
      .forEach((item) => {
        item.classList.remove(activeClass);
      });
  }

  setActiveState(target) {
    const { activeClass } = this;

    target.classList.add(activeClass);
  }

  toggleStates(target) {
    this.removeActiveState();
    this.setActiveState(target);
  }

  clickHandler(event) {
    const { target } = event;
    const { targetClass } = this;

    if (!target.classList.contains(targetClass)) return;
    this.toggleStates(target);
  }

  enterPressedHandler(event) {
    const { target, key } = event;
    const { targetClass } = this;

    if ((key !== ENTER_KEY) || (!target.classList.contains(targetClass))) return;
    this.toggleStates(target);
  }

  addHandlers() {
    const { container } = this;

    container.addEventListener('click', this.clickHandler.bind(this));
    container.addEventListener('keyup', this.enterPressedHandler.bind(this));
  }

  init() {
    this.addHandlers();
  }
}
