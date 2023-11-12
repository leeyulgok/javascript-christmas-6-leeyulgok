import MENU_LIST from "./menuList.js";

class EventDiscount {
  #date;

  constructor(date) {
    this.#date = date;
  }

  get date() {
    return this.#date;
  }

  defaultEventCondition(orderMenu) {
    let isEvent = false;
    orderMenu.calculateTotalPrice();

    if (orderMenu.totalPrice > 10000) {
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

  weekDayDiscount(orderMenu) {
    const day = this.#date.split("-")[2];
    const dessertNames = Object.values(MENU_LIST.desserts).map(
      (dessert) => dessert.name
    );
    const orderItems = orderMenu.orderItems;
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

  weekendDiscount(orderMenu) {
    const day = this.#date.split("-")[2];
    const mainNames = Object.values(MENU_LIST.mains).map((main) => main.name);
    const orderItems = orderMenu.orderItems;
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

  checkForGiftEvent(orderMenu) {
    let isGift = false;
    orderMenu.calculateTotalPrice();

    if (orderMenu.totalPrice > 130000) {
      isGift = true;
    }

    return isGift;
  }
}

export default EventDiscount;
