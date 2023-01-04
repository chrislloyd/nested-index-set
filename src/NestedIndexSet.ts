/**
 * Captures relationships between fixed indexes without having to dynamically
 * created. Indexes are guarenteed to be unique and can be created statically. 
 * Typically used to model CSS `z-index` values.
 * 
 * @example
 * ```ts
 * const page = NestedIndex.fromRange(-999, 999);
 * const modal = page.above();
 * ```
 */
export default class NestedIndexSet {
    /**
     * Returns a {@link NestedIndexSet} with its `index` at the midpoint of a 
     * range.
     */
    static fromRange(min: number, max: number) {
        const delta = max - min;
        const mid = Math.round(delta / 2);
        const index = min + mid;
        return new NestedIndexSet(min, index, max);
    }

    /**
     * @throws RangeError
     * Thrown if the range and index are not increasing, i.e. min < index < max
     */
    constructor(
        public readonly min: number,
        public index: number,
        public readonly max: number,
    ) {
        if (min >= index || index >= max) {
            throw new RangeError(`index not in [min..max]`);
        }
    }

    /**
     * @returns A new set with a range greater than the current index
     */
    above(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.index + 1, this.max);
    }

    /**
     * @returns A new set with a range less than the current index
     */
    below(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.min, this.index - 1);
    }
}
