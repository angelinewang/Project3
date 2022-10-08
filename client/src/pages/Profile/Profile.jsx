import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getUserBlog } from "../../utils/blogService";

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
    if (!userID) {
      return;
    }

    async function getBlogData() {
      const blog = await getUserBlog(userID);
      setBlog(blog);
      console.log("test data ->", blog);
    }
    getBlogData();
  }, [userID]);

  // TODO: Display most recent blogs by user
  // TODO: Display link to user's blog posts

  return (
    <div>
      <section>
        {user ? <p> User: {user.name}</p> : null}
        <p>Joined: {blog.createdAt}</p>
        <p>Blogs: {blog.blogs.length}</p>
      </section>
      <section>
        <h2> Blogs by {blog.name}</h2>
        {blog
          ? blog.blogs.map((b) => (
              <ul>
                <li>{b.title}</li>
              </ul>
            ))
          : null}
      </section>
      <div>
        <p>View more of {blog.name}'s blogs -> </p>
      </div>
    </div>
  );
}

export default Profile;
