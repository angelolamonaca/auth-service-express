const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
    clientId: 'login-app',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'AnteHub',
    realmPublicKey: process.env.REALM_PUBLIC_KEY
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        const memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};
