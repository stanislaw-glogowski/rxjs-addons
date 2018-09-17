import { TUniqueBehaviorSubject } from "../UniqueBehaviorSubject";
import { TAttributesSchema } from "./types";

export interface IAttributesProxySubject<T> {
  attributes$: TUniqueBehaviorSubject<Partial<T>>;
  attributes: Partial<T>;
}

export interface IAttributeOptions {
  subject: boolean;
  getter: boolean;
  setter: boolean;
}

export interface IAttributesProxySubjectOptions<T> {
  schema?: TAttributesSchema<T>;
  prepare?: (newValue: T, oldValue?: T) => T;
}