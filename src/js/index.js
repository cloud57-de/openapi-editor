import LoadGoogleApi from "load-google-api";
import options from '../auth.json';

const drive = new LoadGoogleApi(options);

let currentUser;

function main() {
  if (auth.currentUser.get() == undefined || !auth.currentUser.get().isSignedIn()) {
  auth.signIn().then((user) => {
    currentUser=user;
    loadDocument();
  });
  }
  else {
    loadDocument();
  }
}

function loadDocument() {
  let state = JSON.parse(decodeURI(window.location.search.substr(7)));
  if (state.action === "open") {
    let id = state.ids[0];
    console.log(id);
    gapi.client.request({'path': 'https://www.googleapis.com/drive/v3/files/' + id, 'params': {'alt':'media'}})
      .then(function(response) {
        console.log(response.body);
      });
  }
}

function updateSignInStatus() {
  const scope = options.scope.join(' ');

  user.google = auth.currentUser.get();
  user.status = user.google.hasGrantedScopes(scope) === true;

}

drive.loadGoogleAPI().then(() => {
  drive.init().then(() => {
    window.auth = window.gapi.auth2.getAuthInstance();
  }).then(() => {
    main();
  });
});
