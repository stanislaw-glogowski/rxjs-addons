import { IAttributeOptions } from "./interfaces";

export type TAttributesSchema<T> = {
  [P in keyof T]?: Partial<IAttributeOptions> | boolean;
};
