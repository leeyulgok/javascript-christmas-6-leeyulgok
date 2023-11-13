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

  return changeDateType(date);
};

export const validMenuItems = (input) => {
  const menuItems = validMenuForm(input);

  checkMenuItemsExist(menuItems);
  checkDuplicateItems(menuItems);
  checkOnlyDrinks(menuItems);
  checkMaxItems(menuItems);

  return menuItems;
};

const changeDateType = (input) => {
  const YEAR = 2023;
  const MONTH = 11;
  const date = new Date(YEAR, MONTH, input);

  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getDay()}`;

  return formattedDate;
};

const validMenuForm = (input) => {
  const menuItems = input.split(",").map((item) => {
    const parts = item.split("-");

    if (parts.length !== 2 || isNaN(parts[1]) || parts[1] < 1) {
      throw new Error(ERROR_MESSAGE.INVALID_MENU);
    }

    const [food, count] = parts;
    return { food, count: Number(count) };
  });

  return menuItems;
};

const checkMenuItemsExist = (menuItems) => {
  menuItems.forEach((item) => {
    if (!MENU_LIST[item.food]) {
      throw new Error(ERROR_MESSAGE.INVALID_MENU);
    }
  });
};

const checkDuplicateItems = (menuItems) => {
  const uniqueItems = new Set();

  menuItems.forEach((item) => {
    if (uniqueItems.has(item.food)) {
      throw new Error(ERROR_MESSAGE.INVALID_MENU);
    }

    uniqueItems.add(item.food);
  });
};

const checkOnlyDrinks = (menuItems) => {
  const drinkNames = Object.values(MENU_LIST)
    .filter((item) => item.category === "drinks")
    .map((drink) => drink.name);

  if (menuItems.every((item) => drinkNames.includes(item.food))) {
    throw new Error(ERROR_MESSAGE.INVALID_MENU);
  }
};

const checkMaxItems = (menuItems) => {
  let max = 20;

  for (const item of menuItems) {
    max -= item.count;
    if (max < 0) {
      throw new Error(ERROR_MESSAGE.INVALID_MENU);
    }
  }
};
