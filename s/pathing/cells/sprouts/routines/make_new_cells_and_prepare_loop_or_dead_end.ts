
import {V2} from "../../../../tools/v2.js"
import {Grid9} from "../../../../primitives/grid9.js"
import {Place} from "../../../../primitives/place.js"
import {DungeonSettings} from "../../../dungeon_settings.js"

export function make_new_cells_and_prepare_loop_or_dead_end(
		settings: DungeonSettings,
		grid: Grid9,
		path: V2[],
	) {

	const {randy} = settings

	let new_cells = path.map(position => new Place(position))
	const first_new_cell = new_cells.at(0)!
	const last_new_cell = new_cells.at(-1)!

	const start_connection_cell = randy.choose(
		grid.neighbors(first_new_cell.vector).cells
	)

	const possible_end_cells_for_loop_connection = (
		grid.neighbors(last_new_cell.vector)
			.cells
			.filter(cell => cell !== start_connection_cell)
	)

	const is_loop = (
		possible_end_cells_for_loop_connection.length > 0 &&
		randy.roll(settings.chance_of_sprout_attempting_to_loop)
	)

	let full_cell_path_including_connections_to_existing_cells: Place[] = []

	if (is_loop) {
		full_cell_path_including_connections_to_existing_cells = [
			start_connection_cell,
			...new_cells,
			randy.choose(possible_end_cells_for_loop_connection),
		]
	}
	else {
		if (new_cells.length > settings.max_dead_end_cell_length) {
			new_cells = (settings.max_dead_end_cell_length > 1)
				? new_cells.slice(0, Math.floor(randy.between(1, settings.max_dead_end_cell_length + 1)))
				: []
		}
		full_cell_path_including_connections_to_existing_cells = [
			start_connection_cell,
			...new_cells,
		]
	}

	return {
		new_cells,
		full_cell_path_including_connections_to_existing_cells,
	}
}

