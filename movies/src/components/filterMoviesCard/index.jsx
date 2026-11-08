import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { getGenres } from "../../api/tmdb-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";

const formControl = {
  margin: 1,
  minWidth: "90%",
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  return (
    <Card elevation={4} sx={{ borderRadius: 3, padding: 1 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
          <FilterListIcon color="primary" /> Filter & Sort
        </Typography>

        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search movie title"
          type="search"
          variant="outlined"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            label="Genre"
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortFilter || "title_asc"}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="title_asc">Title (A-Z)</MenuItem>
            <MenuItem value="title_desc">Title (Z-A)</MenuItem>
            <MenuItem value="rating_desc">Rating (High to Low)</MenuItem>
            <MenuItem value="rating_asc">Rating (Low to High)</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}