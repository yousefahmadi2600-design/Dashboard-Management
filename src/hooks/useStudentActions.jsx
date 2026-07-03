import { toast } from "sonner";

export default function useStudentActions(
  editingStudent,
  setStoredStudents,
  setIsEditOpen,
  setIsAddOpen,
  storedStudents,
) {
  const onEditClick = (data) => {
    const fullname = `${data.firstname === "" ? editingStudent.name.split(" ")[0] : data.firstname} ${data.lastname === "" ? editingStudent.name.split(" ")[1] : data.lastname}`;
    const updatedStudent = {
      name: fullname,
      id: editingStudent.id,
      studentId: editingStudent.studentId,
      projects: editingStudent.projects,
      courses: editingStudent.courses,
      attendanceRate: editingStudent.attendanceRate,
      progress: editingStudent.progress,
      gpa: editingStudent.gpa,
      image: editingStudent.image,
      ...data,
    };
    setStoredStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );
    setIsEditOpen(false);
    toast.success("Student updated successfully");
  };
  const onAddClick = (data) => {
    const fullname = `${data.firstname} ${data.lastname}`;
    const newStudent = {
      name: fullname,
      id: storedStudents[storedStudents.length - 1].id + 1,
      studentId: `ST${4000 + storedStudents.length}`,
      status: "Active",
      projects: [],
      courses: [],
      attendanceRate: null,
      image: null,
      progress: null,
      gpa: 33,
      major: data.major,
      email: data.email,
    };
    setStoredStudents((prev) => [...prev, newStudent]);
    setIsAddOpen(false);
    toast.success("Student created");
  };
  return { onEditClick, onAddClick };
}
