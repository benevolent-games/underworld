
import {V2, v2} from "./tools/v2.js"
import {Randy} from "./tools/randy.js"
import {between} from "./tools/numb.js"
import {loop, loop2d} from "./tools/loopy.js"

export const cardinal = {
	north: [0, -1] as V2,
	east: [1, 0] as V2,
	south: [0, 1] as V2,
	west: [-1, 0] as V2,
}

export class Junctions {
	north = false
	east = false
	south = false
	west = false

	get count() {
		let c = 0
		const consider = (value: boolean) => c += (value ?1 :0)
		consider(this.north)
		consider(this.east)
		consider(this.south)
		consider(this.west)
		return c
	}

	open(direction: V2) {
		const is = (d: V2) => v2.equal(direction, d)

		if (is(cardinal.north))
			this.north = true

		if (is(cardinal.east))
			this.east = true

		if (is(cardinal.south))
			this.south = true

		if (is(cardinal.west))
			this.west = true
	}
}

export class Place {
	children?: Grid9
	junctions = new Junctions()
	constructor(public readonly vector: V2) {}
}

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

export function generate_path(randy: Randy, length: number) {
	const path: Place[] = [new Place([0, 0])]
	const banned_direction = cardinal.north

	const position_is_already_taken = (position: V2) => (
		path.some(place => v2.equal(place.vector, position))
	)

	function generate_next_step() {
		const last = path.at(-1)!

		const possible_positions = Object.values(cardinal)
			.filter(direction => !v2.equal(direction, banned_direction))
			.map(cardinal => v2.add(last.vector, cardinal))
			.filter(position => !position_is_already_taken(position))

		if (possible_positions.length < 1)
			throw new Error("no possible positions to generate next step")

		const place = new Place(randy.select(possible_positions))
		path.push(place)
	}

	loop(length - 1, generate_next_step)
	return path
}

export function open_junctions_along_path(path: Place[]) {
	let previous: undefined | Place

	for (const place of path) {
		if (previous) {
			const direction_a = v2.subtract(place.vector, previous.vector)
			const direction_b = v2.subtract(previous.vector, place.vector)
			previous.junctions.open(direction_a)
			place.junctions.open(direction_b)
		}
		previous = place
	}
}

