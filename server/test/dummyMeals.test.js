import chai from 'chai';
import request from 'supertest';

import meals from '../seedData/dummyMeal';
import app from '../../server/app';

const { expect } = chai;

describe('POST /meals', () => {

  it('should add a new meal when valid data is sent', (done) => {
    const newMeal = {
      name: "Egusi and Pounded yam",
      category: "correct",
      price: 750,
      image: "egusi.jpg"
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(200)
      .expect((res) => {
        expect(res.body.details.name).to.equal(newMeal.name);
        expect(res.body.details.category).to.equal(newMeal.category);
        expect(res.body).to.be.an('object');
      })
      .end(done);
  });

  it('should not add a new meal when the meal name already exists', (done) => {
    const newMeal = {
      name: "Egusi and Pounded yam",
      category: "correct",
      price: 750,
      image: "egusi.jpg"
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Your meal name is invalid');
      })
      .end(done);
  });

  it('should not add a new meal when no name is sent', (done) => {
    const newMeal = {
      name: "",
      category: "correct",
      price: 750,
      image: "egusi.jpg"
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Your meal name is invalid');
      })
      .end(done);
  });

  it('should not add a new meal when no category is specified', (done) => {
    const newMeal = {
      name: "Yam porridge",
      category: "",
      price: 750,
      image: "egusi.jpg"
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Your meal category cannot be empty');
      })
      .end(done);
  });

});
