
import {v2} from "../../tools/v2.js"
import {Place} from "../../primitives/place.js"

export function open_junctions_between(a: Place, b: Place) {
	const direction_a = v2.subtract(b.vector, a.vector)
	const direction_b = v2.subtract(a.vector, b.vector)
	a.junctions.open(direction_a)
	b.junctions.open(direction_b)
	if (a.junctions.count > 3 || b.junctions.count > 3)
		throw new Error("cell is forbidden to have more than three open junctions")
}

