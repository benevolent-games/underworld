
import {Place} from "../../primitives/place.js"
import {open_junctions_between} from "./open_junctions_between.js"

export function open_junctions_along_path(places: Place[]) {
	let previous: Place | undefined

	for (const place of places) {
		if (previous)
			open_junctions_between(previous, place)

		previous = place
	}
}

