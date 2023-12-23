import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
  genre: string;
  filter: boolean;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
  description,
  rating,
  filter,
  genre,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const toggleMouseOver = () => setMouseOver((prev) => !prev);

  const router = useRouter();
  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  if (!description && filter) {
    return null;
  }

  return (
    <div
      onMouseOver={toggleMouseOver}
      onMouseOut={toggleMouseOver}
      className=" bg-white border border-black basis-80 object-cover rounded ml-5 mb-6 cursor-pointer relative flex flex-col"
      onClick={!mouseOver ? onFilmClick : () => {}}>
      {mouseOver && (
        <div
          className="absolute flex items-center justify-center flex-col text-center  bg-rose-200 p-5"
          style={{ width: "317px", height: "477px" }}>
          <h1 className="text-white text-3xl text-extrabold mb-3">{title}</h1>
          <p className="text-lg">Rating: {rating}</p>
          <button
            onClick={onFilmClick}
            className="p-3 border-2 mt-5 border-black px-10 rounded-md border-white hover:bg-white ">
            Details
          </button>
        </div>
      )}
      <Image
        width={320}
        height={600}
        src={medium_cover_image}
        alt={title}
      />

      <div className="flex flex-col p-5 max-w-xs h-full">
        <span className="text-extrabold text-xl text-rose-400 title">
          {title} {year}
        </span>
        <span className="description">{description}</span>
        <span className="mt-auto font-extrabold">{genre}</span>
      </div>
    </div>
  );
};
