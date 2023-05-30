
import {graphics} from "./graphics.js"

import {V2, v2} from "../tools/v2.js"
import {TextView} from "./text_view.js"
import {Place} from "../primitives/place.js"
import {ascertain_bounding_box} from "./utils/ascertain_bounding_box.js"
import {draw_place_with_junctions} from "./utils/draw_place_with_junctions.js"

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

	const end = tiles.at(-1)!

	textView.draw(
		offset_to_fit_at_origin,
		graphics.start_tile,
	)

	textView.draw(
		v2.add(
			offset_to_fit_at_origin,
			v2.multiply(end.vector, graphics.end_tile.dimensions),
		),
		graphics.end_tile,
	)

	return textView
}

