import bcrypt from 'bcrypt';
import users from '../seedData/dummyUsers';

const saltRounds = 10;

exports.userSignupPost = (req, res) => {
  for (let i = 0; i < users.length; i += 1) {
    if (req.body.username.trim() === '' ||
       req.body.username.trim() === users[i].username) {
      return res.status(400)
        .send('Your username is invalid');
    } else if (req.body.email.trim() === '' ||
       req.body.email.trim() === users[i].email) {
      return res.status(400)
        .send('Your email is invalid');
    }
  }
  users.push({
    fullname: req.body.fullname.trim(),
    username: req.body.username.trim(),
    password: bcrypt.hashSync(req.body.password, saltRounds),
    email: req.body.email.trim()
  });
  return res.status(200)
    .send({
      username: users[users.length - 1].username,
      userId: users.length
    });
};
