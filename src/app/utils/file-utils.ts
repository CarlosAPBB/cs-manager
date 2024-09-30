export class FileUtils {

  static openFromBlob(blob: Blob, name: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  }

  static openFromBlobPDF(blobPart: BlobPart, name = "downloaded_file.pdf") {
    const blob = new Blob([blobPart], { type: 'application/pdf' });
    this.openFromBlob(blob, name)
  }
}
