// IMPORTS
import { BOLD, GREEN, RED, RESET } from '../utils/styles';
import { stringify } from '../helpers/general.helper';
import testList from './TestList';
import assert from 'assert';

// CLASS
class Tester {

	// FUNCTION
	public static equality ( actual: unknown, expected: unknown ): void {

		const result = actual == expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( actual );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be equal to ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static strictEquality ( actual: unknown, expected: unknown ): void {

		const result = actual === expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( actual );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be strict equal to ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static deepEquality ( actual: unknown, expected: unknown ): void {

		let result = true;

		try { assert.deepStrictEqual( actual, expected ); } catch { result = false; }

		const style = result ? GREEN : RED;
		const textValue = stringify( actual );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be deep equal to ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static isTrue ( value: unknown ): void {

		const result = value ? true : false;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( true );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static isFalse ( value: unknown ): void {

		const result = !value ? true : false;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( false );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static isNull ( value: unknown ): void {

		const result = value === null;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( null );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static isUndefined ( value: unknown ): void {

		const result = value === undefined;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( undefined );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static isNaN ( value: unknown ): void {

		const result = Number.isNaN( value );

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( NaN );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static greaterThan ( value: number, expected: number ): void {

		const result = value > expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be greater than ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static greaterThanOrEqual ( value: number, expected: number ): void {

		const result = value >= expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be greater than or equal ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static lessThan ( value: number, expected: number ): void {

		const result = value < expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be less than ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static lessThanOrEqual ( value: number, expected: number ): void {

		const result = value <= expected;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( expected );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be less than or equal ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static instanceOf ( value: unknown, className: unknown ): void {

		let result: boolean;

		if ( typeof className === 'function' ) result = value instanceof className;
		else result = false;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( className );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to be instance of ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static match ( value: unknown, regex: RegExp ): void {

		let result: boolean;

		if ( typeof value === 'string' ) result = value.match( regex ) ? true : false;
		else result = false;

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( regex );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to match ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

	// FUNCTION
	public static objectHasProperty ( value: unknown, property: string ): void {

		let result = false;

		if ( typeof value === 'object' && value !== null ) {

			Object.keys( value ).forEach( ( key ) => {

				if ( key === property ) {
					result = true;
					return true;
				}

			} );

		}

		const style = result ? GREEN : RED;
		const textValue = stringify( value );
		const textRef = stringify( property );

		const message = `Expect ${ style }${ BOLD }${ textValue }${ RESET } to have property ${ style }${ BOLD }${ textRef }${ RESET }`;

		testList.newTest( result, message );

	}

}

// EXPORT
export default Tester;
