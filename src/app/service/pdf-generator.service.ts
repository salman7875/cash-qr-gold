import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { MobiPrint } from 'capacitor-printer';
interface pdfInfo{
  pdfPath:string,
  pdfUriPath:{
    uri:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(
    // private printer: 
  ) {}

  async generatePdf(text: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300,300]);

    const { height } = page.getSize();
    const fontSize = 12;
    // const textWidth = page.getTextWidth(text, { fontSize });
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const sanitizedText = text.replace(/\n/g, ' ');
    const textWidth = font.widthOfTextAtSize(sanitizedText, fontSize);

    page.drawText(text, {
      x: 20,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    return pdfDoc.save();
  }

  async savePdfToDevice(
    pdfBytes: Uint8Array,
    filename: string
  ): Promise<pdfInfo> {
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    const pdfPath = `${Directory.Documents}/pdfs/${filename}.pdf`; // Change the path as needed
    console.log(pdfPath)
    const pdfUriPath = await Filesystem.writeFile({
      directory: Directory.Documents,
      path: pdfPath,
      data: base64Data,
      recursive: true,
    });

    return {pdfPath, pdfUriPath};
  }

  // async printPdf(pdfPath: string): Promise<void> {
  //   try {
  //     Print
  //     await Print.print({
  //       name: 'Printed Document',
  //       duplex: true,
  //       path: pdfPath,
  //     });
  //   } catch (error) {
  //     console.error('Error printing PDF:', error);
  //   }
  // }
}
