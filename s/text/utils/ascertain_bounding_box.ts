
import {V2} from "../../tools/v2.js"
import {Place} from "../../primitives/place.js"

export function ascertain_bounding_box(tiles: Place[]) {
	let left: number | undefined
	let right: number | undefined
	let top: number | undefined
	let bottom: number | undefined

	for (const {vector: [x, y]} of tiles) {
		if (left === undefined || x < left!)
			left = x

		if (right === undefined || x > right!)
			right = x

		if (top === undefined || y < top!)
			top = y

		if (bottom === undefined || y > bottom!)
			bottom = y
	}

	return {
		left: left!,
		right: right!,
		top: top!,
		bottom: bottom!,
		dimensions: [
			1 + right! - left!,
			1 + bottom! - top!,
		] as V2,
	}
}

