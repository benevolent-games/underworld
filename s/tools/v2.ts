
export type V2 = [number, number]

export namespace v2 {

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

