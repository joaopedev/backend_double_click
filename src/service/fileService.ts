import fs from "fs";
import path from "path";

const registrosPath = path.join(__dirname, "..", "register", "register.json");

export class FileService {
  static readRecords(): any[] {
    try {
      if (!fs.existsSync(registrosPath)) {
        fs.writeFileSync(registrosPath, "[]");
      }
      const data = fs.readFileSync(registrosPath, "utf-8");

      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao ler o arquivo de registros:", error);
      return []; 
    }
  }

  static writeRecords(data: any[]): void {
    try {
      fs.writeFileSync(registrosPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Erro ao gravar no arquivo de registros:", error);
    }
  }

  static addRecord(record: any): any {
    console.log("Adding record:", record);
    const records = this.readRecords();
    records.push(record);
    this.writeRecords(records);
    return record;
  }
}
