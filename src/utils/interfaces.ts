
// INTERFACES

export interface TestCount {
	total: number,
	successful: number,
	failed: number,
}

export interface TestFile {
	path: string,
	result: boolean,
	contexts: TestContext[],
}

export interface TestContext {
	desc: string,
	result: boolean,
	groups: TestGroup[],
}

export interface TestGroup {
	desc: string,
	result: boolean,
	time: {
		start: number,
		end: number
	},
	tests: Test[],
}

export interface Test {
	result: boolean,
	message: string,
}
