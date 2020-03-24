const server = require('./api/server.js');
const PORT = process.env.PORT || 14500;





server.listen(PORT, () => {
  console.log(
    `\n ${Date(
      Date.now,
    ).toString()} \n server started at http://localhost:${PORT}`,
  );
});
