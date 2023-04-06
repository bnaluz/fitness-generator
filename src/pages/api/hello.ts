// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
export default function handler(req, res) {
  res.status(200).json({ text: "Hello World" });
}
