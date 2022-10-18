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
    // console.log("service ran");
    let res = await fetch(BASE_URL + `/api/users/${userID}`);

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
