// NOTE: In the back burner
// import { Request, Response, NextFunction } from "express";
// import { CourseSectionService } from "./course-section.service";

// export class CourseSectionController {
//     private courseSectionService: CourseSectionService;

//     constructor() {
//         this.courseSectionService = new CourseSectionService();
//     }

//     public getAllCourseSections = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         try {
//             const courseSections =
//                 await this.courseSectionService.getAllCourseSections();
//             res.json(courseSections);
//         } catch (error) {
//             next(error);
//         }
//     };

//     public getCourseSectionById = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         try {
//             const courseSectionId = req.params.id;
//             const courseSection =
//                 await this.courseSectionService.getCourseSectionById(
//                     courseSectionId
//                 );
//             if (!courseSection) {
//                 res.status(404).json({ message: "Course Section not found" });
//             } else {
//                 res.json(courseSection);
//             }
//         } catch (error) {
//             next(error);
//         }
//     };

//     public getCourseSectionsByCourseBridgeId = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         try {
//             const courseBridgeId = req.params.bridgeId;
//             const courseSections =
//                 await this.courseSectionService.getCourseSectionsByCourseBridgeId(
//                     courseBridgeId
//                 );
//             res.json(courseSections);
//         } catch (error) {
//             next(error);
//         }
//     };
// }
