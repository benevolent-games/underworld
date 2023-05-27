
import {Randy} from "./tools/randy.js"
import {cardinal} from "./tools/cardinal.js"
import {walk_new_path} from "./pathing/walk_new_path.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_grid.js"

const random = Randy.seed(5)
const randy = new Randy(random)

const tiles = walk_new_path({
	randy,
	steps: 5,
	banned_direction: cardinal.north,
})

for (const tile of tiles) {
	if (randy.roll(75 / 100))
		void 0
}

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: true})
)

