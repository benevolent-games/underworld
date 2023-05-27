
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

export function walk_new_path({randy, steps, banned_direction}: {
		randy: Randy,
		steps: number,
		banned_direction?: V2,
	}) {

	const path: Place[] = []
	path.push(new Place([0, 0]))
	steps -= 1

	loop(steps, function step_forward() {
		const previous_place = path.at(-1)!

		const possible_next_positions = Object.values(cardinal)
			.filter(remove_banned_direction(banned_direction))
			.map(translate_to_new_position(previous_place))
			.filter(remove_occupied_positions(path))

		if (possible_next_positions.length === 0)
			throw new Error("no possible positions to generate next step")

		const next_position = randy.select(possible_next_positions)
		const next_place = new Place(next_position)

		open_junctions_between(previous_place, next_place)
		path.push(next_place)
	})

	return path
}

function open_junctions_between(a: Place, b: Place) {
	const direction_a = v2.subtract(b.vector, a.vector)
	const direction_b = v2.subtract(a.vector, b.vector)
	a.junctions.open(direction_a)
	b.junctions.open(direction_b)
}

function remove_banned_direction(banned_direction?: V2) {
	return (direction: V2) => {
		if (banned_direction)
			return !v2.equal(direction, banned_direction)
		else
			return true
	}
}

function translate_to_new_position(previous: Place) {
	return (direction: V2) => v2.add(previous.vector, direction)
}

function remove_occupied_positions(path: Place[]) {
	return (position: V2) => !path.some(place => v2.equal(place.vector, position))
}

