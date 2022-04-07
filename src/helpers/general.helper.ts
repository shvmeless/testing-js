// IMPORTS
import callerPath from 'caller-path';

// FUNCTION
export function caller ( depth: number = 0 ): string {

	const path = callerPath( { depth: depth } );
	return path || '';

}
