export type Maybe<T> = T | null | undefined;

export const Some = <T>(val: Maybe<T>): val is T =>
    val !== null && val !== undefined;

export const None = <T>(val: Maybe<T>): val is null | undefined =>
    val === null || val === undefined;
