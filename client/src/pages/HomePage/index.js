import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
export default function HomePage() {
  let [blogs, setBlogs] = useState([]);
  let [tags, setTags] = useState([]);
  useEffect(() => {
    getBlogs();
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getBlogs() {
    try {
      const response = await fetch(
        "https://blogging-platform-365219.ew.r.appspot.com/api/blogs"
      );
      const blogs = await [response.json()];
      setBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  }
  async function getTags() {
    try {
      const response = await fetch(
        "https://blogging-platform-365219.ew.r.appspot.com/api/blogs"
      );
      const blogs = await response.json();
      blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
          const newTag = Object.keys(tag).reduce(function (res, v) {
            return res.concat(tag[v]);
          }, []);
          console.log(newTag);
          newTag.pop();
          console.log(newTag);
          const realTag = newTag.join().replace(/,/g, "");
          console.log(realTag);
          tags.push(realTag);

          tag = realTag;
          console.log(tags);
        });

        blog.tags.forEach((tag) => {
          Object.keys(tag).reduce(function (res, v) {
            return (tag = res.concat(tag[v]));
          }, []);

          tag.pop();
          tag.join().replace(/,/g, "");
          console.log(blogs);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  const onFilterChange = (e) => {
    const thisTag = e.target["name"];
    if (e.target.checked) {
      setTags([...tags, thisTag]);
    } else {
      setTags(tags.filter((tag) => tag !== thisTag));
    }
    if (tags.size) {
      setBlogs(
        blogs.filter((blog) => {
          return tags.includes(blog.tags);
        })
      );
    }
  };

  const onFilterButton = (e) => {
    console.log(e.target.value);
    const thisTag = e.target.value;
    setTags(tags.filter((tag) => tag === thisTag));
  };

  const onDateSortChange = (e) => {
    console.log(e.target);
    const newBlogs = structuredClone(blogs);
    setBlogs(
      newBlogs.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  };

  const onAlphabetSortChange = (e) => {
    const newBlogs = structuredClone(blogs);
    setBlogs(newBlogs.sort((a, b) => a.title.localeCompare(b.title)));
  };

  return (
    <div>
      <div className="main-flex">
        <main className="blogs-feed">
          {
            blogs.map(
              (post) => (
                // tags.some((el) => post.tags.includes(el)) ? (
                <article className="article-post" key={post._id}>
                  <Link to={`/profile/${post.author._id}`}>
                    <div className="user-details">
                      <img
                        src={
                          post.author.image
                            ? post.author.image
                            : require("../../images/default-user.png")
                        }
                        alt="profile pic"
                      />
                      <div className="user-details-2">
                        <p>{post.author.name}</p>
                        <p>Joined: {post.author.createdAt.substring(0, 10)}</p>
                      </div>
                    </div>
                  </Link>

                  <h2 className="homepage-title">{post.title}</h2>
                  {post.image ? (
                    <img src={post.image} alt={post.title} />
                  ) : null}
                  <p>{post.description}</p>
                  <div className="post-settings">
                    <p>
                      Posted on: {post.createdAt.substring(0, 10)}, at{" "}
                      {post.createdAt.substring(12, 16)}
                    </p>
                    <p>Tags:</p>
                    <ul className="tags">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <button
                            className="homepage-button"
                            value={tag}
                            onClick={onFilterButton}
                          >
                            {tag}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Link to={`/blogpost/detail/${post._id}`}>
                      <button className="homepage-button">Read on</button>
                    </Link>
                  </div>
                </article>
              )
              // ) : null
            )
            // : null
          }
        </main>
        <div className="blogs-side">
          <h2>Sort by:</h2>
          <input
            type="radio"
            id="latest"
            name="sort"
            value="latest"
            onChange={onDateSortChange}
          />
          <label for="latest">Latest</label>

          <input
            type="radio"
            id="title"
            name="sort"
            value="title"
            onChange={onAlphabetSortChange}
          />
          <label for="title">Title</label>
          <hr />
          <h2>Filter by:</h2>
          {tags
            ? tags.map((tag) => (
                <label class="container">
                  {tag}
                  <input
                    type="checkbox"
                    name={tag}
                    onChange={onFilterChange}
                    checked={tags.includes(tag)}
                  />
                </label>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./homepage.css";
// import { instagramAccessToken } from "../../utils/instagramService";

// export default function HomePage() {
//   let [blogs, setBlogs] = useState([]);
//   let [tags, setTags] = useState([]);

//   console.log(blogs, tags);
//   console.log(
//     instagramAccessToken(
//       "AQAO6nr2koqjT_UWGBwvFSMcRpWQv1GEdXbixtSP2le1kqCx5F5hzBD-YTCU6VRB5pJA_aBY-yy2tN9_yGOA6HcTzw9EYbnmh6LKgu6HsMPX_lyYBwLojJLqG4eTXWLJtsv7ELkWn2HzHiNy1yfsUC6sR_WU0W453JgBKOS2QD6nh71qioPteNPN1UjtEvnxjnf8usfmWzYs5e5LQpr8K-dkIDvQtQaAVtba5Nl1-XVVHg"
//     )
//   );

//   async function getBlogs() {
//     try {
//       const response = await fetch(
//         "https://blogging-platform-365219.ew.r.appspot.com/api/blogs"
//       );
//       const blogs = await response.json();
//       setBlogs(blogs);
//       console.log(blogs);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function getTags() {
//     try {
//       const response = await fetch(
//         "https://blogging-platform-365219.ew.r.appspot.com/api/blogs"
//       );
//       const blogs = await response.json();
//       blogs.forEach((blog) => {
//         blog.tags.forEach((tag) => {
//           tags.push(tag);
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getBlogs();
//     getTags();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onFilterChange = (e) => {
//     const thisTag = e.target["name"];
//     if (e.target.checked) {
//       setTags([...tags, thisTag]);
//     } else {
//       setTags(tags.filter((tag) => tag !== thisTag));
//     }

//     if (tags.size) {
//       setBlogs(
//         blogs.filter((blog) => {
//           return tags.includes(blog.tags);
//         })
//       );
//     }
//   };

//   return (
//     <div>
//       <Link to="/instagram/auth">Instagram Auth</Link>
//       <Link to="/instagram/photos/">Instagram Photos</Link>
//       <Link to="/blogpost/detail/634adbf9ff84459fb3924ddb">Detail Page</Link>
//       <h1>HomePage</h1>
//       <div className="main-flex">
//         <main className="blogs-feed">
//           {blogs.map((post) =>
//             tags.some((el) => post.tags.includes(el)) ? (
//               <article className="article-post">
//                 <h2>{post.title}</h2>
//                 <img src={post.image} alt={post.title} />
//                 <p>{post.description}</p>
//                 <div className="post-settings">
//                   <p>Posted on: {post.createdAt}</p>
//                   <h2>Tags:</h2>
//                   <ul className="tags">
//                     {post.tags.map((tag) => (
//                       <li>
//                         <button>{tag}</button>
//                       </li>
//                     ))}
//                   </ul>
//                   <Link to={`/blogpost/detail/${post._id}`}>
//                     <button>Read on</button>
//                   </Link>
//                 </div>
//               </article>
//             ) : null
//           )}
//         </main>
//         <div className="blogs-side">
//           <h2>Sort by:</h2>
//           <input type="radio" id="latest" name="filter_option" value="latest" />
//           <label for="latest">Latest</label>
//           <br />
//           <input type="radio" id="title" name="filter_option" value="title" />
//           <label for="css">Title</label>
//           <hr />
//           <h2>Filter by:</h2>
//           {blogs.map((blog) =>
//             blog.tags.map((tag) => (
//               <label class="container">
//                 {tag}
//                 <input
//                   type="checkbox"
//                   name={tag}
//                   onChange={onFilterChange}
//                   checked={tags.includes(tag)}
//                 />
//                 {/* <span class="checkmark"></span> */}
//               </label>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/*
function Product(props) {
  const { product } = props
  
  return (
    <li
      key={product.id}
      className="product">
      <img src={product.image} />
      <div className="product-details">
        <header>{product.title}</header>
        <div className="category">{product.category}</div>
        <div className="price">{`$${padPrice(product.price)}`}</div>
      </div>
    </li>
  )
}

function ProductsList(props) {
  const { products } = props
  
  return (
    <ul className="products">
      {products.map(product => (
        <Product product={product} />
      ))}
    </ul>
  )
}

function App() {
  const [state, setState] = useState({
    products: PRODUCTS,
    filters: new Set(),
  })
  
  const handleFilterChange = useCallback(event => {
    setState(previousState => {
      let filters = new Set(previousState.filters)
      let products = PRODUCTS
      
      if (event.target.checked) {
        filters.add(event.target.value)
      } else {
        filters.delete(event.target.value)
      }
      
      if (filters.size) {
        products = products.filter(product => {
          return filters.has(product.category)
        })
      }
      
      return {
        filters,
        products,
      }
    })
  }, [setState])
  
  return (
    <main>
      <ProductFilters 
        categories={CATEGORIES}
        onFilterChange={handleFilterChange}/>
      <ProductsList products={state.products} />
    </main>
  )
}
*/
