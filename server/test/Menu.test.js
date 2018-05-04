import { expect } from 'chai';
import request from 'supertest';

import app from '../../server/app';
import meals from '../seedData/meals';
import testMeals from '../seedData/testMeals';

describe('POST /', () => {
  it('should return an array of meals', (done) => {
    const newMeals = {
      meals: [
        1,
        3,
        6
      ]
    };

    request(app)
      .post('/api/v1/menu')
      .send(newMeals)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.equal('Success');
      })
      .end(done);
  });
});

describe('GET /', () => {

  it('should return an array containing the menu of the day', (done) => {
    request(app)
      .get('/api/v1/menu/')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal("Today's menu");
        expect(res.body.menuToday).to.be.an('array');
      })
      .end(done);
  });
});
