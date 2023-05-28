
import {TextView} from "./text_view.js"
import {PlaceGraphics} from "./utils/place_graphics.js"

export const graphics = {
	cell: {

		box: TextView.graphic(`
			╔═══╗
			║   ║
			╚═══╝
		`),

		north: TextView.graphic(`
			║┄┄┄║
			·····
			·····
		`),

		east: TextView.graphic(`
			····═
			····┊
			····═
		`),

		south: TextView.graphic(`
			·····
			·····
			║┄┄┄║
		`),

		west: TextView.graphic(`
			═····
			┊····
			═····
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
			·····╝┄┄┄╚·····
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
			··············╚
			··············┊
			··············╔
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
			·····╗┄┄┄╔·····
		`),

		west: TextView.graphic(`
			···············
			···············
			···············
			╝··············
			┊··············
			╗··············
			···············
			···············
			···············
		`),

	} satisfies PlaceGraphics,


	start_tile: TextView.graphic(`
		···············
		···············
		···············
		···············
		·····START·····
		···············
		···············
		···············
		···············
	`),

	end_tile: TextView.graphic(`
		···············
		···············
		···············
		···············
		······END······
		···············
		···············
		···············
		···············
	`),
}

