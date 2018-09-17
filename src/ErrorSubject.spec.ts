import { Subscription } from "rxjs";
import { ErrorSubject } from "./ErrorSubject";

describe("ErrorSubject", () => {

  const subject = new ErrorSubject();

  let subscription: Subscription;

  const observerMock = {
    next: jest.fn(),
    error: jest.fn(),
    complete: jest.fn(),
  };

  beforeEach(() => {
    observerMock.next.mockClear();
    observerMock.error.mockClear();
    observerMock.complete.mockClear();

    subscription = subject.subscribe(observerMock);
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  const err = new Error();

  describe("error()", () => {

    test("error callback", () => {
      subject.error(err);

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).toBeCalledWith(err);
      expect(observerMock.error).not.toBeCalled();
      expect(observerMock.complete).not.toBeCalled();
    });
  });

  describe("wrapAsync()", () => {

    test("function wrapping", async () => {
      subject.wrapAsync(async () => {
        throw err;
      });

      await Promise.resolve();

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).toBeCalledWith(err);
    });

    test("promise wrapping", async () => {
      subject.wrapAsync(Promise.reject(err));

      await Promise.resolve();

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).toBeCalledWith(err);
    });
  });

  describe("wrapTAsync()", () => {

    test("function wrapping", async () => {
      await subject.wrapTAsync(async () => {
        throw err;
      });

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).toBeCalledWith(err);
    });

    test("promise wrapping", async () => {
      await subject.wrapTAsync(Promise.reject(err));

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).toBeCalledWith(err);
    });
  });
});
