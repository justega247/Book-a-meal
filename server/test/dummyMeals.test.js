import { expect } from 'chai';
import request from 'supertest';

import meals from '../seedData/dummyMeal';
import app from '../../server/app';

describe('GET /meals', () => {
  it('should get all the meals when a valid request is made', (done) => {
    request(app)
      .get('/api/v1/meals')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Success');
        expect(res.body.meals).to.be.an('array');
      })
      .end(done);
  });

  describe('#when meal array is empty', () => {
    before(() => {
      meals.splice(0);
    });

    it('should return an empty array when there is no meal', (done) => {
      request(app)
        .get('/api/v1/meals')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).to.equal('Sorry no available meal');
          expect(res.body.meals).to.have.lengthOf(0);
        })
        .end(done);
    });
  });
});

describe('POST /meals', () => {

  it('should add a new meal when valid data is sent', (done) => {
    const newMeal = {
      name: 'Egusi and Pounded yam',
      category: 'correct',
      price: 750,
      image: 'egusi.jpg'
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(201)
      .expect((res) => {
        expect(res.body.details.name).to.equal(newMeal.name);
        expect(res.body.details.category).to.equal(newMeal.category);
        expect(res.body).to.be.an('object');
        expect(meals.length).to.equal(1);
      })
      .end(done);
  });

  it('should not add a new meal when the meal name already exists', (done) => {
    const newMeal = {
      name: 'Egusi and Pounded yam',
      category: 'correct',
      price: 750,
      image: 'egusi.jpg'
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Sorry,that meal name is invalid');
      })
      .end(done);
  });

  it('should not add a new meal when no name is sent', (done) => {
    const newMeal = {
      name: '',
      category: 'correct',
      price: 750,
      image: 'egusi.jpg'
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Sorry,that meal name is invalid');
      })
      .end(done);
  });

  it('should not add a new meal when no category is specified', (done) => {
    const newMeal = {
      name: 'Yam porridge',
      category: '',
      price: 750,
      image: 'egusi.jpg'
    };

    request(app)
      .post('/api/v1/meals/')
      .send(newMeal)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Sorry,meal category cannot be empty');
      })
      .end(done);
  });
});
