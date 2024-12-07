import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
  // Find all courses a user is enrolled in
  app.get("/api/users/:userId/courses", async (req, res) => {
    const { userId } = req.params;
    try {
      const courses = await dao.findCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Find all users enrolled in a course
  app.get("/api/courses/:courseId/users", async (req, res) => {
    const { courseId } = req.params;
    try {
      const users = await dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Enroll user in a course
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Unenroll user from a course
  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const status = await dao.unenrollUserFromCourse(userId, courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

export default EnrollmentRoutes;