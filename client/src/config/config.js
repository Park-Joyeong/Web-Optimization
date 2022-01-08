const REACT_APP_WITCH_SERVER = process.env.REACT_APP_WITCH_SERVER;
const LOCAL = 'local';
const DEV = 'dev';

if (REACT_APP_WITCH_SERVER === LOCAL) {
    module.exports = require('./local');
} else if (REACT_APP_WITCH_SERVER === DEV) {
    module.exports = require('./dev');
}
