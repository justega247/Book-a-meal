import chai from 'chai';
import request from 'supertest';

import users from '../seedData/dummyUsers';
import app from '../../server/app';

const { expect } = chai;

describe('POST /signup', () => {
  it('should create a new user when valid data is sent', (done) => {
    const newUser = {
      username: 'Alexander',
      fullname: 'Alex Joe',
      password: 'nndkkmsdnm',
      email: 'me@you.com'
    };

    request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .expect(200)
      .expect((res) => {
        expect(res.body.username).to.equal(newUser.username);
        expect(users.length).to.equal(5);
      })
      .end(done);
  });

  it(
    'should not create a a new user when the username is not unique',
    (done) => {
      const newUser = {
        username: 'Alexander',
        fullname: 'Alexy Joe',
        password: 'nndkkmsdnm',
        email: 'me@you.com'
      };

      request(app)
        .post('/api/v1/users/signup')
        .send(newUser)
        .expect(400)
        .end(done);
    }
  );

  it('should not create a new user when the email is not unique', (done) => {
    const newUser = {
      username: 'Alexandery',
      fullname: 'Alexy Joe',
      password: 'nndkkmsdnm',
      email: 'me@you.com'
    };

    request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .expect(400)
      .end(done);
  });

  it('should not create user with an empty username field', (done) => {
    const newUser = {
      username: '   ',
      fullname: 'Alexy Joe',
      password: 'nndkkmsdnm',
      email: 'me@you.com'
    };

    request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .expect(400)
      .end(done);
  });

  it('should not create user with an empty email field', (done) => {
    const newUser = {
      username: 'Alexandery',
      fullname: 'Alexy Joe',
      password: 'nndkkmsdnm',
      email: ''
    };

    request(app)
      .post('/api/v1/users/signup')
      .send(newUser)
      .expect(400)
      .end(done);
  });
});
