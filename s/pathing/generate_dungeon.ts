
import {DungeonSettings} from "./dungeon_settings.js"
import {drunkenly_wander_new_path} from "./routines/drunkenly_wander_new_path.js"
import {generate_inner_grid_for_tile} from "./routines/generate_inner_grid_for_tile.js"
import {decide_which_tiles_should_be_subdivided} from "./routines/decide_which_tiles_should_be_subdivided.js"

export function generate_dungeon(settings: DungeonSettings) {

	const {
		randy,
		number_of_tiles_between_start_and_end,
		number_of_big_tiles,
		banned_direction,
	} = settings

	if (number_of_big_tiles > number_of_tiles_between_start_and_end)
		throw new Error("too many big tiles (exceeds number of available tiles)")

	const tiles = drunkenly_wander_new_path({
		randy,
		banned_direction,
		steps: number_of_tiles_between_start_and_end + 2,
	})

	const to_subdivide = decide_which_tiles_should_be_subdivided(
		randy,
		tiles,
		number_of_big_tiles,
	)

	for (const tile of to_subdivide)
		tile.children = generate_inner_grid_for_tile(tile, settings)

	return tiles
}

