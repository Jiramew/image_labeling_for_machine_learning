# An image file labeling tool for machine learning and deeplearning based on electron.

## Install
Download from release of both Mac OS and Windows version.

## Screenshot
 ![image](https://github.com/Jiramew/image_labeling_for_machine_learning/raw/master/github_image_readme.png)

## Usage
1. <kbd>Ctrl/⌘+O</kbd> to Open Image files.(\*.png/\*.jpg) (PS: If the image files are pre-labeled, the filename should follow the format of `image_{label}_timestamp.png/jpg, or the label won't be recognized`)
2. <kbd>Ctrl/⌘+Alt+O</kbd> to Open saved label file.(\*.ljson)
3. <kbd>Ctrl/⌘+S</kbd> to save label file.(\*.ljson)
4. When the images have been loaded, use <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to navigate from image to image.
5. <kbd>Ctrl/⌘+&larr;</kbd>, <kbd>Ctrl/⌘+&rarr;</kbd> and <kbd>Shift+&larr;</kbd>, <kbd>Shift+&rarr;</kbd> arrow keys will help you to navigate faster to 10x and 100x respectively.

## Development
1. First: `npm install`
2. Webpack: `npm run dev`
3. Start electron: `npm start`

## Production
1. First: `npm install`
2. Webpack: `npm run postinstall`, and change `index.html` to use `bundle.js` built in last step.
3. Start electron: `npm start`
4. Package: `electron-packager .`
