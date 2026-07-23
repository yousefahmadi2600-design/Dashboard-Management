import Dashboard from "./pages/Dashboard";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentsProvider from "./context/StudentsContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Students from "./pages/Student";
import Courses from "./pages/Courses";
import StudentDetails from "./pages/StudentDetails";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster />
      <StudentsProvider>
        <Router>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/student/:id" element={<StudentDetails />} />
            </Routes>
          </DashboardLayout>
        </Router>
      </StudentsProvider>
    </>
  );
}

export default App;
