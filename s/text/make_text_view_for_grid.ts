
import {V2, v2} from "../tools/v2.js"
import {PlaceGraphics, graphics} from "./graphics.js"
import {TextView} from "./text_view.js"
import {Place, Grid9} from "../scratch.js"

export function make_text_view_for_dungeon(tiles: Place[]) {

	const extent = {left: 0, right: 0, top: 0, bottom: 0}

	for (const tile of tiles) {
		const {vector: [x, y]} = tile
		if (x < extent.left) extent.left = x
		if (x > extent.right) extent.right = x
		if (y < extent.top) extent.top = y
		if (y > extent.bottom) extent.bottom = y
	}

	const offset: V2 = [-extent.left, -extent.top]

	const tileDimensions = v2.add([1, 1], [
		extent.right - extent.left,
		extent.bottom - extent.top,
	])

	const textCoordinates = {
		from_tile_vector([x, y]: V2): V2 {
			return v2.add(offset, [
				x * graphics.tile.box.width,
				y * graphics.tile.box.height,
			])
		},
		from_cell_vector(x: number, y: number): V2 {
			return [
				x * graphics.cell.box.width,
				y * graphics.cell.box.height,
			]
		},
	}

	const textView = new TextView(
		textCoordinates.from_tile_vector(tileDimensions)
	)

	for (const tile of tiles) {
		draw_place_with_junctions(textView, tile, graphics.tile)
	}

	return textView
}

function draw_place_with_junctions(view: TextView, place: Place, graphic: PlaceGraphics) {
	const [x, y] = place.vector
	const view_x = x * graphic.box.width
	const view_y = y * graphic.box.height
	const draw = (graphic: TextView) => view.draw(view_x, view_y, graphic)

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
		draw_place_with_junctions(view, cell, graphics.cell)

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

