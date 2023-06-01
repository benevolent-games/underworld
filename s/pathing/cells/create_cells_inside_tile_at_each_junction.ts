
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"

export function create_cells_inside_tile_at_each_junction(
		tile: Place
	) {

	return tile.junctions.directions.map(direction => {
		const position = Grid9.get_position_from_grid_center(direction)
		const cell = new Place(position)
		cell.junctions.open(direction)
		return cell
	})
}

