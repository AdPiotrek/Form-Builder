import { Injectable, OnDestroy } from '@angular/core';
import idb, { DB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  readonly INPUT_STORAGE = 'inputStorage';
  indexedDB: Promise<DB>;

  constructor() {
    this.connectToDb();
  }

  connectToDb() {
    this.indexedDB = idb.open('formBuilderDataBase',
      1,
      upgradeDb => upgradeDb.createObjectStore(this.INPUT_STORAGE, { autoIncrement: true }));
  }

  async updateForm(formObject: any) {

    const idb = await this.indexedDB;

    const transaction = idb.transaction(this.INPUT_STORAGE, 'readwrite');

    let store = transaction.objectStore(this.INPUT_STORAGE);

    const updatedForm = await store.put(formObject, this.INPUT_STORAGE);
  }

  async getForm() {

    const idb = await this.indexedDB;

    const transaction = idb.transaction(this.INPUT_STORAGE, 'readonly');

    let store = transaction.objectStore(this.INPUT_STORAGE);

    return await store.get(this.INPUT_STORAGE);

  }


  async ngOnDestroy() {
    const idb = await this.indexedDB;
    idb.close();
  }
}
