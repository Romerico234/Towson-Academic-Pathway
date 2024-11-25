import { Request, Response } from "express";
import CoreService from "./core.service";

class CoreController {
    // Get all cores
    async getAllCores(req: Request, res: Response): Promise<void> {
        try {
            const cores = await CoreService.getAllCores();
            res.status(200).json(cores);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving cores", error });
        }
    }

    // Search cores by name or code
    async searchCores(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            if (!query || typeof query !== "string") {
                res.status(400).json({
                    message: "Query parameter is required",
                });
                return;
            }
            const cores = await CoreService.searchCores(query);
            res.status(200).json(cores);
        } catch (error) {
            res.status(500).json({ message: "Error searching cores", error });
        }
    }
}

export default new CoreController();
