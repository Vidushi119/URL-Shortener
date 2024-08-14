import { Component } from '@angular/core';
import { ShortUrl} from '../models/short_url.model';
import { NbDialogRef,NbCardComponent } from '@nebular/theme';
import { ShortUrlsService } from '../services/url-service/short_url.service';

@Component({
  selector: 'app-add-url-dialog',
  templateUrl: './add-url-dialog.component.html',
  styleUrls: ['./add-url-dialog.component.scss']
})
export class AddUrlDialogComponent {
    url:ShortUrl = <ShortUrl>{};
    constructor(protected dialogRef:NbDialogRef<any>,private ShortUrlService:ShortUrlsService) { }

    OnAdd(){
      this.ShortUrlService.Addurl(this.url).subscribe((result) => {
        console.log(result);
        this.url = result;
        this.dialogRef.close(this.url);

      });
    }

}
