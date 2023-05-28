
import {V2, v2} from "../tools/v2.js"
import {TextView} from "./text_view.js"
import {Place} from "../primitives/place.js"
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

	const offset_to_fit_at_origin: V2 = v2.multiply([
		-bounding_box.left,
		-bounding_box.top,
	], graphics.tile.box.dimensions)

	const tile_dimensions = v2.multiply(
		bounding_box.dimensions,
		graphics.tile.box.dimensions,
	)

	const textView = new TextView(tile_dimensions)

	for (const tile of tiles) {
		if (tile.children) {
			const offset_for_this_tile = v2.multiply(
				tile.vector,
				graphics.tile.box.dimensions,
			)
			for (const cell of tile.children.cells) {
				draw_place_with_junctions(
					textView,
					cell,
					graphics.cell,
					v2.add(offset_to_fit_at_origin, offset_for_this_tile),
				)
			}
		}
		else {
			draw_place_with_junctions(
				textView,
				tile,
				graphics.tile,
				offset_to_fit_at_origin,
			)
		}
	}

	const start = tiles.at(0)!
	const end = tiles.at(-1)!

	textView.draw(
		offset_to_fit_at_origin,
		graphics.start_tile,
	)

	textView.draw(
		v2.add(offset_to_fit_at_origin, v2.multiply(end.vector, graphics.end_tile.dimensions)),
		graphics.end_tile,
	)

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

