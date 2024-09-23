export class LazyArray<T> {
    public readonly data: T[];

    constructor(public readonly length: number, private initializer: (index: number) => T) {
        this.data = [];
    }

    get(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new Error(`Index out of bounds: ${index}`);
        }

        if (!this.data[index]) {
            this.data[index] = this.initializer(index);
        }

        return this.data[index];
    }

    findUninitialized(): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (!this.data[i]) {
                return this.get(i);
            }
        }
    }

    findInitialized(predicate: (value: T, index: number) => boolean): T | undefined {
        for (let i = 0; i < this.length; i++) {
            const value = this.data[i];
            if (value && predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    mapInitialized<U>(callback: (value: T, index: number) => U): U[] {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            const value = this.data[i];
            if (value) {
                result.push(callback(value, i));
            }
        }
        return result;
    }
}
