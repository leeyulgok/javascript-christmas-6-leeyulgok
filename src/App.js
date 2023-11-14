import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import OrderMenu from "./OrderMenu.js";
import EventDiscount from "./EventDiscount.js";

class App {
  async run() {
    OutputView.printHello();
    
    const date = await InputView.readDate();
    const menuItems = await InputView.readMenuItems();
    
    const orderMenu = new OrderMenu(menuItems);
    const eventdiscount = new EventDiscount(orderMenu, date);
    
    OutputView.printEvent(date);
    OutputView.printMenu(orderMenu);
    OutputView.printEventDiscount(eventdiscount);
  }
}

export default App;
