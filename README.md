# Alliants Technical Test

This project serves as a submission for the Alliants technical test, as part of the software engineer application process.

Included is a front-end application built using vanilla JS, which employs a NodeJS API proxy to provide a user with the ability to search both Flickr and YouTube using a common term.

![welcome screen](https://i.imgur.com/BEkUndO.png)

## Installation

Use [npm](https://nodejs.org/en/download/) to install the required packages for the project:

```sh
npm install
```

## Configuration

The project relies on the use of an API key to authenticate with the YouTube API, the web server will not start without this `KEY` being provided.

To facilitate this, the web server will read a series of enviroment variables. It is recommended to use a `.env` file to set these, to prevent stale variables from your OS causing unpredictable behaviour.

An example of such a file is included [here](.env.example). Simply modify it to suit your needs and rename it to '.env'.

Alternatively, these can be set on the command line as shown below:

```
export PORT=5000
```

## Usage

To start the web server, use the 'dev' command:

```
npm run dev
```

You may then access the front-end application.

If you have not modified the default port, you can get to it [here](http://localhost:3000/).

## Tests

To run through the project unit tests, use the 'test' command:

```
npm run test
```

A number of configuration parameters are available for the tests, these can be found in the `tests/params` folders.

## License

[MIT](LICENSE.md)
