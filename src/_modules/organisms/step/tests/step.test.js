'use strict';

import Step from '../step';

describe('Step View', function() {

  beforeEach(() => {
    this.step = new Step();
  });

  it('Should run a few assertions', () => {
    expect(this.step);
  });

});
