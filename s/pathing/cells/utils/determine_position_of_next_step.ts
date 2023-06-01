
import {V2, v2} from "../../../tools/v2.js"

export function determine_position_of_next_step(previous_position: V2) {
	return (cardinal_direction: V2) => v2.add(previous_position, cardinal_direction)
}

