
import {Grid9} from "./grid9.js"
import {V2} from "../tools/v2.js"
import {Junctions} from "./junctions.js"

export class Place {
	children?: Grid9
	junctions = new Junctions()
	constructor(public readonly vector: V2) {}
}

