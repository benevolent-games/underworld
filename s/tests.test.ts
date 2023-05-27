
import {Randy} from "./tools/randy.js"
import {generate_path, open_junctions_along_path} from "./scratch.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_grid.js"

const randy = new Randy(Randy.seed(98))
const tiles = generate_path(randy, 5)
open_junctions_along_path(tiles)

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: true})
)

