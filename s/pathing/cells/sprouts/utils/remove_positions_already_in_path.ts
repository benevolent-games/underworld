
import {V2, v2} from "../../../../tools/v2.js"

export function remove_positions_already_in_path(path: V2[]) {
	return (position: V2) => !path.some(p => v2.equal(p, position))
}

