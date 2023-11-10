import { validDate, validMenuItems } from "../src/validateData";

describe("사용자 입력 값 예외 테스트", () => {
  const INVALID_DATE_MESSAGE =
    "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
  const INVALID_MENU_MESSAGE =
    "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";

  test("날짜 성공 테스트", () => {
    const date = 25;

    expect(validDate(date)).toBe(25);
  });

  test("날짜 예외 테스트: 문자의 경우", () => {
    const string = "string";

    expect(() => validDate(string)).toThrow(INVALID_DATE_MESSAGE);
  });

  test("날짜 예외 테스트: 1보다 작은 경우", () => {
    const minDate = 0;

    expect(() => validDate(minDate)).toThrow(INVALID_DATE_MESSAGE);
  });

  test("날짜 예외 테스트: 31보다 큰 경우", () => {
    const maxDate = 32;

    expect(() => validDate(maxDate)).toThrow(INVALID_DATE_MESSAGE);
  });

  test("메뉴 성공 테스트", () => {
    const menuItems = "해산물파스타-2,레드와인-1,초코케이크-1";
    const successMenu = [
      { food: "해산물파스타", count: 2 },
      { food: "레드와인", count: 1 },
      { food: "초코케이크", count: 1 },
    ];

    expect(validMenuItems(menuItems)).toEqual(successMenu);
  });

  test("메뉴 예외 테스트: 메뉴판에 없는 메뉴를 입력하는 경우", () => {
    const menuItems = "해산물파스타-2,화이트와인-1,초코케이크-1";

    expect(() => validMenuItems(menuItems)).toThrow(INVALID_MENU_MESSAGE);
  });

  test("메뉴 예외 테스트: 1개 미만의 개수를 입력하는 경우", () => {
    const menuItems = "해산물파스타-0,화이트와인-1,초코케이크-1";

    expect(() => validMenuItems(menuItems)).toThrow(INVALID_MENU_MESSAGE);
  });

  test("메뉴 예외 테스트: 메뉴 형식이 예시와 다른 경우", () => {
    const menuItemOne = "해산물파스타=2";
    const menuItemTwo = "화이트와인:1";
    const menuItemThree = "초코케이크/1";

    expect(() => validMenuItems(menuItemOne)).toThrow(INVALID_MENU_MESSAGE);
    expect(() => validMenuItems(menuItemTwo)).toThrow(INVALID_MENU_MESSAGE);
    expect(() => validMenuItems(menuItemThree)).toThrow(INVALID_MENU_MESSAGE);
  });

  test("메뉴 예외 테스트: 중복 메뉴를 입력한 경우", () => {
    const menuItems = "해산물파스타-2,해산물파스타-3";

    expect(() => validMenuItems(menuItems)).toThrow(INVALID_MENU_MESSAGE);
  });

  test("메뉴 예외 테스트: 음료만 주문하는 경우", () => {
    const menuItems = "레드와인-1,샴페인-1,제로콜라-3";

    expect(() => validMenuItems(menuItems)).toThrow(INVALID_MENU_MESSAGE);
  });

  test("메뉴 예외 테스트: 20개 이상 주문하는 경우", () => {
    const menuItems = "해산물파스타-13,티본스테이크-6,바베큐립-2";
    
    expect(() => validMenuItems(menuItems)).toThrow(INVALID_MENU_MESSAGE);
  });
});
