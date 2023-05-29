
import {Place} from "../../primitives/place.js"
import {open_junctions_between} from "./open_junctions_between.js"

export function open_junctions_between_cells_along_path(cells: Place[]) {
	let previous: Place | undefined

	for (const cell of cells) {
		if (previous)
			open_junctions_between(previous, cell)

		previous = cell
	}
}

