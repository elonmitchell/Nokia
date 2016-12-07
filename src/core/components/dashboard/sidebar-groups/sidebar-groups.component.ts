import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {ADD_GROUP_CONTEXT} from '../../../reducers/sidebar-groups.reducer';
import {TreeContainerComponent} from '../../tree/tree-container.component';

@Component({
  selector: 'sidebar-groups',
  directives: [TreeContainerComponent],
  templateUrl: '/src/core/components/dashboard/sidebar-groups/sidebar-groups.component.html'
})

export class SidebarGroupComponent {
  private _currentGroupInfoSelected:string = "";
  private disabledClass = "button-disabled";

  @Input() show:string;
  @Input() treeData:Object;

  constructor(private _store:Store<any>) {
  }

  handleClickEvent(event) {
    this._currentGroupInfoSelected = event;
    this.disabledClass = "";
  }

  handleRefreshClick() {
	if (this._currentGroupSelected != ""){  
		this._store.dispatch({type: ADD_GROUP_CONTEXT, payload: {selectedGroupId: this._currentGroupInfoSelected.id, fullName :  this._currentGroupInfoSelected.fullName, enterprise: this._currentGroupInfoSelected.enterprise,  isRoot : true , beginFlowMode: "REFRESH_GROUPS_TREE"}});
	}
  }

}
