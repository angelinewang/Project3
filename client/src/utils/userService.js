import tokenService from "./tokenService";

const BASE_URL = "https://blogging-platform-365219.ew.r.appspot.com"; // Note: Once deployed this should be updated.

// import dotenv from "dotenv";

// dotenv.config();

// const API_KEY = process.env.API_KEY;

function signup(user) {
  return (
    fetch(BASE_URL + "/api/users/signup", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

//Retrieves
// function getUserInfo(id) {
//   return fetch(`/api/users/info/${id}`, {
//     method: "GET",
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//   }).then((res) => {
//     // Valid login if we have a status of 2xx (res.ok)
//     if (res.ok) return res.json();
//     throw new Error("Oops something went wrong!");
//   });
// }

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  console.log("Reached Login function!");
  console.log(creds);
  // debugger;
  //Works for any client-side code
  return fetch(BASE_URL + "/api/users/login", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

// TODO: Post profile info
//! dc
export const updateProfileInfo = async (profileEdit, userID) => {
  console.log("UserService check ->", profileEdit);

  try {
    console.log("user service check 2");
    const token = tokenService.getToken();
    let res = await fetch(`/api/users/${userID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(profileEdit),
    });
    console.log("res ->", profileEdit);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const addProfileInfo = async (profileEdit, userID) => {
//   try {
//     const token = tokenService.getToken();
//     let res = await fetch(`/api/users/${userID}`, {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(profileEdit),
//     });
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// TODO: Update profile info
// export const updateProfileInfo = async (profileEdit, userID) => {
//   try {
//     console.log("user service check", profileEdit);
//     const token = tokenService.getToken();
//     let res = await fetch(`/api/users/${userID}`, {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(profileEdit),
//     });
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // TODO: Delete profile info
// export const deleteProfileBio = async (profileEdit, userID) => {
//   console.log("user service check", profileEdit);
//   try {
//     const token = tokenService.getToken();
//     let res = await fetch(`/api/users/${userID}`, {
//       method: "DELETE",
//       headers: {
//         "content-type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(profileEdit.bio),
//     });
//     console.log("body check user service", profileEdit.bio);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

const exports = {
  signup,
  getUser,
  logout,
  login,
  // getUserInfo,
};

export default exports;
