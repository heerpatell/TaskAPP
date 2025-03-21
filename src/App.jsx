import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "./features/postSlice";
import PostForm from "./components/PostForm";
import ShowData from "./components/ShowData";
import Pagination from "./components/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [dispatch, currentPage]);

  const posts = useSelector((state) => state.posts.posts);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxId = Math.max(...posts.map((post) => post.id));
    const newId = maxId + 1;

    const minUserId = Math.min(...posts.map((post) => post.userId));
    const newUserId = Math.max(minUserId - 1, 1);

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

    await dispatch(addPost(newPost));

    setTitle("");
    setTags("");
    setLikes("");
    setDislikes("");
  };

  return (
    <div className="container mt-4 mb-4">
      <h1 className="text-center mb-4">Posts</h1>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && <p className="text-center text-danger">{error}</p>}

      <PostForm
        title={title}
        tags={tags}
        likes={likes}
        dislikes={dislikes}
        setTitle={setTitle}
        setTags={setTags}
        setLikes={setLikes}
        setDislikes={setDislikes}
        handleSubmit={handleSubmit}
      />

      <ShowData />

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;