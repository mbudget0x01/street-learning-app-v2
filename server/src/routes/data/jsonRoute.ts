export const jsonFileRoute = (app, fs, path:string, uri:string) => {  
    // READ
    app.get(uri, (req, res) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };