import checkUnique from '../methods/check-unique';
import ensureHasAllKeys from '../helpers/ensure-has-all-keys';
import { AuthenticationManagementBase } from './AuthenticationManagementBase';
import { makeDefaultOptions } from './index';

import type { SetRequired } from 'type-fest';
import type { DataCheckUnique, CheckUniqueOptions } from '../types';

export class CheckUniqueService extends AuthenticationManagementBase<DataCheckUnique, unknown> {
  options: CheckUniqueOptions;

  constructor (options: SetRequired<Partial<CheckUniqueOptions>, 'app'>) {
    super();
    ensureHasAllKeys(options, ['app'], this.constructor.name);
    const defaultOptions: Omit<CheckUniqueOptions, 'app'> = makeDefaultOptions(['service']);
    this.options = Object.assign(defaultOptions, options);
  }

  async _create (data: DataCheckUnique): Promise<unknown> {
    return await checkUnique(
      this.options,
      data.value,
      data.ownId,
      data.meta
    );
  }
}
