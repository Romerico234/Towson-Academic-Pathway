import { Request, Response } from "express";
import { IStudentController } from "./interfaces/istudent.controller";
import { StudentService } from "./student.service";
import { NextFunction } from "express-serve-static-core";

export class StudentController implements IStudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    public getStudentByEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const studentData = await this.studentService.getStudentByEmail(
                email
            );
            if (!studentData) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(200).json(studentData);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving student data",
                error,
            });
        }
    };

    public updateStudentByEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const updates = req.body;
            const updatedStudentData =
                await this.studentService.updateStudentByEmail(email, updates);
            if (!updatedStudentData) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(200).json(updatedStudentData);
        } catch (error) {
            res.status(500).json({
                message: "Error updating student data",
                error,
            });
        }
    };

    public getDegreePlanByEmail = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const degreePlans = await this.studentService.getDegreePlanByEmail(
                email
            );
            if (degreePlans === null) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(200).json(degreePlans);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving degree plans",
                error,
            });
        }
    };

    public addFavoriteDegreePlan = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const favoriteData = req.body; // Should be a FavoriteSchedule object
            const success = await this.studentService.addFavoriteDegreePlan(
                email,
                favoriteData
            );
            if (!success) {
                res.status(400).json({
                    message: "Failed to add favorite degree plan",
                });
                return;
            }
            res.status(201).json({
                message: "Degree Plan favorited successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error favoriting degree plan",
                error,
            });
        }
    };

    public removeFavoriteDegreePlan = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const favoriteName = req.params.favoriteName;
            const success = await this.studentService.removeFavoriteDegreePlan(
                email,
                favoriteName
            );
            if (!success) {
                res.status(404).json({
                    message: "Favorite Degree Plan not found",
                });
                return;
            }
            res.status(200).json({
                message: "Degree Plan unfavorited successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error unfavoriting degree plan",
                error,
            });
        }
    };

    public getFavoriteDegreePlansByEmail = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const email = req.params.email;
            const favorites =
                await this.studentService.getFavoriteDegreePlansByEmail(email);
            if (favorites === null) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving favorite degree plans",
                error,
            });
        }
    };
}
