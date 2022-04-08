import { TestCount, TestGroup } from '../utils/interfaces';

// CLASS
class Counter {

	// PROPERTIES
	private groups: TestGroup[];

	// CONSTRUCTOR
	public constructor () {
		this.groups = [];
	}

	// GETTER
	public getCount (): TestCount {

		const count: TestCount = {
			total: 0,
			successful: 0,
			failed: 0,
		};

		for ( const group of this.groups ) {

			if ( group.tests.length === 0 ) continue;

			count.total++;

			if ( group.result ) count.successful++;
			else count.failed++;

		}

		return count;

	}

	// METHOD
	public addGroup ( group: TestGroup ): void {

		this.groups.push( group );

	}

	// METHOD
	public getTimer (): number {

		let timer = 0;

		for ( const group of this.groups ) timer += group.time.end - group.time.start;

		return timer;

	}

}

// EXPORT
const counter = ( function (): Counter { return new Counter(); } )();
export default counter;
