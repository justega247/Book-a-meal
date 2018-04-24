import chai from 'chai';
import request from 'supertest';

import meals from '../seedData/dummyMeal';
import app from '../../server/app';

const { expect } = chai;

describe('GET /meals', () => {

  it('should get all the meals when a valid request is made', (done)=> {
    request(app)
      .get('/api/v1/meals')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).to.equal(meals.length);
        expect(res.body).to.be.an('array');
      })
      .end(done);
  });
});
