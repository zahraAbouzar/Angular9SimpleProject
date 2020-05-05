import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { CompanyService } from './company.service'
@Component({
  selector: 'app-Company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  constructor(private companyService: CompanyService, private router: Router) { }
  confirmationString: string = 'عملیات با موفقیت انجام شد !!';
  errorString: string = 'نام شرکت اجباری است!!'
  isAdded: boolean = false;
  hasError: boolean = false;
  companyObj: object = [];
  companyes: any = [];

  getTypeName(x) {
    if (x.type == 1) return "محصولات غذایی";
    if (x.type == 2) return "لوازم خانگی";
    if (x.type == 3) return "لوازم الکترونیکی";
  }

  addNewCompany(company) {
    if (!company.name) {
      this.hasError = true;
      setTimeout(x => { this.hasError = false; }, 1000)
      return;
    }
    this.companyObj = {
      name: company.name,
      phoneNumber: company.phoneNumber,
      type: company.type
    };
    this.companyService.addCompany(this.companyObj).subscribe((res: Response) => {
      this.isAdded = true;
      setTimeout(x => { this.isAdded = false; }, 1000)
      this.onFetchData();
    });

  };

  onRowClick(company) {
    this.router.navigate(['/product'], { queryParams: { companyId: company.id } });
  }

  onFetchData() {
    this.companyService.fetchData().subscribe((res: Response) => {
      this.companyes = res
      this.companyes = this.companyes.map(x => { x.typeName = this.getTypeName(x); return x; })
    });
  }

  ngOnInit() {
    this.onFetchData();

  }
}
