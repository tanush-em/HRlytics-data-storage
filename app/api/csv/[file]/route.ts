import { readCSVFile } from "@/lib/csv-parser";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { file: string } }
) {
  try {
    const data = readCSVFile(`data-storage/db/${params.file}.csv`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read CSV file" }, { status: 500 });
  }
}