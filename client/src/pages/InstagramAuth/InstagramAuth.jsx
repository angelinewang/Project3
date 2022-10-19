import './InstagramAuth.css';

function InstagramAuth() {

    // /instagram/auth automatically redirects to page for Instagram Authentication
window.location.replace("https://api.instagram.com/oauth/authorize?client_id=6002320329798591&redirect_uri=https://celebrated-salmiakki-a8925d.netlify.app/instagram/photos/&scope=user_profile,user_media&response_type=code")

};

export default InstagramAuth