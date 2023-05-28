
import {V2, v2} from "../tools/v2.js"
import {cardinal} from "../tools/cardinal.js"

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

	get directions() {
		const directions: V2[] = []

		if (this.north)
			directions.push(cardinal.north)

		if (this.east)
			directions.push(cardinal.east)

		if (this.south)
			directions.push(cardinal.south)

		if (this.west)
			directions.push(cardinal.west)

		return directions
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

