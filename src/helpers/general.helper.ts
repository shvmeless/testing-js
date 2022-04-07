// IMPORTS
import callerPath from 'caller-path';

// FUNCTION
export function stringify ( value: unknown ): string {

	let output = value;

	if ( typeof value === 'string' ) output = `'${ value }'`;
	else if ( typeof value === 'undefined' ) output = 'undefined';
	else if ( value === null ) output = 'null';
	else if ( Number.isNaN( value ) ) output = 'NaN';
	else if ( typeof value === 'boolean' ) output = value.toString();
	else if ( typeof value === 'number' ) output = value.toString();
	else if ( typeof value === 'symbol' ) output = value.toString();
	else if ( typeof value === 'function' ) output = value.name;
	else if ( typeof value === 'object' ) output = JSON.stringify( value );

	return `${ output }`;

}

// FUNCTION
export function caller ( depth: number = 0 ): string {

	const path = callerPath( { depth: depth } );
	return path || '';

}
