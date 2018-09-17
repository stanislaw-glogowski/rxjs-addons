import { Subject } from "rxjs";
import { IErrorSubject } from "./interfaces";
import { TErrorSubjectWrapped } from "./types";

/**
 * Error subject
 */
export class ErrorSubject extends Subject<any> implements IErrorSubject {

  /**
   * error
   * @param err
   */
  public error(err: any): void {
    this.next(err);
  }

  /**
   * wraps async
   * @param wrapped
   */
  public wrapAsync<T = any>(wrapped: TErrorSubjectWrapped<T>): void {
    this.wrapTAsync<T>(wrapped)
      .catch(() => null);
  }

  /**
   * wraps T async
   * @param wrapped
   */
  public wrapTAsync<T = any>(wrapped: TErrorSubjectWrapped<T>): Promise<T> {
    let promise: Promise<any> = null;

    switch (typeof wrapped) {
      case "function":
        promise = Promise.resolve((wrapped as () => any)());
        break;
      default:
        promise = Promise.resolve(wrapped as any);
    }

    return promise
      .catch((err) => {
        this.next(err);
        return null;
      });
  }
}
