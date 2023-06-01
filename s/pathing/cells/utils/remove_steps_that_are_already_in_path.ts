
import {Pathway} from "../../common/pathway.js"
import {V2, v2} from "../../../tools/v2.js"

export function remove_steps_that_are_already_in_path(path: Pathway) {
	return (position: V2) => !path.array.some(v => v2.equal(v, position))
}

