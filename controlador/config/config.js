process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urldb = 'mongodb://localhost:27017/telematica';
process.env.URLDB = urldb;
process.env.CADUCIDAD = 60 * 60 * 24 * 30;
process.env.SEED = 'seed-desarrollo';