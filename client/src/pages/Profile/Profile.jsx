import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";
import "./Profile.css";

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
    }
    getBlogData();
  }, [userID]);

  return (
    <div>
      <section className="profile-page">
        {blog ? (
          <div>
            <div className="profile-card">
              <div className="profile-edit">
                <div className="profile-image">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt="profile avatar"
                      className="pfp"
                    />
                  ) : (
                    <img
                      src={require("../../images/default-user.png")}
                      alt="profile avatar"
                      className="pfp"
                    />
                  )}
                </div>
                {blog._id === user._id ? (
                  <Link to={`/profile/${blog._id}/edit`}>
                    {" "}
                    <button className="edit-btn">Edit profile</button>{" "}
                  </Link>
                ) : null}
              </div>

              <div className="profile-info">
                <h3 className="profile-user-name">{blog.name}</h3>
                <p>{blog.bio} </p>
                <p>
                  {" "}
                  Blogs: <span className="blogs-num">{blog.blogs.length}</span>
                </p>
                <p>Joined: {blog.createdAt.split("T")[0]}</p>
              </div>

              <div>
                {blog.twitter ? (
                  <a
                    href={`https://www.twitter.com/${blog.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../../images/twitter.png")}
                      alt="twitter"
                      className="twitter"
                    />
                  </a>
                ) : null}
                {blog.instagram ? (
                  <a
                    href={`https://www.instagram.com/${blog.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../../images/instagram.png")}
                      alt="twitter"
                      className="instagram"
                    />
                  </a>
                ) : null}
              </div>
            </div>
            <hr className="profile-hr" />
            <h3> Blogs by {blog.name}</h3>
            {blog.blogs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((b) => (
                <div key={b._id}>
                  <Link to={`/blog/${b._id}`}>
                    <h4>{b.title}</h4>
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
