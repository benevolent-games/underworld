
import {V2} from "../tools/v2.js"
import {Randy} from "../tools/randy.js"

export type DungeonSettings = {
	randy: Randy
	number_of_tiles_between_start_and_end: number
	number_of_big_tiles: number
	chance_of_grid_sprout: number
	chance_of_sprout_attempting_to_loop: number
	chance_of_sprout_giving_up_early: number
	max_dead_end_cell_length: number
	banned_direction?: V2
}
