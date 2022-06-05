const promise  = require('bluebird');
const pg = require('pg-promise');
const monitor = require('pg-monitor');
const config = require('../config/config.json').db
const initOptions = {
    promiseLib : promise
}

const pgp = (pg)(initOptions);

monitor.attach(initOptions);
monitor.setTheme('matrix');
const con = config;

const db = pgp(con);

module.exports = db;