import { Component, OnInit } from '@angular/core';

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

  changeState(state, key) {
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

  addBusiness(
    company:string,
    category:string, 
    years_in_business:number,
    description:string,
    phone:string,
    email:string,
    street_address:string,
    city:string,
    state:string,
    zipcode:string
  ){
    var created_at = new Date().toString();

    var newBusiness = {
      company,
      category,
      years_in_business,
      description,
      phone,
      email,
      street_address,
      city,
      state,
      zipcode,
      created_at
    }


    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default', '');
  }
}
