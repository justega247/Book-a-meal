import chai from 'chai';
import request from 'supertest';

import app from '../../server/app';
import orders from '../seedData/dummyOrders';

const { expect } = chai;

describe('POST /', () => {
  it('should add a new order to the orders list', (done) => {
    const newOrder = {
      meals: ['meal1', 'meal2']
    };

    request(app)
      .post('/api/v1/orders/')
      .send(newOrder)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Here is what you ordered');
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
