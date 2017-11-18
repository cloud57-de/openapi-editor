const gref = {
        "client_id":"51313937101-ta7sqbf7emoqmb2le2lqs1a66oepnfc5.apps.googleusercontent.com",
        "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        "scope": "https://www.googleapis.com/auth/drive"
};


let gapi = window.gapi




export const updateSpec = (ori) => (...args) => {
  let [spec] = args
  ori(...args)
  saveContentToStorage(spec)
}

export default function GoogleDrivePlugin(system) {
	// setTimeout runs on the next tick
	setTimeout(() => {
	  
	  
		var state = new RegExp('[\?&]state=([^&#]*)').exec(window.location.href);
		if (state != null) {
			state = JSON.parse(decodeURI(state[1]));
			gapi.load('client:auth2', () => {
				gapi.client.init(gref).then(function(){
			
					if(gapi.auth2.getAuthInstance().currentUser.get().isSignedIn()){
						showContent(state);
					} else {
						gapi.auth2.getAuthInstance().signIn().then(function(){
							showContent(state);
						}).catch(function(err){
							console.log(err)
							alert("Error! See console for details.");
						});			
					}
				}).catch(function(err){
					console.log(err);
					alert("Error! See console for details.");
				});
			});
		}
	  }, 0)
	  return {
	    statePlugins: {
	      spec: {
	        wrapActions: {
	          updateSpec
	        }
	      }
	    }
	  }
}

function saveContentToStorage(str) {
	alert("Google save");
	return ;
}

function showContent(state) {
	token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token;
	if (state.action == "open") {
		id = state.ids[0];
		$.ajax({
			url: "https://www.googleapis.com/drive/v3/files/"+id+"?alt=media",
			headers : {"Authorization":"Bearer " + token}
		}).then(function(data){
			window.editor.specActions.updateSpec(data);

		}).catch(function(err){
			console.log(err);
			alert("Error! See console for details.");
		});

	}
}	
