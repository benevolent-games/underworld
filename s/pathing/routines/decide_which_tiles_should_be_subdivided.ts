
import {Randy} from "../../tools/randy.js"
import {Place} from "../../primitives/place.js"

export function decide_which_tiles_should_be_subdivided(
		randy: Randy,
		tiles: Place[],
		number_of_big_tiles: number,
	) {

	const number_of_inner_tiles = tiles.length - 2

	const number_of_tiles_to_subdivide =
		number_of_inner_tiles - number_of_big_tiles

	return randy.select(
		number_of_tiles_to_subdivide,
		tiles.slice(1, -1),
	)
}

