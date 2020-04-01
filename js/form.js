import { FORM_DEFAULT_TEXT } from './helper';
import { disableTab } from './utils';
import Popup from './popup';

export default class Form {
  constructor() {
    this.form = null;
    this.subjectField = null;
    this.messageField = null;
    this.formSubmitButton = null;
    this.popup = null;
  }

  onOpenPopupHandler(popup) {
    popup.addEventListener('keydown', disableTab.bind(this));
  }

  onClosePopupHandler(popup) {
    const { formSubmitButton } = this;

    popup.removeEventListener('keydown', disableTab.bind(this));
    formSubmitButton.focus();
    this.form.reset();
  }

  getMessageText() {
    const defaultSubject = FORM_DEFAULT_TEXT.SUBJECT;
    const defaultMessage = FORM_DEFAULT_TEXT.MESSAGE;
    const subject = this.subjectField.value;
    const message = this.messageField.value;

    return {
      status: FORM_DEFAULT_TEXT.STATUS,
      defaultSubject,
      defaultMessage,
      subject,
      message,
    };
  }

  submitHandler(event) {
    event.preventDefault();

    const { popup } = this;
    const content = this.getMessageText();

    popup.open(content);
  }

  addHandlers() {
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  init() {
    this.form = document.querySelector('#feedback__form');
    this.subjectField = this.form.querySelector('#form__subject');
    this.messageField = this.form.querySelector('#form__message');
    this.formSubmitButton = this.form.querySelector('#form__submit');

    const onOpenPopupHandler = this.onOpenPopupHandler.bind(this);
    const onClosePopupHandler = this.onClosePopupHandler.bind(this);

    this.popup = new Popup(document.querySelector('.feedback__wrapper'), 'form__popup', onOpenPopupHandler, onClosePopupHandler);

    this.addHandlers();
  }
}
