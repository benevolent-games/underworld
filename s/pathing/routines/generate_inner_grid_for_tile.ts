
import {Randy} from "../../tools/randy.js"
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"
import {create_cells_in_path_between_two_cells} from "./create_cells_in_path_between_two_cells.js"
import {create_cells_inside_tile_at_each_junction} from "./create_cells_inside_tile_at_each_junction.js"

export function generate_inner_grid_for_tile(
		tile: Place,
		randy: Randy,
	) {

	const grid = new Grid9()
	grid.insert(
		...create_cells_inside_tile_at_each_junction(tile)
	)

	const [start, end] = grid.cells;
	grid.insert(
		...create_cells_in_path_between_two_cells(randy, grid, start, end)
	)

	return grid
}

