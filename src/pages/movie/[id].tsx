"use client";
import { getFilmById } from "@/api";
import { FC, useContext, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { useComments } from "../../hooks/useComments";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useRouter } from "next/router";
import res from "../../../public/static/res.png";
import download from "../../../public/static/download.png";
import Image from "next/image";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;
  const [showDownload, setShowDownlad] = useState(false);
  const { comments, updateComments, deleteComment } = useComments(id);
  const { currentTheme } = useContext(Theme);
  const router = useRouter();

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSendComment = () => {
    updateComments(id, comment);
    setComment({ name: "", text: "" });
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (

    <div
      className={`py-10 ${currentTheme == "black" ? "Ob1127" : "A4C8F2"} bg`}>
      <Header arrowBack={true} />
      {!loading ? (
        <section className="min-h-screen flex items-center flex-col pb-20 px-4 relative">
          <Image
            src={movieDetails?.background_image}
            width={900}
            height={500}
            alt="bg"
            style={{ maxHeight: "730px", height: "730px", objectFit: "cover" }}
            className="absolute  opacity-60 w-full brightness-50 p-10"
          />
          <div className="container py-20 flex flex-col lg:flex-row items-center">
            <div>
              <div
                style={{
                  minWidth: "300px",
                  width: "100%",
                  maxWidth: "400px",
                  minHeight: "500px",
                  position: "relative",
                }}
                className="mb-5">
                <Image
                  layout="fill"
                  loading="lazy"
                  src={movieDetails?.large_cover_image || ""}
                  alt={movieDetails?.title || ""}
                />
              </div>
              <div className="flex justify-between mb-8">
                <button
                  onClick={() => {
                    router.push(movieDetails?.url || "");
                  }}
                  className="py-6 px-6 lex items-center justify-center border text-white bg-rose-300 font-extrabold cursor-pointer rounded-md hover:bg-rose-600 z-index-5">
                  Watch now
                </button>
                <button
                  onClick={() => {
                    setShowDownlad(!showDownload);
                  }}
                  className="py-4 px-6 flex-items-center justify-center border bg-rose-300 font-extrabold cursor-pointer text-white rounded-md hover:bg-rose-600 z-index-5">
                  Download
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full lg:pl-20 z-index-5 self-stretch mt-2">
              <p className="text-white text-3xl mb-2">{movieDetails?.title}</p>
              {movieDetails?.description_full && (
                <p className="text-gray-200 text-2xl mb-2">
                  {movieDetails?.description_full}
                </p>
              )}
              <div className="flex flex-wrap flex-row justify-between min-w-fit">
                <div className="min-w-min max-w-full">
                  {
                    movieDetails?.genres ? (
                      <div className="text-white mb-3 text-xl flex flex-wrap items-baseline">
                        <p className="w-1/3 pe-14">
                          Genres:</p>
                        {
                          movieDetails?.genres?.map((genre, index) => (
                            <b
                              className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                              key={index}>
                              {genre}
                            </b>
                          ))
                        }
                      </div>
                    ) : ""
                  }
                  {
                    movieDetails?.rating ? (
                      <div className="text-white mb-3 text-xl flex flex-wrap items-baseline">
                        <p className="w-1/3 pe-14"> Rating: </p>
                        <b
                          className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                          key={movieDetails.rating}>
                          {movieDetails.rating}
                        </b>
                      </div>
                    ) : ""
                  }
                  {
                    movieDetails?.like_count ? (
                      <div className="text-white mb-3 text-xl flex flex-wrap items-baseline">
                        <p className="w-1/3 pe-14"> Likes: </p>
                        <b
                          className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                          key={movieDetails.like_count}>
                          {movieDetails.like_count}
                        </b>
                      </div>
                    ) : ""
                  }
                  {
                    movieDetails?.language ? (
                      <div className="text-white mb-3 text-xl flex flex-wrap items-baseline">
                        <p className="w-1/3 pe-14"> Language: </p>
                        <b
                          className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                          key={movieDetails.language}>
                          {movieDetails.language}
                        </b>
                      </div>
                    ) : ""
                  }
                  {
                    movieDetails?.runtime ? (
                      <div className="text-white mb-3 text-xl flex flex-wrap items-baseline">
                        <p className="w-1/3 pe-14"> Runtime: </p>
                        <b
                          className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                          key={movieDetails.runtime}>
                          {movieDetails.runtime}
                        </b>
                      </div>
                    ) : ""
                  }

                </div>
                <div className="grid-flow-row right-0">
                  {showDownload &&
                    movieDetails?.torrents?.map((torrent, index) => (
                      <a
                        href={torrent.url}
                        key={index}
                        className="flex border-2 bg-rose-300 text-black p-3 mb-2 rounded-md items-center border-transparent hover:bg-rose-500 w-56 h-14 mr-5">
                        <Image
                          src={download}
                          alt="Download"
                          className="mr-2 w-12 invert"
                        />
                        <span className="font-extrabold text-white text-center">
                          {torrent.quality}/{torrent.size}<br />{torrent.type}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="container flex flex-col">
            <p className="text-3xl text-rose-500 mb-5">Comments</p>
            <p className="text-white mb-2">Name</p>
            <input
              name="name"
              onChange={onCommentChange}
              value={comment.name}
              type="text"
              className="w-80 bg-transparent border-2 p-2 mb-2 rounded-md text-white"
            />
            <p className="text-white mb-2">Comment</p>
            <textarea
              value={comment.text}
              onChange={onCommentChange}
              name="text"
              className="w-full bg-transparent border-2 p-2 rounded-md text-white"
            />
            <button
              onClick={onSendComment}
              className="ml-auto text-white border-2 rounded-md p-3 mt-3 hover:bg-black">
              Send
            </button>
            <div className="flex flex-col mt-10">
              {comments.length != 0 ?
                comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border bg-gray-800 w-full p-5 text-white rounded-md mb-3">
                    <p className="text-xl extrabold mb-2">{comment.name}</p>
                    <p className="text-gray-500">{comment.text}</p>
                    <button
                      onClick={() => deleteComment(comment)}
                      className="ml-auto font-extrabold hover:text-rose-200">
                      DELETE
                    </button>
                  </div>
                )) :
                <div className="flex flex-col border bg-rose-300 w-full p-5 text-white rounded-md mb-3 text-2xl">
                  <span>
                    Комментариев пока нет! :( <br></br>
                    Оставьте его самым первым!
                  </span>
                </div>}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
};

export default Details;
