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

  console.log(blogs, tags);

  async function getBlogs() {
    try {
      const response = await fetch("/api/blogs");
      const blogs = await response.json();
      setBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  }

  async function getTags() {
    try {
      const response = await fetch("/api/blogs");
      const blogs = await response.json();
      blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
          tags.push(tag);
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

  return (
    <div>
      <h1>HomePage</h1>
      <div className="main-flex">
        <main className="blogs-feed">
          {blogs
            ? blogs.map((post) =>
                tags.some((el) => post.tags.includes(el)) ? (
                  <article className="article-post">
                    <h2>{post.title}</h2>
                    <img src={post.image} alt={post.title} />
                    <p>{post.description}</p>
                    <div className="post-settings">
                      <p>Posted on: {post.createdAt}</p>
                      <h2>Tags:</h2>
                      <ul className="tags">
                        {post.tags.map((tag) => (
                          <li>
                            <button>{tag}</button>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/blogpost/detail/${post._id}`}>
                        <button>Read on</button>
                      </Link>
                    </div>
                  </article>
                ) : null
              )
            : null}
        </main>
        <div className="blogs-side">
          <h2>Sort by:</h2>
          <input type="radio" id="latest" name="filter_option" value="latest" />
          <label for="latest">Latest</label>
          <br />
          <input type="radio" id="title" name="filter_option" value="title" />
          <label for="css">Title</label>
          <hr />
          <h2>Filter by:</h2>
          {blogs.map((blog) =>
            blog.tags.map((tag) => (
              <label class="container">
                {tag}
                <input
                  type="checkbox"
                  name={tag}
                  onChange={onFilterChange}
                  checked={tags.includes(tag)}
                />
                {/* <span class="checkmark"></span> */}
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

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
