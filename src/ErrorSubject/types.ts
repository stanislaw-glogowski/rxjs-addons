export type TErrorSubjectWrapped<T = any, R = T | Promise<T>> = R | (() => R);
