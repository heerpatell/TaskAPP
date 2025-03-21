# TaskAPP

## Table of Contents  
- [Problem Statement](#problem-statement)  
- [Technology Stack](#technology-stack)  
- [Getting Started](#getting-started)  
- [API Used](#api-used)
- [Implementing Backend Pagination](#implementing-backend-pagination)
- [Fetching data](#fetching-data)  
- [Adding a Post](#adding-a-post)

## Problem Statement

- **Fetch posts** from [DummyJSON API](https://dummyjson.com/posts) and store them in Redux.
- **Display posts in a table** with at least three columns.
- **Implement pagination** (10 posts per page) with **Previous/Next** buttons.
- **Create a form to add new posts** and send a `POST` request to the API.
- **Update Redux state after adding a post** without requiring a page refresh.
- **Style the app** using **Bootstrap and CSS**.

## Technology Stack

| **Technology**      | **Purpose**                          |
|---------------------|--------------------------------------|
| **React.js + Vite** | Frontend framework & fast project setup |
| **Redux Toolkit**   | Global state management             |
| **Axios**          | API handling                        |
| **Bootstrap**      | UI styling                          |
| **DummyJSON API**   | Backend for fetching & adding posts |

## Getting Started

This project was built using **React with Vite**

### **1️. Clone the Repository**
```sh
git clone https://github.com/heerpatell/TaskAPP.git
cd TaskApp
```

### **2️. Install Dependencies**
```sh
npm install
```
### **3. Start the Development Server**
```sh
npm run dev
```

This will start the app at http://localhost:5173/ (Vite's default port).

## API Used

Used **DummyJSON API** for handling posts.

| **API Action**   | **Method** | **Endpoint**                        |
|------------------|-----------|------------------------------------|
| **Fetch Posts**  | `GET`      | [`https://dummyjson.com/posts`](https://dummyjson.com/posts) |
| **Add Post**     | `POST`     | [`https://dummyjson.com/posts/add`](https://dummyjson.com/posts/add) |


## Implementing Backend Pagination  
Instead of fetching all posts at once (like frontend pagination), backend pagination fetches only the required posts per page from the API.

The API request includes limit and skip parameters:

```
fetch(`https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`);
```
```limit=10``` → Fetch 10 posts per page.

```skip=(page - 1) * 10```→ Skips previous pages.


## Fetching data

### **1️. Redux Store is set up (store.js)**


The postSlice reducer is added to the Redux store:

```sh
reducer: { posts: postSlice }
```
Now, all post-related state is available in ```state.posts```.


### **️2. Initial State in Redux (postSlice.js)**

The state starts as:
```sh
{ posts: [], status: 'idle', currentPage: 1, totalPosts: 0 }
```

```posts``` is an empty array until data is fetched.

### **3. Fetching Paginated Posts from API**

When the app loads, useEffect() dispatches the fetchPosts() action:

```sh
useEffect(() => {
  dispatch(fetchPosts(currentPage));
}, [dispatch, currentPage]);
```

It will run when the ```currentPage``` changes.

This triggers fetchPosts, and tells Redux to fetch posts from the API.

### **4. Redux Updates the State (extraReducers)**

When the API successfully responds, ```fetchPosts.fulfilled``` updates the Redux state:

```
builder.addCase(fetchPosts.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.posts = action.payload.posts;
  state.totalPosts = action.payload.total; // Store total count for pagination
});
```

### **5. Pagination Logic in UI**

```
{posts.map((post) => (
  <PostComponent key={post.id} post={post} />
))}
```
Only 10 posts per page are shown dynamically.

### **6. User Clicks "Next" → Page Updates**
When the user clicks Next, currentPage increases, and React automatically updates, and re-fetches data for the new page.


### Adding a Post

### **1. User Fills the Form & Clicks Submit**
The user enters post details (title, tags, likes, dislikes) and submits the form, ```handleSubmit()``` is triggered in the form.

### **2. Generating a Unique userId and Id**

The API does not provide unique user IDs, and at the time of making post request userId is required (checked it through PostMan), so handling it manually. 

Also, got to know from postman that, on every post request, it adds id as 252, so assigning it manually. 

```
const maxId = Math.max(...posts.map((post) => post.id)) ;
const newId = maxId + 1; 

const minUserId = Math.min(...posts.map((post) => post.userId));
const newUserId = Math.max(minUserId - 1, 1); 
```

### **3. Creating a New Post Object**
Before sending it to Redux, I prepare the post data:
```
const newPost = {
    id: newId,
    title: title.trim() || "Untitled",
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : ["No Tags"],
    reactions: {
        likes: Number(likes) || 0,
        dislikes: Number(dislikes) || 0,
    },
    userId: newUserId,
};

```
### **4. Dispatching the Action to Redux**
Instead of making an API call directly in the component, I dispatch the action. This sends the post to Redux Toolkit, which then handles the API request.

```
dispatch(addPost(newPost));
```

### **5. Form Inputs Are Cleared**
After submitting, the input fields are reset so the user can add another post:

```
setTitle("");
setTags("");
setLikes("");
setDislikes("");
```


