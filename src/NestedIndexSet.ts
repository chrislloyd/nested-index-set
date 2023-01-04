/**
 * TODO: TSDoc
 */
export default class NestedIndexSet {
    static fromRange(min: number, max: number) {
        const delta = max - min;
        const mid = Math.round(delta / 2);
        const index = min + mid;
        return new NestedIndexSet(min, index, max);
    }

    constructor(
        public readonly min: number,
        public index: number,
        public readonly max: number,
    ) {
        if (min >= index || index >= max) {
            throw new RangeError(`index not in [min..max]`);
        }
    }

    above(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.index + 1, this.max);
    }

    below(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.min, this.index - 1);
    }
}
