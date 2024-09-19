import Track from "../models/track.model.js";
import Course from "../models/course.model.js";
import Section from "../models/section.model.js";
import Lesson from "../models/lesson.model.js";
import { NotFoundError } from "../../lib/errors.js";
import LearningPath from "../models/learning-path.model.js";

class TrackService {
  static async getTracks() {
    return await Track.findAndCountAll({
      include: [
        {
          model: LearningPath,
          as: "learningpaths",
          attributes: ["title"],
          include: [
            LearningPath.Courses,
            Course.Sections,
            Section.Lessons,
            Lesson.Resources,
          ],
        },
      ],
    });
  }

  static async getTrack(id) {
    return await Track.findByPk(id, {
      include: [
        {
          model: LearningPath,
          as: "learningpaths",
          attributes: ["title"],
          include: [
            LearningPath.Courses,
            Course.Sections,
            Section.Lessons,
            Lesson.Resources,
          ],
        },
      ],
    });
  }

  static async createTrack(data) {
    return await Track.create(data);
  }

  static async updateTrack(id, data) {
    const track = await Track.findByPk(id);

    if (!track) throw new NotFoundError("The specified track does not exist");
    return await track.update(data);
  }

  static async deleteTrack(id) {
    await Track.destroy({ where: { id } });
  }
}

export default TrackService;
