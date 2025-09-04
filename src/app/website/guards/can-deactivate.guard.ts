import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './can-component-deactivate';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (component:any, currentRoute, currentState, nextState) => {
  
  // if(!component.canDeactivate ){
  //  const conf =  confirm("Are you want to leave before save the changes? ")
  //  if (conf) return true
  //  else return false
  // }
  
  // return true;
    return component.canDeactivate ? component.canDeactivate() : true;

};


// export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
//   component,
//   currentRoute,
//   currentState,
//   nextState
// ) => {
  // return component.canDeactivate ? component.canDeactivate() : true;
// };
