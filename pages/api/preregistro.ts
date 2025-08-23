import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormData, ApiResponse, PreregistroRecord } from '@/app/types/preregistro';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFormData = (data: FormData): string | null => {
  if (!data.nombre?.trim()) return 'El nombre es requerido';
  if (!data.correo?.trim()) return 'El correo es requerido';
  if (!validateEmail(data.correo)) return 'Formato de email inválido';
  if (!data.descripcion?.trim()) return 'La descripción es requerida';
  if (data.nombre.length > 100) return 'El nombre no puede exceder 100 caracteres';
  if (data.descripcion.length > 500) return 'La descripción no puede exceder 500 caracteres';
  return null;
};

const createExcelRecord = (data: FormData): PreregistroRecord => {
  return {
    Nombre: data.nombre.trim(),
    Correo: data.correo.trim().toLowerCase(),
    Descripcion: data.descripcion.trim(),
    Fecha: new Date().toLocaleString('es-ES', {
      timeZone: 'America/Asuncion',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
};

const saveToExcel = (record: PreregistroRecord): void => {
  const filePath = path.join(process.cwd(), 'public', 'Book.xlsx');

  let workbook: XLSX.WorkBook;
  let worksheet: XLSX.WorkSheet;

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    worksheet = workbook.Sheets[sheetName];

    const existingData: PreregistroRecord[] = XLSX.utils.sheet_to_json(worksheet);
    existingData.push(record);

    worksheet = XLSX.utils.json_to_sheet(existingData);
    worksheet['!cols'] = [
      { wch: 20 }, // Nombre
      { wch: 30 }, // Correo
      { wch: 50 }, // Descripcion
      { wch: 20 }, // Fecha
    ];

    workbook.Sheets[sheetName] = worksheet;
  } else {
    // Crear nuevo workbook con una hoja y el registro si el archivo no existe
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([record]);
    workbook.Sheets['Sheet1'] = worksheet;
    workbook.SheetNames.push('Sheet1');
  }

  XLSX.writeFile(workbook, filePath);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Método no permitido',
      success: false,
    });
  }

  try {
    const formData: FormData = req.body;
    const validationError = validateFormData(formData);
    if (validationError) {
      return res.status(400).json({
        message: validationError,
        success: false,
      });
    }

    const record = createExcelRecord(formData);
    saveToExcel(record);

    res.status(200).json({
      message: 'Preregistro guardado exitosamente',
      success: true,
    });
  } catch (error) {
    console.error('Error al guardar preregistro:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      success: false,
    });
  }
}
