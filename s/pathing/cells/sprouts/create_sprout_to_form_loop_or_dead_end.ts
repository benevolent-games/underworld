
import {Grid9} from "../../../primitives/grid9.js"
import {DungeonSettings} from "../../dungeon_settings.js"
import {wander_sprout_path} from "./routines/wander_sprout_path.js"
import {open_junctions_along_path} from "../../common/open_junctions_along_path.js"
import {select_vacancies_that_have_adjacent_cells} from "./utils/select_vacancies_that_have_adjacent_cells.js"
import {make_new_cells_and_prepare_loop_or_dead_end} from "./routines/make_new_cells_and_prepare_loop_or_dead_end.js"

export function create_sprout_to_form_loop_or_dead_end(
		grid: Grid9,
		settings: DungeonSettings,
	) {

	if (grid.vacancies.length === 0)
		return []

	const path = wander_sprout_path(
		settings,
		grid,
		settings.randy.choose(
			select_vacancies_that_have_adjacent_cells(grid)
		),
	)

	const {
		new_cells,
		full_cell_path_including_connections_to_existing_cells,
	} = make_new_cells_and_prepare_loop_or_dead_end(
		settings,
		grid,
		path,
	)

	open_junctions_along_path(
		full_cell_path_including_connections_to_existing_cells
	)

	return new_cells
}

