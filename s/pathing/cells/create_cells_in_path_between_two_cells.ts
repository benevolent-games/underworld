
import {Randy} from "../../tools/randy.js"
import {Pathway} from "../common/pathway.js"
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"
import {cardinal} from "../../tools/cardinal.js"
import {open_junctions_along_path} from "../common/open_junctions_along_path.js"
import {there_are_no_available_steps} from "./utils/there_are_no_available_steps.js"
import {get_or_create_cells_along_pathway} from "./get_or_create_cells_along_pathway.js"
import {determine_position_of_next_step} from "./utils/determine_position_of_next_step.js"
import {remove_steps_that_are_out_of_bounds} from "./utils/remove_steps_that_are_out_of_bounds.js"
import {remove_steps_that_are_already_in_path} from "./utils/remove_steps_that_are_already_in_path.js"

export function create_cells_in_path_between_two_cells(
		randy: Randy,
		grid: Grid9,
		{vector: start}: Place,
		{vector: end}: Place,
	) {

	const pathway = new Pathway(start, end)

	while (!pathway.finished) {
		const allowable_steps = Object.values(cardinal)
			.map(determine_position_of_next_step(pathway.last))
			.filter(remove_steps_that_are_out_of_bounds)
			.filter(remove_steps_that_are_already_in_path(pathway))

		if (there_are_no_available_steps(allowable_steps)) {
			pathway.discard_and_restart_from_the_beginning()
			continue
		}

		pathway.add(randy.choose(allowable_steps))
	}

	const cells = get_or_create_cells_along_pathway(grid, pathway)
	open_junctions_along_path(cells)

	return cells
}

