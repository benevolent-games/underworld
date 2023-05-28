
import {V2, v2} from "./tools/v2.js"
import {Randy} from "./tools/randy.js"
import {Grid9} from "./primitives/grid9.js"
import {Place} from "./primitives/place.js"
import {cardinal} from "./tools/cardinal.js"
import {walk_new_path} from "./pathing/walk_new_path.js"
import {make_text_view_for_dungeon} from "./text/make_text_view_for_dungeon.js"
import {open_junctions_between} from "./pathing/utils/open_junctions_between.js"

const random = Randy.seed(1)
const randy = new Randy(random)

const steps = 3
const number_of_big_tiles = Math.round(randy.between(1, 2))
const banned_direction = cardinal.north

////////

const start_time = performance.now()

const tiles = walk_new_path({
	randy,
	steps: steps + 2,
	banned_direction,
})

const number_of_tiles_to_subdivide = steps - number_of_big_tiles

const inner_tiles_to_subdivide = randy.select(
	number_of_tiles_to_subdivide,
	tiles.slice(1, -1),
)

for (const tile of inner_tiles_to_subdivide) {
	const grid = new Grid9()

	function make_cell_to_match_outer_tile_junction(direction: V2) {
		const position = Grid9.get_position_from_grid_center(direction)
		const place = new Place(position)
		place.junctions.open(direction)
		grid.insert(place)
	}

	for (const direction of tile.junctions.directions)
		make_cell_to_match_outer_tile_junction(direction)

	// make path between start ane end cells
	{
		const [start, end] = grid.cells
		let path: V2[] = [start.vector]
		let done = false
		const remove_steps_already_in_path = (vector: V2) =>
			!path.some(v => v2.equal(v, vector))
		while (!done) {
			const previous = path.at(-1)!
			const allowable_steps = (
				Object.values(cardinal)
					.map(direction => v2.add(previous, direction))
					.filter(position => Grid9.is_in_bounds(position))
					.filter(remove_steps_already_in_path)
			)
			if (allowable_steps.length === 0) {
				path = [start.vector]
				continue
			}
			const next_step = randy.choose(allowable_steps)
			path.push(next_step)
			if (v2.equal(next_step, end.vector))
				done = true
		}
		const cells = path.map(vector => {
			let cell = grid.at(vector)
			if (!cell) {
				cell = new Place(vector)
				grid.insert(cell)
			}
			return cell
		})

		let previous: Place | undefined
		for (const cell of cells) {
			if (previous)
				open_junctions_between(previous, cell)
			previous = cell
		}
	}

	tile.children = grid
}

console.log(
	make_text_view_for_dungeon(tiles)
		.render({border: false})
)

console.log(`generated in ${(performance.now() - start_time).toFixed(2)} ms`)

