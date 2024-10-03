module.exports = {
    testEnvironment: 'jsdom', 
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': './$1',
      },
}