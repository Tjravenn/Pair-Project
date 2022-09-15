const bcrypt = require('bcryptjs');

module.exports = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
};