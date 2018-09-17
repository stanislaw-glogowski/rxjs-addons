import { UniqueBehaviorSubject, TUniqueBehaviorSubject } from "./UniqueBehaviorSubject";

describe("UniqueBehaviorSubject", () => {

  let subject: TUniqueBehaviorSubject;

  const observerMock = {
    next: jest.fn(),
    error: jest.fn(),
    complete: jest.fn(),
  };

  beforeEach(() => {
    observerMock.next.mockClear();
    observerMock.error.mockClear();
    observerMock.complete.mockClear();
  });

  describe("without options", () => {

    test("next call when value changes", () => {
      subject = new UniqueBehaviorSubject();
      subject.subscribe(observerMock);
      subject.next("value");

      expect(observerMock.next).toBeCalledTimes(2);
      expect(observerMock.next).nthCalledWith(1, null);
      expect(observerMock.next).nthCalledWith(2, "value");
    });

    test("next call when value didn't change", () => {
      subject = new UniqueBehaviorSubject("value");
      subject.subscribe(observerMock);
      subject.next("value");

      expect(observerMock.next).toBeCalledTimes(1);
      expect(observerMock.next).nthCalledWith(1, "value");
    });
  });
});
