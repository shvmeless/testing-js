// IMPORTS
import { Test, TestContext, TestFile, TestGroup } from '../utils/interfaces';
import { BOLD, GREEN, RED, RESET } from '../utils/styles';
import { basename, dirname, relative, sep } from 'path';
import output from '../classes/Output';

// FUNCTION
export function displayFile ( file: TestFile, rootPath: string ): void {

	const { result, contexts } = file;
	let { path } = file;

	if ( contexts.length <= 0 ) return;

	path = relative( dirname( rootPath ), path );

	const color = result ? GREEN : RED;

	const label = `${ color }${ BOLD }FILE${ RESET }`;
	const route = `${ dirname( path ) }${ sep }${ BOLD }${ basename( path ) }${ RESET }`;
	const icon = `${ color }${ BOLD }▼${ RESET }`;

	output
		.newLine()
		.print( `${ label } ${ route } ${ icon }` );

	for ( const context of contexts ) displayContext( context );

}

// FUNCTION
export function displayContext ( context: TestContext ): void {

	const { desc, groups, result } = context;

	if ( groups.length <= 0 ) return;

	const color = result ? GREEN : RED;
	const icon = `${ color }${ BOLD }▪${ RESET }`;

	output.newLine().print( `${ icon } ${ desc }` );

	output.tabs( 1 );
	for ( const group of groups ) displayGroup( group );
	output.tabs( -1 );

}

// FUNCTION
export function displayGroup ( group: TestGroup ): void {

	const { desc, result, tests } = group;

	if ( tests.length <= 0 ) return;

	const color = result ? GREEN : RED;
	const icon = `${ color }${ BOLD }${ result ? '√' : '×' }${ RESET }`;

	output.print( `${ icon } ${ desc }` );
	output.tabs( 1 );

	let count = 0;
	for ( const test of tests ) {

		if ( !test.result && count < 5 ) {
			displayTest( test );
			count++;
		}

	}

	if ( count >= 5 ) output.print( `» showing ${ count } of ${ tests.length } failures!` );
	output.tabs( -1 );

}

// FUNCTION
export function displayTest ( test: Test ): void {

	const { message } = test;
	output.print( `» ${ message }` );

}
