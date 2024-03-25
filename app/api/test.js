export default function handler(req, res) {
  console.log(req, res);
  res.status(200).json({ message: "Hello from Next.js!" });
}
