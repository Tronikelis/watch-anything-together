type AnyFn = (...args: any) => any;

export default function debounce<T extends AnyFn>(fn: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => fn(...(args as [])), wait);
    };
}
