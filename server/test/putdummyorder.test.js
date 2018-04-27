import chai from 'chai';
import request from 'supertest';

import meals from '../seedData/dummyMeal';
import orders from '../seedData/dummyOrders';
import app from '../../server/app';

const { expect } = chai;
let changeOrder;

describe('PUT /', () => {

  it('should return a modified order if valid data is sent', (done) => {

    changeOrder = {
      orderId: 2,
      addOrder: [1,3,7],
      deleteOrder: [2,4]
    };

    request(app)
      .put('/api/v1/orders/:orderId')
      .send(changeOrder)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Your order has been modified');
        expect(res.body.yourNewOrder.meals).deep.to.include(meals[0]);
        expect(res.body.yourNewOrder.meals).deep.to.not.include(meals[1]);
      })
      .end(done)
  });

  it('should throw an error for an invalid orderId', (done) => {

    changeOrder = {
      orderId: 22,
      addOrder: [1,3,7],
      deleteOrder: [2,4]
    };

    request(app)
      .put('/api/v1/orders/:orderId')
      .send(changeOrder)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).to.equal('Your orderId is invalid');
      })
      .end(done);
  });
});
