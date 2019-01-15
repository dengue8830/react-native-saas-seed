# react-native-saas-seed
Seed project with all the basics covered to build your SaaS project.

# Features

## Splash via images
- Use the toolbox npm package to generate the assets
TODO: native and flexible splash

## Connectivity message
- Shows a useful message to the user

## Service availibility message
- Shows a useful message to the user

## Basic useful components wrapping the native-base UI framework
- Input: themed with states (idle, error, loading) and sub-components (icon: right, left, loader)
- Button: themed with states (idle, error, loading) and sub-components (icon: right, left, loader)
- Icon (touchable with loader, simple icon without touchable)
- Full width and height message banners: error, loading, empty, custom
- TODO: describe other useful components
note: you can remove native-base and implement your custom code without changing the client components
note2: all the components use a theme you can define. See below

## Theme oriented architecture
- Separated files for theme and typed interfaces to be consistent
note: the main concern is allow a SaaS (software as a service) project so the native configuration and theming (colors) are builded to be as far as possible of the core.

## Crucial native modules installed in order to cover a basic maps and social app for ios and android
- Maps
- TODO: Facebook login
- Background geolocation
- Permissions request
- Dot Env
- Phone info

## Error handler
- Catch errors and show a message to the user
- Report errors to a server API
- Allows to show a critic error in order to close the app
- General error boundary to catch the root tree component error

## Typescript

## Env config
- Env config that allows use the env variables in js and native. TODO: Config the ios part
- Whe use a custom mechanism (npm script) to get the correct env variables (dev, prod, etc) because:
 1) The native config in ios is tricky and each update of xcode always breaks everything
 2) The native config for merging env variables (like local and dev) is too complicated
 3) The objective of this project is be useful for non white label apps and white label apps, so the env config must
 be as much flexible as it can.
 Advanteages:
 1) Maximun flexibility in build
 2) Zero native config in order to select the correct env file
 Disadvantages:
 1) Adds a previus step before generate any build. This allow upload a release build with a dev config :s
 So, we use this custom mechanism with this laws in order to prevent mistakes:
 1) Copy the desired env (eg: .env.development) and rename it as .env, the config lib will take care of the rest.
 2) Always use the npm script in order to generate a release build, that way we prevent mistakes like upload a release build with a dev config. Android: env file and release apk file will be generated automagically. IOs: env file will be generated and a message "You can upload with xcode now" will be shown.
 TODO: make an npm script to do that.