// IMPORTS
import { Test, TestContext, TestFile, TestGroup } from '../utils/interfaces';
import counter from './Counter';

// CLASS
class TestList {

	// PROPERTIES
	private list: TestFile[];

	// CONSTRUCTOR
	public constructor () {
		this.list = [];
	}

	// GETTER
	public getList (): TestFile[] {
		return this.list;
	}

	// GETTER
	public getCurrentFile (): TestFile | null {
		return this.list[this.list.length - 1] || null;
	}

	// GETTER
	public getCurrentContext (): TestContext | null {

		const file = this.getCurrentFile();
		if ( !file ) return null;

		return file.contexts[file.contexts.length - 1] || null;

	}

	// GETTER
	public getCurrentGroup (): TestGroup | null {

		const context = this.getCurrentContext();
		if ( !context ) return null;

		return context.groups[context.groups.length - 1] || null;

	}

	// NEW
	public newFile ( path: string ): void {

		const file: TestFile = {
			path: path,
			result: true,
			contexts: [],
		};

		this.list.push( file );

	}

	// NEW
	public newContext ( desc: string ): void {

		if ( !desc ) desc = 'Default context:';

		const context: TestContext = {
			desc: desc,
			result: true,
			groups: [],
		};

		this.getCurrentFile()?.contexts.push( context );

	}

	// NEW
	public newGroup ( desc: string ): void {

		if ( !this.getCurrentContext() ) this.newContext( '' );

		if ( !desc ) desc = 'No description provided!';

		const group: TestGroup = {
			desc: desc,
			result: true,
			time: {
				start: new Date().getTime(),
				end: new Date().getTime(),
			},
			tests: [],
		};

		this.getCurrentContext()?.groups.push( group );
		counter.addGroup( group );

	}

	// NEW
	public newTest ( result: boolean, message: string ): void {

		if ( !this.getCurrentContext() ) this.newContext( '' );
		if ( !this.getCurrentGroup() ) this.newGroup( '' );

		const currentFile = this.getCurrentFile();
		const currentContext = this.getCurrentContext();
		const currentGroup = this.getCurrentGroup();

		if ( !currentFile || !currentContext || !currentGroup ) return;

		if ( !result ) {

			currentFile.result = false;
			currentContext.result = false;
			currentGroup.result = false;

			process.exitCode = 1;

		}

		const test: Test = {
			result: result,
			message: message,
		};

		currentGroup.tests.push( test );
		currentGroup.time.end = new Date().getTime();

	}

}

// EXPORT
const testList = new TestList();
export default testList;
