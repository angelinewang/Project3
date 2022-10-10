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
      console.log("test data ->", blog);
    }
    getUserBlogs();
  }, [userID]);

  return (
    <div>
      {userBlogs ? (
        <>
          <h2>
            Blogs by <Link to={`/profile/${user._id}`}> {user.name} </Link>
          </h2>

          {userBlogs.blogs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((b) => (
              <>
                <Link to={`/blog/${b._id}`}>
                  <h3>{b.title}</h3>
                </Link>
                <div>{HTMLReactParser(b.content)}</div>
              </>
            ))}
        </>
      ) : null}
    </div>
  );
}

export default UserBlogs;
