const express = require('express');
const router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();

/* GET users listing. */
router.get('/user', keycloak.protect('user'), function(req, res){
  res.send("Hello User");
});

module.exports = router;
