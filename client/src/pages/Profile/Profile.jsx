import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";

function Profile() {
  const { user } = useUser();

  const [blog, setBlog] = useState();

  const { userID } = useParams();

  useEffect(() => {
    if (!userID) {
      return;
    }

    async function getBlogData() {
      const blog = await getUserBlog(userID);
      setBlog(blog);
      console.log("profile data ->", blog);
      console.log("blog data", blog.blogs);
    }
    getBlogData();
  }, [userID]);

  return (
    <div>
      <section>
        {blog ? (
          <div>
            <div>
              <p>User: {blog.name}</p>
              <p>Bio: {blog.bio} </p>
              <p>Joined: {blog.createdAt.split("T")[0]}</p>
              <p>Blogs: {blog.blogs.length}</p>
              {blog._id === user._id ? (
                <Link to={`/profile/${blog._id}/edit`}>
                  {" "}
                  <button>Edit</button>{" "}
                </Link>
              ) : null}
            </div>

            <h2> Blogs by {blog.name}</h2>
            {blog.blogs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((b) => (
                <div key={b._id}>
                  <Link to={`/blog/${b._id}`}>
                    <h3>{b.title}</h3>
                  </Link>

                  <div>{HTMLReactParser(b.description)}</div>
                </div>
              ))}
            <Link to={`/profile/${blog._id}/blogs`}>
              <p>View more of {blog.name}'s blogs </p>
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Profile;
