import { Database } from "@service-gui/core";
import { NextApiHandler } from "next";
import { saveDatabase } from "../../utils/saveDatabase";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    res.statusCode = 200;

    const database: Database = JSON.parse(req.body);

    saveDatabase(database);

    res.json({ success: true });
  }
};

export default handler;
