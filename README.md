# A image file labeling tool for machine learning and deeplearning based on electron.                

## Install
Download from release.

## Usage
1. <kbd>Ctrl/?+O</kbd> to Open Image files.(\*.png/\*.jpg) (PS: The name of images files to be labeled should has the format of `image_{label}_timestamp.***`)
2. <kbd>Ctrl/?+Alt+O</kbd> to Open saved label file.(\*.ljson)
3. <kbd>Ctrl/?+S</kbd> to save label file.(\*.ljson)
4. When the images have been loaded, use <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to navigate from image to image.
5. <kbd>Ctrl/?+&larr;</kbd>, <kbd>Ctrl/?+&rarr;</kbd> and <kbd>Shift+&larr;</kbd>, <kbd>Shift+&rarr;</kbd> arrow keys will help you to navigate faster to 10x and 100x respectively.

## Development
1. First: `npm install`
2. Webpack: `npm run dev`
3. Start electron: `npm start`

## Production
1. First: `npm install`
2. Webpack: `npm run postinstall`, and change `index.html` to use `bundle.js` built in last step.
3. Start electron: `npm start`