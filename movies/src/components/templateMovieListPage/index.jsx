import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("title_asc");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  displayedMovies.sort((a, b) => {
    if (sortFilter === "title_asc") return a.title.localeCompare(b.title);
    if (sortFilter === "title_desc") return b.title.localeCompare(a.title);
    if (sortFilter === "rating_desc") return b.vote_average - a.vote_average;
    if (sortFilter === "rating_asc") return a.vote_average - b.vote_average;
    return 0;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
  };

  return (
    <Box sx={{ padding: 2, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Header title={title} />
        </Grid>
        <Grid container sx={{ flex: "1 1 500px" }}>
          <Grid
            key="find"
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            sx={{ padding: "10px" }}
          >
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
              sortFilter={sortFilter}
            />
          </Grid>
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>

      {/* Pagination Controls */}
      {totalPages && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, marginBottom: 4 }}>
          <Pagination
            count={totalPages > 500 ? 500 : totalPages} // TMDB API max page limit is 500
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}

export default MovieListPageTemplate;