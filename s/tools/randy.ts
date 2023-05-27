
export type Random = () => number

export class Randy {
	static seed(seed: number): Random {
		function random() {
			seed = Math.imul(48271, seed) | 0 % 2147483647
			return (seed & 2147483647) / 2147483648
		}
		random() // discard first value
		return random
	}

	constructor(
		public readonly random: Random
	) {}

	boolean(chance: number) {
		return this.random() < chance
	}

	between(min: number, max: number) {
		const difference = max - min
		const value = difference * this.random()
		return min + value
	}

	index(length: number) {
		return Math.floor(this.random() * length)
	}

	select<T>(array: T[]) {
		return array[this.index(array.length)]
	}

	yoink<T>(array: T[]) {
		const index = this.index(array.length)
		const [item] = array.splice(index, 1)
		return item
	}
}

