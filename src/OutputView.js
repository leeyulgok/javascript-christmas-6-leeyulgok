import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  EVENT: "우테코 식당에서 받을 이벤트 혜택 미리 보기!",
  ORDER_MENU: "\n<주문 메뉴>",
  BEFORE_DISCOUNT: "\n<할인 전 총주문 금액>",
};

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  },
  
  printEvent(date) {
    const [month, day] = date.split("-");

    Console.print(`${month}월 ${day}일에 ` + DEFAULT_MESSAGE.EVENT)
  },

  printMenu(orderMenu) {
    const orderItems = orderMenu.orderItems;
    Console.print(DEFAULT_MESSAGE.ORDER_MENU);
    for(let i = 0; i < orderItems.length; i++) {
      const {food, count} = orderItems[i];
      Console.print(`${food} ${count}개`);
    }
  },

  printBeforeDiscount(orderMenu) {
    orderMenu.calculateTotalPrice();
    const totalPrice = orderMenu.totalPrice;
    Console.print(DEFAULT_MESSAGE.BEFORE_DISCOUNT);
    Console.print(`${totalPrice}원`);
  }
};

export default OutputView;
