import { descriptorRoute } from "./data/descriptor";
import { streetsRoute } from "./data/streets";

export const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('welcome to the api-server');
      });

      descriptorRoute(app, fs);
      streetsRoute(app,fs)
};