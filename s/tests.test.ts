
import {Randy} from "./tools/randy.js"
import {cardinal, walk_new_path} from "./scratch.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_grid.js"

const random = Randy.seed(98)
const randy = new Randy(random)

const tiles = walk_new_path({
	randy,
	steps: 4,
	banned_direction: cardinal.north,
})

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: true})
)

