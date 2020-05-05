import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let debugElement: DebugElement;
  let instance = null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule

      ],
      providers: [ProductService]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should addProduct', fakeAsync(() => {

    let productObj = {
      name: "تست محصول",
      createDate: '1399/01/01',
      companyId: 1,
      status: 1
    };

    const service = fixture.componentRef.injector.get(ProductService);

    service.addProduct(productObj).subscribe(x => {

      expect(component.isAdded).toEqual(true);
      tick(50);
    });

  }));

});
