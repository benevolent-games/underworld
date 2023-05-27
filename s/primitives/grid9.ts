
import {Place} from "./place.js"
import {V2} from "../tools/v2.js"
import {loop2d} from "../tools/loopy.js"
import {between} from "../tools/numb.js"

export class Grid9 {
	cells: Place[] = []

	constructor() {
		loop2d([3, 3], vector => this.cells.push(new Place(vector)))
	}

	get([x, y]: V2) {
		return this.cells[(3 * y) + x]
	}

	loop(fun: (cell: Place) => void) {
		loop2d([3, 3], vector => fun(this.get(vector)))
	}

	is_in_bounds([x, y]: V2) {
		const min = 0
		const max = 3
		return between(x, min, max) && between(y, min, max)
	}

	find(vector: V2) {
		return this.is_in_bounds(vector)
			? this.get(vector)
			: undefined
	}

	neighbors({vector: [x, y]}: Place) {
		return {
			north: this.find([x, y + 1]),
			east: this.find([x + 1, y]),
			west: this.find([x - 1, y]),
			south: this.find([x, y - 1]),
		}
	}
}

