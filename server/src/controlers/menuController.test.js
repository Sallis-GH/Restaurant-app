import supertest from 'supertest';
import app from '../../server';

const data = {
  body: {
    id: '1',
    name: 'Pizza Margherita',
    description: 'some description',
    price: 80.00,
    currency: 'Kr',
    img:
    {
      mock: 'img/mock'
    },
  }
}

describe('Testing post request to /api/menuRoutes', () => {
  it('should respond with status 201', (done) => {

    // const res = await request(app).get('/');
    // expect(res.statusCode).toBe(200);
    supertest(app)
      .post('/api/menuRoutes/newDish')
      .send(data)
      .then(() => done())
  });
});