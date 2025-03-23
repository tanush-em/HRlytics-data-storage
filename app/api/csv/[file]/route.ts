import { readCSVFile } from "@/lib/csv-parser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, // Ensure this is typed as NextRequest
  { params }: { params: { file: string } }
) {
  try {
    const filePath = `data-storage/db/${params.file}.csv`;
    const data = await readCSVFile(filePath); // Ensure this is async if readCSVFile is async

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 });
  }
}
