const os = require('node:os');
const macosRelease = require('macos-release');
const windowsRelease = require('windows-release');

module.exports = function osName(platform, release) {
	if (!platform && release) {
		throw new Error('You can\'t specify a `release` without specifying `platform`');
	}

	platform = platform || os.platform();

	let id;

	if (platform === 'darwin') {
		if (!release && os.platform() === 'darwin') {
			release = os.release();
		}

		const prefix = release ? (Number(release.split('.')[0]) > 15 ? 'macOS' : 'OS X') : 'macOS';

		try {
			id = release ? macosRelease(release).name : '';

			if (id === 'Unknown') {
				return prefix;
			}
		} catch {}

		return prefix + (id ? ' ' + id : '');
	}

	if (platform === 'linux') {
		if (!release && os.platform() === 'linux') {
			release = os.release();
		}

		id = release ? release.replace(/^(\d+\.\d+).*/, '$1') : '';
		return 'Linux' + (id ? ' ' + id : '');
	}

	if (platform === 'win32') {
		if (!release && os.platform() === 'win32') {
			release = os.release();
		}

		id = release ? windowsRelease(release) : '';
		return 'Windows' + (id ? ' ' + id : '');
	}

	return platform;
}
