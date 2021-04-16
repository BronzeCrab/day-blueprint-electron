It's free trello-like task tracker for everyday

## Used packages:

- react js
- electron
- react-electron-boilreplate [react-electron-boilreplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- react-smooth-dnd [react-smooth-dnd](https://github.com/kutlugsahin/react-smooth-dnd)
- react-tagsinput [react-tagsinput](https://github.com/olahol/react-tagsinput)
- react-chartjs-2 [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- react-quill [react-quill](https://github.com/zenoamaro/react-quill)

## How to run for using:

 - windows - just run exe
 - mac os - just run dmg
 - linux - just make AppImage file executable and run it

## How to run for development:

`git checkout main`

`git pull origin main`

`yarn install`

`yarn start`

## How to build package:

`git checkout main`

`git pull origin main`

`yarn install`

In order to make a package you need to run the command:
 - on Linux: `yarn package` (It will generate a folder called release and in this folder, you will found .appImage file)
 - on Windows: `yarn package:windows` (It will generate a folder called release and in this folder, you will found .exe file)
 - on MAC: `yarn package` (It will generate a folder called release and in this folder, you will found .dmg file)