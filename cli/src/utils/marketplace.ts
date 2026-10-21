import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

interface MarketplaceEntry {
  name: string;
  source: string | { source: string; path?: string; [key: string]: unknown };
  [key: string]: unknown;
}

interface Marketplace {
  name: string;
  plugins: MarketplaceEntry[];
  [key: string]: unknown;
}

const MARKETPLACE_PATH = '.agents/plugins/marketplace.json';
const PLUGIN_NAME = 'finance-kit';

function getMarketplacePath(targetDir: string): string {
  return join(targetDir, MARKETPLACE_PATH);
}

function matchesPluginSource(entry: MarketplaceEntry, pluginRoot: string): boolean {
  const sourcePath = typeof entry.source === 'string' ? entry.source :
    entry.source?.source === 'local' ? entry.source.path : undefined;
  return entry.name === PLUGIN_NAME && sourcePath === `./${pluginRoot}`;
}

export async function loadMarketplace(targetDir: string): Promise<Marketplace> {
  const path = getMarketplacePath(targetDir);
  let content: string;
  try {
    content = await readFile(path, 'utf-8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return { name: 'finance-kit', interface: { displayName: 'Finance Kit' }, plugins: [] };
  }
  const marketplace = JSON.parse(content) as Marketplace;
  if (!marketplace || typeof marketplace.name !== 'string' || !marketplace.name ||
      !Array.isArray(marketplace.plugins) ||
      marketplace.plugins.some(entry => !entry || typeof entry.name !== 'string')) {
    throw new Error(`Invalid plugin marketplace: ${path}`);
  }
  return marketplace;
}

async function saveMarketplace(targetDir: string, marketplace: Marketplace): Promise<void> {
  const path = getMarketplacePath(targetDir);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(marketplace, null, 2) + '\n', 'utf-8');
}

export async function registerPlugin(
  targetDir: string,
  marketplace: Marketplace,
  pluginRoot: string
): Promise<void> {
  const entry: MarketplaceEntry = {
    name: PLUGIN_NAME,
    source: { source: 'local', path: `./${pluginRoot}` },
    policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
    category: 'Finance',
  };
  const plugins = marketplace.plugins.filter(plugin => plugin.name !== PLUGIN_NAME);
  await saveMarketplace(targetDir, { ...marketplace, plugins: [...plugins, entry] });
}

export async function unregisterPlugin(targetDir: string, pluginRoot: string): Promise<void> {
  const marketplace = await loadMarketplace(targetDir);
  const plugins = marketplace.plugins.filter(entry => !matchesPluginSource(entry, pluginRoot));
  if (plugins.length !== marketplace.plugins.length) {
    await saveMarketplace(targetDir, { ...marketplace, plugins });
  }
}
