import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwRokixLEBUpX0ZzCv7FqbLmibWGwEJeP6TKLJ4lk5HanC87U1fV-qqT4BWT6hXzqT4/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error forwarding to Google Apps Script" });
  }
}
