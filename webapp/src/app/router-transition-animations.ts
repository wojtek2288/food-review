import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
export const routeTransitionAnimations = trigger('triggerName', [
    transition('restaurants => dishes, dishes => users, restaurants => users, restaurants => reviews, dishes => reviews,\
                users => reviews, * => statistics, * => restaurantDetails, * => dishDetails, * => userDetails, * => login', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [style({ right: '-100%', opacity: 0 })]),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(':leave', [animate('0.5s ease-out', style({ right: '100%', opacity: 0 }))], { optional: true }),
            query(':enter', [animate('0.5s ease-out', style({ right: '0%', opacity: 1 }))])
           ]),
        query(':enter', animateChild())
      ]),
      transition('login => *, * => restaurants, statistics => reviews, statistics => users, statistics => dishes,\
                  users => dishes, reviews => users, reviews => dishes, restaurantDetails => *, dishDetails => *, userDetails => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [style({ left: '-100%', opacity: 0 })]),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [animate('0.5s ease-out', style({ left: '100%', opacity: 0 }))], { optional: true }),
          query(':enter', [animate('0.5s ease-out', style({ left: '0%', opacity: 1 }))], { optional: true })
         ]),
         query(':enter', animateChild())
       ]),
]);