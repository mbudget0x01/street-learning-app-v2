![GitHub package.json version](https://img.shields.io/github/package-json/v/mbudget0x01/street-learning-app-v2?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/mbudget0x01/street-learning-app-v2?style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/mbudget0x01/street-learning-app-v2?style=for-the-badge)

# Street Learning App V2

Street Learning App V2 is a small react app. It is reinterpretation of an old app, which proofed usefull but never left the development stage.
This App provides a simple Homepage. The purpose of this homepage is to learn the location of streets using provided street names.
At the time it is only possible to add Streets via the source. For more information see Add new StreetFiles.

## How to play the game

Choose your learning file in the drawer on the left side. Guess the street. Once you beliefe you guess right, press the button check.
Pretty simple ;-)

## Getting started

There are two options how you can use this app.

### npm

Use the normal npm package manager and run `npm install` and then `npm start`.
Or build it yourself an deploy it.

### docker (recommended)

1. Download or copy just the `Dockerfile`
2. Build the docker container. The container will clone this repo itself in the build stage.
3. After the build you are left with a `nginx` container, containing the built app
4. you are ready to go.

## Add new StreetFiles

All the related files are loacted under `/public/assets/streets`.

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
    "OverpassAreaId": "0000000"
}
```

4. If you want to provide this for everyone create a pull request😉. I would appreciate this.

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
