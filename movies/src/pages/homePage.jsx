import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", { page }],
    queryFn: getMovies,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      page={page}
      totalPages={data.total_pages}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default HomePage;