import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvailableCSVFiles, readCSVFile } from "@/lib/csv-parser";
import { BarChart, FileSpreadsheet } from "lucide-react";

export default function Home() {
  const availableFiles = getAvailableCSVFiles();
  const totalRecords = availableFiles.reduce((acc, file) => {
    const data = readCSVFile(`data-storage/db/${file}.csv`);
    return acc + data.rows.length;
  }, 0);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">HRlytics</h1>
      <h1 className="text-3xl font-bold mb-8">Database Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Databases
            </CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableFiles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Records
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Available Databases & Views</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableFiles.map((file) => {
          const data = readCSVFile(`data-storage/db/${file}.csv`);
          return (
            <Card key={file}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {file.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {data.rows.length} records
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.headers.length} columns
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}