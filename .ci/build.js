const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to run shell commands
function run(command) {
  console.log(`$ ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// Helper function to safely remove directory
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Helper function to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🦀 Building WebAssembly package for multiple targets...\n');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
removeDir('pkg');
removeDir('pkg-node');
removeDir('pkg-web');

// Build for Node.js
console.log('\n📦 Building for Node.js...');
run('wasm-pack build --target nodejs --out-dir pkg-node');

// Build for Web
console.log('\n🌐 Building for Web...');
run('wasm-pack build --target web --out-dir pkg-web');

// Patch web build with js files for dom functionality
console.log("\n🩹 Patching Web build...");
copyDir("js", "pkg-web/js");
const webPackageJson = JSON.parse(fs.readFileSync("pkg-web/package.json"));
webPackageJson.files.push("js");
webPackageJson.sideEffects.push("js/dom-elements.js");
fs.writeFileSync("pkg-web/package.json", JSON.stringify(webPackageJson, null, 2));
console.log("\n✅ Patch complete!\n");

console.log('\n🗑️ Removing .gitignore from Web and Node Builds...');
if (fs.existsSync('pkg-web/.gitignore')) {
  fs.unlinkSync('pkg-web/.gitignore');
}
if (fs.existsSync('pkg-node/.gitignore')) {
  fs.unlinkSync('pkg-node/.gitignore');
}
console.log('\n✅ Removal complete!\n');

// Read metadata from the generated package.json (using Node.js build)
console.log('\n📝 Extracting package metadata...');
const nodePackageJson = JSON.parse(
  fs.readFileSync('pkg-node/package.json', 'utf8')
);

// Extract metadata
const metadata = {
  name: nodePackageJson.name,
  version: nodePackageJson.version,
  description: nodePackageJson.description,
  author: nodePackageJson.author,
  license: nodePackageJson.license,
  repository: nodePackageJson.repository,
  keywords: nodePackageJson.keywords
};

console.log(`   Package: ${metadata.name}@${metadata.version}`);

// Create unified pkg directory
console.log('\n📁 Creating unified package structure...');
fs.mkdirSync('pkg', { recursive: true });

// Copy Node.js build
copyDir('pkg-node', 'pkg/node');

// Copy Web build
copyDir('pkg-web', 'pkg/web');

// Create main package.json with extracted metadata
const mainPackageJson = {
  name: metadata.name,
  version: metadata.version,
  description: metadata.description,
  main: './node/web_spf.js',
  types: './node/web_spf.d.ts',
  exports: {
    '.': {
      node: './node/web_spf.js',
      default: './node/web_spf.js'
    },
    './web': './web/js/dom_elements.js'
  },
  files: [
    'node',
    'web',
    'README.md'
  ],
  keywords: metadata.keywords,
  license: metadata.license
};

// Add optional fields if they exist
if (metadata.author) {
  mainPackageJson.author = metadata.author;
}
if (metadata.repository) {
  mainPackageJson.repository = metadata.repository;
}

fs.writeFileSync(
  'pkg/package.json',
  JSON.stringify(mainPackageJson, null, 2) + '\n'
);

// Copy README if it exists
if (fs.existsSync('README.md')) {
  fs.copyFileSync('README.md', 'pkg/README.md');
}

// Copy LICENSE if it exists
if (fs.existsSync('LICENSE_APACHE')) {
  fs.copyFileSync('LICENSE_APACHE', 'pkg/LICENSE_APACHE');
}

console.log('\n✅ Build complete!\n');

