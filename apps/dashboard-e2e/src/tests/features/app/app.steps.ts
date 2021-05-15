import { Before, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  checkMenuItems,
  checkMenuLinks,
  checkSideNavVisibility,
  checkToggleBtn,
  checkToolbarTitle,
  clickToggleBtn,
  state,
} from '../../../support/pages/app.po';

Before(() => {
  cy.loadData(['workouts', 'movements']);
  cy.visit('/');
});

When('I click the toggle button', () => clickToggleBtn());

Then('I should see the toggle button', () => checkToggleBtn());

Then('I should see the side navigation', () => checkSideNavVisibility(true));

Then('I should not see the side navigation', () =>
  checkSideNavVisibility(false)
);

Then('I should see all menu items in the side navigation', () =>
  checkMenuItems(state.links)
);

Then('I should see the correct title', () => checkToolbarTitle(state.title));

Then('I should be able to navigate menu links', () =>
  checkMenuLinks(state.links)
);
