import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<any>{

  constructor(private contactService: ContactService) { }
  
  async resolve(route: ActivatedRouteSnapshot){
    const {id} = route.params    
    const contact = await this.contactService.getById(id)
    return contact

  }
}
