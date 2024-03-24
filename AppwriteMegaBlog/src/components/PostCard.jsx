import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, userId }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-200 hover:transition-colors  hover:bg-gray-300 hover:text-gray-700  rounded-xl p-3">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <hr />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
