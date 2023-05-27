
export function loop(
		n: number,
		fun: (i: number) => void,
	) {
	for (let i = 0; i < n; i++)
		fun(i)
}

export function loop2d(
		columns: number,
		rows: number,
		fun: (x: number, y: number) => void,
	) {
	for (let y = 0; y < rows; y++)
		for (let x = 0; x < columns; x++)
			fun(x, y)
}

