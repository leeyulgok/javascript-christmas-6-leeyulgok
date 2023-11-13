import { Console } from "@woowacourse/mission-utils";

const DEFAULT_MESSAGE = {
  HELLO: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  EVENT: "우테코 식당에서 받을 이벤트 혜택 미리 보기!",
  ORDER_MENU: "\n<주문 메뉴>",
  BEFORE_DISCOUNT: "\n<할인 전 총주문 금액>",
  GIFT: "\n<증정 메뉴>",
  DISCOUNT_LIST: "\n<혜택 내역>",
  TOTAL_DISCOUNT: "\n<총혜택 금액>",
  FINAL_TOTAL_PRICE: "\n<할인 후 예상 결제 금액>",
  EVENT_BADGE: "\n<12월 이벤트 배지>",
  NOTHING: "없음",
};

const EVENT_TITLE = {
  COUNTDOWN: "크리스마스 디데이 할인",
  SPECIAL: "특별 할인",
  GIFT: "증정 이벤트",
}

const OutputView = {
  printHello() {
    Console.print(DEFAULT_MESSAGE.HELLO);
  },

  printEvent(date) {
    const [month, day] = date.split("-");

    Console.print(`${month}월 ${day}일에 ` + DEFAULT_MESSAGE.EVENT);
  },

  printMenu(orderMenu) {
    const orderItems = orderMenu.orderItems;

    Console.print(DEFAULT_MESSAGE.ORDER_MENU);
    orderItems.forEach(({ food, count }) => {
      Console.print(`${food} ${count}개`);
    });
  },

  printEventDiscount(eventdiscount) {
    const isEvent = eventdiscount.defaultEventCondition();

    this.printBeforeDiscount(eventdiscount);
    this.printGift(isEvent, eventdiscount);
    this.printDiscountList(isEvent, eventdiscount);
    this.printTotalDiscount(isEvent, eventdiscount);
    this.printFinalTotalPrice(eventdiscount);
    this.printBadge(eventdiscount);
  },

  printBeforeDiscount(eventdiscount) {
    const totalPrice = eventdiscount.orderMenu.totalPrice;
    Console.print(DEFAULT_MESSAGE.BEFORE_DISCOUNT);
    Console.print(`${totalPrice}원`);
  },

  printGift(isEvent, eventdiscount) {
    const gift = eventdiscount.checkForGiftEvent();
    const giftMessage =
      isEvent && typeof gift === "object"
        ? `${gift.food} ${gift.count}개`
        : DEFAULT_MESSAGE.NOTHING;

    Console.print(DEFAULT_MESSAGE.GIFT);
    Console.print(giftMessage);
  },

  printDiscountList(isEvent, eventdiscount) {
    const countdown = eventdiscount.calculateChristmasCountdownDiscount();
    const week = this.isWeek(eventdiscount);
    const special = eventdiscount.specialDiscount();
    const gift = eventdiscount.checkForGiftEvent();

    Console.print(DEFAULT_MESSAGE.DISCOUNT_LIST);
    if (isEvent) {
      Console.print(`${EVENT_TITLE.COUNTDOWN}: -${countdown}원`);
      Console.print(`${week.day} 할인: -${week.discount}원`);
      Console.print(`${EVENT_TITLE.SPECIAL}: -${special}원`);
      Console.print(`${EVENT_TITLE.GIFT}: ${typeof gift === "object" ? -25000 : 0}원`);
    } else {
      Console.print(DEFAULT_MESSAGE.NOTHING);
    }
  },

  printTotalDiscount(isEvent, eventdiscount) {
    const totalDiscount = eventdiscount.totalDiscount();

    Console.print(DEFAULT_MESSAGE.TOTAL_DISCOUNT);
    if (isEvent) {
      Console.print(`-${totalDiscount}원`);
    } else {
      Console.print(DEFAULT_MESSAGE.NOTHING);
    }
  },

  printFinalTotalPrice(eventdiscount) {
    const totalPrice = eventdiscount.finalTotalPrice();

    Console.print(DEFAULT_MESSAGE.FINAL_TOTAL_PRICE);
    Console.print(`${totalPrice}원`);
  },

  printBadge(eventdiscount) {
    const badge = eventdiscount.badge;

    Console.print(DEFAULT_MESSAGE.EVENT_BADGE);
    Console.print(`${badge}`);
  },

  isWeek(eventdiscount) {
    const day = eventdiscount.date.split("-")[2];

    if (day === "5" || day === "6") {
      let weekend = { day: "주말", discount: eventdiscount.weekendDiscount() };
      return weekend;
    } else {
      let weekDay = { day: "평일", discount: eventdiscount.weekDayDiscount() };
      return weekDay;
    }
  },
};

export default OutputView;
