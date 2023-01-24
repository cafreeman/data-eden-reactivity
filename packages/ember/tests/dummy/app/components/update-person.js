import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cachedFetch } from '../network/fetch';

export default class UpdatePersonComponent extends Component {
  @tracked inputValue = '';

  handleInputChange = (e) => {
    this.inputValue = e.currentTarget.value;
  };

  handleSubmit = () => {
    cachedFetch('/api/users/1', {
      method: 'PUT',
      body: JSON.stringify({ name: this.inputValue }),
    }).then(() => {
      this.inputValue = '';
    });
  };
}
