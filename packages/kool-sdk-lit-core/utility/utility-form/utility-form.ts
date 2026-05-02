
export interface ValueAccessorString {
    modelToView: (element: HTMLElement, value: string) => void,
    viewToModel: (element: HTMLElement, cb: (value: string) => void) => void,
};

export interface ValueAccessorBoolean {
    modelToView: (element: HTMLElement, value: boolean) => void,
    viewToModel: (element: HTMLElement, cb: (value: boolean) => void) => void,
};
export interface ValueAccessorNumber {
    modelToView: (element: HTMLElement, value: string) => void,
    viewToModel: (element: HTMLElement, cb: (value: number) => void) => void,
};

export type ValueAccessor = ValueAccessorString | ValueAccessorBoolean | ValueAccessorNumber;

export const valueAccessors: Record<string, ValueAccessor> = {
  'input[type=number]': {
    modelToView(element: HTMLElement, value: string) {
      (element as HTMLInputElement).value = value;
    },
    viewToModel(element: HTMLElement, cb: (value: number) => void) {
      const listener = (e) => cb(e.target.valueAsNumber)
      element.addEventListener('input', listener);

      return () => element.removeEventListener('input', listener);
    }
  },
  'input[type=checkbox]': {
    modelToView(element: HTMLElement, value: boolean) {
      (element as HTMLInputElement).checked = value;
    },
    viewToModel(element: HTMLElement, cb: (value: boolean) => void) {
        
      const listener = (e: Event) => cb((e.target as HTMLInputElement).checked);
      element.addEventListener('change', listener);

      return () => element.removeEventListener('change', listener);
    }
  },
  'input': {
    modelToView(element: HTMLElement, value: string) {
      (element as HTMLInputElement).value = value;
    },
    viewToModel(element: HTMLElement, cb: (value: string) => void) {
      const listener = (e: Event) => cb((e.target as HTMLInputElement).value);
      element.addEventListener('input', listener);

      return () => element.removeEventListener('input', listener);
    }
  }
}