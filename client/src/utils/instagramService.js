import tokenService from "./tokenService.js";

export const instagramAccessToken = async (authCode) => {
  try {
    const token = tokenService();

    let res = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        client_id: `6002320329798591`,
        grant_type: `authorization_code`,
        client_secret: `f3a3601c3603c3ec30a8c73939de20e4`,
        scope: ["user_media"],
        redirect_uri: `https://celebrated-salmiakki-a8925d.netlify.app/instagram/auth`,
        code: { authCode },
        //Fill in "code"
        //Fill in "redirect_uri"
      }),
    });

    return res.json();
    //Returned user-id and access-token will be used to query the user node
  } catch (error) {
    console.log(error);
  }
};

//All IG Function is a completely separate page to the main app
//1. Netlify URL on IG App config
//2. Netlify URL on redirect_uri within instagramAuth API call made above
//3. Pass user id & auth token from first API call into the second
//4. Add to Instagram Component as new page on Nav bar
//5. Grab all IG pics, display on a link to IG 6. On click of any IG pic, you go to a new create a blog with IG page and that IG pic is auto-set as the Background photo
//6. Auto-set Post Caption as Blog Title
//7. Ensure GCloud APIs work
//8. CSS

export const instagramMediaEdge = async (accessToken) => {
  try {
    let res = await fetch(
      `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`
    );

    return res.json();

    //Returns a collection of all the media

    //Example response:
    // {
    //   "data": [
    //     {
    //       "id": "17895695668004550",
    //       "caption": ""
    //     },
    //     {
    //       "id": "17899305451014820",
    //       "caption": ""
    //     },
    //     {
    //       "id": "17896450804038745",
    //       "caption": ""
    //     },
    //     {
    //       "id": "17881042411086627",
    //       "caption": ""
    //     }
    //   ],
    //   "paging": {
    //     "cursors": {
    //       "after": "MTAxN...",
    //       "before": "NDMyN..."
    //       },
    //     "next": "https://graph.faceb..."
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};
