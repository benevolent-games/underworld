
import {Randy} from "./tools/randy.js"
import {cardinal} from "./tools/cardinal.js"
import {walk_new_path} from "./pathing/walk_new_path.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_grid.js"
import { Grid9 } from "./primitives/grid9.js"
import { Place } from "./primitives/place.js"

const random = Randy.seed(5)
const randy = new Randy(random)

const tiles = walk_new_path({
	randy,
	steps: 5,
	banned_direction: cardinal.north,
})

for (const tile of tiles) {
	const should_subdivide_this_tile = randy.roll(3 / 4)

	if (should_subdivide_this_tile) {
		tile.children = new Grid9()
		const position = Grid9.get_position_from_grid_center(cardinal.north)
		const place = new Place(position)
		place.junctions.north = true
		tile.children.insert(place)
	}
}

// const tile = new Place([0, 0])
// tile.junctions.north = true
// tile.children = new Grid9()

// const position = Grid9.get_position_from_grid_center(cardinal.north)
// const cell = new Place(position)
// cell.junctions.north = true
// tile.children.insert(cell)

// const tiles = [tile]

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: true})
)

