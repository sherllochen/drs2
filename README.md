# DRS2
An Electron application for audio files playing, for 5MBS.

## Customize info
### Start the application with an argument of local folder path
```bat
// Actuall usage
drs2.exe --input="the_folder_path"
// local dev, update the line in package.json
"start:main": "concurrently -k \"cross-env NODE_ENV=development TS_NODE_TRANSPILE_ONLY=true webpack --watch --config ./.erb/configs/webpack.config.main.dev.ts\" \"electronmon . --input=\"helloWorld\"  \"",

```

