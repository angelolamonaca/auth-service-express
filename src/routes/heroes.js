const express = require('express');
const router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();

/* GET users listing. */
router.get('/', keycloak.protect('realm:user'), (req, res) => {
  res.send(['Hulk', 'IronMan', 'Batman']);
});

module.exports = router;
