import { Component, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

export function MockComponent(
  selector: string,
  options: Component = {},
): Component {
  const metadata: Component = {
    selector,
    template: options.template || '',
    inputs: options.inputs || [],
    outputs: options.outputs || [],
    exportAs: options.exportAs || '',
  };

  class Mock {
    constructor() {
      metadata.outputs.forEach((method) => {
        this[method] = new EventEmitter<any>();
      });
    }
  }

  return Component(metadata)(Mock as any);
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockComponent('app-header')],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as loading`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('User Management System');
  });
});
