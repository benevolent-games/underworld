
import {V2} from "../../../tools/v2.js"
import {Grid9} from "../../../primitives/grid9.js"

export function remove_steps_that_are_out_of_bounds(position: V2) {
	return Grid9.is_in_bounds(position)
}

