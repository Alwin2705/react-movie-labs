import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistMoviesPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = playlistMovieQueries.find((m) => m.isPending === true);
  if (isPending) return <Spinner />;

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Must Watch Playlist"
      movies={movies}
      action={(movie) => <WriteReview movie={movie} />}
    />
  );
};

export default PlaylistMoviesPage;