import EventDiscount from "../src/EventDiscount";
import OrderMenu from "../src/OrderMenu";

describe("이벤트 할인 테스트", () => {
  let orderMenu;

  beforeEach(() => {
    const orderItems = [
      { food: "해산물파스타", count: 2 },
      { food: "레드와인", count: 1 },
      { food: "초코케이크", count: 1 },
    ];
    orderMenu = new OrderMenu(orderItems);
  });

  test("이벤트 할인 객체 가져오기", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);

    expect(eventDiscount).toBeInstanceOf(EventDiscount);
  });

  test("주문 금액이 1만 원 이상인 경우, 이벤트 적용", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const isEvent = eventDiscount.defaultEventCondition();

    expect(isEvent).toBeTruthy();
  });

  test("크리스마스 디데이 할인", () => {
    const date = "12-25-1";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const discount = eventDiscount.calculateChristmasCountdownDiscount();

    expect(discount).toBe(3400);
  });

  test("평일 디저트 할인", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const discount = eventDiscount.weekDayDiscount();

    expect(discount).toBe(2023);
  });

  test("주말 메인 할인", () => {
    const date = "12-2-6";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const discount = eventDiscount.weekendDiscount();

    expect(discount).toBe(4046);
  });

  test("특별 할인(일요일, 크리스마스)", () => {
    const date = "12-25-1";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const discount = eventDiscount.specialDiscount();

    expect(discount).toBe(1000);
  });

  test("증정 이벤트 가능 여부 확인", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const isGift = eventDiscount.checkForGiftEvent();

    expect(isGift).toBeTruthy();
  });

  test("총할인 금액 계산", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const discount = eventDiscount.totalDiscount();

    expect(discount).toBe(29223);
  });

  test("이벤트 뱃지 확인", () => {
    const date = "12-3-0";
    const eventDiscount = new EventDiscount(orderMenu, date);
    const badge = eventDiscount.checkForBadgeEvent();

    expect(badge).toBe("산타");
  });
});
