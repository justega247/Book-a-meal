import chai from 'chai';
import request from 'supertest';

import app from '../../server/app';

const { expect } = chai;

describe('DELETE /:mealId', () => {
  it('should delete a meal if a valid mealId is sent', (done) => {
    const validMealId = {
      mealId: 4
    };

    request(app)
      .delete('/api/v1/meals/:mealId')
      .send(validMealId)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('A meal was just deleted');
        expect(res.body.meals).to.be.an('array');
      })
      .end(done);
  });

  it('should return an error message if an invalid mealId is sent', (done) => {
    const validMealId = {
      mealId: 44
    };

    request(app)
      .delete('/api/v1/meals/:mealId')
      .send(validMealId)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).to.equal('There is no meal with that mealId');
      })
      .end(done);
  });
});
