
import {V2, v2} from "../../../tools/v2.js"
import {Place} from "../../../primitives/place.js"

export function remove_occupied_positions(path: Place[]) {
	return (position: V2) => !path.some(place => v2.equal(place.vector, position))
}

