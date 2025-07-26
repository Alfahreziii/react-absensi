import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import LogTables from "../../components/tables/DataTableLog.tsx";

export default function LogTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Log" />
      <div className="space-y-6">
        <ComponentCard title="Log">
          <LogTables />
        </ComponentCard>
      </div>
    </>
  );
}