
import {Randy} from "./tools/randy.js"
import {cardinal} from "./tools/cardinal.js"
import {generate_dungeon} from "./pathing/generate_dungeon.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_dungeon.js"

const random = Randy.seed(5)
const randy = new Randy(random)

const tiles = generate_dungeon({
	randy,
	number_of_tiles_between_start_and_end: 4,
	number_of_big_tiles: Math.round(randy.between(1, 2)),
	banned_direction: cardinal.north,
})

const start_time = performance.now()

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: false})
)

console.log(`generated in ${(performance.now() - start_time).toFixed(2)} ms`)

