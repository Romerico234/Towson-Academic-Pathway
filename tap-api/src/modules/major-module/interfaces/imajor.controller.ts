import { Request, Response } from "express";

export interface IMajorController {
    /**
     * Retrieves all majors
     * @param req - Express Request object
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getAllMajors(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves a major by its name
     * @param req - Express Request object containing the major name in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getMajorByName(req: Request, res: Response): Promise<void>;

    /**
     * Retrieves a major by its name without its concentrations
     * @param req - Express Request object containing the major name in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getMajorByNameWithNoConcentration(
        req: Request,
        res: Response
    ): Promise<void>;

    /**
     * Retrieves all concentrations for a major
     * @param req - Express Request object containing the major name in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getAllConcentrationsForAMajor(
        req: Request,
        res: Response
    ): Promise<void>;

    /**
     * Retrieves a concentration by its major and concentration name
     * @param req - Express Request object containing the major and concentration names in params
     * @param res - Express Response object used to send the response
     * @returns A Promise that resolves to void
     */
    getConcentrationByMajorAndName(
        req: Request,
        res: Response
    ): Promise<void>;
}
