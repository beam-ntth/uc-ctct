/**
 * Handles different types of errors that occur during use of Cosmos DB. 
 * If an error occurs during a GET or POST operation, the result will have an error which will be checked in the props of the resulting page.
 * If an error occurs during a delete, we do not throw an error and handle gracefully.
 */
class ErrorHandler {
  constructor() {
    this._strategy = new ErrorHandlerStrategy();
  }

  Set(strategy) {
    this._strategy = strategy;
  }

  HandleError() {
    this._strategy.HandleError();
  }
}

class ErrorHandlerStrategy {
  HandleError() {
    throw new Error("Please use an implemented strategy!");
  }
}

class DeleteOPStrategy extends ErrorHandlerStrategy {
  HandleError() {
    console.log("Handling error gracefully.")
  }
}

const handler = new ErrorHandler();
const strategy = new DeleteOPStrategy();
handler.Set(strategy);
handler.HandleError();