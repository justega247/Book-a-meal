import chai from 'chai';
import request from 'supertest';

import orders from '../seedData/dummyOrders';
import app from '../../server/app';

const { expect } = chai;

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
  })

  describe('#when no order has been made', () => {
    before(() => {
      orders.splice(0);
    })

    it('should return an empty array when no orders have been made',
      (done) => {

        request(app)
          .get('/api/v1/orders/')
          .expect(200)
          .expect((res) => {
            expect(res.body.message).to.equal('Oh! no orders made yet');
            expect(res.body.orders.length).to.equal(0);
          })
          .end(done);
      })
  })
});
