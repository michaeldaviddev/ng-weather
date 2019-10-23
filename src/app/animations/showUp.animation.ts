import {animate, state, style, transition, trigger} from "@angular/animations";

export const showUp = trigger('showUpElement',[
  state('in',style({opacity: 1, transform: 'scaleY(1)'})),
  transition(':enter',[
    style({opacity: 0, transform: 'scaleY(0)'}),
    animate(250)
  ])
]);
