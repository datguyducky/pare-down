//function to change current step
export function updateStep({step, id, sort, userTrackNum, playlistName, imageUrl, tracksNum, uris}={}) {
	//console.log(arguments);
	this.setState({ step, id, sort, userTrackNum, playlistName, imageUrl, tracksNum, uris})
}