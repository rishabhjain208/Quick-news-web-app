// import React from "react";

// const Main = ({ articles }) => {
//   return (
//     <main className="flex flex-col justify-center md:flex-row md:flex-wrap gap-6 p-4">
//       {articles.map((article, index) => (
//         <div
//           key={index}
//           className="card max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto md:mx-0"
//         >
//           {article.urlToImage && (
//             <img
//               src={article.urlToImage}
//               alt="Article"
//               className="w-full h-52 object-cover"
//             />
//           )}
//           <div className="p-4">
//             <a href={article.url} target="_blank" rel="noopener noreferrer">
//               <h4 className="text-xl font-bold mb-2">{article.title}</h4>
//               <div className="text-sm text-gray-500 flex items-center mb-2">
//                 <p>{article.source.name}</p>
//                 <span className="mx-2">•</span>
//                 <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
//               </div>
//               <p className="line-clamp-5 text-gray-700">
//                 {article.description}
//               </p>
//             </a>
//           </div>
//         </div>
//       ))}
//     </main>
//   );
// };

// export default Main;
import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";

const Main = ({ articles }) => {
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(false);
  const articlesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = articlesRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more items when reaching near the bottom
        if (visible < articles.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisible((prevVisible) => prevVisible + 10);
            setLoading(false);
          }, 1000); // loading delay
        }
      }
    };

    const refCurrent = articlesRef.current;
    refCurrent.addEventListener("scroll", handleScroll);
    return () => refCurrent.removeEventListener("scroll", handleScroll);
  }, [visible, articles, loading]);

  return (
    <div
      ref={articlesRef}
      className="flex flex-col justify-center md:flex-row md:flex-wrap gap-6 p-4 overflow-y-auto"
      style={{ height: "calc(100vh - 100px)" }} // Adjust height as needed
    >
      {articles.slice(0, visible).map((article, index) => (
        <div
          key={index}
          className="card max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto md:mx-0"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="Article"
              className="w-full h-52 object-cover"
            />
          )}
          <div className="p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h4 className="text-xl font-bold mb-2">{article.title}</h4>
              <div className="text-sm text-gray-500 flex items-center mb-2">
                <p>{article.source.name}</p>
                <span className="mx-2">•</span>
                <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
              <p className="line-clamp-5 text-gray-700">
                {article.description}
              </p>
            </a>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-center items-center w-full mt-4">
          <CircularProgress />
          <p className="ml-2">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Main;
