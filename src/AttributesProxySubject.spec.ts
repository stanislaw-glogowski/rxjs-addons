import { AttributesProxySubject, IAttributesProxySubject } from "./AttributesProxySubject";

interface IExampleAttributes {
  valueA: boolean;
  valueB: string;
}

describe("AttributesProxySubject", () => {

  let subject: IAttributesProxySubject<IExampleAttributes> & Partial<IExampleAttributes>;

  const observerMock = {
    next: jest.fn(),
    error: jest.fn(),
    complete: jest.fn(),
  };

  beforeEach(() => {
    observerMock.next.mockClear();
    observerMock.error.mockClear();
    observerMock.complete.mockClear();

    subject = new AttributesProxySubject<IExampleAttributes>({
      valueA: true,
      valueB: "B",
    }, {
      schema: {
        valueA: true,
        valueB: true,
      },
    });
  });

  test("attributes getter", () => {
    expect(subject.valueA).toBeTruthy();
    expect(subject.valueB).toBe("B");
  });

  test("attributes getter", () => {
    subject.valueA = false;
    subject.valueB = "C";

    expect(subject.attributes.valueA).toBeFalsy();
    expect(subject.attributes.valueB).toBe("C")
  });
});
