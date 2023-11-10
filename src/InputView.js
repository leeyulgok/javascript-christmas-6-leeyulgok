import { Console } from "@woowacourse/mission-utils";
import { validDate } from "./validateData.js";

const CONSOLE_MESSAGE = {
  BOOK_DATE: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n"
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
};

export default InputView;
