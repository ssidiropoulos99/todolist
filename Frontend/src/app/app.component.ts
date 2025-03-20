import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'todolist_angular';

  private apiURL= "http://localhost:5001/api/todo";

  printAllData= false;
  printDataByID= false;
  printPending = false;
  printCompleted = false;

  constructor (private http: HttpClient) {}

  ngOnInit(): void {
    this.getAll();
  }

  public allData: any [] = [];
  public getAll() {
    this.printAllData = true;
    this.printDataByID = false;
    this.http.get(this.apiURL).subscribe(
      (result:any) => {
        console.log(result);
        this.allData = result;
      }
    );
  }

  public dataById: any [] = [];
  getById() {
    this.printAllData = false;
    this.printDataByID = true;
    let id = this.checkNumber("print");

    if (!id) {
      return ;
    }

    this.http.get(`${this.apiURL}/${id}`).subscribe(
      (result:any) => {
        console.log(result);
        this.dataById = [result];
      }
    )
  }

  formData = {
    //ID: null,
    itemTitle: '',
    description: '',
    completed: false,
  };

  postNewItem() {
    this.formData.itemTitle = this.checkString("title");
    if (!this.formData.itemTitle) {
      return ;
    }

    this.formData.description = this.checkString("description");
    if (!this.formData.description) {
      return;
    }
    this.http.post(this.apiURL, this.formData).subscribe((response) => {console.log(response);});
  }

  deleteItem(id: number) {
    this.http.delete(`${this.apiURL}/${id}`).subscribe(
      {next:() => {this.allData = this.allData.filter(new_data => new_data.id !== id);}}
    );
  }

  markItem(id: number) {
    this.http.put(`${this.apiURL}/${id}/completed`, null).subscribe(
      {next: () => {this.allData}}
      //{next: () => {window.location.reload()}}
    );
  }

  pendingItem() {
    this.printPending= true;
    this.printAllData= false;
  }

  completedItem() {

  }

  checkString(flag: string) {
    do {
      const new_string = prompt(`Please enter ${flag} of the to-do item you want to add:`);

      if (new_string === null) {
        alert("You have canceled the input.");
        return "";
      }
      //trim() method is used to remove whitespace from both sides of a string
      if (new_string.trim() != "" || flag === "description") {
        return new_string;
      } else {
        alert(`Please enter a valid ${flag}.`);
      }
    } while(true);
  }

  checkNumber(flag: string){
    do {
      const id = prompt(`Please enter the ID of the to-do item you want to ${flag}:`);
      if (id === null) {
        alert("You have canceled the input.");
        return "";
      }

      if (!isNaN(Number(id)) && id !== "" && id.trim() != "") {
        return id;
      } else {
        alert("Please enter a valid number.");
      };
    } while(true);
  }
}
