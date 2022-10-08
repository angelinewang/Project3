import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getBlog, getUserBlog } from "../../utils/blogService";

function Profile() {
  const { user } = useUser();
  // console.log(user);
  const [blog, setBlog] = useState();

  const { userID } = useParams();

  // TODO: Display blogs by user

  // const getBlogData = async () => {
  //   const blog = await getUserBlog(userID);
  //   setBlog(blog);
  //   console.log("test data ->", blog);
  // };

  useEffect(() => {
    console.log("test");
    if (!userID) {
      return;
    }

    async function getBlogData() {
      const blog = await getUserBlog(userID);
      setBlog(blog);
      console.log("test data ->", blog);
    }
    getBlogData();

    console.log(blog);
  }, []);

  // TODO: Display most recent blogs by user
  // TODO: Display link to user's blog posts

  return (
    <div>
      {user ? <h2> Blogs by {user.name}</h2> : null}

      {blog
        ? blog.blogs.map((b) => (
            <ul>
              <li>{b.title}</li>
            </ul>
          ))
        : null}
    </div>
  );
}

export default Profile;
