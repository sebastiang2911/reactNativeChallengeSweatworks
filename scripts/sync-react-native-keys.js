const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const androidBuildGradlePath = path.join(
  projectRoot,
  'node_modules',
  'react-native-keys',
  'android',
  'build.gradle',
);
const scripts = [
  path.join(projectRoot, 'node_modules', 'react-native-keys', 'keysIOS.js'),
  path.join(projectRoot, 'node_modules', 'react-native-keys', 'keysAndroid.js'),
];

function patchReactNativeKeysAndroidBuildGradle() {
  if (!fs.existsSync(androidBuildGradlePath)) {
    return;
  }

  const original = fs.readFileSync(androidBuildGradlePath, 'utf8');
  let patched = original.replace(
    / {2}compileSdk(?:Version)? getExtOrIntegerDefault\("compileSdkVersion"\)/,
    '  compileSdk = getExtOrIntegerDefault("compileSdkVersion")',
  );

  patched = patched.replace(
    /def found = false[\s\S]*?def nodeModulesPath = nodeModulesDir\.toString\(\)\.replace\("\\\\", "\/"\)\s*def reactNativePath = reactNativeDir\.toString\(\)\.replace\("\\\\", "\/"\)/,
    `def nodeModulesDir = REACT_NATIVE_DIR.toPath().getParent()
def reactNativeAndroidDir = new File(REACT_NATIVE_DIR, "ReactAndroid")
if (!reactNativeAndroidDir.exists()) {
  reactNativeAndroidDir = new File(REACT_NATIVE_DIR, "android")
}

if(!reactNativeAndroidDir.exists()) {
  throw new GradleException(
    "\${project.name}: unable to locate React Native android sources. " +
      "Ensure you have you installed React Native as a dependency in your project and try again.")
}

def nodeModulesPath = nodeModulesDir.toString().replace("\\\\", "/")
def reactNativePath = reactNativeAndroidDir.toString().replace("\\\\", "/")`,
  );

  if (patched !== original) {
    fs.writeFileSync(androidBuildGradlePath, patched);
  }
}

patchReactNativeKeysAndroidBuildGradle();

for (const scriptPath of scripts) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
