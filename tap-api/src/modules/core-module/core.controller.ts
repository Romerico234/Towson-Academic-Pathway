import { Request, Response } from "express";
import { ICoreController } from "./interfaces/icore.controller";
import { CoreService } from "./core.service";

export class CoreController implements ICoreController {
    private coreService: CoreService;

    constructor() {
        this.coreService = new CoreService();
    }

    public getAllCores = async (req: Request, res: Response): Promise<void> => {
        try {
            const cores = await this.coreService.getAllCores();
            res.status(200).json(cores);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving cores", error });
        }
    };

    public searchCores = async (req: Request, res: Response): Promise<void> => {
        try {
            const { query } = req.query;
            if (!query || typeof query !== "string") {
                res.status(400).json({
                    message: "Query parameter is required",
                });
                return;
            }
            const cores = await this.coreService.searchCores(query);
            res.status(200).json(cores);
        } catch (error) {
            res.status(500).json({ message: "Error searching cores", error });
        }
    };
}
