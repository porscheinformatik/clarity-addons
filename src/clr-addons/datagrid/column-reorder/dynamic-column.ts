import { TemplateRef, Type } from '@angular/core';

export type DynamicColumn<T> = {
  name: string;
  title: string;
  hidden?: boolean;
  displayField?: keyof T;
  formatter?: (item: T) => unknown;
  component?: Type<unknown>;
  template?: TemplateRef<unknown>;
};
