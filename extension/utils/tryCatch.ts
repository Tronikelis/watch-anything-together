type AsyncFn<T> = (...params: any[]) => Promise<T> | T;

/**
 * error-first try catch helper
 */
export default async function tryCatch<E = Error, T = unknown>(
    fn: AsyncFn<T>
): Promise<[E] | [null, T]> {
    try {
        return [null, await fn()];
    } catch (err: unknown) {
        return [err as E];
    }
}
