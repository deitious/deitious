const fs = require('fs/promises');
const path = require('path');

class PluginManager {
  constructor(directory) {
    this.directory = directory; // Path to the plugins directory
    this.pluginCache = new Map(); // Cache for loaded plugins
  }

  // Load all plugins from the directory
  async loadPlugins() {
    try {
      const folders = await fs.readdir(this.directory);

      for (const folder of folders) {
        const folderPath = path.join(this.directory, folder);
        const stats = await fs.stat(folderPath);

        // Only process directories
        if (stats.isDirectory()) {
          const files = await fs.readdir(folderPath);

          for (const file of files.filter(file => file.endsWith('.js'))) {
            const filePath = path.join(folderPath, file);

            try {
              // Load and cache the plugin if not already cached
              if (!this.pluginCache.has(filePath)) {
                const plugin = require(filePath);

                if (plugin && plugin.command && typeof plugin.operate === 'function') {
                  this.pluginCache.set(filePath, plugin);
                } else {
                  console.warn(`Invalid plugin structure in: ${filePath}`);
                }
              }
            } catch (error) {
              console.error(`Error loading plugin (${filePath}):`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error loading plugins:`, error);
    }
  }

  // Unload a specific plugin
  async unloadPlugin(filePath) {
    if (this.pluginCache.has(filePath)) {
      try {
        const plugin = this.pluginCache.get(filePath);

        // Call the plugin's cleanup method if defined in the plugin
        if (typeof plugin.cleanup === 'function') {
          await plugin.cleanup();
        }

        // Remove from cache and memory
        delete require.cache[require.resolve(filePath)];
        this.pluginCache.delete(filePath);
        console.log(`Plugin unloaded: ${filePath}`);
      } catch (error) {
        console.error(`Error unloading plugin (${filePath}):`, error);
      }
    }
  }

  // Unload all plugins
  async unloadAllPlugins() {
    for (const filePath of this.pluginCache.keys()) {
      await this.unloadPlugin(filePath);
    }
    console.log('All plugins unloaded.');
  }

  // Execute a command within a plugin
  async executePlugin(globalContext, command) {
    for (const plugin of this.pluginCache.values()) {
      try {
        // Check if the plugin handles the command
        if (plugin.command.includes(command)) {
          // Run the plugin
          await plugin.operate(globalContext);
          return true; // Stop after the first matching plugin
        }
      } catch (error) {
        console.error(`Error executing plugin (${plugin.command}):`, error);
      }
    }
    return false; // No matching plugin found
  }
}

module.exports = PluginManager;