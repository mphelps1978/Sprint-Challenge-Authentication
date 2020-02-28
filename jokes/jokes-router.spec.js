const server = require('../api/server.js');
const request = require('supertest')


describe('Access the jokes router without logging in', () => {
    it('should return an Bad Reques status code from the index route since we arent logged in', async () => {
      const expectedStatusCode = 400;
      const response = await request(server).get('/api/jokes');
      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON message object from the index route', async () => {
      const expectedBody = {
       "message": "No credentials provided",
       };
      const response = await request(server).get('/api/jokes');
      expect(response.body).toEqual(expectedBody);
    });
})
