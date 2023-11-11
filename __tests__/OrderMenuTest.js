import OrderMenu from "../src/OrderMenu.js";

describe("주문한 메뉴 테스트", () => {
  test("주문한 메뉴 객체 불러오기", () => {
    const orderItems = [];
    const orderMenu = new OrderMenu(orderItems);

    expect(orderMenu).toBeInstanceOf(OrderMenu);
  });

  test("총합 계산하기", () => {
    const orderItems = [
      { food: "해산물파스타", count: 1},
      { food: "레드와인", count: 1},
    ];
    const orderMenu = new OrderMenu(orderItems);

    orderMenu.calculateTotalPrice();

    expect(orderMenu.totalPrice).toBe(95000);
  });

  test("메뉴 리스트에서 값 찾아오기", () => {
    const orderMenu = new OrderMenu([]);
    const price = orderMenu.findPrice("해산물파스타");

    expect(price).toBe(35000)
  });
});
