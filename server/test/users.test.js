// import { expect } from 'chai';
// import request from 'supertest';

// import users from '../seedData/users';
// import app from '../../server/app';

// describe('POST /signup', () => {
//   it('should create a new user when valid data is sent', (done) => {
//     const newUser = {
//       userName: 'Alexander',
//       fullName: 'Alex Joe',
//       password: 'nndkkmsdnm',
//       email: 'me@you.com'
//     };

//     request(app)
//       .post('/api/v1/users/signup')
//       .send(newUser)
//       .expect(201)
//       .expect((res) => {
//         expect(res.body.userName).to.equal(newUser.userName);
//         expect(users.length).to.equal(5);
//       })
//       .end(done);
//   });

//   it(
//     'should not create a a new user when the userName is not unique',
//     (done) => {
//       const newUser = {
//         userName: 'Alexander',
//         fullName: 'Alexy Joe',
//         password: 'nndkkmsdnm',
//         email: 'me@you.com'
//       };

//       request(app)
//         .post('/api/v1/users/signup')
//         .send(newUser)
//         .expect(409)
//         .end(done);
//     }
//   );

//   it('should not create a new user when the email is not unique', (done) => {
//     const newUser = {
//       userName: 'Alexandery',
//       fullName: 'Alexy Joe',
//       password: 'nndkkmsdnm',
//       email: 'me@you.com'
//     };

//     request(app)
//       .post('/api/v1/users/signup')
//       .send(newUser)
//       .expect(409)
//       .end(done);
//   });

//   it('should not create user with an empty userName field', (done) => {
//     const newUser = {
//       userName: '   ',
//       fullName: 'Alexy Joe',
//       password: 'nndkkmsdnm',
//       email: 'me@you.com'
//     };

//     request(app)
//       .post('/api/v1/users/signup')
//       .send(newUser)
//       .expect(400)
//       .end(done);
//   });

//   it('should not create user with an empty email field', (done) => {
//     const newUser = {
//       userName: 'Alexandery',
//       fullName: 'Alexy Joe',
//       password: 'nndkkmsdnm',
//       email: ''
//     };

//     request(app)
//       .post('/api/v1/users/signup')
//       .send(newUser)
//       .expect(422)
//       .end(done);
//   });
// });
