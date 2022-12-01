const express = require('express');
const router = express.Router();
const keycloak = require('../../config/keycloak-config.js').getKeycloak();

/* GET users listing. */
router.get('/', keycloak.protect('realm:admin'), (req, res) => {
  res.send(req.kauth.grant.access_token.content);
});

module.exports = router;
