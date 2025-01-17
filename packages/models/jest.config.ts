import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	displayName: 'models',
	preset: '../../jest.preset.ts',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|html)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.spec.json',
			},
		],
	},
	coverageReporters: ['clover'],
	reporters: ['default', ['jest-junit', { outputName: 'junit.models.xml' }]],
	coverageDirectory: '../../coverage/packages/models',
};

export default config;
