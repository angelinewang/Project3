import tokenService from "./tokenService.js";

export const instagramAuth = async () => {
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
        redirect_uri: `https://localhost:3000/`,
        code: `AQDRUP3uFrmuPME83ZecHv8iZE7pAk7bcarAB6hebD3ZUbGC46dPzNkUXA7e8K6jY4WZX77uaygwE9mYP85Z8FuCiFMGNaaviVhb-MioE4Ds1FQQg5QZPi5-HZN7Jr4YbfBo6yftrGwMhYy0OxSKUPtm23L-aUTIlHpLBStzjrU56GDTpV-HpaA5Q8USrgoO2eWWjlycJyaqCBJVaW6dscLSxFRDafsGpmAcU1Px006Cjg`,
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

export const instagramUser = async () => {
  try {
    const token = tokenService();
    let res = await fetch(
      `https://graph.instagram.com/${
        user - id
      }?fields=id,username&access_token=${access - token}`
    );

    return res.json();

    //Returns user's ID and username
    //Example: {
    //     "id": "5497206246982646",
    //     "username": "angelinewang"
    // }
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

export const instagramMediaEdge = async () => {
  try {
    const token = tokenService();
    let res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${
        access - token
      }`
    );

    return res.json();

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

export const instagramMediaData = async () => {
  try {
    const token = tokenService();
    let res = await fetch(
      `https://graph.instagram.com/${
        media - id
      }?fields=${fields}&access_token=${access - token}`
    );

    return res.json();
    //Example response:
    // {
    //   "id": "17895695668004550",
    //   "media_type": "IMAGE",
    //   "media_url": "https://fb-s-b-a.akamaihd.net/...",
    //   "username": "jayposiris"
    //   "timestamp": "2017-08-31T18:10:00+0000"
    // }
  } catch (error) {
    console.log(error);
  }
};
