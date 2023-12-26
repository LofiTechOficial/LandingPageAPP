import("../dist/lofi-tech-app/server/server.mjs").then((server) => {
  module.exports = server.app();
});
