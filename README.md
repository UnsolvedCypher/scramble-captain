# Scramble Captain
⚠️ Use of this software in a WCA competition is in VIOLATION of the WCA Regulations. It has not been approved by the WRC

## About

This software allows Delegates to securely distribute and unlock scrambles to scramblers without having to go to each device and read out a password. Delegates can easily control which scramblers have access to which scramblers and see which scrambles are currently open on every device, reducing the possibility of the wrong scrambles being used at a given time. Scramblers can quickly switch between scrambles they have access to.

## How it works

Delegates sign up with a login ID and password. On their dashboard, they can upload or delete scrambles, and create scrambler accounts for scramblers. One account should be created per scrambling device. From the Delegate's dashboard, the Delegate can see which scrambles are currently open, and to who. A scramble can be opened or closed to any combination of scramblers at any given time. 

At the bottom of the dashboard, all scramblers are listed along with which scrambles they are looking at. This allows the Delegate to ensure that the correct scrambles are being used.

## Development

The backend is written in [Crystal](https://crystal-lang.org/) with the [Lucky](https://luckyframework.org/) framework, which is very similar to Rails. The frontend is written in [NextJS](https://nextjs.org/) with TypeScript.

To run locally:
1. [Install Lucky and Postgres](https://luckyframework.org/guides/getting-started/installing)
2. [Install Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/)
3. `cd` into the `server` folder and run `script/setup`, then `lucky dev`
4. `cd` into the `client` folder and run `yarn install`, then `yarn dev`
5. You can access the site on `http://localhost:5000`. Some useful pages are /login (login for Delegates and scramblers), /scramble (scrambling page, for scramblers only), and / (Delegate dashboard, for Delegates only). The frontend will run on `http://localhost:3000`, but you should not access it directly because you will run into CORS errors.

The frontend is set up with a `.eslintrc.js` file, so it is recommended that you install the ESLint extension for your IDE or text editor so that your code is linted to match the rest of the code.
