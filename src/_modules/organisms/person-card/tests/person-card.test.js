'use strict';

import PersonCard from '../person-card';

describe('PersonCard View', function() {

  beforeEach(() => {
    this.personCard = new PersonCard();
  });

  it('Should run a few assertions', () => {
    expect(this.personCard);
  });

});
