import { Component } from '@angular/core';
import { saveAs } from 'file-saver'; // Import the file-saver library
import * as JSZip from 'jszip';

@Component({
  selector: 'app-file-compression',
  templateUrl: './file-compression.component.html',
})
export class FileCompressionComponent {
  selectedFiles: File[] = [];
  showSuccessMessage: boolean = false; // Add flag for showing the success message

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  compressAndDownload() {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const zip = new JSZip();

    for (const file of this.selectedFiles) {
      zip.file(file.name, file, { compression: 'DEFLATE',compressionOptions: { level: 9 } }); // Add the file to the ZIP archive
    }

    // Generate the ZIP file
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Save or download the compressed ZIP file
      saveAs(content, 'compressed-files.zip');
       // Show the success message
       this.showSuccessMessage = true;

       // Hide the success message after a certain duration
       setTimeout(() => {
         this.showSuccessMessage = false;
       }, 3000); // Duration in milliseconds
    });
  }
}
