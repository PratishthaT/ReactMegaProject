import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import blogimage from "../assets/blogimage.webp";
import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-white">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {!authStatus ? "Login to read posts" : ""}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full ">
      <main className=" bg-white relative overflow-hidden ">
        <div className="bg-white  flex relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl sm:font-black flex flex-col leading-none dark:text-white text-gray-800">
                Express Your
                <span className="text-5xl sm:text-7xl mb-3">IDEAS</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                Welcome to KnowledgeExpress, a vibrant digital space where ideas
                come to life and conversations thrive. Dive into a world of
                insightful articles, inspiring stories curated just for you.
                Whether you're seeking inspiration, knowledge, or simply a
                moment of reflection, our diverse range of topics spanning from
                lifestyle and culture to technology and beyond ensures there's
                something for everyone. Join our community of passionate readers
                and writers as we explore the endless possibilities of the
                written word. Come, embark on a journey of discovery with us at
                KnowledgeExpress.
              </p>
              <div className="flex mt-8">
                <Link
                  to="/add-post"
                  className="uppercase py-2 px-4 rounded-lg bg-blue-500 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative mt-0">
              <img
                src={blogimage}
                className="pl-40 hidden lg:block"
                height={900}
                width={800}
              />
            </div>
          </div>
        </div>
        <Container>
          <div className="grid grid-cols-1 md:flex md:flex-wrap">
            <div className="text-7xl p-2">Recent blogs on our platform :</div>
            {posts.map((post) => (
              <div key={post.$id} className="p-1 w-full md:p-2 md:w-1/4 ">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Home;
