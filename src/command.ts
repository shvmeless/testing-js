#!/usr/bin/env node

// IMPORTS
import { searchTestFiles } from './helpers/general.helper';
import { displayFile } from './helpers/display.helper';
import { register, REGISTER_INSTANCE } from 'ts-node';
import { Option, program } from 'commander';
import testList from './classes/TestList';
import { resolve } from 'path';

// OPTIONS
const dir = new Option( '--dir <directory>', 'Set the directory where to find the tests files.' ).default( '.' );
const typescript = new Option( '--typescript', '' ).default( false );

// PROGRAM
program
	.description( 'Execute test files.' )
	.version( '0.1.2' )
	.addOption( dir )
	.addOption( typescript )
	.action( async ( options ) => {

		const { dir, typescript } = options;

		const currentPath = process.cwd();
		const targetPath = resolve( currentPath, dir );

		const targetFiles = searchTestFiles( targetPath, typescript );

		const isRunningTsNode = process[REGISTER_INSTANCE] ? true : process.env.TS_NODE_DEV ? true : false;

		for ( const file of targetFiles ) {

			testList.newFile( file );

			if ( isRunningTsNode ) {
				await import( file );
				continue;
			}

			const registerer = register( {
				compilerOptions: {
					moduleResolution: 'node',
					module: 'CommonJS',
					target: 'es2016',
				},
			} );

			if ( typescript ) registerer.enabled( true );
			await require( file );
			if ( typescript ) registerer.enabled( false );

		}

		for ( const file of testList.getList() ) {
			displayFile( file, currentPath );
		}

		process.exit();

	} );

// RUN
program.parse();
