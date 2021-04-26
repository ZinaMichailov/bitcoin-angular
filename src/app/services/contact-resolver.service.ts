import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<any>{

  constructor(private contactService: ContactService) { }
  
  async resolve(route: ActivatedRouteSnapshot){
    const {id} = route.params
    console.log(id);
    
    const contact = await this.contactService.getById(id)
    return contact

  }
}
