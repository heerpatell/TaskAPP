import React from "react";
import { useSelector } from "react-redux";

const ShowData = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <table className="table table-striped table-sm">
      <thead className="table-dark">
        <tr>
          <th>Id</th>
          <th>User Id</th>
          <th>Title</th>
          <th>Tags</th>
          <th>Likes / Dislikes</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.userId}</td>
            <td>{post.title}</td>
            <td>{Array.isArray(post.tags) ? post.tags.join(", ") : "No Tags"}</td>
            <td>
              Likes: {post.reactions?.likes || 0} <br />
              Dislikes: {post.reactions?.dislikes || 0}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowData;