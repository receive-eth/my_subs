export type RequireProps<T, K extends keyof T> = {
    [P in K]-?: T[P]
}
