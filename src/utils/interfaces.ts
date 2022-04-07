
// INTERFACES

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
	tests: Test[],
}

export interface Test {
	result: boolean,
	message: string,
}
