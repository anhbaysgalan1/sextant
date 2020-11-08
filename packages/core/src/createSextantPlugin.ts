import { flattenDatabase } from './databaseUtilities';
import {
  Database,
  FlattenedDatabase,
  SextantPluginImplementation,
} from './types';
import * as fs from 'fs';
import * as path from 'path';
import { getTargetDir } from './fileSaveUtilities';

/**
 * The context passed down to your plugin implementation
 */
export interface SextantContext {
  /**
   * The entire database, for your perusal
   */
  database: FlattenedDatabase;
  /**
   * Write to a file. Relative paths will be resolved
   * within the target directory
   */
  writeFileSync: (relativePath: string, contents: string) => void;
}

/**
 * Creates a plugin which can be used to print files
 * based on the sextant database
 */
export const createSextantPlugin = <TConfig extends {}>(
  implementation: SextantPluginImplementation<TConfig>,
) =>
  function plugin(database: Database, config: TConfig) {
    implementation(
      {
        database: flattenDatabase(database),
        writeFileSync: (relativePath, contents) => {
          const targetDir = getTargetDir();
          fs.writeFileSync(path.resolve(targetDir, relativePath), contents);
        },
      },
      config,
    );
  };
