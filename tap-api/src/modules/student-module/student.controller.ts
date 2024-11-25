import { Request, Response } from "express";
import { StudentService } from "./student.service";

export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    public async getStudentData(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.studentId;
            const studentData = await this.studentService.getStudentData(
                studentId
            );
            res.status(200).json(studentData);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving student data",
                error,
            });
        }
    }

    public async updateStudentData(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.studentId;
            const updates = req.body;
            const updatedStudentData =
                await this.studentService.updateStudentData(studentId, updates);
            res.status(200).json(updatedStudentData);
        } catch (error) {
            res.status(500).json({
                message: "Error updating student data",
                error,
            });
        }
    }

    public async getFavorites(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.studentId;
            const favorites = await this.studentService.getFavorites(studentId);
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving favorites",
                error,
            });
        }
    }

    public async addFavorite(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.studentId;
            const favoriteData = req.body;
            const favorite = await this.studentService.addFavorite(
                studentId,
                favoriteData
            );
            res.status(201).json(favorite);
        } catch (error) {
            res.status(500).json({ message: "Error adding favorite", error });
        }
    }

    public async removeFavorite(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.studentId;
            const favoriteName = req.params.favoriteName;
            await this.studentService.removeFavorite(studentId, favoriteName);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error removing favorite", error });
        }
    }
}
