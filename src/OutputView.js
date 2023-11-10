import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  EVENT: "우테코 식당에서 받을 이벤트 혜택 미리 보기!",
  ORDER_MENU: "\n<주문 메뉴>",
};

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  },
  
  printEvent(date) {
    Console.print(`12월 ${date}일에 ` + DEFAULT_MESSAGE.EVENT)
  },

  printMenu(menuItems) {
    Console.print(DEFAULT_MESSAGE.ORDER_MENU);
    for(let i = 0; i < menuItems.length; i++) {
      const {food, count} = menuItems[i];
      Console.print(`${food} ${count}개`);
    }
  },
};

export default OutputView;
