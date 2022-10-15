import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";
import useUser from "../../hooks/useUser";

function UserBlogs() {
  const { user } = useUser();

  const [userBlogs, setUserBlogs] = useState();
  const { userID } = useParams();

  useEffect(() => {
    if (!userID) {
      return;
    }

    async function getUserBlogs() {
      const blog = await getUserBlog(userID);
      setUserBlogs(blog);
      console.log("user blogs data ->", blog);
    }
    getUserBlogs();
  }, [userID]);

  return (
    <div>
      {userBlogs ? (
        <>
          <h2 key={userBlogs._id}>
            Blogs by{" "}
            <Link to={`/profile/${userBlogs._id}`}> {userBlogs.name} </Link>
          </h2>

          {userBlogs.blogs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((b) => (
              <div key={b._id}>
                <Link to={`/blogpost/detail/${b._id}`}>
                  <h3>{b.title}</h3>
                </Link>
                <div>{HTMLReactParser(b.description)}</div>
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
}

export default UserBlogs;
