import { Request, Response } from "express";
import MajorService from "./major.service";

class MajorController {
    // Get all majors
    async getAllMajors(req: Request, res: Response): Promise<void> {
        try {
            const majors = await MajorService.getAllMajors();
            res.status(200).json(majors);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving majors", error });
        }
    }

    // Get major by name
    async getMajorByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            const major = await MajorService.getMajorByName(name);
            if (major) {
                res.status(200).json(major);
            } else {
                res.status(404).json({ message: "Major not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving major", error });
        }
    }

    // Search majors
    async searchMajors(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            if (!query || typeof query !== "string") {
                res.status(400).json({
                    message: "Query parameter is required",
                });
                return;
            }
            const majors = await MajorService.searchMajors(query);
            res.status(200).json(majors);
        } catch (error) {
            res.status(500).json({ message: "Error searching majors", error });
        }
    }
}

export default new MajorController();
