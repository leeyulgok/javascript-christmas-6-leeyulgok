const ERROR_MESSAGE = {
  INVALID_DATE: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
};

export const validDate = (input) => {
  let date = parseInt(input, 10);

  if (isNaN(date) || date < 0 || date > 31) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }

  return date;
};
