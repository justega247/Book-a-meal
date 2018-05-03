import { expect } from 'chai';
import request from 'supertest';

import app from '../../server/app';
import meals from '../seedData/Meal';
import testMeals from '../seedData/testMeals';

describe('POST /', () => {
  it('should return an array of meals', (done) => {
    const newMeals = {
      meals: [
        'meal1',
        'meal2',
        'meal3',
        'meal4',
        'meal5',
        'meal6',
      ]
    };

    request(app)
      .post('/api/v1/menu')
      .send(newMeals)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.equal('Success');
        expect(res.body.menu).to.be.an('array');
        expect(res.body.menu.length).to.be.lessThan(newMeals.meals.length);
      })
      .end(done);
  });

  it('should return an error if the available meals is less than 3', (done) => {
    const newMeals = {
      meals: [
        'meal1',
        'meal2',
      ]
    };

    request(app)
      .post('/api/v1/menu')
      .send(newMeals)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to
          .equal('You need more meals to set up a menu');
      })
      .end(done);
  });
});

describe('GET /', () => {
  before(() => {
    meals.splice(0);
    meals.push(...testMeals);
  });

  it('should return an array containing the menu of the day', (done) => {
    request(app)
      .get('/api/v1/menu/')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Success');
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
          expect(res.body.message).to.equal('Sorry,no menu for today');
          expect(res.body.menu).to.be.an('array');
          expect(res.body.menu).to.have.lengthOf(0);
        })
        .end(done);
    });
  });
});
