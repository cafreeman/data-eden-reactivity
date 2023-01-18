import Component from '@glimmer/component';
import { cachedFetch } from '../network/fetch';
import { tracked } from '@glimmer/tracking';

export default class DisplayPersonComponent extends Component {
  @tracked loading = false;
  @tracked person = null;

  constructor(owner, args) {
    super(owner, args);
    this.doFetch();
  }

  doFetch() {
    this.loading = true;
    cachedFetch('/api/users/1')
      .then((res) => {
        console.log('setting person via useState');
        this.person = res;
      })
      .finally(() => (this.loading = false));
  }
}
