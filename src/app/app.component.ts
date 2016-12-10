import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FirebaseService } from './services/firebase.service';
/**Interfaces */
import { Business } from './Business';
import { Category } from './Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FirebaseService ]
})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;
  editedBusiness;

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit(){
    this._firebaseService.getBusinesses()
      .subscribe(businesses => {
        this.businesses = businesses;
      });

    this._firebaseService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  changeState(state, key=null) {
    console.log('Changing state to '+state);
    if(key){
      console.log('Changing key to '+key);
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category){
    console.log(category);
    this._firebaseService.getBusinesses(category)
        .subscribe(businesses => {
          this.businesses = businesses;
        });
  }

  addBusiness(form: NgForm){
    let newBusiness = form.value;
    newBusiness.created_at = new Date().toString();
     
    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default');
  }

  showEdit(business) {
    this.changeState('edit', business.$key);
    this.editedBusiness = business;
  }

  updateBusiness(){
    let updBusiness = this.editedBusiness;
    delete updBusiness.$key;
    delete updBusiness.$exists;

    this._firebaseService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default');
  }

  deleteBusiness(key){
    this._firebaseService.deleteBusiness(key);
  }
}
