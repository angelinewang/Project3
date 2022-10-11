import tokenService from "./tokenService";

const BASE_URL = "https://blogging-platform-zdrxz7zzzq-nw.a.run.app/api/users/"; // Note: Once deployed this should be updated.

// import dotenv from "dotenv";

// dotenv.config();

// const API_KEY = process.env.API_KEY;

function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
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
  return fetch(
    "https://blogging-platform-zdrxz7zzzq-nw.a.run.app/api/users/login",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(creds),
    }
  )
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

const exports = {
  signup,
  getUser,
  logout,
  login,
  // getUserInfo,
};

export default exports;
