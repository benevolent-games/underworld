
import {V2, v2} from "../../../tools/v2.js"

export function remove_banned_direction(banned_direction?: V2) {
	return (direction: V2) => {
		if (banned_direction)
			return !v2.equal(direction, banned_direction)

		else
			return true
	}
}

