# Pare Down for Spotify
Do you have one or more big playlists (+1000 songs) and your mobile data is limited? If so, you can use Pare Down for Spotify to create copy of selected playlist with amount of songs you've choosen to. Now you can download smaller version of your playlist and still enjoy your music without worrying about data limit.

## 📖 How to use Pare Down:
* First you need to login with your Spotify account and grant Pare Down app permission to access some of your data (more about it [here](#For-users)).
* After granting permission you will be redirect to page with list of all of your playlists (you can see there name, cover and total number of songs in playlist).
* Now, you need to select one of the displayed playlists by clicking on it - which will redirect you to another step where you can customize order and number of songs in playlist that will be created by Pare Down.
* After clicking "CREATE NEW PLAYLIST" button you will see another step:
On left you can see information about playlist you have selected (name, num of songs and cover) and on right you can see information about playlist that will be created after this step. If you're happy with your choices you need to click "CREATE" button, if not - by clicking "CANCEL" button you will be redirect back to step1 where you can select same or another playlist..
* If you choose to "CREATE", you will be redirect to last step, where you will see information about successful creation of playlist and button to pare down another playlist if you want to. :)

## 🐞 Hey I found a bug!
Something doesn't work like it should? Or maybe page looks way different on every device you have? If so, [go here to create issue](https://github.com/datguysheepy/pare-down/issues/new) - please choose appropriate title and in description include everything that you think will be useful for fixing this bug that you just found!

## 🙋 FAQ:
#### ***For users***:
**Q:** What data I granted permission for Pare Down to access?\
**A:** Pare Down now have access to:
* view your private playlists.
* manage your public playlists.
* manage your private playlists.
* upload images to personalize your profile or playlist cover.

**Q:** Is Pare Down free to use?\
**A:** Yes, you can pare down as many playlists as you want. Every feature that Pare Down offers is from start free for everybody.

**Q:** Do you plan to create paid version of Pare Down?\
**A:** No, I don't think there's need to create paid version of this project - it's simple and offer only one thing.

**Q:** Can I change name of pared down playlist?\
**A:** At this moment you can only change name of playlist from Spotify app, Pare Down don't have option to do it inside it.

**Q:** Why my pared down playlist don't have description?\
**A:** At this moment Pare Down don't create pared down playlist with description from original playlist. If you want to have one you need to create it from Spotify app.

**Q:** Can I change pared down album cover?\
**A:** Yes, but only using Spotify app. Pare Down don't offer option to do it from inside of it.

**Q:** I clicked on 'LOG IN WITH SPOTIFY" button but it didn't immediately redirect me to log in page, why?\
**A:** Service that is responsible for redirection of users is designed to 'go to sleep' after 30 minutes of inactivity, because Pare Down is not used by a lot of people it can 'go to sleep' quite often and it takes couple of seconds for this service to fully 'wake up'.

**Q:** I don't see all my playlists, why?\
**A:** Currently Pare Down can display only 20 latest playlists and if you have a lot more than that, please move playlist that you want to pare down to first position from within Spotify app. Don't worry this will be fixed in the next update. 

**Q:** On step 1 one or more of my playlists cover is stretched, why?!\
**A:** Probably image you used for this playlist cover was in potrait mode or had strange dimensions. Currently I don't plan fixing it, but if this upsets you can try to change cover of this playlist from Spotify app.

**Q:** Something didn't work as it should, can I somehow report it?\
**A:** [Yes, here](https://github.com/datguysheepy/pare-down/issues/new). Please choose appropriate title and in description describe this problem as accurately as you can.

**Q:** I have this great idea for Pare Down, where I can share it with you?\
**A:** [Here](https://github.com/datguysheepy/pare-down/issues/new). Please choose appropriate title and description.

#### ***For developers***
**Q:** With what Pare Down was built with?\
**A:** [React](https://reactjs.org/) and [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

**Q:** Where is frontend of Pare Down hosted?\
**A:** Github Pages.

**Q:** Where is backend of Pare Down hosted?\
**A:** Heroku, on free dyno.

**Q:** How backend of Pare Down works?\
**A:** I used [this repo](https://github.com/mpj/oauth-bridge-template) created by [Mattias Petter Johansson](https://github.com/mpj) - you can check original version of it or look in "backend" folder in Pare Down repo to see edited version used by Pare Down.

**Q:** How can I contribute to this project?\
**A:** You can create PR with fixed bugs or new functionalities that you thought will be great addition to Pare Down project. Below you can read more about contribution and how to test it on your machine.

## 🤝 Contribution:
### To test Pare Down locally you need to do couple of things:
**For frontend:**
* run `npm start` in root directory of this project.
* now you can go to [http://localhost:3000](http://localhost:3000) to view it in the browser.
* but to be available to get *Log in with Spotify* button to work you need to get backend working...

**For backend:**
* you need to go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and then:
	* Create new app
	* Edit 'Redirect URIs' setting of it to `http://localhost:8888/callback`
	* Copy `CLIENT ID` and `CLIENT SECRET` of it from that page.
* and then in terminal use this 2 commands:\
`export SPOTIFY_CLIENT_ID=[id you copied]`\
`export SPOTIFY_CLIENT_SECRET=[other id you copied]`
* and finally run `npm start` in backend folder.
* Now *Log in with Spotify* button should work. Also you can test it by going to [http://localhost:8888/login](http://localhost:8888/login)

## 📝 License 
Simple Start extension is open-source project licensed under the []().