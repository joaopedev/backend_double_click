import { Request, Response } from "express";
import { FileService } from "../service/fileService";
import { v4 as uuidv4 } from "uuid";

export default class RecordsController {
  static generateUniqueId(): number {
    const uuid = uuidv4();
    return parseInt(uuid.replace(/[^0-9]/g, "").slice(0, 9)); 
  }

  static create(req: Request, res: Response) {
    try {
      const { time } = req.body;

      if (typeof time !== "number") {
        return res
          .status(400)
          .json({ message: "O tempo registrado deve ser um número." });
      }

      const newRecord = {
        id: this.generateUniqueId(), 
        date: new Date().toISOString().split("T")[0],
        time,
        createdAt: new Date().toISOString(),
      };

      const savedRecord = FileService.addRecord(newRecord);

      return res.status(201).json(savedRecord);
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static list(req: Request, res: Response) {
    try {
      const records = FileService.readRecords();
      return res.status(200).json(records);
    } catch (error) {
      console.error("Erro ao listar registros:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
