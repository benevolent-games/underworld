
export function between(x: number, min: number, max: number) {
	if (x < min)
		return false

	if (x > max)
		return false

	return true
}

