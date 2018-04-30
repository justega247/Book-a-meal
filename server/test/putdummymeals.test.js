import { expect } from 'chai';
import request from 'supertest';

import meals from '../seedData/dummyMeal';
import app from '../../server/app';

describe('PUT /meals/:mealId', () => {
  it('should return an error message if an invalid mealId is sent', (done) => {
    const updateMeal = {
      name: 'spaghetti'
    };

    request(app)
      .put('/api/v1/meals/890')
      .send(updateMeal)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).to.equal('Sorry,no meal with that id exists');
      })
      .end(done);
  });

  it(
    'should return an error if the update has an empty category field',
    (done) => {
      const updateMeal = {
        name: 'spaghetti',
        category: ''
      };

      request(app)
        .put('/api/v1/meals/8')
        .send(updateMeal)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).to
            .equal('Sorry,you have to enter valid value(s).');
        })
        .end(done);
    }
  );

  it('should return an error if the update has an empty name field', (done) => {
    const updateMeal = {
      name: '',
      category: 'hot'
    };

    request(app)
      .put('/api/v1/meals/8')
      .send(updateMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to
          .equal('Sorry,you have to enter valid value(s).');
      })
      .end(done);
  });

  it('should update the meal when valid values are sent', (done) => {
    const updateMeal = {
      name: 'spaghetti',
      category: 'yummy',
      price: 900
    };

    request(app)
      .put('/api/v1/meals/8')
      .send(updateMeal)
      .expect(200)
      .expect((res) => {
        expect(res.body.mealUpdate.name).to.equal(updateMeal.name);
        expect(res.body.mealUpdate.category).to.equal(updateMeal.category);
        expect(res.body.mealUpdate.price).to.equal(updateMeal.price);
      })
      .end(done);
  });

  it(
    'should not update a field that is not changed when valid values are sent',
    (done) => {
      const updateMeal = {
        name: 'spaghetti',
        category: 'yummy',
        price: 900
      };

      request(app)
        .put('/api/v1/meals/8')
        .send(updateMeal)
        .expect(200)
        .expect((res) => {
          expect(res.body.mealUpdate.name).to.equal(updateMeal.name);
          expect(res.body.mealUpdate.category).to.equal(updateMeal.category);
          expect(res.body.mealUpdate.price).to.equal(updateMeal.price);
          expect(res.body.mealUpdate.image).to.equal(meals[7].image);
        })
        .end(done);
    }
  );
});
