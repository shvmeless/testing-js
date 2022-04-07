// IMPORTS
import callerPath from 'caller-path';
import { readdirSync } from 'fs';
import { resolve } from 'path';

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
export function searchTestFiles ( directory: string, typescript: boolean ): string[] {

	const dirents = readdirSync( directory, { withFileTypes: true } );

	const files = dirents
		.filter( ( fn ) => {

			if ( fn.name === 'node_modules' ) return false;
			if ( fn.isDirectory() ) return true;
			if ( fn.name.match( new RegExp( `[.]test[.]${ typescript ? 'ts' : 'js' }$` ) ) ) return true;

			return false;

		} )
		.map( ( dirent ) => {

			const res = resolve( directory, dirent.name );
			return dirent.isDirectory() ? searchTestFiles( res, typescript ) : res;

		} );

	return Array.prototype.concat( ...files );

}

// FUNCTION
export function caller ( depth: number = 0 ): string {

	const path = callerPath( { depth: depth } );
	return path || '';

}
