import tokenService from "./tokenService.js";
const BASE_URL = "https://blogging-platform-365219.ew.r.appspot.com";

export const getBlogs = async () => {
  try {
    let res = await fetch(BASE_URL + "/api/blogs");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (blogID) => {
  try {
    let res = await fetch(BASE_URL + `/api/blogs/${blogID}`);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlog = async (userID) => {
  try {
    //1. Does the user ID exist? YES 2. Does the URL work for blogs? YES 3. Does the URL work for other users calls?

    //4. Try users/login API WORKS 5. Try users/signup APi WORKS
    // console.log("service ran");
    let res = await fetch(BASE_URL + `/api/users/${userID}`);
    // #1 Test this API request in Postman: https://blogging-platform-365219.ew.r.appspot.com/api/users/6341888e3ef0c4526bc0d222

    // #1.5 See if correct user id is being passed into the API

    // #2 Finish making Profile work
    // #3 Finish making Profile user blogs work
    // #4 Make homepage work

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateABlog = async (blog) => {
  try {
    const token = tokenService.getToken();

    let res = await fetch(BASE_URL + `/api/blogs/${blog._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createABlog = async (blog) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(BASE_URL + `/api/blogs`, {
      method: "POST",
      headers: {
        //"content-type": 'multipart/form-data',
        Authorization: "Bearer " + token,
      },
      body: blog,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeABlog = async (blog) => {
  try {
    console.log("blog was deleted");
    const token = tokenService();
    let res = await fetch(BASE_URL + `/api/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
