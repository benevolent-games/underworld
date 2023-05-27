
import {between} from "./tools/numb.js"
import {loop2d} from "./tools/loopy.js"

export class Junctions {
	north = false
	east = false
	south = false
	west = false

	get count() {
		let c = 0

		function consider(value: boolean) {
			if (value)
				c += 1
		}

		consider(this.north)
		consider(this.east)
		consider(this.south)
		consider(this.west)

		return c
	}
}

export class Cell {
	junctions = new Junctions()

	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}
}

export class Grid {
	cells: Cell[] = []

	constructor() {
		loop2d(3, 3, (x, y) => this.cells.push(new Cell(x, y)))
	}

	get(x: number, y: number) {
		return this.cells[(3 * y) + x]
	}

	loop(fun: (cell: Cell, x: number, y: number) => void) {
		loop2d(3, 3, (x, y) => fun(this.get(x, y), x, y))
	}

	is_in_bounds(x: number, y: number) {
		const min = 0
		const max = 3
		return between(x, min, max) && between(y, min, max)
	}

	find(x: number, y: number) {
		return this.is_in_bounds(x, y)
			? this.get(x, y)
			: undefined
	}

	neighbors({x, y}: Cell) {
		return {
			north: this.find(x, y + 1),
			east: this.find(x + 1, y),
			west: this.find(x - 1, y),
			south: this.find(x, y - 1),
		}
	}
}

