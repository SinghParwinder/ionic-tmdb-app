import { Component, OnInit } from '@angular/core';
import { StorageItem } from 'src/app/interfaces/storage-item.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.page.html',
  styleUrls: ['../../list.page.scss'],
})
export class ShowsPage implements OnInit {

  filterVal: FormControl = new FormControl();
  tvwl: StorageItem[] = [];
  loaded: boolean = false;
  filteredItems: any;
  params = '';
  constructor(
    private _router: Router,
    private _storageService: LocalStorageService,
    private _alertController: AlertController) { 
      this._storageService._oservables.tvLoading.subscribe(
        value => this.loaded = value
      );
    }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this._storageService._oservables.tv.subscribe(
      el => {
        this.tvwl = el;
        this.assignCopy();
      }
    );
  }

  async showDetails(item: StorageItem) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: 'show'
      }
    };
    this._router.navigate(['/menu/details'], navigationExtras);
  }

  reorderItems(event) {
    const temp = this.tvwl.splice(event.detail.from, 1)[0];
    this.tvwl.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this._storageService.updateTvSeriesWL(this.tvwl);
    this.assignCopy();
  }

  reset(event) {
    this.assignCopy();
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }


  removeFromList(index: number) {
    this.loaded = false;
    this.tvwl.splice(index, 1);
    this._storageService.updateTvSeriesWL(this.tvwl);
    this.presentToast('Show removed from your Watchlist!');
    this.assignCopy();
    this.loaded = true;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.tvwl);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.tvwl).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
}
