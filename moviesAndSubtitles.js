/*
  Given a list of movies and a list of subtitles,
  return a list of movies with an additional 'availableSubtitles' property
  that should list all of those subtitles that belong to that movie
  (each subtitle has a 'movieId' property that we will use to match with the movie).

  Additionally, we need to encode the subtitle file, as the encoding depends on the language
  of the subtitle.

  Params:
    - movies: Array of Movies
    - subtitles: Array of Subtitles

  Returns:
    - Array of Movies (each Movie should include in it's props an availableSubtitles array of subtitles)
*/
const encodings = {
  'RU': 'KOI-7',
  'CH': 'GBK',
  'HW': 'Windows-1251'
}
function matchMoviesWithSubtitles(movies, subtitles) {
  if (movies) {
    return movies.map(movie => {
      let availableSubtitles = [];
      if (subtitles) {
        subtitles.forEach(subtitle => {
          subtitle.encodedFile = encodeFile(subtitle.file, 'UTF-8');
          if (encodings[subtitle.language]) {
            subtitle.encodedFile = encodeFile(subtitle.file, encodings[subtitle.language]);
          }
          if (movie.id === subtitle.movieId) {
            availableSubtitles.push(subtitle);
          }
        });
      }
      movie.availableSubtitles = availableSubtitles;
      return movie
    });
  }
}


/*
  Dummy function
*/
function encodeFile(file, encoding) {
  return file + encoding;
}