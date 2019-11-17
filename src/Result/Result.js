import React, {Component} from 'react';
import queryString from 'query-string';

export default class Result extends Component {
    constructor() {
        super();
        this.state = {
            success: null
        }
    }

    componentDidMount() {
        let uris = this.props.uris;
        //checking address bar for access token from Spotify API.
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)
            return;
        //creating new playlist
        fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists`, {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.props.playlistName + ' - Pared Down',
                }),
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            //adding "selected" songs by user to this freshly created playlist. 
            //Spotify API allow only to add max 100 songs per request. 'uris' state stores X ammount of arrays inside it - by looping it we can send proper ammount of requests to add all songs that we need.
            .then((data) => {
                for (let i = 0; i < uris.length; i++) {
                    fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
                            method: 'POST',
                            body: JSON.stringify({
                                "uris": this.props.uris[i]
                            }),
                            headers: {
                                'Authorization': 'Bearer ' + accessToken,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            if (response.status === 201) {
                                this.setState({
                                    success: 'Playlist was created!'
                                })
                            }
                        })
                }
            })
    }
    render() {
        return (
            this.state.success ?
            <div>
				<p className="step--header">{this.state.success}</p>
				{
				/*btn to pare down another playlist. We reload whole page, because when we try to set step state to '1' console throws error about "Can't perform a React state update on an unmounted component."*/
				}
				<div 
					onClick={() => window.location.reload(true)} 
					className="btn" 
					style={{backgroundColor: '#333', marginTop: 0, maxWidth: 270}}
				>
					Pare down another playlist
				</div>
			</div> :
            null
        )
    }
}