import { trigger, state, animate, style, transition } from '@angular/animations';

// tslint:disable-next-line:typedef
export function appModuleAnimation() {
  return slideFromBottom();
}

// tslint:disable-next-line:typedef
export function accountModuleAnimation() {
  return slideFromUp();
}

// tslint:disable-next-line:typedef
export function viewAllModuleAnimation() {
  return fadeInOut();
}

// tslint:disable-next-line:typedef
export function slideFromBottom() {
  return trigger('routerTransition', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
    ])
  ]);
}

export function slideFromUp() {
  return trigger('routerTransition', [
    state('void', style({ 'margin-top': '10px', opacity: '0' })),
    state('*', style({ 'margin-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    ])
  ]);
}

export function openFromTopToBottom() {
  return trigger('customTransition', [
    state('void', style({ 'max-height': '0px' })),
    state('*', style({ 'max-height': '10000px' })),
    transition(':enter', [
      animate('3s ease-in', style({ 'max-height': '10000px' }))
    ])
  ]);
}

export function slideUp() {
  return trigger('slideTransition', [
    state('void', style({ 'padding-top': '-10px', opacity: '0' })),
    state('*', style({ 'padding-top': '30px', opacity: '1' })),
    transition(':enter', [
      animate('0.4s ease-in', style({ opacity: '1', 'padding-top': '30px' }))
    ])
  ]);
}

export function fadeInOut() {
  return trigger( 'enterAnimation', [
    transition(':enter', [
      style({transform: 'translateY(0%)', opacity: 0, 'max-height': '0px'}),
      animate('500ms', style({transform: 'translateY(0)', opacity: 1, 'max-height': '200px'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0)', opacity: 1}),
      animate('500ms', style({transform: 'translateY(100%)', opacity: 0, height: 0}))
    ])
  ]);
}
