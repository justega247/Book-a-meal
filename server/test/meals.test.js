// import { expect } from 'chai';
// import request from 'supertest';

// import meals from '../seedData/meals';
// import testMeals from '../seedData/testMeals';
// import app from '../../server/app';

// describe('GET /meals', () => {
//   it('should get all the meals when a valid request is made', (done) => {
//     request(app)
//       .get('/api/v1/meals')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.message).to.equal('Success');
//         expect(res.body.meals).to.be.an('array');
//         expect(res.body.meals).to.have.lengthOf(9);
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
//         .expect(404)
//         .expect((res) => {
//           expect(res.body.message).to.equal('Sorry, no available meal');
//           expect(res.body.meals).to.have.lengthOf(0);
//         })
//         .end(done);
//     });
//   });
// });

// describe('POST /meals', () => {
//   before(() => {
//     meals.push(...testMeals);
//   });
//   it('should add a new meal when valid data is sent', (done) => {
//     const newMeal = {
//       name: 'Egusi and Pounded yam',
//       category: 'correct',
//       price: 750,
//       image: 'egusi.jpg'
//     };

//     request(app)
//       .post('/api/v1/meals/')
//       .send(newMeal)
//       .expect(201)
//       .expect((res) => {
//         expect(res.body.details.name).to.equal(newMeal.name);
//         expect(res.body.details.category).to.equal(newMeal.category);
//         expect(res.body).to.be.an('object');
//       })
//       .end(done);
//   });

//   it('should not add a new meal when the meal name already exists', (done) => {
//     const newMeal = {
//       name: 'Egusi and Pounded yam',
//       category: 'correct',
//       price: 750,
//       image: 'egusi.jpg'
//     };

//     request(app)
//       .post('/api/v1/meals/')
//       .send(newMeal)
//       .expect(409)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, that meal name already exists');
//       })
//       .end(done);
//   });

//   it('should not add a new meal when no name is sent', (done) => {
//     const newMeal = {
//       name: '',
//       category: 'correct',
//       price: 750,
//       image: 'egusi.jpg'
//     };

//     request(app)
//       .post('/api/v1/meals/')
//       .send(newMeal)
//       .expect(400)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, it seems your meal name is empty');
//       })
//       .end(done);
//   });

//   it('should not add a new meal when no category is specified', (done) => {
//     const newMeal = {
//       name: 'Yam porridge',
//       category: '',
//       price: 750,
//       image: 'egusi.jpg'
//     };

//     request(app)
//       .post('/api/v1/meals/')
//       .send(newMeal)
//       .expect(400)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, your category name has to be longer');
//       })
//       .end(done);
//   });
// });


// describe('PUT /meals/:mealId', () => {
//   it('should return an error message if an invalid mealId is sent', (done) => {
//     const updateMeal = {
//       name: 'spaghetti'
//     };

//     request(app)
//       .put('/api/v1/meals/890')
//       .send(updateMeal)
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.message).to.equal('Sorry, no meal with that id exists');
//       })
//       .end(done);
//   });

//   it(
//     'should return an error if the update has an empty category field',
//     (done) => {
//       const updateMeal = {
//         name: 'spaghetti',
//         category: ''
//       };

//       request(app)
//         .put('/api/v1/meals/1')
//         .send(updateMeal)
//         .expect(400)
//         .expect((res) => {
//           expect(res.body.message).to
//             .equal('Sorry, one or more of your field has an empty value.');
//         })
//         .end(done);
//     }
//   );

//   it('should return an error if the update has an empty name field', (done) => {
//     const updateMeal = {
//       name: '',
//       category: 'hot'
//     };

//     request(app)
//       .put('/api/v1/meals/1')
//       .send(updateMeal)
//       .expect(400)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, one or more of your field has an empty value.');
//       })
//       .end(done);
//   });

//   it('should return an error if the category name is < 2', (done) => {
//     const updateMeal = {
//       category: 'h'
//     };

//     request(app)
//       .put('/api/v1/meals/1')
//       .send(updateMeal)
//       .expect(400)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, your category name has to be longer');
//       })
//       .end(done);
//   });

//   it('should return an error if the meal name is < 2', (done) => {
//     const updateMeal = {
//       name: 'h'
//     };

//     request(app)
//       .put('/api/v1/meals/1')
//       .send(updateMeal)
//       .expect(400)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry, your meal name has to be longer');
//       })
//       .end(done);
//   });

//   it(
//     'should return an error if the update has an invalid price field',
//     (done) => {
//       const updateMeal = {
//         price: 's56'
//       };

//       request(app)
//         .put('/api/v1/meals/1')
//         .send(updateMeal)
//         .expect(400)
//         .expect((res) => {
//           expect(res.body.message).to
//             .equal('Sorry, you cannot update the price field with that value');
//         })
//         .end(done);
//     }
//   );

//   it('should update the meal when valid values are sent', (done) => {
//     const updateMeal = {
//       name: 'spaghetti',
//       category: 'yummy',
//       price: 900
//     };

//     request(app)
//       .put('/api/v1/meals/1')
//       .send(updateMeal)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.mealUpdate.name).to.equal(updateMeal.name);
//         expect(res.body.mealUpdate.category).to.equal(updateMeal.category);
//         expect(res.body.mealUpdate.price).to.equal(updateMeal.price);
//       })
//       .end(done);
//   });

//   it(
//     'should not update a meal where an existing meal has the same name',
//     (done) => {
//       const updateMeal = {
//         name: 'spaghetti',
//         category: 'yummy',
//         price: 900
//       };

//       request(app)
//         .put('/api/v1/meals/1')
//         .send(updateMeal)
//         .expect(409)
//         .expect((res) => {
//           expect(res.body.message).to
//             .equal('Sorry, that meal name already exists');
//         })
//         .end(done);
//     }
//   );
// });

// describe('DELETE /:mealId', () => {
//   it('should delete a meal if a valid mealId is sent', (done) => {
//     request(app)
//       .delete('/api/v1/meals/1')
//       .expect(204)
//       .end(done);
//   });

//   it('should return an error message if an invalid mealId is sent', (done) => {
//     request(app)
//       .delete('/api/v1/meals/44')
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.message).to
//           .equal('Sorry,there is no meal with that mealId');
//       })
//       .end(done);
//   });
// });
