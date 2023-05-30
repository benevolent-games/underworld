
import {Place} from "./place.js"
import {V2, v2} from "../tools/v2.js"
import {between} from "../tools/numb.js"
import {cardinal} from "../tools/cardinal.js"
import {loop, loop2d} from "../tools/loopy.js"

export class Grid9 {

	static position_to_index([x, y]: V2) {
		return (3 * y) + x
	}

	static is_in_bounds([x, y]: V2) {
		const min = 0
		const max = 2
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

	query(position: V2) {
		return Grid9.is_in_bounds(position)
			? {
				position,
				cell: this.#slots[Grid9.position_to_index(position)],
			}
			: undefined
	}

	at(vector: V2) {
		return Grid9.is_in_bounds(vector)
			? this.#slots[Grid9.position_to_index(vector)]
			: undefined
	}

	insert(...places: Place[]) {
		for (const place of places) {
			if (!Grid9.is_in_bounds(place.vector))
				throw new Error("cannot insert place out of grid9 bounds")

			const index = Grid9.position_to_index(place.vector)
			this.#slots[index] = place
		}
	}

	get vacancies() {
		let empty: V2[] = []

		loop2d([3, 3], position => {
			if (!this.at(position))
				empty.push(position)
		})

		return empty
	}

	neighbors(position: V2) {
		const cardinally = {
			north: this.query(v2.add(position, cardinal.north)),
			east: this.query(v2.add(position, cardinal.east)),
			south: this.query(v2.add(position, cardinal.south)),
			west: this.query(v2.add(position, cardinal.west)),
		}

		const vacancies: V2[] = []
		const cells: Place[] = []

		for (const result of Object.values(cardinally)) {
			if (result) {
				if (result.cell)
					cells.push(result.cell)
				else
					vacancies.push(result.position)
			}
		}

		return {
			origin: this.query(position),
			cardinally,
			cells,
			vacancies,
		}
	}
}

