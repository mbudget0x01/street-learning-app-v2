
export const streetsRoute = (app, fs) => {
    const baseDataPath = './data';
    const uri = '/streets/:fileName'

     app.get(uri, (req, res) => {
        fs.readFile(baseDataPath + req.url, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
    
          res.send(JSON.parse(data));
        });
        
      });
  };