import model from "./model.js";

export function findAllCourses() {
  return model.find();
}
export async function findCoursesForEnrolledUser(userId) {
  try {
    const courses = await model
      .aggregate([
        {
          $lookup: {
            from: "enrollments",
            localField: "_id",
            foreignField: "course",
            as: "enrollments"
          }
        },
        {
          $match: {
            "enrollments.user": userId
          }
        }
      ]);
    return courses;
  } catch (error) {
    throw new Error(`Error finding courses for user: ${error.message}`);
  }
}

export function createCourse(course) {
  delete course._id;
  return model.create(course);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
