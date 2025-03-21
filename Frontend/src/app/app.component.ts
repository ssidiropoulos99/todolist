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

  allData: any [] = [];
  filteredData: any [] = [];
  deleteFlag = false;

  formData: any= {
    //ID: null,
    itemTitle: null,
    description: null,
    completed: false,
  };

  constructor (private http: HttpClient) {}

  ngOnInit(): void {
    this.getAll();
  }

  onFilter(event: any) {
    const value = event.target.value;
    switch(value) {
    case "showAll": {
      this.filteredData=this.allData;
       break;
    }
    case "showPending": {
      this.pendingItem();
       break;
    }
    case "showCompleted": {
       this.completedItem();
       break;
    }
    case "byId": {
      this.getById();
      break;
    }
    }
  }

  getAll() {
    this.http.get(this.apiURL).subscribe(
      {next: (result:any) => {this.allData = result; this.filteredData = result;}}
    );
  }

  pendingItem() {
    this.filteredData = this.allData.filter(new_data => new_data.completed == false);
  }

  completedItem() {
    this.filteredData = this.allData.filter(new_data => new_data.completed == true);
  }

  getById() {
    let id = this.checkNumber("print");
    if (!id) {
      return ;
    }
    this.deleteFlag=true;
    this.filteredData= this.allData.filter(new_data => new_data.id == id);
    if (this.filteredData.length == 0) {
      alert("No such ID found. Instead all To-Do list was printed.");
      this.filteredData = this.allData;
    }
  }

  postNewItem() {
    this.formData.itemTitle = this.checkString("title");
    if (!this.formData.itemTitle) {
      return;
    }

    this.formData.description = this.checkString("description");
    if (this.formData.description === null) {
      return;
    }

    this.http.post(this.apiURL, this.formData).subscribe(
        {next:() => {window.location.reload()}}
      );
    }

  deleteItem(id: number) {
    this.http.delete(`${this.apiURL}/${id}`).subscribe(
      {next:() => {this.allData = this.allData.filter(new_data => new_data.id !== id);
        this.filteredData = this.filteredData.filter(new_data => new_data.id !== id);}}
    );

    if(this.deleteFlag){
      this.filteredData=this.allData;
    }
  }

  markItem(item: any) {
    this.http.put(`${this.apiURL}/${item.id}/completed`, null).subscribe(
      {next: () => {item.completed=true}}
    );
  }

  unmarkItem(item: any) {
    this.http.put(`${this.apiURL}/${item.id}/completed`, null).subscribe(
      {next: () => {item.completed=false}}
    );
  }

  checkString(flag: string) {
    do {
      const new_string = prompt(`Please enter ${flag} of the to-do item you want to add:`);

      if (new_string === null) {
        alert("You have canceled the input.");
        return null;
      }

      //trim() method is used to remove whitespace from both sides of a string
      if (new_string.trim() !== "" || flag === "description") {
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
