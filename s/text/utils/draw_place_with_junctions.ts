
import {V2, v2} from "../../tools/v2.js"
import {TextView} from "../text_view.js"
import {Place} from "../../primitives/place.js"
import {PlaceGraphics} from "../utils/place_graphics.js"

export function draw_place_with_junctions(
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

