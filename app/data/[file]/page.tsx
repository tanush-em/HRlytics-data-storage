import { getAvailableCSVFiles, readCSVFile, type CSVData } from "@/lib/csv-parser";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  const files = getAvailableCSVFiles();
  return files.map((file) => ({
    file: file,
  }));
}

export default function DataPage({ params }: { params: { file: string } }) {
  const data: CSVData = readCSVFile(`data-storage/db/${params.file}.csv`);
  
  const columns = data.headers.map((header) => ({
    accessorKey: header,
    header: header.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {params.file.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
      </h1>
      
      <Card className="p-4">
        <DataTable columns={columns} data={data.rows} />
      </Card>
    </div>
  );
}