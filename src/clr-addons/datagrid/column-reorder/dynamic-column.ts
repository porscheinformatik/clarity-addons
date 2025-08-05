import { TemplateRef, Type } from '@angular/core';

export type DynamicColumn<T> = {
  name: string;
  title: string;
  hidden?: boolean;
  formatter?: (item: T) => string;
  component?: Type<unknown>;
  template?: TemplateRef<unknown>;
};
