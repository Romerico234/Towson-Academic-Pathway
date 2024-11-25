import { Request, Response } from "express";
import { StudentService } from "./student.service";

export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    public async getStudentByEmail(req: Request, res: Response): Promise<void> {
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
    }

    public async updateStudentByEmail(
        req: Request,
        res: Response
    ): Promise<void> {
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
    }

    public async getFavoritesByEmail(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const email = req.params.email;
            const favorites = await this.studentService.getFavoritesByEmail(
                email
            );
            if (favorites === null) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving favorites",
                error,
            });
        }
    }

    public async addFavoriteByEmail(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const email = req.params.email;
            const favoriteData = req.body;
            const favorite = await this.studentService.addFavoriteByEmail(
                email,
                favoriteData
            );
            if (!favorite) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(201).json(favorite);
        } catch (error) {
            res.status(500).json({ message: "Error adding favorite", error });
        }
    }

    public async removeFavoriteByEmail(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const email = req.params.email;
            const favoriteName = req.params.favoriteName;
            const result = await this.studentService.removeFavoriteByEmail(
                email,
                favoriteName
            );
            if (!result) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error removing favorite", error });
        }
    }
}
