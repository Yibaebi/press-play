function init() {}

function log(error) {
  console.error(error);
}

const logger = { init, log };

export default logger;
