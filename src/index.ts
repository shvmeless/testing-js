// IMPORTS
import Tester from './classes/Tester';
import testList from './classes/TestList';

// FUNCTION
export function context ( desc: string ): void {
	testList.newContext( desc );
}

// FUNCTION
export function description ( desc: string ): void {
	testList.newGroup( desc );
}

// CLASS
export const check = Tester;
