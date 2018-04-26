import chai from 'chai';
import request from 'supertest';

import app from '../../server/app';
import meals from '../seedData/dummyMeal';

const { expect } = chai;

describe('GET /', () => {
  it('should return an array containing the menu of the day', (done) => {
    request(app)
      .get('/api/v1/menu/')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('The menu for the day');
        expect(res.body.menu).to.be.an('array');
        expect(res.body.menu).to.have.lengthOf(7);
      })
      .end(done);
  });

  describe('#No menu was set', () => {
    before(() => {
      meals.splice(2);
    });

    it('should return an error when no menu has been set', (done) => {
      request(app)
        .get('/api/v1/menu/')
        .expect(400)
        .expect((res) => {
          expect(res.body.message).to.equal('Sorry no menu for today');
          expect(res.body.menu).to.be.an('array');
          expect(res.body.menu).to.have.lengthOf(0);
        })
        .end(done);
    });
  });
});
