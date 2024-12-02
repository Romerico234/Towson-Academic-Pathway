import { Request, Response } from "express";
import { IRequirementsController } from "./interfaces/irequirements.controller";
import { RequirementsService } from "./requirements.service";

export class RequirementsController implements IRequirementsController {
    private requirementsService: RequirementsService;

    constructor() {
        this.requirementsService = new RequirementsService();
    }

    public getDegreeRequirements = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const degreeRequirements =
                await this.requirementsService.getDegreeRequirements();
            res.status(200).json(degreeRequirements);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving degree requirements",
                error,
            });
        }
    };

    public getGeneralDegreeRequirementes = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const generalDegreeRequirements =
                await this.requirementsService.getGeneralDegreeRequirementes();
            res.status(200).json(generalDegreeRequirements);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving general degree requirements",
                error,
            });
        }
    };

    public getHonorsRequirements = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const honorsRequirements =
                await this.requirementsService.getHonorsRequirements();
            res.status(200).json(honorsRequirements);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving honors requirements",
                error,
            });
        }
    };

    public getDegreeRequirementByType = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const degreeType = req.params.type;
        try {
            const degreeRequirement =
                await this.requirementsService.getDegreeRequirementByType(
                    degreeType
                );
            if (degreeRequirement) {
                res.status(200).json(degreeRequirement);
            } else {
                res.status(404).json({ message: "Degree type not found" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving degree requirement",
                error,
            });
        }
    };
}
