import JobsTable from "./_components/JobsTable";
import AdminJobHeader from "./_components/AdminJobHeader";

export default function page() {
  return (
    <div>
      <AdminJobHeader />
      <JobsTable />
    </div>
  );
}
