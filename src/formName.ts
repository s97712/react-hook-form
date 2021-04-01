import { Primitive } from './types';

type MergePath<N extends string | number, P extends string> = `${P extends ''
  ? ''
  : `${P}.`}${N}`;
function merge_path(name: string | number, prefix?: string) {
  prefix = prefix ? prefix + '.' : '';
  return `${prefix}${name}`;
}

export type FormName<T, P extends string = ''> = T extends Primitive
  ? never
  : T extends Array<any>
  ? FormNameAt<T, P>
  : FormNameKey<T, P>;
interface FormNameKey<T, P extends string> {
  <K extends keyof T & string>(key: K): FormName<T[K], MergePath<K, P>>;
  end<K extends keyof T & string>(key: K): MergePath<K, P>;
}

interface FormNameAt<T extends Array<any>, P extends string> {
  (at: number): FormName<T[number], MergePath<0, P>>;
  end(at: number): MergePath<0, P>;
}

export function form_name(name: string | number, prefix?: string) {
  prefix = merge_path(name, prefix);
  const fn = (name: string | number) => form_name(name, prefix);
  fn.end = (name: string | number) => merge_path(name, prefix);
  return fn;
}
form_name.end = (name: string | number) => merge_path(name);
