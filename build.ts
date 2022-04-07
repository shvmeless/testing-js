// IMPORTS
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import packageJSON from './package.json';
import { resolve } from 'path';
import { execSync } from 'child_process';

try {

	// RESET
	rmSync( resolve( __dirname, 'dist' ), { force: true, recursive: true } );
	mkdirSync( resolve( __dirname, 'dist' ) );

	// LICENSE
	let origin = resolve( __dirname, './license' );
	let destiny = resolve( __dirname, './dist/license' );
	copyFileSync( origin, destiny );

	// README
	origin = resolve( __dirname, './README.md' );
	destiny = resolve( __dirname, './dist/README.md' );
	copyFileSync( origin, destiny );

	// PACKAGE.JSON
	const newJSON: unknown = { ...packageJSON, devDependencies: undefined, scripts: undefined };
	destiny = resolve( __dirname, './dist/package.json' );
	writeFileSync( destiny, JSON.stringify( newJSON, null, 2 ) );

	// TYPESCRIPT
	execSync( 'tsc -p ./tsconfig.prod.json' );

	process.exit( 0 );

} catch ( error ) {

	console.error( error );
	process.exit( 1 );

}
