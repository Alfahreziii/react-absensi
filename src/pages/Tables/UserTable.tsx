import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import UserTables from "../../components/tables/DataTableUser";

export default function UserTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="User" />
      <div className="space-y-6">
        <ComponentCard title="User" className="">
          <UserTables />
        </ComponentCard>
      </div>
    </>
  );
}