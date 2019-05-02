Base64 plugin for Cordova / PhoneGap
======================================================

This Plugin is used to encode base64 of any file, it uses js code for iOS, but incase of android it uses native code to handle android versions lower then v.3

## Prerequisites
```js
phonegap local plugin add org.apache.cordova.device
```

## Usage

Example Usage: 

```js
//filePath is the absolute path to the file(/mnt/sdcard/...)
window.plugins.Base64.encodeFile(filePath, function(base64){
 			console.log('file base64 encoding: ' + base64);
 		});
```

## Installation 

for Cordova >= 3.0.0

phonegap local plugin add https://github.com/hazemhagrass/phonegap-base64.git

cordova plugin add https://github.com/hazemhagrass/phonegap-base64.git

for Cordova >= 5.0.0

cordova plugin add com-badrit-base64

This has been successfully tested on Cordova 3.0 to 3.1.

## MIT Licence

Copyright 2013 Monday Consulting GmbH

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
