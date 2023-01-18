import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | display-person', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DisplayPerson />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <DisplayPerson>
        template block text
      </DisplayPerson>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
