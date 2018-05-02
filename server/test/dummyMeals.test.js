// import { expect } from 'chai';
// import request from 'supertest';

// import meals from '../seedData/dummyMeal';
// import app from '../../server/app';

// describe('GET /meals', () => {
//   it('should get all the meals when a valid request is made', (done) => {
//     request(app)
//       .get('/api/v1/meals')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.message).to.equal('Success');
//         expect(res.body.meals).to.be.an('array');
//       })
//       .end(done);
//   });

//   describe('#when meal array is empty', () => {
//     before(() => {
//       meals.splice(0);
//     });

//     it('should return an empty array when there is no meal', (done) => {
//       request(app)
//         .get('/api/v1/meals')
//         .expect(200)
//         .expect((res) => {
//           expect(res.body.message).to.equal('Sorry no available meal');
//           expect(res.body.meals).to.have.lengthOf(0);
//         })
//         .end(done);
//     });
//   });
// });
