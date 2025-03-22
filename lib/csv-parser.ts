import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export interface CSVData {
  headers: string[];
  rows: any[];
}

export const readCSVFile = (filePath: string): CSVData => {
  const fileContent = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  const headers = Object.keys(records[0] || {});
  return {
    headers,
    rows: records
  };
};

export const getAvailableCSVFiles = (): string[] => {
  const csvDir = path.join(process.cwd(), 'data-storage/db');
  return fs.readdirSync(csvDir)
    .filter(file => file.endsWith('.csv'))
    .map(file => file.replace('.csv', ''));
};