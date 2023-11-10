import MENU_LIST from "./menuList.js";

class OrderMenu {
  #orderItems;
  #totalPrice;
  #discount;

  constructor(orderItems) {
    this.#orderItems = orderItems;
    this.#totalPrice = 0;
    this.#discount = 0;
  }

  get orderItems() {
    return this.#orderItems;
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  get discount() {
    return this.#discount;
  }

  calculateTotalPrice() {
    this.#totalPrice = this.#orderItems.reduce((total, item) => {
      const price = this.findPrice(item.food);
      return total + price * item.count;
    }, 0);
  }

  findPrice(foodName) {
    for (const category of Object.values(MENU_LIST)) {
      for (const item of Object.values(category)) {
        if (item.name === foodName) {
          return item.price;
        }
      }
    }
  }
}

export default OrderMenu;
