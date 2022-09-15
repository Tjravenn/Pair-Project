const bcrypt = require('bcrypt');
const encrypt = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = encrypt;