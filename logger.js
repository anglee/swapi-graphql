import bunyan from 'bunyan';

import packageJson from './package.json';

export default bunyan.createLogger({
  name: packageJson.name
});
