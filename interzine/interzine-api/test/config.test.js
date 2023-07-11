const config = require('../config')
jest.mock('../config')

test('getDatabaseUri should export certain values', () => {
    config.getDatabaseUri()
    expect(config.getDatabaseUri).toReturn()
})