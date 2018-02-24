// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBNtVc0Of2VfpF5fhBHRI4RIK6OON2A5rM',
    authDomain: 'brunel-and-friend.firebaseapp.com',
    databaseURL: 'https://brunel-and-friend.firebaseio.com',
    projectId: 'brunel-and-friend',
    storageBucket: 'brunel-and-friend.appspot.com',
    messagingSenderId: '116336620286'
  }
};
