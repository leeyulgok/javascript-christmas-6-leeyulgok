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
  EVENT_BEDGE: "\n<12월 이벤트 배지>",
  NOTHING: "없음",
};

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
    for (let i = 0; i < orderItems.length; i++) {
      const { food, count } = orderItems[i];
      Console.print(`${food} ${count}개`);
    }
  },

  printEventDiscount(eventdiscount) {
    const isEvent = eventdiscount.defaultEventCondition();
    
    printBeforeDiscount(eventdiscount);
    printGift(isEvent, eventdiscount);
    printDiscountList(isEvent, eventdiscount);
    printTotalDiscount(isEvent, eventdiscount);
    printFinalTotalPrice(eventdiscount);
    printBedge(eventdiscount);
  },
};

const printBeforeDiscount = (eventdiscount) => {
  const totalPrice = eventdiscount.orderMenu.totalPrice;
  Console.print(DEFAULT_MESSAGE.BEFORE_DISCOUNT);
  Console.print(`${totalPrice}원`);
};

const printGift = (isEvent, eventdiscount) => {
  const gift = eventdiscount.checkForGiftEvent();

  Console.print(DEFAULT_MESSAGE.GIFT);
  if (isEvent) {
    if (typeof gift !== "string") {
      Console.print(`${gift.food} ${gift.count}개`);
    } else {
      Console.print(gift);
    }
  } else {
    Console.print(DEFAULT_MESSAGE.NOTHING);
  }
};

const printDiscountList = (isEvent, eventdiscount) => {
  const countdown = eventdiscount.calculateChristmasCountdownDiscount();
  const week = isWeek(eventdiscount);
  const special = eventdiscount.specialDiscount();
  const gift = eventdiscount.checkForGiftEvent();  

  Console.print(DEFAULT_MESSAGE.DISCOUNT_LIST);
  if(isEvent) {
    Console.print(`크리스마스 디데이 할인: -${countdown}원`);
    Console.print(`${week.day} 할인: -${week.discount}원`);
    Console.print(`특별 할인: -${special}원`);
    Console.print(`증정 이벤트: ${typeof gift !== 'string' ? -25000 : 0}원`);
  } else {
    Console.print(DEFAULT_MESSAGE.NOTHING);
  }
};

const isWeek = (eventdiscount) => {
  const day = eventdiscount.date.split("-")[2];

  if(day === '5' || day === '6') {
    let weekend = { day: "주말", discount: eventdiscount.weekendDiscount()};
    return weekend;
  } else {
    let weekDay = { day: "평일", discount: eventdiscount.weekDayDiscount()};
    return weekDay;
  }
};

const printTotalDiscount = (isEvent, eventdiscount) => {
  const totalDiscount = eventdiscount.totalDiscount();

  Console.print(DEFAULT_MESSAGE.TOTAL_DISCOUNT);
  if(isEvent) {
    Console.print(`-${totalDiscount}원`);
  } else {
    Console.print(DEFAULT_MESSAGE.NOTHING);
  }
};

const printFinalTotalPrice = (eventdiscount) => {
  const totalPrice = eventdiscount.finalTotalPrice();

  Console.print(DEFAULT_MESSAGE.FINAL_TOTAL_PRICE);
  Console.print(`${totalPrice}원`);
}

const printBedge = (eventdiscount) => {
  const bedge = eventdiscount.bedge;
  
  Console.print(DEFAULT_MESSAGE.EVENT_BEDGE);
  Console.print(`${bedge}`);
}

export default OutputView;
