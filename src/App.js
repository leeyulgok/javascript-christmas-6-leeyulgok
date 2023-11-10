import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printHello();
    
    const date = await InputView.readDate();
    const menuItems = await InputView.readMenuItems();

    OutputView.printEvent(date);
    OutputView.printMenu(menuItems);
  }
}

export default App;
