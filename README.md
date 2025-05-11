
                                    .     .  .      .     .  .      .     .  .      .
                               .        .      .        .      .        .      .        .
                                  .        .        .        .        .        .        .
                               .   .  .      .     .  .      .     .  .      .     .  .

                               🌿   🌸      🌿   🌼   🌿   🌸   🌿   🌼   🌿   🌸



<pre>
      .-'''-.   ___    _ ,---.    ,---.,---.    ,---.    .-''-.  .-------. ,---------.    ____      .-_'''-.    
     / _     \.'   |  | ||    \  /    ||    \  /    |  .'_ _   \ |  _ _   \\          \ .'  __ `.  '_( )_   \   
    (`' )/`--'|   .'  | ||  ,  \/  ,  ||  ,  \/  ,  | / ( ` )   '| ( ' )  | `--.  ,---'/   '  \  \|(_ o _)|  '  
   (_ o _).   .'  '_  | ||  |\_   /|  ||  |\_   /|  |. (_ o _)  ||(_ o _) /    |   \   |___|  /  |. (_,_)/___|  
    (_,_). '. '   ( \.-.||  _( )_/ |  ||  _( )_/ |  ||  (_,_)___|| (_,_).' __  :_ _:      _.-`   ||  |  .-----. 
   .---.  \  :' (`. _` /|| (_ o _) |  || (_ o _) |  |'  \   .---.|  |\ \  |  | (_I_)   .'   _    |'  \  '-   .' 
   \    `-'  || (_ (_) _)|  (_,_)  |  ||  (_,_)  |  | \  `-'    /|  | \ `'   /(_(=)_)  |  _( )_  | \  `-'`   |  
    \       /  \ /  . \ /|  |      |  ||  |      |  |  \       / |  |  \    /  (_I_)   \ (_ o _) /  \        /  
     `-...-'    ``-'`-'' '--'      '--''--'      '--'   `'-..-'  ''-'   `'-'   '---'    '.(_,_).'    `'-...-'   
</pre>



                               🌿   🌸      🌿   🌼   🌿   🌸   🌿   🌼   🌿   🌸

                               .     .  .      .     .  .      .     .  .      .
                           .        .      .        .      .        .      .        .
                              .        .        .        .        .        .        .
                           .   .  .      .     .  .      .     .  .      .     .  .


SummerTag is a real-time, location-based web game inspired by the classic playground game of tag! Players join or create games, move around in the real world, and tag each other when within close proximity, all visualized on a live map. The game is built using HTML, CSS, JavaScript, Leaflet.js for mapping, and Firebase for real-time data.

## Features
- **Real-time multiplayer tag**: See all players' locations live on a map.
- **Tagging**: Tag other players when you are within 5 meters of them.
- **Cooldown**: After tagging, both players have a 60-second cooldown before they can tag again.
- **Leaderboard**: View stats for most tags, least tags, and longest streaks.
- **Email notifications**: (Optional) Enter your email to receive notifications.
- **No installation required**: Play directly in your browser.

## How to Play
1. Enter your name and (optionally) your email for notifications.
2. Enter a game code to join an existing game, or create a new game.
3. Allow location access so your position can be tracked.
4. Move in real life! Your location updates in real time for all players while the website is open.
5. If you are within 5 meters of another player, the **Tag!** button will appear. Press it to tag them!
6. The player who is "It" is shown at the top. When you tag someone, you become "It" and cannot tag anyone or be tagged for 60 seconds.
7. The leaderboard shows who has the most tags, least tags, and the longest streak of being tagged.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, [Leaflet.js](https://leafletjs.com/)
- **Backend/Realtime DB**: [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- **Email notifications**: Custom backend endpoint (see code for details)

## Setup & Deployment of Server
1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/SummerTag.git
   cd SummerTag
   ```
2. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Realtime Database.
   - Replace the `firebaseConfig` object in the HTML file with your own Firebase project credentials.
3. **Run Locally**
   - Open `index.html` (or the main HTML file) in your browser.
   - Make sure your browser allows location access.
4. **Deploy**
   - You can deploy the static site to any static hosting provider (e.g., GitHub Pages, Vercel, Netlify).
   - For email notifications, you may need to deploy the backend endpoint (see code for details).

## Privacy & Safety
- Location data is only shared while the website is open.
- Email is optional and only used for notifications.
- Always play safely and be aware of your surroundings!

## License
MIT License. See [LICENSE](LICENSE) for details.

## Credits
- Developed by Nathan Collins
- Uses [Leaflet.js](https://leafletjs.com/) and [Firebase](https://firebase.google.com/)

---

Enjoy playing SummerTag! If you have suggestions or issues, please open an issue or pull request on GitHub.
