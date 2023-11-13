import MENU_LIST from "./menuList.js";

class EventDiscount {
  #date;
  #orderMenu;
  #gift;
  #badge;

  constructor(orderMenu, date) {
    this.#orderMenu = orderMenu;
    this.#orderMenu.totalPrice;
    this.#date = date;
    this.#gift = "없음";
    this.#badge = "없음";
  }

  get date() {
    return this.#date;
  }

  get orderMenu() {
    return this.#orderMenu;
  }

  get gift() {
    return this.#gift;
  }

  get badge() {
    return this.#badge;
  }

  parseDate() {
    const [month, date, day] = this.#date.split("-").map(Number);
    return { month, date, day };
  }

  defaultEventCondition() {
    let isEvent = false;

    if (this.#orderMenu.totalPrice > 10000) {
      isEvent = true;
    }

    return isEvent;
  }

  calculateChristmasCountdownDiscount() {
    const { date } = this.parseDate();
    const DEFAULT_DISCOUNT = 1000;
    const PLUS_DISCOUNT = 100;
    
    let discount = 0;
    if (date < 26) {
      discount = DEFAULT_DISCOUNT;
      while (date > 1) {
        discount += PLUS_DISCOUNT;
        date -= 1;
      }
    }

    return discount;
  }

  weekDayDiscount() {
    const WEEKDAY_DISCOUNT = 2023;
    const { day } = this.parseDate();
    const orderItems = this.#orderMenu.orderItems;
  
    let discount = 0;
    if (day >= 0 && day <= 4) {
      orderItems.forEach(item => {
        const menuItem = MENU_LIST[item.food];
        if (menuItem && menuItem.category === "desserts") {
          discount += item.count * WEEKDAY_DISCOUNT;
        }
      });
    }
  
    return discount;
  }

  weekendDiscount() {
    const WEEKEND_DISCOUNT = 2023;
    const { day } = this.parseDate();
    const orderItems = this.#orderMenu.orderItems;
  
    let discount = 0;
    if (day === "5" || day === "6") {
      orderItems.forEach(item => {
        const menuItem = MENU_LIST[item.food];
        if (menuItem && menuItem.category === "mains") {
          discount += item.count * WEEKEND_DISCOUNT;
        }
      });
    }
  
    return discount;
  }

  specialDiscount() {
    const { date, day } = this.parseDate();
    const CHRISTMAS_DAY = "25";
    const SUNDAY = "0"
    
    let discount = 0;
    if (date === CHRISTMAS_DAY || day === SUNDAY) {
      discount += 1000;
    }

    return discount;
  }

  checkForGiftEvent() {
    if (this.#orderMenu.totalPrice > 120000) {
      this.#gift = { food: "샴페인", count: 1 };
    }

    return this.gift;
  }

  totalDiscount() {
    const countdown = this.calculateChristmasCountdownDiscount();
    const weekDay = this.weekDayDiscount();
    const weekend = this.weekendDiscount();
    const special = this.specialDiscount();
    const gift = this.checkForGiftEvent();

    let discount =
      countdown +
      weekDay +
      weekend +
      special +
      (typeof gift === "object" ? 25000 : 0);

    return discount;
  }

  checkForBadgeEvent() {
    const totalDiscount = this.totalDiscount();

    if (totalDiscount >= 20000) {
      return (this.#badge = "산타");
    } else if (totalDiscount >= 10000) {
      return (this.#badge = "트리");
    } else if (totalDiscount >= 5000) {
      return (this.#badge = "별");
    }
  }

  finalTotalPrice() {
    const totalPrice =
      this.#orderMenu.totalPrice -
      this.totalDiscount() +
      (typeof this.#gift === "object" ? 25000 : 0);

    return totalPrice;
  }
}

export default EventDiscount;
