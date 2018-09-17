import { Subject } from "rxjs";
import { TErrorSubjectWrapped } from "./types";

export interface IErrorSubject extends Subject<any> {
  wrapAsync<T = any>(wrapped: TErrorSubjectWrapped<T>): void;
  wrapTAsync<T = any>(wrapped: TErrorSubjectWrapped<T>): Promise<T>;
}
