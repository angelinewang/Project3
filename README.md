# Project3
## Description

This project was done after learning React front-end framework and Express back-end framework. Extensive practice with JavaScript is thus employed in the process.It involves the creation of document-based database through MongoDB and the use of Mongoose. The database includes reference data and embedded data where relevant. We also created RESTful APIs deployed through Cloud Run APIs, and the front-end is deployed through Netlify. 

In the project curation process, we also experimented with the Instagram Basic and Graph APIs which can be seen in the instagramService. Although this was not in the end used because we needed Instagram approval to use the information gathered from the API on a publically deployed site. 

My role focused heavily on researching into Google Cloud, and ended up using Cloud Run to deploy am API endpoint, which involved the creation of a container and addition of relevent Google Cloud requirements like .yaml files. Working with project creation, service creation, api gateway creation, and final deployment was a fascinating process. Google Cloud could indeed make their UI more user-friendly is the ultimate conclusion of course. 

We also experimented with CSS Framework BulmaCSS and continued use of Flexbox CSS

We chose to create a blogging platform where users can view the blogs of other readers through the home page, view a detail page, create a profile, login, view their own blogs, create a blog, and edit their blogs and profile. 

As the third project completed, this project was mainly a tool for continued exploration of niches we found personally interesting. We focused on splitting the work between group members so that we all got to complete fullstack programming. 

---

## Deployment link

The deployed Netlify project can be found at this link: https://celebrated-salmiakki-a8925d.netlify.app/

The deployed API can be found through this publically accessible Cloud Run API Endpoint Base URL: https://blogging-platform-365219.ew.r.appspot.com
And comes with the following Methods:
GET /blogs
GET /blogs/:id 
POST /blogs --> Create a blog 
PATCH /blogs/:id 
DELETE /blogs/:id

POST /users/login 
POST /users/signup
GET /users/:id
PATCH /users/:id 

#### Login details for testing purposes
_Email_: testing123@gmail.com
_Password_: Test123

---

## Getting Started/Code Installation

In order to access the codebase, feel free to fork this remote repo, clone it into your local machine, npm install for all the relevant node modules, and you're all set! 

## Timeframe & Working Team (Solo/Pair/Group)

We worked on this project for 2 weeks and involved a group of 4 programmers. The others I worked with were @ManohisoaVicky, @amgorithm, and @Mohamed1419. Here are their repos: 

https://github.com/ManohisoaVicky/Project3
https://github.com/amgorithm/Project-3
https://github.com/Mohamed1419/Project3-blog

## Technologies Used

#### Backend
- Written in JavaScript 
- Express Framework
- MongoDB
- Mongoose
- Google Cloud

#### Frontend 
- JavaScript
- React Framework
- BulmaCSS Framework 
- Netlify Deployment

#### Development Tools 
- Postman
- Insomnia
- MongoDB Compass
- MongoDB Atlas
- Nodemon

---

## Brief

---Start of Brief
# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #3: A MERN Stack App

## Overview

**You’ve come a long way, and it's time to show it.** This will be your most advanced project to date. It is **IMPORTANT** to note that when we say _advanced_, the project doesn't necessarily need to have lots more functionality.

**Remember:** simple code is stable code, so always favour refactoring and bug fixing over adding more functionality.

With this in mind, you need to be smart about how you plan, limit your project scope to be achievable (in terms of functionality) and focus on quality rather than quantity.

Make sure you review your project proposal with your instructor so you can make sure it's **something you can accomplish in the limited time we have**.

---

## Technical Requirements

You must:

- **Build a full-stack application** by making your own backend and your own front-end
- **Use an Express API** to serve your data from a Mongo database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

---

## Necessary Deliverables

- A **working app** hosted on the internet
- A **link to your hosted working app** in the URL section of your Github repo
- A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
- **A `readme.md` file** with:
  - An embedded screenshot of the app
  - Explanations of the **technologies** used
  - A couple paragraphs about the **general approach you took**
  - **Installation instructions** for any dependencies
  - Link to your **user stories/wireframes** – sketches of major views / interfaces in your application
  - Link to your **pitch deck/presentation** – documentation of your wireframes, user stories, and proposed architecture
  - Descriptions of any **unsolved problems** or **major hurdles** you had to overcome

---

## Suggested Ways to Get Started

- **Don’t get too caught up in too many awesome features** – simple is always better. Build something impressive that does one thing well.
- **Design first.** Planning with user stories & wireframes before writing code means you won't get distracted changing your mind – you'll know what to build, and you can spend your time wisely by just building it.
- **Don’t hesitate to write throwaway code** to solve short term problems.
- **Read the docs for whatever technologies / frameworks / API’s you use**.
- **Write your code DRY** and **build your APIs RESTful**.
- **Be consistent with your code style.** You're working in teams, but you're only making one app per team. Make sure it looks like a unified effort.
- **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
- **Keep user stories small and well-defined**, and remember – user stories focus on what a user needs, not what development tasks need accomplishing.
- **Write code another developer wouldn't have to ask you about**. Do your naming conventions make sense? Would another developer be able to look at your app and understand what everything is?
- **Make it all well-formatted.** Are you indenting, consistently? Can we find the start and end of every div, curly brace, etc?
- **Comment your code.** Will someone understand what is going on in each block or function? Even if it's obvious, explaining the what & why means someone else can pick it up and get it.
- **Write pseudocode before you write actual code.** Thinking through the logic of something helps.

---

## Sign Off Requirments

- **A Simple Wireframe** of the front end of the application, this should take into account the user flow through the app, eg, what can logged in users see/not see.
- **A plan for what models/resources** that is needed for the back end application and what the relationships between these will be
- **A great group name**
---End of Brief

---

## Planning

1. Ideating 

First, we thought about the functionality we wanted to add to the platform, and initially focused on creating something centered around Instagram and being able to post a blog attached to your Instagram posts, however, this was later discarded as a simple independent blog site was created instead. Although research into and testing with the API was still much fun. 

2. Sketching

To sketch our idea and model the data, we used Miro, and here is a screenshot: 

To-be-uploaded below 
![image]()

3. Project Management 

To designate tasks, we used Trello, and split the app up into the different features including the Home Page, Profile Page, Detail Page and Creation Page. We each took one of these pages, and began full-stack development on them. Before that, we grabbed a MERN skeleton where we could decide on the Database Schemas and Controllers we would use. The way we organised our data allowed us to have a clearer idea of the necessary code in our individual features. 

Here's a screenshort of the Trello:

![image](C:\Users\angel\OneDrive\Images\Screenshots\Project3-Trello.png)

## Build/Code Process

Here are a few significant pieces of code in the code process:
#### 1. Google Cloud Deployment 

I created an App Engine, a Project, a Service, an API Gateway, and created the final API endpoint. This involved configuration with the relevant and available region, passing around of the project id, app id, and then the api display name. This involved running a lot of commands through Google CLI. Testing the endpoints involved inspecting the log on Cloud Run. 

During the initial creation of the Service, I needed to add a container image. There were a bunch of sample images, but I needed to create one relevant for the technologies used in our project, so I decided to create one with guidance from Google Cloud. I also experimented with a Dockerfile before landing on creating a cloudbuild.yaml. I found it easier to find cohesive documentation for the best way to create the cloudbuild.yaml since I was already familiar with the writing style of Google Cloud documentation during the other steps of this process. 

Creation of the container image for deployment was quite interesting, here's the code:

```
steps:
# Node 
- name: node
  entrypoint: npm
  args: ['install']
- name: node
  entrypoint: npm
  args: ['run']
# Entrypoint, timeout and environment variables
- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: 'gcloud'
  timeout: 240s
  args: ['compute', 'instances', 
          'create-with-container', 'my-vm-name',
          '--container-image', 
          'us-central1-docker.pkg.dev/$blogging-platform-365219/my-docker-repo/myimage']
  env:
    - 'CLOUDSDK_COMPUTE_REGION=europe-west1'
    - 'CLOUDSDK_COMPUTE_ZONE=europe-west1-a'
    - 'DATABASE_URL="mongodb+srv://angelinewang02:Database02910@project3.zlhbvxc.mongodb.net/Project-3"'
    - 'PORT=3001'
    - 'API_KEY="testTESTtest"'
    - 'SECRET="SEI Rocks!"'
```
#### 2. Redirect to Instagram Authentication page

It was fun to figure out how to redirect a React route to the Instagram Authentication page. In the end, it worked well to create a route in App.js, and then attach that route to a page called InstagramAuth, which subsequently redirects with this code:

I needed to create a Facebook Developer Account, add an App to the account, add the platform to the account by adding the deployed Netlify link, and then looked at the documentation to create the correct Instagram Authentication link with the App ID, the redirect URL back to the deployed site, and add the relevant information the authorisation was for the sake of. 

I then chose to use a React route to redirect to the concatenated Instagram URL so that the page could be attached to a Link in the main app. 

```
function InstagramAuth() {

window.location.replace("https://api.instagram.com/oauth/authorize?client_id=6002320329798591&redirect_uri=https://celebrated-salmiakki-a8925d.netlify.app/instagram/photos/&scope=user_profile,user_media&response_type=code")

};
```
#### 3. Creating conditional front-end rendering of Author-only functionality

Using React to do conditional rendering was quite interesting. With the use of local storage, I grabbed the user's authentication token, which allowed me to call the TokenService function to grab the user data and hence the user's id, and check that with the id of the author referenced in the blog. If the ids match, then the extra functionality will be rendered. 

Viewers are also evaluated to see if they are a signed in user, and if they are signed in, they can also comment on the blog post. 

This was done by using React hooks including useState in order to set the status of the reader through isUser and isAuthor. React useEffect hook is also used in order to update these states by triggering the collection of the token from local storage.

Here are a few code snippets:

```
React.useEffect(() => {
    fetchBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])
```

```
const [isAuthor, setIsAuthor] = React.useState(!!TokenService.getUserFromToken())
const [isUser, setIsUser] = React.useState(!!blog)
```

```
{isUser ? (
  <div className="user-box">

    <form onSubmit={handleSubmit} className="message is-primary user-only">
      <label className="message-header"><strong>Add a comment</strong></label>
       <textarea id='comment-input' className="comment-input textarea is-small is-hover" name="comment" onChange={handleChange}></textarea>
       <button className="add button is-primary" type="Submit" value="Submit">Submit</button>
    </form>
   </div>
) : null}

{isAuthor ? (
  <div className="author-box">
    <div className='author-only message is-warning'>
      <p className='message-header'>Author-only Functions</p>
      <div className="author-functions">
      
        <div className="delete-function">
          <button className="delete" aria-label="delete" onClick={() => {deleteBlog(blog)}}></button>
          <p>Delete Blog</p>
        </div>

        <Link to={`/blog/edit/${blog._id}`}>
            <button className="edit button is-info">Edit Blog</button>
        </Link>
        
      </div>
    </div>
  </div>
) : null}
```

---

## Challenges

#### 1. Full-stack Deployment 

Google Cloud was quite a fun one to walk through all their documentation. First setting up a project, then installing the Google CLI to use in the command line, and then thinking I might not be able to use it becauee it needs Python, but it still worked? And then setting up a service, where I thought I was creating an API, when in reality all I did was connect it to my Github repo, but no endpoint was created. After this confusion, I realised that I needed to create an api through the command line by creating an api-gateway, and before that, I needed to create an OpenAPI. 

I also included continuous deployment in the Cloud Run Service creation, but this was kind of useless in the end because I realised I attached the entire repo instead of just the server one. This meant I had to deploy through the command line to get it running correctly. 

I also tested with the Google Cloud sample container, but ended up creating my own container to indicate the use of node and to help Google Cloud with the entrypoints. This was my first time working with .yaml files, before which, I also experimented with Dockerfiles. 

It was a great reward when I ran the APIs on Postman and they were working beautifully, and I could see the logs in Cloud Run. 

This whole ordeal meant much time scouring documentation, that on face seemed incomprehensible, but in reality, was perfectly logical! 

Netlify front-end deployment was nice to do again. Last time it was done, we did it was the instructors so I felt like I did not really understand the process myself. This time, I did it myself and found the struggle very necessary for the cementing of the processes and real understanding. I struggled with one small error for a very long time, which was setting the deploy settings. I realised that I needed to set the base directory to the client within the larger directory and also set the production directory to the client/build, which this specification was necessary for Netlify to serve the correct index.html file. I kept getting a broken link for a while beforehand. Furthermore, I learned that it was possible to get rid of some Netlify errors by using `// eslint-disable-next-line react-hooks/exhaustive-deps`. I also learned that Netlify created a container image for you so you don't need a Dockerfile, it also allows for smoother implementation of deploy settings, though at the cost of more detailed configuration that Google Cloud provided. 

#### 2. Reference Data

Learning how to use virtuals to create more efficient reference data was a big win for me. I worked through the anatomy of virtual fields while creating them, populating them, and ensuring they are passed through transformation to JSON data. Using virtuals seemed like a more memory efficient way to scale and include fields that aren't needed at all times, and removing circular dependencies. 

Here's a code snippet: 

##### Creating virtual field in User Schema:
```
userSchema.virtual("blogs", {
  ref: "Blog",
  localField: "_id",
  foreignField: "author",
});

```

##### Grabbing blogs with virtual field on user:
```
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, res) {
    delete res.password;
    return res;
  },
});
   
```

#### 3. Image Uploading and Display

This was a huge struggle for a long time, but in the end, I figured out how to upload photos from React, store them in their own schema as buffer data and encoded in base64, and referenced in the relevant blog. This meant that photos could be saved in a privacy sensitive and memory efficient way. I also used mutler and file-system and bodyParser. 

Here's a few code snippets:

##### Image upload:
```
export default function ImageUpload () {
    return (
        <form action="/images" enctype="multipart/form-data" method="POST"> 
            <input type="file" name="Image" accept="image/*" />
            <input type="submit" value="Upload Photo"/>
        </form>
    )
}
```
##### Storing images:
```
var imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});
```

##### Prerequisite additions to App.js:
```
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
```

##### Encoding image while calling the API:
```
app.post("/images", upload.single("Image"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
  };

  Image.collection.insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

app.post("/images", upload.single("Image"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
  };

  Image.collection.insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});
```

##### Decoding for displaying image:

```
blog.image ? (<img src={`data:image/${blog.image.contentType};base64, ${blog.image.image.toString('base64')}`} alt={blog.title}/>) : null}
```

---

## Wins

#### 1. Detail Page CSS 

I used BulmaCSS and looked through their documentation on buttons, messages, and different elements, and ended up with a fun color scheme with some nice fonts and shapes. Here is some of the BulmaCSS classnames I've included, along with additional flexbox CSS I added:

I particularly liked the CSS Bulma created with tags

##### BulmaCSS:
```
<div className="message-body">
                        <p>{blog.content}</p>
                        <p><strong>Tags:</strong></p>
                        {blog.tags ? ( <ul className="tags"><div className="tags-container"><div className="tags-box">{blog.tags[0].tags.map((tag) => (<li className="tag" id="tag" key={tag}>{tag}</li>))}</div></div></ul>) : null}
                        <p><strong>Comments:</strong></p>
                        {blog.comments ? ( <ul className="comments">{blog.comments[0].comments.map((comment) => (<li className="message is-dark comment" key={comment}>{comment}</li>))} </ul>) : null}
```

##### Flexbox CSS:
```
.detail-box {
    height: 100vh;
    margin: 0;
}

.message-body {
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user-only {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2vh;
    align-items: center;
}
```

#### 2. Populating User Blogs through Token

Here I used state to store the user information and then grab their blogs through the populated virtual field and then attaching each page to their relevent detail page through their blog id. This was a list of the users' blogs which renders on refresh. It was nice to see that the virtual field population worked during this process of using the data. It was also good to see that the user was grabbed correctly by the TokenService. 

```
const [user, setUser] = React.useState(null)

    console.log(TokenService.getUserFromToken().blogs)
    const id = useParams().id
    let fetchUser = () => {
        console.log("Reached fetchUser function!")
        console.log(id)
        let res = TokenService.getUserFromToken()

        console.log(res);
        setUser(res)
    }

    React.useEffect(() => {
        fetchUser()
     }, [])

    return (
        user ? ( 
            user.blogs ? 
            (<ul>{user.blogs.map(((blog) =>(<Link to={`/detail/${blog._id}`}><li className="message is-link" key={blog._id}>{blog.title}</li></Link>)))}</ul>
            )
        :null ): null
    )
```

#### 3. Managing Merge Conflicts 

This project was the first time I had to deal with a large amount of team synchronisation. And it was fun to work with the git necessary and also managing and resolving conflicts through VSCode. I'm happy with my level of familiarity with the VSCode interface for resolving merge conflicts now. Also, I had more time to familiarise myself with the process of fetching from a remote upstream and rebasing. I got good at using the terminal commands to direct the process of rebasing the fetched code with the local code through commands like aborting, continuing, etc. I had long struggled with the way this process of displayed on Git Bash. 

Furthermore. I got good at using terminal commands through the merge process, being able to identify clearly the files that are of interest, resolving them in VSCode, staging the files, committing them, and then completing the merge process. 

I also found it interesting to work with renaming directories, and found that it was easier to create a new directory and add the contents of an old one into the new one and then delete the old one. I worked through some issues with deleting directories. It was also interesting to see how the .gitignore interacted with the files, where it was necessary to add a file or folder into .gitignore, and the needing to do npm install each time I pulled new code from team members. 

I was also fun to work with branches. I found that I was able to more fully understand the purpose of branches and when to use them and where they are most relevant, especially the importance of separating production and development branches, so that the branches being deployed are clean and clear. 

---

## Key Learnings/Takeaways

#### 1. Get data from any external APIs before building infrastructure around expected data

There are often other verification processes that need to be done before using API data, like for the Instagram API to get Profiles and Media involved creation of a screencast explaining how the app will be using the data and why it is necessary and enhances the experience of the user. 

#### 2. Patience is key, and no problem is unsolveable

Having clear priorities is very important, and knowing how much time you have to complete those priorities. Having the right priorities will allow for enough time to complete those sections of the project well and with through understanding and retention. Struggling is such an important part of the learning process and dependent on external help is dangerous, although knowing when to ask for help is also very important.

#### 3. It is not easily possible to change the deployed repo of a Cloud Run API after Service creation

I ended up needing to deploy the backend and frontend from different branches since when I set up the Cloud Run API, I was on a different branch. Keeping production branches consistent and separate from development branches is important. Clearly setting out the use of each branch at the beginning will prevent confusion.

#### 4. Merge conflicts are a pain 

Commiting frequently is important so that commits can be isolated and inspected. Resolving merge conflicts and keeping consistency throughout the code between team members takes a lot of time. Setting out clear teamwork guidelines and processes in the beginning saves a lot of pain. Dealing with git can get messy really quickly and involve a huge amount of time, sometimes more than coding itself.

#### 5. Virtuals can be used to prevent circular referencing 

Since the blogs referenced their authors and the authors also referenced their blogs, it was interesting thinking about the most efficient way to structure the schema. In the end, I found it best to attach the blogs to authors as `virtuals`, but this also meant creating the `virtuals` field in the file for the User model. It also involved ensuring that virtuals were set to true when grabbing the data and set to JSON. 

I struggled with this for quite a while because I originally thought that setting virtuals as true within the User schema would work, but after much playing around, I realised that it only worked when I added it to the function when setting the User data to JSON since there was this separate function already existing to hash the User password data and it was interfering. 

Overall, using virtuals was quite straightforward and seems like a good idea for the future where there is a lot of reference data. 

#### 6. Internet Guidance can be outdated

Although it was not used in the final codebase, I experimented with encoding and decoding base64 data for images. It was fun to figure out how much of the information on `atob` was outdated and deprecated, and it was fun to piece together all the up-to-date guidance on uploading data into an image schema as buffer data and encoding it in base64 beforehand. It was also fun populating the images from their own folder and decoding the data before displaying them. Using `mutler` was one of the new things I learned as well. 

---

## Bugs

There are a few bugs that still occur within the app due to incomplete experimentation with new functionality:

1. Sorting 

The tags are being rendered from the blogs, but they are not corresponding with the rendered blogs

2. Blog Creation 

The backend on blog creation and editing is working, but there has been some disconnect between the React form data and the POST API call, resulting in a buggy creation process. Although this may also have to do with another fellow team member focusing on this part and me focusing on the backend and not enough time on live share coding to figure it out. 

3. Commenting 

The backend on commenting works, but this is the same issue with the blog creation where there is a disconnect with the UI. I took out the embedded schema for comments and replaced it with an array of strings to try and fix this, but the issue persisted. 

4. Blog Deletion

This issue is funny one. I think I resolved it though, but can't be sure. There was a discrepency with the use of TokenService functions where it was being referenced indirectly as a property of the imported TokenService when it could be referenced directly through the individual import of the deleteBlog function. 

This is the code:
```
async function deleteBlog(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
}
```

```
router
  .route("/:id")
  .get(blogControllers.getABlog)
  .patch(checkAuth, blogControllers.updatedBlog)
  .delete(checkAuth, blogControllers.deleteBlog);

```

```
export const removeABlog = async (blog) => {
  try {
    console.log("blog was deleted");
    const token = tokenService();
    let res = await fetch(BASE_URL + `/api/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
```

---

## Future Improvements

Some things that may be good to add in the future:

1. Instagram Implementation 
If there was the time, it would be nice to go through the Instagram approval process to use their Profile and Media grabbing APIs on the deployed site. Their APIs are only allowed to be used in a testing/development environment without such approval. Thus, I could only grab my own Instagram media, but quite interesting how extensive the data we can grab is, and how easy it is. Silly sludge preventing easier access for deployed site though...

It would be nice to allow users to directly import their existing Instagram posts, and use those photos as cover images for their blogs so that it is easier to find their own content and faster access. This allows users to expand upon their sentiments expressed on Instagram as well and would be nice to have as an extension to the site.

2. Engagement Log

It would be nice for users to see a log of their engagement history so they can view the posts they've commented on in the past. It would also be nice for users to have a log of comments and engagements of others on their own posts much like the Instagram notifications tab. 

3. Search Function 

It would be sick to allow users to search using keywords and rank the blogposts existing depending on relevance based off if the word exists in its Title, description, and content, in that hierarchical order. This would make finding interesting and relevant content much easier.  
