
import {Grid9} from "../../../../primitives/grid9.js"

export function select_vacancies_that_have_adjacent_cells(grid: Grid9) {
	return grid
		.vacancies
		.filter(position => grid.neighbors(position).cells.length > 0)
}

