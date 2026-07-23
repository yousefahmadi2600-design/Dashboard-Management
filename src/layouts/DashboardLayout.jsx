import Header from "../components/header&sidebar/Header";
import Sidebar from "../components/header&sidebar/Sidebar";
function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="mt-16 mb-21 sm:mt-16 sm:mb-4 sm:ml-16 md:ml-18 lg:mt-20 lg:ml-20">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
