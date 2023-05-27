
export type V2 = [number, number]

export namespace v2 {

	export function is(v: V2) {
		return v
	}

	export function zero(): V2 {
		return [0, 0]
	}

	export function equal(a: V2, b: V2, ...c: V2[]) {
		const [x, y] = a
		for (const d of [b, ...c]) {
			const [x2, y2] = d
			if (x !== x2 || y !== y2)
				return false
		}
		return true
	}

	export function add([x, y]: V2, ...vectors: V2[]): V2 {
		for (const vector of vectors) {
			x += vector[0]
			y += vector[1]
		}
		return [x, y]
	}

	export function multiply(a: V2, b: V2): V2 {
		return [
			a[0] * b[0],
			a[1] * b[1],
		]
	}

	export function subtract(a: V2, b: V2): V2 {
		return [
			a[0] - b[0],
			a[1] - b[1],
		]
	}
}

