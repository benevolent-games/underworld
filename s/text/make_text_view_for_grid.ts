
import {V2, v2} from "../tools/v2.js"
import {graphics} from "./graphics.js"
import {TextView} from "./text_view.js"
import {Cell, Grid9} from "../scratch.js"

export function make_text_view_for_dungeon(bigpath: Cell[]) {

	const extent = {left: 0, right: 0, top: 0, bottom: 0}

	for (const cell of bigpath) {
		const {vector: [x, y]} = cell
		if (x < extent.left) extent.left = x
		if (x > extent.right) extent.right = x
		if (y < extent.top) extent.top = y
		if (y > extent.bottom) extent.bottom = y
	}

	const bigoffset: V2 = [-extent.left, -extent.top]

	const bigdimensions = v2.add([1, 1], [
		extent.right - extent.left,
		extent.bottom - extent.top,
	])

	const coordinates = {
		bigcell_to_text([x, y]: V2): V2 {
			return v2.add(bigoffset, [
				x * graphics.bigcell.width,
				y * graphics.bigcell.height,
			])
		},
		cell_to_text(x: number, y: number): V2 {
			return [
				x * graphics.cell.width,
				y * graphics.cell.height,
			]
		},
	}

	const textdimensions = coordinates.bigcell_to_text(
		v2.add([1, 1], [
			extent.right - extent.left,
			extent.bottom - extent.top,
		])
	)

	const text_view = new TextView(textdimensions)

	for (const bigcell of bigpath) {
		text_view.draw(
			...coordinates.bigcell_to_text(bigcell.vector),
			graphics.bigcell,
		)
	}

	return text_view
}

export function make_text_view_for_grid(grid: Grid9) {
	const {width, height} = graphics.cell
	const view = new TextView([width * 3, height * 3])

	grid.loop((cell, [x, y]) => {
		const view_x = x * width
		const view_y = y * height
		const {count} = cell.junctions

		function rend(graphic: TextView) {
			view.draw(view_x, view_y, graphic)
		}

		if (count > 0) {
			rend(graphics.cell)

			if (cell.junctions.north)
				rend(graphics.cell_north)

			if (cell.junctions.east)
				rend(graphics.cell_east)

			if (cell.junctions.south)
				rend(graphics.cell_south)

			if (cell.junctions.west)
				rend(graphics.cell_west)
		}
	})

	return view
}

