import jwt from 'jwt-simple';

const encodeKey = process.env.ENCODE_KEY;

const jwtUtils = {
  encode: function (data) {
    return jwt.encode(data, encodeKey);
  },
  decode: function (encodedData) {
    return jwt.decode(encodedData, encodeKey);
  },
};

module.exports = jwtUtils;
