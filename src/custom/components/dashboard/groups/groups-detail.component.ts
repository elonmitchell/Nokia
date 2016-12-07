/*import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";

import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';*/

import {Component} from '@angular/core';
import {Router, RouteData} from '@angular/router-deprecated';
//import {Datatable} from '../datatable/datatable.component';
import {WorkflowComponent} from '../../../../core/components/workflow/workflow.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'firmware-detail',
  templateUrl: '/src/custom/components/dashboard/groups/groups-detail.component.html',
  //directives: [DataTable,Column]
  directives: [WorkflowComponent]
})

export class GroupsDetailComponent implements OnInit{
  title:string = 'Groups Details';
  
dsoObs:Observable<any>;
workflowConvetextObs:Observable<any>;

componentType:string = "";
private type:string;
workflowName:string;

workflowOperations:Array<any> = [];
refreshOperation:Object;
addDeviceOperation:Object;

workflowActive:boolean = false;
campaignActive:boolean = false;
componentActive:boolean = false;
workflowHidden:boolean = false;

title:string = 'Campaign Details';
columnsArray:Array<any> = [];
columnData:Array<any> = [];

  constructor(private _router:Router, private _store:Store<any>, data:RouteData) {
	  this.type = data.get('type');
	    this.dsoObs = _store.select('DSOModelReducer');
	    this.workflowConvetextObs = _store.select('WorkflowContextReducer');
	    this.dsoObs.subscribe((data:any)=> {
	        let services = _.find(data.domains.domain, function (domain:any) {
	          return domain.id === "Widgets"
	        }).services.service;
	        let Groups = _.find(services, function (service:any) {
	          return service.id === "Groups"
	        });
	        
	        if (Groups != undefined && Groups.operations != undefined){
		        var operations = _.cloneDeep(Groups.operations.operation);
		        this.refreshOperation = _.remove(operations,function(operation){
		          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh"
		        })[0];
		        this.addDeviceOperation = _.remove(operations,function(operation){
			          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "add_operation"
			    })[0];
		        _.remove(operations,function(operation){
		          return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "refresh_widget"
		        })[0];
	
		        this.workflowOperations = operations;
		        } else {
	        	console.log("Widget::Groups Doesn't contained expected operations")
	        	
	        }

	      },
	      error => {

	      }
	    )
  }

  ngOnInit() {
	  
	  if (this.workflowOperations != undefined){
	    this.workflowName = _.find(this.workflowOperations, function (operation) {
	        return operation.attributes.hasOwnProperty('type') && operation.attributes.type === "details";
	      }).operationName;
	      this.workflowActive = true;
	  } else {
		  
		  console.log("Widget::Groups workflowOperations missing")
	  }
  }
  
  isDone(evt) {
	    this.workflowHidden = true;
	    switch (this.type) {
	      case 'Groups':
	      {
	        this.workflowActive = false;
	        //this.initCampaigns();
	        this.campaignActive = true;
	        this.componentActive = true;
	        this.componentType = 'Groups';
	        break;
	      }
	    }
	    
	    let link = ['Dashboard'];
	    this._router.navigate(link);
	  }
  
  onOperationClick(evt:Event) {
	    this.hideComponent();
	    this.runWorkflow(evt.target.getAttribute('operation'))
	  }
  
  
  hideComponent(){
	    switch (this.type) {
	      case 'Groups':
	      {
	        this.campaignActive = false;
	        this.componentActive = false;
	        break;
	      }
	    }
	  }
  
  runWorkflow(operation:string){
	    this.workflowName = operation;
	    this.workflowHidden = false;
	    this.workflowActive = true;
	  }
  
  onClose(evt:Event) {
	    let link = ['Dashboard'];
	    this._router.navigate(link);
	  }
  
  onRefresh(evt:Event){
	    this.hideComponent();
	    this.runWorkflow(this.refreshOperation.operationName);
	  }

  isCanceled(){
	  let link = ['Dashboard'];
	  this._router.navigate(link);
  }
  
}
