import { defaults } from 'lodash-es';

import Options from './options';

export class OptionsService {
  private static _options: Options = new Options();

  static setDefaults(options: Options) {
    OptionsService._options = options;
  }

  static build(options: Options): Options {
    return defaults({}, options, OptionsService._options);
  }
}
