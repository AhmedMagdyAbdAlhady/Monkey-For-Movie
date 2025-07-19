import { CanDeactivateFn } from '@angular/router';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (component:any, currentRoute, currentState, nextState) => {
  
  if(component.loginForm.dirty && component.isSubmited  === false){
   const conf =  confirm("Are you want to leave before save the changes? ")
   if (conf) return true
   else return false
  }
  
  return true;
};
