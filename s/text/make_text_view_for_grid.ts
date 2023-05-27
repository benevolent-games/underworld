
import {Grid} from "../scratch.js"
import {graphics} from "./graphics.js"
import {TextView} from "./text_view.js"

export function make_text_view_for_grid(grid: Grid) {
	const {width, height} = graphics.cell
	const view = new TextView(width * 3, height * 3)

	grid.loop((cell, x, y) => {
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

