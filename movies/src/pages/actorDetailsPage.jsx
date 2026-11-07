import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: person, error: err1, isPending: loading1, isError: isErr1 } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
  });

  const { data: credits, error: err2, isPending: loading2, isError: isErr2 } = useQuery({
    queryKey: ["personCredits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (loading1 || loading2) return <Spinner />;
  if (isErr1 || isErr2) return <Typography variant="h6">{err1?.message || err2?.message}</Typography>;

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={person.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              {person.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Biography:</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              {person.biography || "No biography available."}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Born:</strong> {person.birthday || "N/A"} {person.place_of_birth ? `in ${person.place_of_birth}` : ""}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Known For
      </Typography>

      <Grid container spacing={2}>
        {credits?.cast?.slice(0, 12).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    Role: {movie.character || "N/A"}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActorDetailsPage;