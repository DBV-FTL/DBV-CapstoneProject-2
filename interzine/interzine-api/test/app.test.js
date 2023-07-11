const app = require('../app')
jest.mock('../app')

test('App ', () => {
    app()
    expect(app).toReturn()
})