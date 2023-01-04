/**
 * TODO: TSDoc
 */
export default class NestedIndexSet {
    static fromRange(min: number, max: number) {
        const delta = max - min;
        const mid = Math.round(delta / 2);
        const index = min + mid;
        return new NestedIndexSet(min, max, index);
    }

    constructor(
        public readonly min: number,
        public readonly max: number,
        public index: number,
    ) {
        // TODO: Bounds checking
    }

    above(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.index + 1, this.max);
    }

    below(): NestedIndexSet {
        return NestedIndexSet.fromRange(this.min, this.index - 1);
    }
}
