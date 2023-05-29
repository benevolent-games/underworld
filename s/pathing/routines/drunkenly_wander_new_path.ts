
import {V2} from "../../tools/v2.js"
import {loop} from "../../tools/loopy.js"
import {Randy} from "../../tools/randy.js"
import {Place} from "../../primitives/place.js"
import {cardinal} from "../../tools/cardinal.js"
import {open_junctions_between} from "./open_junctions_between.js"
import {remove_banned_direction} from "./utils/remove_banned_direction.js"
import {remove_occupied_positions} from "./utils/remove_occupied_positions.js"
import {translate_to_new_position} from "./utils/translate_to_new_position.js"

export function drunkenly_wander_new_path({randy, steps, banned_direction}: {
		randy: Randy,
		steps: number,
		banned_direction?: V2,
	}) {

	const path: Place[] = []

	path.push(new Place([0, 0]))
	steps -= 1

	loop(steps, function step_forward() {
		const previous_place = path.at(-1)!

		const possible_next_positions = Object.values(cardinal)
			.filter(remove_banned_direction(banned_direction))
			.map(translate_to_new_position(previous_place))
			.filter(remove_occupied_positions(path))

		if (possible_next_positions.length === 0)
			throw new Error("no possible positions to generate next step")

		const next_position = randy.choose(possible_next_positions)
		const next_place = new Place(next_position)

		open_junctions_between(previous_place, next_place)
		path.push(next_place)
	})

	return path
}

