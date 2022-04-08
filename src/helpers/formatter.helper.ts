// IMPORTS
import { BOLD, RED, RESET, WHITE, YELLOW } from '../utils/styles';

// FUNCTION
export function formatTimer ( time: number, min: number = 0, medium: number = 1000, max: number = 2500 ): string {

	if ( time === min ) return '';

	const color = time > max ? RED : time > medium ? YELLOW : WHITE;
	const style = time > medium ? BOLD : '';

	if ( time > 1000 ) time = Math.trunc( time / 100 ) / 10;

	return `${ color }${ style }${ time } ms${ RESET }`;

}
