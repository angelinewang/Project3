import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getBlogs } from "../../utils/blogService";
import "./homepage.css";

export default function HomePage() {
  let [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
    console.log(blogs);
  }, []);

  async function getBlogs() {
    try {
      const response = await fetch("http://localhost:3001/");
      const blogs = await response.json();
      setBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <NavBar />
      <h1>HomePage</h1>
      <div className="main-flex">
        <main className="blogs-feed">
          {blogs.map((post) => (
            <article className="article-post">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="post-settings">
                <p>Posted on: {post.timestamps}</p>
                <ul>
                  {post.tags.map((tag) => (
                    <li>
                      <button>{tag}</button>
                    </li>
                  ))}
                </ul>
                <Link to={`/blog/${post._id}`}>
                  <button>Read on</button>
                </Link>
              </div>
            </article>
          ))}
        </main>
        <div className="blogs-side">
          <h2>Sort by:</h2>
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label for="html">Latest</label>
          <br />
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label for="css">Title</label>
          <hr />
          <h2>Filter by:</h2>
          {blogs.map((blog) => {
            blog.tags.map((tag) => (
              <label class="container">
                {tag}
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            ));
          })}
        </div>
      </div>
    </div>
  );
}
