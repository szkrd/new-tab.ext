# new-tab.ext

Custom new tab page Chrome extension. 

* no spyware, no ads
* set page title or url

## installation

### using the build script

This method is not supported on Windows, sorry.

1. __optional__: put private key `new-tab.pem` into the root directory of the repo (use openssl or Chrome to generate one)
2. `npm run build`
3. drag and drop the crx in _build_ to Chrome

### packaging with Chrome

1. open settings/extensions
2. enable developer mode
3. load unpacked extension
4. pack extension

### from the releases

1. download crx
2. drag and drop the crx file to the Chrome extensions page
