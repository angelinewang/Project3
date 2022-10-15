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
      // console.log("blog data", blog.blogs);
    }
    getBlogData();
  }, [userID]);

  // console.log(blog.socialMediaProfiles.linkToProfile);
  // {blog.socialMediaProfiles.map(social => (

  // ))}
  return (
    <div>
      <section>
        {blog ? (
          <div>
            <div>
              {blog.image ? (
                <img src={blog.image} alt="profile avatar" className="pfp" />
              ) : null}
              <p>User: {blog.name}</p>
              <p>Bio: {blog.bio} </p>
              <p>Joined: {blog.createdAt.split("T")[0]}</p>
              <p>Blogs: {blog.blogs.length}</p>

              <div>
                {blog.socialMediaProfiles[0].linkToProfile.length ? (
                  <a
                    href={`https://www.twitter.com/${blog.socialMediaProfiles[0].linkToProfile}`}
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
                {blog.socialMediaProfiles[1].linkToProfile.length ? (
                  <a
                    href={`https://www.instagram.com/${blog.socialMediaProfiles[1].linkToProfile}`}
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
              .slice(0, 3)
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
