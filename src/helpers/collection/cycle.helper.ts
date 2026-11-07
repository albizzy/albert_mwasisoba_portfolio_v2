/** Returns the item for `index`, wrapping around so any list length works. */
export function cycle<T>(items: ReadonlyArray<T>, index: number): T {
    const length = items.length
    return items[((index % length) + length) % length]
}
