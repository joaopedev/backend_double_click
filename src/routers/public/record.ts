import { Express, Request, Response } from "express";
import RecordsController from "../../controllers/recordsController";

module.exports = (app: Express) => {
  app.post("/records", (req: Request, res: Response) => {
    RecordsController.create(req, res);
  });

  app.get("/listRecords", (req: Request, res: Response) => {
    RecordsController.list(req, res);
  });
};
