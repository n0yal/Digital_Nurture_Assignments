import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

// CanDeactivate guard prevents accidental loss of form data
export const UnsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};
