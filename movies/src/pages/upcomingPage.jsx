import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const UpcomingPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming", { page }],
    queryFn: getUpcomingMovies,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      page={page}
      totalPages={data.total_pages}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default UpcomingPage;