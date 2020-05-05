import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { CompanyComponent } from './company.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CompanyService } from './company.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { ProductComponent } from '../product/product.component';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let debugElement: DebugElement;
  let instance = null;
  let params: Subject<Params>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'product',
            component: ProductComponent
          }
        ])

      ],
      providers: [CompanyService,

        { provide: Router, useValue: mockRouter },

      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should addCompany', () => {
    expect(component).toBeTruthy();
  });


  it('should addCompany', fakeAsync(() => {

    let companyObj = {
      name: "تست کمپانی",
      phoneNumber: 123,
      type: 1
    };

    const service = fixture.componentRef.injector.get(CompanyService);
    service.addCompany(companyObj).subscribe(x => {

      expect(component.isAdded).toEqual(true);
      tick(50);
    });

  }));

  it('should change on route param change', fakeAsync(() => {

    let companyObj = {
      id: 1,
      name: "تست کمپانی",
      phoneNumber: 123,
      type: 1
    };
    component.onRowClick(companyObj);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product'], { queryParams: { companyId: 1 } });
  }));



});
