import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";
import "./Profile.css";

function Profile() {
  const { user } = useUser();

  const [blog, setBlog] = useState();

  const userID = useParams().userID;

  useEffect(() => {
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

                {user && blog._id === user._id ? (
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
            <section className="selected-blogs">
              <div className="blogs-title">
                <h3>{blog.name}'s recent blog posts</h3>
              </div>
              <div className="blog-preview">
                {blog.blogs
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 4)
                  .map((b) => (
                    <div className="blog-cards" key={b._id}>
                      <div className="blog-title">
                        <Link
                          to={`/blogpost/detail/${b._id}`}
                          style={{ color: "black" }}
                        >
                          <h4>{b.title}</h4>
                        </Link>
                      </div>

                      <div className="blog-description">
                        {HTMLReactParser(b.description)}...{" "}
                        <Link
                          to={`/blogpost/detail/${b._id}`}
                          style={{ color: "#fa9500" }}
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
            <div className="user-blog-link">
              <Link
                to={`/profile/${blog._id}/blogs`}
                style={{ color: "black" }}
              >
                <p>View all blog posts by {blog.name} →</p>
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading, please wait.</p>
        )}
      </section>
    </div>
  );
}

export default Profile;