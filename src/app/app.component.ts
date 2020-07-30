import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppService } from './services/my.service';

class Organization {
  id: number;
  name: string;
  realm: string;
  acc: number;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  Organizations: Organization[];
  selectedName: any;
  UserList = ['Select User'];
  @Input() list: string[];
  showError = false;

   
 
  roleList: string[];
  roleValue = '';

  constructor(private http: HttpClient,
    private appService: AppService, ) { }

  ngOnInit(): void {
    const that = this;
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
     
        this.appService.getOrgList(dataTablesParameters)   

      //  return this.http.post<Organization>('https://localhost:57263/api/GetOrgList', dataTablesParameters, {})
        //that.http
        //  .post<DataTablesResponse>(
        //    'https://angular-datatables-demo-server.herokuapp.com/',
        //    dataTablesParameters, {}
        //)
          .subscribe(resp => {
        
            that.Organizations = resp.data;
           // console.log(that.persons);
           
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'realm' }, { data: 'acc' }]      
    };

   

  }

  onSelect(e1) {
   // this.itemList = [];
    this.selectedName = e1;
    console.log(this.selectedName)
    let self = this;
    //this.testService.getTestMessage().subscribe(data => console.log(data));
    //this.appService.GetUserRoleById(e1).subscribe(data => this.UserList = JSON.parse(data));

    this.appService.GetUserListById(e1).subscribe(data => this.UserList = data);
    console.log(this.UserList); 
   // this.itemList = [e1,'User1', 'User2', 'User3', 'User4', 'User5'];
  }

  onDelete(name) {
    alert(name);
  }


  AddRole(rolename: string) {

    console.log(rolename); if (rolename === "") {
      setTimeout(() => {
        //this.selectItem(this.selectedIndex);
        //this.listHidden = true;
        if (rolename === "") {
          this.showError = true;
        } else {
          this.showError = false;
        }
      }, 500);
    } else {
      // helps to select item by clicking
      this.showError = false;
  
      this.appService.GetUserRoleById(rolename).subscribe(data => this.roleList = JSON.parse(data));
    }
  }


}
