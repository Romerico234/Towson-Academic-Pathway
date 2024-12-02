import { IMajorController } from "./interfaces/imajor.controller";
import { Request, Response } from "express";
import { MajorService } from "./major.service";

export class MajorController implements IMajorController {
    private majorService: MajorService;

    constructor() {
        this.majorService = new MajorService();
    }

    public getAllMajors = async (req: Request, res: Response): Promise<void> => {
        try {
            const majors = await this.majorService.getAllMajors();
            res.status(200).json(majors);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving majors", error });
        }
    };

    public getMajorByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            const major = await this.majorService.getMajorByName(name);
            if (major) {
                res.status(200).json(major);
            } else {
                res.status(404).json({ message: "Major not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving major", error });
        }
    };
}
