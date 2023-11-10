import MENU_LIST from "./menuList.js";

const ERROR_MESSAGE = {
  INVALID_DATE: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  INVALID_MENU: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
};

export const validDate = (input) => {
  let date = parseInt(input, 10);

  if (isNaN(date) || date <= 0 || date > 31) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }

  return date;
};

export const validMenuItems = (input) => {
  const menuItems = input.split(",").map(item => {
    const parts = item.split("-");
    if(parts.length !== 2 || isNaN(parts[1]) || parts[1] < 1) {
      throw new Error(ERROR_MESSAGE.INVALID_MENU);
    }
    const [food, count] = parts;
    return { food, count: Number(count)};
  });

  // 1. 고객이 메뉴판에 없는 메뉴를 입력하는 경우
  // 3. 메뉴 형식이 예시와 다른 경우
  // 4. 중복 메뉴를 입력한 경우
  // 5. 음료만 주문 시, 주문한 경우
  // 6. 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다
  
  return menuItems;
};
