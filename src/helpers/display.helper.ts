// IMPORTS
import { Test, TestContext, TestFile, TestGroup } from '../utils/interfaces';
import { BOLD, BRIGHT_WHITE, GREEN, RED, RESET } from '../utils/styles';
import { basename, dirname, relative, sep } from 'path';
import counter from '../classes/Counter';
import output from '../classes/Output';
import { formatTimer } from './formatter.helper';

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

	output.newLine().print( `${ label } ${ route } ${ icon }` );

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

	const { desc, result, tests, time } = group;

	if ( tests.length <= 0 ) return;

	const color = result ? GREEN : RED;
	const icon = `${ color }${ BOLD }${ result ? '√' : '×' }${ RESET }`;

	const timer = formatTimer( time.end - time.start );

	output.print( `${ icon } ${ desc } ${ timer }` );
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

// FUNCTION
export function displayCounter (): void {

	const { total, successful, failed } = counter.getCount();

	output.newLine().print( `${ BRIGHT_WHITE }${ BOLD }Total: ${ total }${ RESET }` );
	if ( successful > 0 ) output.print( `${ GREEN }${ BOLD }Successful: ${ successful }${ RESET }` );
	if ( failed > 0 ) output.print( `${ RED }${ BOLD }Failed: ${ failed }${ RESET }` );

}

// FUNCTION
export function displayTimer (): void {

	const time = counter.getTimer();
	const timer = formatTimer( time, -1, 5000, 10000 );
	output.newLine().print( `${ BOLD }Time: ${ timer }${ RESET }` );

}
