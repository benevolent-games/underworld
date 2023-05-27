
import {Place} from "./place.js"
import {V2, v2} from "../tools/v2.js"
import {loop} from "../tools/loopy.js"
import {between} from "../tools/numb.js"
import {cardinal} from "../tools/cardinal.js"

export class Grid9 {

	static position_to_index([x, y]: V2) {
		return (3 * y) + x
	}

	static is_in_bounds([x, y]: V2) {
		const min = 0
		const max = 3
		return between(x, min, max) && between(y, min, max)
	}

	static get_position_from_grid_center(direction: V2) {
		return v2.add([1, 1], direction)
	}

	#slots: (Place | undefined)[] = (() => {
		let cells: (Place | undefined)[] = []
		loop(9, () => cells.push(undefined))
		return cells
	})()

	get cells() {
		return this.#slots.filter(slot => !!slot) as Place[]
	}

	at(vector: V2) {
		return Grid9.is_in_bounds(vector)
			? this.#slots[Grid9.position_to_index(vector)]
			: undefined
	}

	insert(place: Place) {
		if (!Grid9.is_in_bounds(place.vector))
			throw new Error("cannot insert place out of grid9 bounds")

		const index = Grid9.position_to_index(place.vector)
		this.#slots[index] = place
	}

	available_around_position(vector: V2) {
		return Object.values(cardinal)
			.map(direction => v2.add(direction, vector))
			.filter(vector => Grid9.is_in_bounds(vector))
			.filter(vector => !this.at(vector))
	}

	neighbors(vector: V2) {
		return {
			north: this.at(v2.add(vector, cardinal.north)),
			east: this.at(v2.add(vector, cardinal.east)),
			south: this.at(v2.add(vector, cardinal.south)),
			west: this.at(v2.add(vector, cardinal.west)),
		}
	}
}

