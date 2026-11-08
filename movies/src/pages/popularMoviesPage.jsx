import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular", { page }],
    queryFn: getPopularMovies,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      page={page}
      totalPages={data.total_pages}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default PopularMoviesPage;