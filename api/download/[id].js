import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join("/tmp", `${id}`);

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(filePath)}"`);
    res.sendFile(filePath);
  } else {
    res.status(404).json({ success: false, error: "File not found" });
  }
}
