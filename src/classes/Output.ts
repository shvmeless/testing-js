
// CLASS
class Output {

	// PROPERTIES
	private tabulation: string;
	private tabSize: number;

	// CONSTRUCTOR
	public constructor () {
		this.tabulation = '';
		this.tabSize = 2;
	}

	public tabs ( value?: undefined | null | number ): Output {

		value = value === undefined ? 1 : value === null ? -99 : value;

		let tabs = this.tabulation.length / this.tabSize + value;

		tabs = tabs > 99 ? 99 : tabs < 0 ? 0 : tabs;

		this.tabulation = ' '.repeat( tabs * this.tabSize );

		return this;

	}

	// METHOD
	public newLine ( number: number = 1 ): Output {

		for ( let i = 0; i < number; i++ ) {
			process.stdout.write( '\n' );
		}

		return this;

	}

	// METHOD
	public print ( message: string ): Output {

		process.stdout.write( this.tabulation + message + '\n' );
		return this;

	}

}

// EXPORT
const output = ( function (): Output { return new Output(); } )();
export default output;
