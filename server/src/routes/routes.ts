import { descriptorRoute } from "./descriptor";
import { streetsRoute } from "./streets";

export const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('welcome to the api-server');
      });

      descriptorRoute(app, fs);
      streetsRoute(app,fs)
};