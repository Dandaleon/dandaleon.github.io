window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = "2024-09-11";

  function getTimeRemaininng(endtime) {
    let days, hours, minutes, second;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      second = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor(((t / 1000) * 60) % 60)),
        (second = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      second: second,
    };
  }

  function getZero(time) {
    if (time >= 0 && time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      second = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaininng(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      second.innerHTML = getZero(t.second);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //Modal

  const modal = document.querySelector(".modal"),
    modalTrigger = document.querySelectorAll("[data-modal]"),
    modalClose = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => btn.addEventListener("click", openModal));

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для карточек

  const nameMenu = document.querySelector;

  class MenuCard {
    constructor(src, alt, title, text, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 38;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `<img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        ${this.text}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
              свежих овощей и фруктов. Продукт активных и здоровых людей. Это
              абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    12,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
              но и качественное исполнение блюд. Красная рыба, морепродукты,
              фрукты - ресторанное меню без похода в ресторан!`,
    9,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное
              отсутствие продуктов животного происхождения, молоко из миндаля,
              овса, кокоса или гречки, правильное количество белков за счет тофу
              и импортных вегетарианских стейков.`,
    11,
    ".menu .container",
    "menu__item"
  ).render();
});
