
import {Grid} from "./scratch.js"
import {make_text_view_for_grid} from "./text/make_text_view_for_grid.js"

const grid = new Grid()

//

grid.get(0, 0).junctions.north = false
grid.get(0, 0).junctions.east = true
grid.get(0, 0).junctions.south = true
grid.get(0, 0).junctions.west = false

grid.get(1, 0).junctions.north = true
grid.get(1, 0).junctions.east = false
grid.get(1, 0).junctions.south = false
grid.get(1, 0).junctions.west = true

grid.get(2, 0).junctions.north = false
grid.get(2, 0).junctions.east = false
grid.get(2, 0).junctions.south = false
grid.get(2, 0).junctions.west = false

//

grid.get(0, 1).junctions.north = true
grid.get(0, 1).junctions.east = true
grid.get(0, 1).junctions.south = false
grid.get(0, 1).junctions.west = false

grid.get(1, 1).junctions.north = false
grid.get(1, 1).junctions.east = true
grid.get(1, 1).junctions.south = false
grid.get(1, 1).junctions.west = true

grid.get(2, 1).junctions.north = false
grid.get(2, 1).junctions.east = false
grid.get(2, 1).junctions.south = true
grid.get(2, 1).junctions.west = true

//

grid.get(0, 2).junctions.north = false
grid.get(0, 2).junctions.east = false
grid.get(0, 2).junctions.south = false
grid.get(0, 2).junctions.west = false

grid.get(1, 2).junctions.north = false
grid.get(1, 2).junctions.east = true
grid.get(1, 2).junctions.south = true
grid.get(1, 2).junctions.west = false

grid.get(2, 2).junctions.north = true
grid.get(2, 2).junctions.east = false
grid.get(2, 2).junctions.south = false
grid.get(2, 2).junctions.west = true

console.log(make_text_view_for_grid(grid).render())

