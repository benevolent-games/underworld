
import {V2, v2} from "../../tools/v2.js"
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"
import {DungeonSettings} from "../dungeon_settings.js"
import {create_cells_in_path_between_two_cells} from "./create_cells_in_path_between_two_cells.js"
import {open_junctions_between_cells_along_path} from "./open_junctions_between_cells_along_path.js"
import {create_cells_inside_tile_at_each_junction} from "./create_cells_inside_tile_at_each_junction.js"

export function generate_inner_grid_for_tile(
		tile: Place,
		settings: DungeonSettings,
	) {

	const {randy} = settings

	const grid = new Grid9()

	grid.insert(
		...create_cells_inside_tile_at_each_junction(tile)
	)

	const [start, end] = grid.cells

	grid.insert(
		...create_cells_in_path_between_two_cells(randy, grid, start, end)
	)

	if (randy.roll(settings.chance_of_grid_sprout))
		grid.insert(
			...sprout_loop_or_dead_end(grid, settings)
		)

	return grid
}

export function sprout_loop_or_dead_end(
		grid: Grid9,
		settings: DungeonSettings,
	) {

	const {randy} = settings
	const {vacancies} = grid

	if (vacancies.length === 0)
		return []

	const vacancies_with_neighbors = (
		vacancies
			.filter(select_vacancies_that_have_cells_adjacent(grid))
	)

	const path = [randy.choose(vacancies_with_neighbors)]
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

	let full_path_including_connections: Place[] = []

	if (is_loop) {
		full_path_including_connections = [
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
		full_path_including_connections = [
			start_connection_cell,
			...new_cells,
		]
	}

	open_junctions_between_cells_along_path(full_path_including_connections)

	return new_cells
}

function remove_positions_already_in_path(path: V2[]) {
	return (position: V2) => !path.some(p => v2.equal(p, position))
}

function select_vacancies_that_have_cells_adjacent(grid: Grid9) {
	return (position: V2) => grid.neighbors(position).cells.length > 0
}

