"use strict"

const popup = {
  showBtn : document.querySelectorAll('.cards-item'),
  modal   : document.querySelector('.modal'),

  show() {
    this.modal.style.display = 'grid';
  }
}

for (const item of popup.showBtn) {
  item.addEventListener('click', _=> popup.show())
}

