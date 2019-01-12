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
- Input (with icon: right, left, loader)
- Icon (touchable with loader, simple icon without touchable)
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
