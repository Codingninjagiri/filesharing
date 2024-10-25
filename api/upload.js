import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const file = req.body.file;
    if (!file) return res.status(400).json({ success: false, error: "No file provided" });

    // Generate unique fileID and path
    const fileID = randomUUID();
    const filePath = `/tmp/${fileID}-${file.name}`;

    // Save the file temporarily (consider using cloud storage for persistence)
    fs.writeFileSync(filePath, file);

    res.status(200).json({ success: true, fileID });
  } else {
    res.status(405).json({ success: false, error: "Only POST requests are allowed" });
  }
}
