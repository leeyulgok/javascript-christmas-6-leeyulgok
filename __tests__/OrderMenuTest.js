import OrderMenu from "../src/OrderMenu.js";

/**
 * OrderMenuTest는 InputDataTest에서 검증된 데이터만 들어오기 때문에
 * 예외 상황 테스트보다는 성공여부 테스트에 중점을 두고 있습니다.
 */
describe("주문한 메뉴 테스트", () => {
  test("주문한 메뉴 객체 불러오기", () => {
    const orderItems = [];
    const orderMenu = new OrderMenu(orderItems);

    expect(orderMenu).toBeInstanceOf(OrderMenu);
  });

  test("단일 항목 정확히 계산", () => {
    const orderItems = [
      { food: "크리스마스파스타", count: 1},
    ];
    const orderMenu = new OrderMenu(orderItems);

    expect(orderMenu.totalPrice).toBe(25000);
  });

  test("다양한 메뉴 항목의 총합 정확히 계산", () => {
    const orderItems = [
      { food: "해산물파스타", count: 1},
      { food: "레드와인", count: 3},
      { food: "타파스", count: 1},
      { food: "아이스크림", count: 2},
    ];
    const orderMenu = new OrderMenu(orderItems);

    expect(orderMenu.totalPrice).toBe(230500);
  });

  test("특정 메뉴의 가격을 정확히 찾아오기", () => {
    const orderMenu = new OrderMenu([]);
    const price = orderMenu.findPrice("티본스테이크");

    expect(price).toBe(55000)
  });

  test("메뉴판에 메뉴가 없을 경우 null 처리", () => {
    const orderMenu = new OrderMenu([]);
    const price = orderMenu.findPrice("고기고기쌀국수");

    expect(price).toBe(null)
  });
});
