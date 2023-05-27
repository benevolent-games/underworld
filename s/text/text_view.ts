
import {between} from "../tools/numb.js"
import {loop, loop2d} from "../tools/loopy.js"

export class TextView {
	characters: string[][] = []

	static is_character_blank(character: string) {
		return (character === "·") || (character === " ")
	}

	static graphic(content: string) {
		const characters = content
			.trim()
			.split("\n")
			.map(line => [...line.replaceAll(/^\t+/g, "")])

		const height = characters.length

		let width = 0
		for (const line of characters)
			if (line.length > width)
				width = line.length

		const view = new TextView(width, height)
		view.characters = characters
		return view
	}

	constructor(
			public readonly width: number,
			public readonly height: number,
		) {
		loop(height, () => {
			const line: string[] = []
			loop(width, () => line.push(" "))
			this.characters.push(line)
		})
	}

	has(x: number, y: number) {
		return between(x, 0, this.width) && between(y, 0, this.height)
	}

	get(x: number, y: number) {
		return this.characters[y][x]
	}

	draw(start_x: number, start_y: number, graphic: TextView) {
		graphic.loop((character, graphic_x, graphic_y) => {
			const view_x = start_x + graphic_x
			const view_y = start_y + graphic_y
			if (!TextView.is_character_blank(character))
				this.characters[view_y][view_x] = character
		})
	}

	loop(fun: (character: string, x: number, y: number) => void) {
		loop2d(
			this.width,
			this.height,
			(x, y) => fun(this.get(x, y), x, y),
		)
	}

	render() {
		const vertical = "│"
		let horizontal = ""
		loop(this.width, () => horizontal += "─")

		return [
			"╭" + horizontal + "╮",
			this.characters
				.map(line => vertical + line.join("") + vertical)
				.join("\n"),
			"╰" + horizontal + "╯",
		].join("\n")
	}
}

