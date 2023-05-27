
import {V2, v2} from "../tools/v2.js"
import {between} from "../tools/numb.js"
import {loop, loop2d} from "../tools/loopy.js"

export class TextView {

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

		const view = new TextView([width, height])
		view.characters = characters
		return view
	}

	readonly dimensions: V2
	characters: string[][] = []

	get width() { return this.dimensions[0] }
	get height() { return this.dimensions[1] }

	constructor(dimensions: V2) {
		this.dimensions = dimensions
		const [width, height] = dimensions
		loop(height, () => {
			const line: string[] = []
			loop(width, () => line.push(" "))
			this.characters.push(line)
		})
	}

	has([x, y]: V2) {
		return between(x, 0, this.width) && between(y, 0, this.height)
	}

	get([x, y]: V2) {
		return this.characters[y][x]
	}

	draw(start_vector: V2, graphic: TextView) {
		graphic.loop((character, graphic_vector) => {
			const [view_x, view_y] = v2.add(start_vector, graphic_vector)
			if (!TextView.is_character_blank(character))
				this.characters[view_y][view_x] = character
		})
	}

	loop(fun: (character: string, vector: V2) => void) {
		loop2d(this.dimensions, v => fun(this.get(v), v))
	}

	render({border = false}: {border?: boolean} = {}) {

		if (border) {
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

		else {
			return this.characters
				.map(line => line.join(""))
				.join("\n")
		}
	}
}

