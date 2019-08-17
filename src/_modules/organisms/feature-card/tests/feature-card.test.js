'use strict';

import FeatureCard from '../feature-card';

describe('FeatureCard View', function() {

  beforeEach(() => {
    this.featureCard = new FeatureCard();
  });

  it('Should run a few assertions', () => {
    expect(this.featureCard);
  });

});
