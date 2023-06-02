
import {V2} from "../../../../tools/v2.js"
import {Grid9} from "../../../../primitives/grid9.js"
import {DungeonSettings} from "../../../dungeon_settings.js"
import {remove_positions_already_in_path} from "../utils/remove_positions_already_in_path.js"

export function wander_sprout_path(
		settings: DungeonSettings,
		grid: Grid9,
		start_position: V2,
	) {

	const {randy} = settings
	const path: V2[] = [start_position]
	let done = false

	while (!done) {
		const previous = path.at(-1)!
		const neighbors = grid.neighbors(previous)
		const satisfied_and_could_be_the_end = neighbors.cells.length > 0
		const available_next_steps = neighbors.vacancies
			.filter(remove_positions_already_in_path(path))

		const lets_call_it_a_day = satisfied_and_could_be_the_end
			&& randy.roll(settings.chance_of_sprout_giving_up_early)

		if (lets_call_it_a_day || available_next_steps.length === 0)
			done = true
		else
			path.push(randy.choose(available_next_steps))
	}

	return path
}

