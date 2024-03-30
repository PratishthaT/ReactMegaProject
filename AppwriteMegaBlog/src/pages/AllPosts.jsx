import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when component mounts
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setLoading(false); // Set loading to false when posts are fetched
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="w-full py-8 bg-white">
      <Container>
        <div className="grid grid-cols-1 gap-4 md:flex md:flex-wrap md:gap-0">
          {/* Conditional rendering based on loading state */}
          {loading // Show skeleton loading if loading is true
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  role="status"
                  key={index}
                  className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 m-8"
                >
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))
            : // Render actual post cards once loading is complete
              posts.map(
                (post) =>
                  (post.status !== "inactive" ||
                    post.userId === userData?.$id) && (
                    <div key={post.$id} className="p-1 w-full md:p-2 md:w-1/4">
                      <PostCard {...post} />
                    </div>
                  )
              )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
