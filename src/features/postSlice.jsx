import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "/fetchPosts",
  async (page = 1) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    const data = await response.json();

    return {
      posts: data.posts,
      total: data.total,
    };
  }
);

export const addPost = createAsyncThunk(
  "/addPost",
  async (newPost) => {
    await new Promise((res) => setTimeout(res, 500));

    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();

    const finalPost = {
      ...data,
      id: newPost.id,
    };

    return finalPost;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    totalPosts: 0,
    status: "idle",
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong while fetching posts";
      })    
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
  },
});

export default postSlice.reducer;
