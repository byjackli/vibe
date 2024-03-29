export {};
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
		'^.+\\.ts$': 'ts-jest'
	},
	moduleFileExtensions: ['js', 'ts', 'svelte']
};
