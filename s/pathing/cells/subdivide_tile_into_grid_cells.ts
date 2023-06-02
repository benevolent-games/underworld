
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"
import {DungeonSettings} from "../dungeon_settings.js"
import {create_cells_in_path_between_two_cells} from "./create_cells_in_path_between_two_cells.js"
import {create_cells_inside_tile_at_each_junction} from "./create_cells_inside_tile_at_each_junction.js"
import {create_sprout_to_form_loop_or_dead_end} from "./sprouts/create_sprout_to_form_loop_or_dead_end.js"

export function subdivide_tile_into_grid_cells(
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
			...create_sprout_to_form_loop_or_dead_end(grid, settings)
		)

	return grid
}

