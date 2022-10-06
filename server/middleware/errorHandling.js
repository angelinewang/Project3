export default function errorHandling(err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: "Something went wrong." });
}
