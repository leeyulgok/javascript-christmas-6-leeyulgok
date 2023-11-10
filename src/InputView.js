import { Console } from "@woowacourse/mission-utils";
import { validDate, validMenuItems } from "./validateData.js";

const CONSOLE_MESSAGE = {
  BOOK_DATE: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  MENU_AND_COUNT: "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
}

const InputView = {
  async readDate() {
    let firstAttempt = true;

    while (true) {
      try {
        const input = await Console.readLineAsync(firstAttempt ? CONSOLE_MESSAGE.BOOK_DATE : "");
        firstAttempt = false;

        const date = validDate(input);
        return date;
      } catch (error) {
        Console.print(`${error.message}`);
      }
    }
  },

  async readMenuItems() {
    let firstAttempt = true;

    while (true) {
      try {
        const input = await Console.readLineAsync(firstAttempt ? CONSOLE_MESSAGE.MENU_AND_COUNT : "");
        firstAttempt = false;

        const userMenu = validMenuItems(input);
        return userMenu;
      } catch (error) {
        Console.print(`${error.message}`);
      }
    }
  },
};

export default InputView;
