import { disableDocumentScroll, enableDocumentScroll } from './utils';

export default class Popup {
  constructor(container = null, mainClass = 'popup', onOpenCallback, onCloseCallback) {
    this.container = container;
    this.mainClass = mainClass;
    this.onOpenCallback = onOpenCallback;
    this.onCloseCallback = onCloseCallback;

    this.close = this.close.bind(this);
  }

  build(content) {
    const { mainClass } = this;
    const {
      status,
      defaultSubject,
      defaultMessage,
      subject,
      message,
    } = content;
    const popup = document.querySelector('#popup__template').content.cloneNode(true);
    const layout = popup.querySelector('.popup__layout');

    layout.classList.add(mainClass);
    popup.querySelector('.popup__status').textContent = status;

    if (subject) {
      popup.querySelector('.popup__lead_subject').textContent = subject;
    } else popup.querySelector('.popup__subject').textContent = defaultSubject;
    if (message) {
      popup.querySelector('.popup__lead_message').textContent = message;
    } else popup.querySelector('.popup__message').textContent = defaultMessage;

    layout.addEventListener('click', this.close);

    return popup;
  }

  open(content) {
    const { container } = this;
    const popup = this.build(content);

    container.append(popup);

    const popupLayout = container.querySelector('.popup__layout');
    popupLayout.focus();
    if (this.onOpenCallback) this.onOpenCallback(popupLayout);
    disableDocumentScroll();
  }

  close(event) {
    const { target } = event;
    const { container } = this;
    const popup = container.querySelector('.popup__layout');
    const closePopupButton = popup.querySelector('.popup__close-button');
    if (target !== closePopupButton) return;

    if (this.onCloseCallback) this.onCloseCallback(popup);
    popup.remove();
    enableDocumentScroll();
  }
}
