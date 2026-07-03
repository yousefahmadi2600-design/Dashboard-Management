import Navigation from "../components/header&sidebar/Navbar";
import Sidebar from "../components/header&sidebar/Sidebar";
function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <Navigation />
      <main className="mt-16 mb-21 sm:mt-16 sm:mb-4 sm:ml-16 md:ml-18 lg:mt-20 lg:ml-20">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
