export interface IUniqueBehaviorSubjectOptions<T> {
  compare?: (valueA: T, valueB: T) => boolean;
  prepare?: (newValue: T, oldValue?: T) => T;
}
