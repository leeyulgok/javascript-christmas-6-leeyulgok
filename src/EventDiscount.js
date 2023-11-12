import MENU_LIST from "./menuList.js";

class EventDiscount {
  #date;
  #orderMenu;

  constructor(orderMenu, date) {
    this.#orderMenu = orderMenu;
    this.#orderMenu.totalPrice;
    this.#date = date;
  }

  get date() {
    return this.#date;
  }

  get orderMenu() {
    return this.#orderMenu;
  }

  defaultEventCondition() {
    let isEvent = false;

    if (this.#orderMenu.totalPrice > 10000) {
      isEvent = true;
    }

    return isEvent;
  }

  calculateChristmasCountdownDiscount() {
    let date = this.#date.split("-")[1];
    let discount = 0;

    if (date < 26) {
      discount = 1000;
      while (date > 1) {
        discount += 100;
        date -= 1;
      }
    }

    return discount;
  }

  weekDayDiscount() {
    const day = this.#date.split("-")[2];
    const dessertNames = Object.values(MENU_LIST.desserts).map(
      (dessert) => dessert.name
    );
    const orderItems = this.#orderMenu.orderItems;
    let discount = 0;

    if (day >= 0 && day <= 4) {
      for (const item of orderItems) {
        if (dessertNames.includes(item.food)) {
          discount += item.count * 2023;
        }
      }
    }

    return discount;
  }

  weekendDiscount() {
    const day = this.#date.split("-")[2];
    const mainNames = Object.values(MENU_LIST.mains).map((main) => main.name);
    const orderItems = this.#orderMenu.orderItems;
    let discount = 0;

    if (day === "5" || day === "6") {
      for (const item of orderItems) {
        if (mainNames.includes(item.food)) {
          discount += item.count * 2023;
        }
      }
    }

    return discount;
  }

  specialDiscount() {
    const [, christmas, day] = this.#date.split("-");
    let discount = 0;

    if (christmas === "25" || day === "0") {
      discount += 1000;
    }

    return discount;
  }

  checkForGiftEvent() {
    let isGift = false;

    if (this.#orderMenu.totalPrice > 130000) {
      isGift = true;
    }

    return isGift;
  }

  totalDiscount() {
    const countdown = this.calculateChristmasCountdownDiscount();
    const weekDay = this.weekDayDiscount();
    const weekend = this.weekendDiscount();
    const special = this.specialDiscount();
    const gift = this.checkForGiftEvent();
    let discount = countdown + weekDay + weekend + special + (gift ? 25000 : 0);

    return discount;
  }

  checkForBadgeEvent() {
    let Badge;
    const totalDiscount = this.totalDiscount();

    if(totalDiscount >= 20000) {
      return Badge = "산타";
    } else if(totalDiscount >= 10000) {
      return Badge = "트리";
    } else if(totalDiscount >= 5000) {
      return Badge = "별";
    } else {
      return Badge = "없음";
    }
  }
}

export default EventDiscount;
