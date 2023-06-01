
import {Pathway} from "../common/pathway.js"
import {Grid9} from "../../primitives/grid9.js"
import {Place} from "../../primitives/place.js"

export function get_or_create_cells_along_pathway(
		grid: Grid9,
		pathway: Pathway,
	) {

	return pathway.array.map(vector => {
		let cell = grid.at(vector)

		if (!cell)
			cell = new Place(vector)

		return cell
	})
}

