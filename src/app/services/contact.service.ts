import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { httpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  constructor() { }

  public async query(): Promise<void> {
    const filterBy = this._filterBy$.getValue()
    let queryStr = !filterBy ? '' : `?term=${filterBy.term}`;
    const contacts = await httpService.get(`contact${queryStr}`);
    this._contacts$.next(this._sort(contacts))
  }

  public setFilter(filterBy) {
    this._filterBy$.next(filterBy)
    this.query()
  }

  public getEmptyContact() {
    return { name: '', email: '', phone: '' }
  }

  public async getById(id: string): Promise<Observable<Contact>> {
    const contact = await httpService.get(`contact/${id}`);
    return contact
  }

  public async remove(id: string) {
    await httpService.delete(`contact/${id}`);
    return this._contacts$.subscribe(contacts => {
      contacts = contacts.filter(contact => contact._id !== id)
    })
  }

  public async save(contact: Contact) {
    const savedContact = contact._id ?
      await httpService.put(`contact/${contact._id}`, contact) :
      await httpService.post(`contact/`, contact)
    return savedContact
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }
}