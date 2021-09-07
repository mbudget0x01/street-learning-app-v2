![GitHub package.json version](https://img.shields.io/badge/Version-v1.0.2-informational?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/mbudget0x01/street-learning-app-v2?style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/mbudget0x01/street-learning-app-v2?style=for-the-badge)

# Street Learning App V2

Street Learning App V2 is a small react app. It is reinterpretation of an old app, which proofed usefull but never left the development stage.
This App provides a simple Homepage. The purpose of this homepage is to learn the location of streets using provided street names.
At the time it is only possible to add Streets via the source. For more information see Add new StreetFiles.

## How to play the game

Choose your learning file in the drawer on the left side. Guess the street. Once you beliefe you guess right, press the button check.
Pretty simple ;-)

## Getting started

There are two options how you can use this app.

### configuration

The server side config can be changed using the `server/app-config.json` file or using the environement variables.
If enviromenet variables are set, those overrule always those specified in the file.


| config        | env variable           | use  |
| ------------- |-------------| -----|
| isProxy | IS_PROXY | if true client app will be proxied as root |
| clientHostName | PROXY_HOST | name or IP of the client app host |
| apiPort | APP_PORT | Port to expose the app to |
| redisHostName | REDIS_HOST | Redis host for caching |
| redisPort | REDIS_PORT | Port to use for the redis host |

### npm

Use the normal npm package manager and run `npm install` and then `npm start`.
Or build it yourself an deploy it.

Be aware that there is a `redis` instance needed and the server and client must be run symultaniously.
As of now the redis instance is looked under `localhost` or a hostname specified as environement variable.
A config file will follow.

### docker (recommended)

1. Download or copy the `Dockerfile-api`, `Dockerfile-client` and the `docker-compose.yml`. Or clone this repo.
2. Make sure they are all in the same folder.
3. In case you use a separate `redis` instance adjust the variables in the `docker-compose.yml`
4. Build the docker containers using `docker-compose`.
5. After the build run `docker-compose up`
6. you are ready to go.

## Add new StreetFiles

All the related files are loacted under `/server/data/streets`.

1. If you want to provid this to everyone. Fork this repo.
2. Add a new StreetFiles. You need to provide a `.json` file containing all the streets as simple list. The name of the file doesn't matter much. A reference can be found below.

```javascript
["street1","street2",...]
````

3. Add the necessary data to the `descriptor.json` Use this as reference for your entry:

```javascript
{
    "title": "Your title to Display",
    "fileName": "your-new-file.json",
    "countryCode": "fr",
    "city": "Paris",
    "zipCode": "75000",
    "OverpassAreaId": "0000000",
    "startCoordinates": [48.858093, 2.294694]
}
```

4. If you want to provide this for everyone create a pull request😉. I would appreciate this.


## Add new Feedback Texts

As for the streets you can also add more texts. The file can be found and modified under `/server/data/text/question-feedback.json`.
As always pull requests are welcome


## Bugs and Requests

If you find a bug or have a request. Just open an issue here on github.
Use the following labels

* `bug` for bugs 🐞
* `enhancement` for feauture requests ✨

## Contributing

As this is my first react project, any advice help and contributions are welcome.
Thanks in advance.😊

## Credits

### Used Components

* leaflet maps
* overpass api
* OpenStreetMaps
* leaflet ESRI geocoder
* Nominatim Browser

### Icons

* [DinosoftLabs](https://www.flaticon.com/de/autoren/dinosoftlabs)
* [Freepik](https://www.freepik.com)
