import auth from "./auth.js";

const route = (app) => {
  app.use('/api/auth', auth);
}

export default route;
