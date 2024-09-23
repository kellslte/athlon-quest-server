import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";
import Section from "../models/section.model.js";
import LearningPathService from "./learning-path.service.js";

class CourseService {
  /**
   * Retrieves a course by its id
   * @param {string} id the id of the course to retrieve
   * @returns {Promise<Course>} the course with its sections and lessons
   */
  static async getCourse(id) {
    return await Course.findByPk(id, {
      include: [
        {
          model: Section,
          as: "sections",
          include: [
            {
              model: Lesson,
              as: "lessons",
              include: [Lesson.Resources],
            },
          ],
        },
      ],
    });
  }

  /**
   * Retrieves all courses for a given learning path
   * @param {string} learningPathId the id of the learning path
   * @returns {Promise<Course[]>} an array of courses with their sections and lessons
   */
  static async getCoursesByLearningPath(learningPathId) {
    // @ts-ignore
    return await Course.findAndCountAll({
      where: {
        learningPathId,
      },
      include: [
        {
          model: Section,
          as: "sections",
          include: [
            {
              model: Lesson,
              as: "lessons",
              include: [Lesson.Resources],
            },
          ],
        },
      ],
    });
  }

  /**
   * Retrieves all courses, with their sections and lessons
   * @param {number} [limit=20] the maximum number of courses to retrieve
   * @param {number} [offset=0] the starting index of the courses to retrieve
   * @returns {Promise<{count: number, rows: Course[]}>} the list of courses
   */
  static async getAllCourses(limit = 20, offset = 0) {
    return await Course.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Section,
          as: "sections",
          include: [
            {
              model: Lesson,
              as: "lessons",
              include: [Lesson.Resources],
            },
          ],
        },
      ],
    });
  }

  /**
   * Creates a new course
   * @param {Object} payload the new course data
   * @returns {Promise<Course>} the created course
   */
  static async createCourse(learningPathId, payload) {
    const course = await Course.create(payload);

    await LearningPathService.addCoursesToLearningPath(learningPathId, {
      // @ts-ignore
      courseIds: [course.id], // Add the course to the learning path immediately.
    });

    return course;
  }

  /**
   * Updates a course by its id
   * @param {string} id the id of the course to update
   * @param {Object} payload the new data to update the course with
   * @returns {Promise<Course>} the updated course
   */
  static async updateCourse(id, payload) {
    const course = await Course.findByPk(id);
    return await course.update(payload);
  }

  /**
   * Deletes a course by its id
   * @param {string} id the id of the course to delete
   * @returns {Promise<void>} an empty promise
   */
  static async deleteCourse(id) {
    await Course.destroy({ where: { id } });
  }
}

export default CourseService;
