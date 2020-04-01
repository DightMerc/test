export const disableDocumentScroll = () => {
  document.body.classList.add('overflow-hidden');
};

export const enableDocumentScroll = () => {
  document.body.classList.remove('overflow-hidden');
};

export const disableTab = (event) => {
  if (event.key === 'Tab') event.preventDefault();
};

export const isDocumentBottomReached = () => {
  const currentScrollY = window.pageYOffset;
  const viewHeight = document.documentElement.clientHeight;
  const maxScrollY = document.documentElement.scrollHeight;

  return (currentScrollY + viewHeight >= maxScrollY);
};
