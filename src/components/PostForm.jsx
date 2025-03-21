import React from "react";

const PostForm = ({
  title,
  tags,
  likes,
  dislikes,
  setTitle,
  setTags,
  setLikes,
  setDislikes,
  handleSubmit,
}) => {
  return (
    <div className="card mb-5">
      <div className="card-body">
        <h5 className="card-title mb-3">Add a New Post</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Likes</label>
              <input
                type="number"
                className="form-control"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                min={0}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Dislikes</label>
              <input
                type="number"
                className="form-control"
                value={dislikes}
                onChange={(e) => setDislikes(e.target.value)}
                min={0}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;