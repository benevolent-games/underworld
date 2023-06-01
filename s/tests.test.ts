
import {Randy} from "./tools/randy.js"
import {cardinal} from "./tools/cardinal.js"
import {generate_dungeon} from "./pathing/generate_dungeon.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_dungeon.js"

const random = Randy.seed(61)
const randy = new Randy(random)

const start_time = performance.now()

const tiles = generate_dungeon({
	randy,
	number_of_tiles_between_start_and_end: 11,
	number_of_big_tiles: 1, // Math.round(randy.between(1, 2)),
	chance_of_grid_sprout: 7 / 10,
	chance_of_sprout_attempting_to_loop: 7 / 10,
	chance_of_sprout_giving_up_early: 1 / 10,
	max_dead_end_cell_length: 2,
	banned_direction: cardinal.north,
})

const time = (performance.now() - start_time).toFixed(2)

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: false})
)

console.log(`generated in ${time} ms`)

