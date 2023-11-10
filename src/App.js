import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import OrderMenu from "./OrderMenu.js";

class App {
  async run() {
    OutputView.printHello();
    
    const date = await InputView.readDate();
    const menuItems = await InputView.readMenuItems();
    const orderMenu = new OrderMenu(menuItems);

    OutputView.printEvent(date);
    OutputView.printMenu(orderMenu);
    OutputView.printBeforeDiscount(orderMenu);
  }
}

export default App;
