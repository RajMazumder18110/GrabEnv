type CastType<Type> = Exclude<Type, undefined> extends string
  ? "string"
  : Exclude<Type, undefined> extends number
  ? "number"
  : Exclude<Type, undefined> extends boolean
  ? "boolean"
  : never;

export type OutputVariables<T> = {
  [K in keyof T]-?: T[K];
} & {
  NODE_ENV: "development" | "production" | "test";
};

export type Configs<T> = {
  [K in keyof T]-?: undefined extends T[K]
    ? {
        type: CastType<T[K]>;
        defaultValue: Exclude<T[K], undefined>;
      }
    : { type: CastType<T[K]> };
};
