const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')

beforeAll(async () =>{
  await db('users').truncate();
})

describe('Test user registration capability', () => {

  let goodRequest = {
    username: 'testuser1',
    password: 'password',
  }

  let badRequest = {
    userName: 'testUser',
  }
  it('creates a new user', async() => {
    return request(server)
    .post('/api/auth/register')
    .send(goodRequest)
    .set('Accept', 'application/json')
    .expect(201)

  })
  it('responds with 400 bad request on invalid data', () => {
    return request(server)
    .post('/api/auth/register')
    .send(badRequest)
    .set('Accept', 'application/json')
    .expect(400)
  })
})


describe('Verify Login is functioning', () => {
  let goodLogin = {
    username: 'testuser1',
    password: 'password',
  }

  let badLogin = {
    username: 'invalidUser',
    password: 'wrongPass'
  }
  it('validates the login', () => {
    return request(server)
    .post('/api/auth/login')
    .send(goodLogin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  })
  it('responds with 401 unauthorized on failed login', () => {
    return request(server)
    .post('/api/auth/login')
    .send(badLogin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)

  })
})

