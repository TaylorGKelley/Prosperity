export type FormActionState<T> = {
  values: T;
  errors?: Record<keyof T, string[]>;
  message?: string;
};
