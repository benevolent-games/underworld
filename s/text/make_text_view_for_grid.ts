
import {V2, v2} from "../tools/v2.js"
import {TextView} from "./text_view.js"
import {Place, Grid9} from "../scratch.js"
import {PlaceGraphics, graphics} from "./graphics.js"

export function ascertain_bounding_box(tiles: Place[]) {
	let left: number | undefined
	let right: number | undefined
	let top: number | undefined
	let bottom: number | undefined

	for (const {vector: [x, y]} of tiles) {
		if (left === undefined || x < left!)
			left = x

		if (right === undefined || x > right!)
			right = x

		if (top === undefined || y < top!)
			top = y

		if (bottom === undefined || y > bottom!)
			bottom = y
	}

	return {
		left: left!,
		right: right!,
		top: top!,
		bottom: bottom!,
		dimensions: [
			1 + right! - left!,
			1 + bottom! - top!,
		] as V2,
	}
}

export function make_text_view_for_dungeon(tiles: Place[]) {

	const bounding_box = ascertain_bounding_box(tiles)

	const offset_to_fit_at_origin_in_text_coordinates: V2 = v2.multiply([
		-bounding_box.left,
		-bounding_box.top,
	], graphics.tile.box.dimensions)

	const tile_dimensions = v2.multiply(
			bounding_box.dimensions,
			graphics.tile.box.dimensions,
	)

	const textView = new TextView(tile_dimensions)

	for (const tile of tiles) {
		draw_place_with_junctions(
			textView,
			tile,
			graphics.tile,
			offset_to_fit_at_origin_in_text_coordinates,
		)
	}

	return textView
}

function draw_place_with_junctions(
		view: TextView,
		place: Place,
		graphic: PlaceGraphics,
		offset: V2,
	) {

	const start_vector = v2.add(
		v2.multiply(place.vector, graphic.box.dimensions),
		offset,
	)

	const draw = (graphic: TextView) => view.draw(start_vector, graphic)

	if (place.junctions.count > 0) {
		draw(graphic.box)

		if (place.junctions.north)
			draw(graphic.north)

		if (place.junctions.east)
			draw(graphic.east)

		if (place.junctions.south)
			draw(graphic.south)

		if (place.junctions.west)
			draw(graphic.west)
	}
}

export function make_text_view_for_grid(grid: Grid9) {
	const {width, height} = graphics.cell.box
	const view = new TextView([width * 3, height * 3])

	grid.loop(cell => {
		draw_place_with_junctions(view, cell, graphics.cell, [0, 0])

		// const view_x = x * width
		// const view_y = y * height
		// const {count} = cell.junctions

		// function rend(graphic: TextView) {
		// 	view.draw(view_x, view_y, graphic)
		// }

		// if (count > 0) {
		// 	rend(graphics.cell.box)

		// 	if (cell.junctions.north)
		// 		rend(graphics.cell.north)

		// 	if (cell.junctions.east)
		// 		rend(graphics.cell.east)

		// 	if (cell.junctions.south)
		// 		rend(graphics.cell.south)

		// 	if (cell.junctions.west)
		// 		rend(graphics.cell.west)
		// }
	})

	return view
}

