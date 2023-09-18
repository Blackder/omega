import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileDownloadService {
  download(response: HttpResponse<Blob>): void {
    const data = window.URL.createObjectURL(response.body as Blob);
    const fileName = response.headers
      .get('Content-Disposition')
      ?.split(';')[1]
      .split('=')[1]
      .replaceAll('"', '');

    const link = document.createElement('a');
    link.href = data;
    link.download = fileName as string;

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
}
