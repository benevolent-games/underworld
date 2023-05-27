
import {V2} from "./v2.js"

export function loop(
		n: number,
		fun: (i: number) => void,
	) {
	for (let i = 0; i < n; i++)
		fun(i)
}

export function loop2d(
		[columns, rows]: V2,
		fun: (vector: V2) => void,
	) {
	for (let y = 0; y < rows; y++)
		for (let x = 0; x < columns; x++)
			fun([x, y])
}

