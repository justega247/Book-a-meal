import chai from 'chai';
import request from 'supertest';

import app from '../../server/app';
import meals from '../seedData/dummyMeal';

const { expect } = chai;

describe('POST /', () => {

  it('should return an array of meals', (done) => {

    request(app)
      .post('/api/v1/menu')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('The menu for the day');
        expect(res.body.menu).to.exist;
        expect(res.body.menu).to.be.an('array');
      })
      .end(done);
  });

  it('should return an array lesser than the available meals', (done) => {

    request(app)
      .post('/api/v1/menu')
      .expect(200)
      .expect((res) => {
        expect(res.body.menu).to.exist;
        expect(res.body.menu.length).to.be.lessThan(meals.length);
      })
      .end(done);
  });
});

