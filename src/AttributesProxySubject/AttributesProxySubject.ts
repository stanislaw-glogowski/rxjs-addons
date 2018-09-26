import { map } from "rxjs/operators";
import {
  TUniqueBehaviorSubject,
  UniqueBehaviorSubject,
} from "../UniqueBehaviorSubject";
import {
  IAttributesProxySubject,
  IAttributesProxySubjectOptions,
  IAttributeOptions,
} from "./interfaces";

/**
 * Attributes poxy subject
 */
export class AttributesProxySubject<T, K extends keyof T = keyof T> implements IAttributesProxySubject<T> {

  /**
   * attributes subject
   */
  public attributes$: TUniqueBehaviorSubject<T>;

  /**
   * constructor
   * @param attributes
   * @param options
   */
  constructor(attributes: T = null, options: IAttributesProxySubjectOptions<T> = {}) {
    const {
      schema,
      prepare,
    } = options;

    this.attributes$ = new UniqueBehaviorSubject<T>(
      attributes, {
        prepare,
      },
    );

    if (schema) {
      for (const name in schema) {
        if (schema.hasOwnProperty(name)) {
          const { subject, setter, getter }: IAttributeOptions = {
            subject: false,
            getter: false,
            setter: false,
            ...(schema[ name ] === true ? {
              subject: true,
              getter: true,
              setter: true,
            } : schema[ name ] as any),
          };

          if (subject) {
            const subject$ = this.getAttribute$(name as any);

            Object.defineProperty(this, `${name}$`, {
              get: () => subject$,
            });
          }

          Object.defineProperty(this, name, {
            ...(getter ? {
              get: () => this.getAttribute(name as any, null),
            } : {}),
            ...(setter ? {
              set: (value: T[K]) => this.setAttribute(name as any, value),
            } : {}),
          });
        }
      }
    }
  }

  /**
   * attributes getter
   */
  public get attributes(): T {
    return this.attributes$.value;
  }

  /**
   * attributes setter
   * @param attributes
   */
  public set attributes(attributes: T) {
    this.attributes$.next(attributes);
  }

  /**
   * gets attribute subject
   * @param name
   */
  protected getAttribute$(name: K): TUniqueBehaviorSubject<T[K]> {
    const result = new UniqueBehaviorSubject<any>();
    this
      .attributes$
      .pipe(
        map((attributes) => attributes ? attributes[ name ] : null),
      )
      .subscribe(result);

    result
      .subscribe((value) => this.setAttribute(name, value));

    return result;
  }

  /**
   * gets attribute
   * @param name
   * @param defaults
   */
  protected getAttribute<R = T[K]>(name: K, defaults: T[K] = null): R {
    return (
      this.attributes &&
      typeof this.attributes[ name ] !== "undefined"
    )
      ? this.attributes[ name ] as any
      : defaults;
  }

  /**
   * sets attribute
   * @param name
   * @param value
   */
  protected setAttribute(name: K, value: T[K]): void {
    this.attributes = ({
      ...(this.attributes || {}),
      [name]: value,
    }) as any;
  }

  /**
   * updates attributes
   * @param attributes
   */
  protected updateAttributes(attributes: Partial<T>): void {
    this.attributes = attributes
      ? {
        ...(this.attributes || {}),
        ...(attributes as any),
      } as any
      : null;
  }
}
