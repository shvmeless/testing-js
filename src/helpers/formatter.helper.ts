// IMPORTS
import { BOLD, RED, RESET, WHITE, YELLOW } from '../utils/styles';

// FUNCTION
export function formatTimer ( time: number ): string {

	if ( time === 0 ) return '';

	const color = time > 2500 ? RED : time > 1000 ? YELLOW : WHITE;
	const style = time > 1000 ? BOLD : '';

	if ( time > 1000 ) time = Math.trunc( time / 100 ) / 10;

	return `${ color }${ style }${ time } ms${ RESET }`;

}
