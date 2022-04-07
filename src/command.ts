// IMPORTS
import { searchTestFiles } from './helpers/general.helper';
import { Option, program } from 'commander';
import testList from './classes/TestList';
import { resolve } from 'path';

// OPTIONS
const dir = new Option( '--dir <directory>', 'Set the directory where to find the tests files.' ).default( '.' );
const typescript = new Option( '--typescript', '' ).default( false );

// PROGRAM
program
	.description( 'Execute test files.' )
	.version( '0.1.0' )
	.addOption( dir )
	.addOption( typescript )
	.action( async ( options ) => {

		const { dir, typescript } = options;

		const currentPath = process.cwd();
		const targetPath = resolve( currentPath, dir );

		const targetFiles = searchTestFiles( targetPath, typescript );

		for ( const file of targetFiles ) {

			testList.newFile( file );
			await import( file );

		}

		process.exit();

	} );

// RUN
program.parse();
