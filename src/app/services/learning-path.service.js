import Course from "../models/course.model.js";
import LearningPath from "../models/learning-path.model.js";
import Lesson from "../models/lesson.model";
import Section from "../models/section.model.js";

class LearningPathService {
  static async getTrackLearningPaths(trackId) {
    return await LearningPath.findAll({
      where: { trackId },
      include: [
        {
          model: Course,
          as: "courses",
          attributes: ["title"],
        },
      ],
    });
  }

  static async getLearningPath(id) {
    return await LearningPath.findByPk(id, {
      include: [
        {
          model: Course,
          as: "courses",
          attributes: ["title"]
        },
      ],
    });
  }

  static async createLearningPath(payload) {
    return await LearningPath.create(payload);
  }

  static async updateLearningPath(id, payload) {
    const learningPath = await this.getLearningPath(id);
    return await learningPath.update(payload);
  }

  static async addCoursesToLearningPath(learningPathId, courseIds) {
    const learningPath = await LearningPath.findByPk(learningPathId, {
      include: [
        {
          model: Course,
          as: "courses",
        },
      ],
    });
    const courses = [];

    for (const courseId of courseIds) {
      const course = await Course.findByPk(courseId);
      courses.push(course);
    }

    learningPath.update({
      // @ts-ignore
      courses: learningPath.courses.concat(courses),
    });

    return learningPath;
  }

  static async removeCourseFromLearningPath(learningPathId, courseId) {
    const learningPath = await LearningPath.findByPk(learningPathId, {
      include: [
        {
          model: Course,
          as: "courses",
        },
      ],
    });
    learningPath.update({
      // @ts-ignore
      courses: learningPath.courses.filter((c) => c.id !== courseId),
    });
    return learningPath;
  }

  static async deleteLearningPath(id) {
    await LearningPath.destroy({ where: { id } });
  }
}

export default LearningPathService;
