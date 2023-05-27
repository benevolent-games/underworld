
import {TextView} from "./text_view.js"

export type PlaceGraphics = {
	box: TextView
	north: TextView
	east: TextView
	south: TextView
	west: TextView
}

export const graphics = {
	cell: {

		box: TextView.graphic(`
			╔═══╗
			║   ║
			╚═══╝
		`),

		north: TextView.graphic(`
			··╬··
			·····
			·····
		`),

		east: TextView.graphic(`
			·····
			····╬
			·····
		`),

		south: TextView.graphic(`
			·····
			·····
			··╬··
		`),

		west: TextView.graphic(`
			·····
			╬····
			·····
		`),

	} satisfies PlaceGraphics,

	tile: {

		box: TextView.graphic(`
			╔═════════════╗
			║   ┊┊   ┊┊   ║
			║┄┄┄┘└┄┄┄┘└┄┄┄║
			║┄┄┄┐┌┄┄┄┐┌┄┄┄║
			║   ┊┊   ┊┊   ║
			║┄┄┄┘└┄┄┄┘└┄┄┄║
			║┄┄┄┐┌┄┄┄┐┌┄┄┄║
			║   ┊┊   ┊┊   ║
			╚═════════════╝
		`),

		north: TextView.graphic(`
			·······╬·······
			···············
			···············
			···············
			···············
			···············
			···············
			···············
			···············
		`),

		east: TextView.graphic(`
			···············
			···············
			···············
			···············
			··············╬
			···············
			···············
			···············
			···············
		`),

		south: TextView.graphic(`
			···············
			···············
			···············
			···············
			···············
			···············
			···············
			···············
			·······╬·······
		`),

		west: TextView.graphic(`
			···············
			···············
			···············
			···············
			╬··············
			···············
			···············
			···············
			···············
		`),

	} satisfies PlaceGraphics,
}

