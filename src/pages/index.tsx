import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentTheme } = useContext(Theme);

  const data = useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(String(currentPage));
      setFilms(response.movies);
      setTotal(Math.floor(response.movie_count / response.limit));
      setLoading(false);
    };
    fetch();
  }, [currentPage]);

  return (
    <div
      className={`pt-20 ${currentTheme == "black" ? "Ob1127" : "A4C8F2"} bg`}>
      <Header arrowBack={false} />
      {!loading ? (
        <main className="min-h-screen flex justify-center">
          <section className="flex flex-col items-center container py-20">
            <div className="flex items-center-center w-full mb-10 flex-col">
              <h1
                className={`text-3xl  mx-auto justify-center ${
                  currentTheme == "black" ? "text-rose-300" : "CE007C"
                } mb-2 font-extrabold`}>
                FILMS
              </h1>
              <div className="flex justify-center items-center">
                <p className="text-white font-extrabold">
                  Show films only with description
                  <input
                    type="checkbox"
                    className="ml-4 scale-150"
                    defaultChecked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                  />
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mb-20">
              {films?.map((item: MovieList, index) => (
                <Card
                  key={index}
                  id={item.id}
                  filter={checked}
                  rating={String(item.rating)}
                  genre={item.genres[0]}
                  description={item.description_full || item.summary}
                  title={item.title}
                  year={item.year}
                  medium_cover_image={item.medium_cover_image}
                />
              ))}
            </div>
            <ResponsivePagination
              maxWidth={350}
              pageLinkClassName="bg-white p-3 text-black border-white border-1"
              current={currentPage}
              total={total}
              onPageChange={setCurrentPage}
            />
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="300"
            width="300"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
}
