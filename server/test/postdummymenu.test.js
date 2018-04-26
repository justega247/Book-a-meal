import chai from 'chai';
import request from 'supertest';

import app from '../../server/app';
import menu from '../seedData/dummyMenu';

const { expect } = chai;

describe('POST /', () => {

  it('should return an array of meals', (done) => {

    const newMeals = {
      meals: [
      "meal1",
      "meal2",
      "meal3",
      "meal4",
      "meal5",
      "meal6",
    ]}

    request(app)
      .post('/api/v1/menu')
      .send(newMeals)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('The menu for the day');
        expect(res.body.menu).to.be.an('array');
        expect(res.body.menu.length).to.be.lessThan(newMeals.meals.length);
      })
      .end(done);
  });

  it('should return an error if the available meals is less than 3', (done) => {

    const newMeals = {
      meals: [
      "meal1",
      "meal2",
    ]}

    request(app)
      .post('/api/v1/menu')
      .send(newMeals)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('You need more meals to set up a menu');
      })
      .end(done);
  });
});

