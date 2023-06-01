
import {V2, v2} from "../../tools/v2.js"

export class Pathway {
	#start: V2
	#end: V2
	#path: V2[]

	constructor(start: V2, end: V2) {
		this.#start = start
		this.#end = end
		this.#path = [start]
	}

	get array() {
		return this.#path
	}

	get last() {
		return this.#path.at(-1)!
	}

	get finished() {
		return v2.equal(this.last, this.#end)
	}

	add(step: V2) {
		this.#path.push(step)
	}

	discard_and_restart_from_the_beginning() {
		this.#path = [this.#start]
	}
}

