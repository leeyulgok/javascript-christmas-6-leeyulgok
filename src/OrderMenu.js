import MENU_LIST from "./menuList.js";

class OrderMenu {
  #orderItems;
  #totalPrice;

  constructor(orderItems) {
    this.#orderItems = orderItems;
    this.#totalPrice = 0;
    this.#calculateTotalPrice();
  }

  get orderItems() {
    return this.#orderItems;
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  #calculateTotalPrice() {
    this.#totalPrice = this.#orderItems.reduce((total, item) => {
      const price = this.findPrice(item.food);
      return total + price * item.count;
    }, 0);
  }

  findPrice(foodName) {
    return MENU_LIST[foodName] ? MENU_LIST[foodName].price : null;
  }
}

export default OrderMenu;
