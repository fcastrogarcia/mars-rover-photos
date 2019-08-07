const axios = require("axios");

exports.apiCall = async (req, res) => {
  const { sol, camera } = req.params;
  const endpoint = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}`;
  const { data } = await axios(endpoint);
  res.json(data);
};
