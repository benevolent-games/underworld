
import {V2, v2} from "../../../tools/v2.js"
import {Place} from "../../../primitives/place.js"

export function translate_to_new_position(previous: Place) {
	return (direction: V2) => v2.add(previous.vector, direction)
}

