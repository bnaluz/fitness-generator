import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const searchExercise: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aaf2ce0701mshb9b22c6efd21817p1aca72jsnffabfaece05f",
      "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com",
    },
  };

  console.log(req.headers);

  await fetch(
    `https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=${req.headers.muscle}`,
    options
  )
    .then((response) => response.json())
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(404).json({ error: err }));
};

export default searchExercise;
