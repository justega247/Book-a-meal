import { expect } from 'chai';
import request from 'supertest';

import app from '../../server/app';
import meals from '../seedData/meals';
import orders from '../seedData/orders';
import testMeals from '../seedData/testMeals';

describe('POST /', () => {
  it('should add a new order to the orders list', (done) => {
    const newOrder = {
      meals: ['meal1', 'meal2']
    };

    request(app)
      .post('/api/v1/orders/')
      .send(newOrder)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.equal('Success');
        expect(res.body.yourOrder).to.deep.equal(orders[orders.length - 1]);
      })
      .end(done);
  });

  it('should not accept an empty order', (done) => {
    const newOrder = {
      meals: []
    };

    request(app)
      .post('/api/v1/orders/')
      .send(newOrder)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to
          .equal('You have not specified any meal to order');
        expect(res.body.yourOrder).to.deep.not.equal(orders[orders.length - 1]);
      })
      .end(done);
  });
});

describe('PUT /', () => {
  before(() => {
    meals.splice(0);
    meals.push(...testMeals);
  });

  it('should return a modified order if valid data is sent', (done) => {
    const changeOrder = {
      addOrder: [1, 3, 7],
      deleteOrder: [2, 4]
    };

    request(app)
      .put('/api/v1/orders/2')
      .send(changeOrder)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Your order has been modified');
        expect(res.body.yourNewOrder.meals).deep.to.include(meals[0]);
        expect(res.body.yourNewOrder.meals).deep.to.not.include(meals[1]);
      })
      .end(done);
  });

  it('should throw an error for an invalid orderId', (done) => {
    const changeOrder = {
      addOrder: [1, 3, 8],
      deleteOrder: [2, 4]
    };

    request(app)
      .put('/api/v1/orders/22')
      .send(changeOrder)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Your orderId is invalid');
      })
      .end(done);
  });
});

describe('GET /', () => {
  it('should return an array of all the orders made', (done) => {
    request(app)
      .get('/api/v1/orders/')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Here are the orders for the day');
        expect(res.body.orders).to.be.an('array');
        expect(res.body.orders.length).to.equal(orders.length);
      })
      .end(done);
  });

  describe('#when no order has been made', () => {
    before(() => {
      orders.splice(0);
    });

    it('should return an empty array when no orders have been made', (done) => {
      request(app)
        .get('/api/v1/orders/')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).to.equal('Oh! no orders made yet');
          expect(res.body.orders.length).to.equal(0);
        })
        .end(done);
    });
  });
});
