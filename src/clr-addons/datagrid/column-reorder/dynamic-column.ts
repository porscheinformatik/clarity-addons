import { TemplateRef, Type } from '@angular/core';

export type DynamicColumn<T> = {
  name: string;
  title: string;
  hidden?: boolean;
  valueFn?: (item: T) => string;
  component?: Type<unknown>;
  template?: TemplateRef<unknown>;
};
