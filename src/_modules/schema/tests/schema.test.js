'use strict';

import Schema from '../schema';

describe('Schema View', function() {

  beforeEach(() => {
    this.schema = new Schema();
  });

  it('Should run a few assertions', () => {
    expect(this.schema);
  });

});
