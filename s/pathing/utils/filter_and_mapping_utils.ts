
import {V2, v2} from "../../tools/v2.js"
import {Place} from "../../primitives/place.js"

export function remove_banned_direction(banned_direction?: V2) {
	return (direction: V2) => {
		if (banned_direction)
			return !v2.equal(direction, banned_direction)
		else
			return true
	}
}

export function translate_to_new_position(previous: Place) {
	return (direction: V2) => v2.add(previous.vector, direction)
}

export function remove_occupied_positions(path: Place[]) {
	return (position: V2) => !path.some(place => v2.equal(place.vector, position))
}

