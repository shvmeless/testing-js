// IMPORTS
import testList from './classes/TestList';
import Tester from './classes/Tester';

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
