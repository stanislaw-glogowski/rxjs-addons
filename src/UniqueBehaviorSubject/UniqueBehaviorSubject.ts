import { BehaviorSubject } from "rxjs";
import { deepEqual } from "deep-equal-extended";
import { IUniqueBehaviorSubjectOptions } from "./interfaces";

/**
 * Unique behavior subject
 */
export class UniqueBehaviorSubject<T = any> extends BehaviorSubject<T> {

  /**
   * default compare function
   * @param valueA
   * @param valueB
   */
  public static defaultCompare: IUniqueBehaviorSubjectOptions<any>["compare"] = deepEqual;

  /**
   * constructor
   * @param value
   * @param options
   */
  constructor(value: T = null, options: IUniqueBehaviorSubjectOptions<T> = {}) {
    super(
      options.prepare ? options.prepare(value, null) : value,
    );

    const next = this.next.bind(this);

    this.next = (value: T) => {
      let isEqual = false;

      if (options.prepare) {
        value = options.prepare(value, this.value);
      }

      if (options.compare) {
        isEqual = options.compare(value, this.value);
      } else {
        isEqual = UniqueBehaviorSubject.defaultCompare(value, this.value);
      }

      if (!isEqual) {
        next(value);
      }
    };
  }
}
