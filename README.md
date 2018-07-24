
![landing page](/images/one.PNG)


# !APPOCALYPSE!
* [Get app](https://expo.io/@stephslye/appocalypse)
* [View repository on GitHub](https://github.com/stephslye/appocalypse)
* This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app)

Native app, 3-day individual project

This app checks if any nearby asteroids are potentially hazardous, using the NASA Near Earth Object Web Service API.


## Approach
Building this React Native app was actually really easy thanks to [Create React Native App](https://github.com/react-community/create-react-native-app), as well as my prior experience with React.

The [Expo](https://expo.io/) app made it incredibly easy to view and eventually deploy my app, whilst the main difference I found between React Native and React was how styling is done inline with StyleSheet.

![landing page](/images/two.PNG)

I also found a really nice [Calendar component](https://www.npmjs.com/package/react-native-calendar-datepicker) that allows the user to pick a date for which to check for asteroids. If no date is picked, the app checks for the current day.

![landing page](/images/three.PNG)

The Nasa API result states whether a given asteroid is a Potentially Hazardous Asteroid. Do not be unduly alarmed if you see a potentially hazardous asteroid listed! Nasa defines a hazardous asteroid as one with a minimum orbit intersection distance (MOID) of 0.05 au or less and an absolute magnitude (H) of 22.0 or less. However, it checks all instances of the asteroid passing Earth (asteroids return and return...), and if at least one instance meets the definition, then the asteroid is deemed potentially hazardous. That instance might not actually fall on the current date being checked. You can find out more about an asteroid by clicking through...

![landing page](/images/four.PNG)

![landing page](/images/five.PNG)

Nasa lists all the dates the asteroid passes Earth. By checking the miss distance in each instance, the app highlights the dates when the asteroid is indeed passing close enough to Earth to be considered hazardous.

![landing page](/images/six.PNG)


## Future improvements
* I created this app to try out React Native, and its function is incredibly basic -- it essentially takes a date and, using the Nasa API, lists out the asteroids associated with that date, and then the data about any given asteroid. A more useful app would perhaps present the data in a more visual manner, using charts or graphics to convey how near/far away a given asteroid is.


## Tools
* [Create React Native App](https://github.com/react-community/create-react-native-app)
* [Expo app](https://expo.io/)
* [Nasa Near Earth Object Web Service](https://api.nasa.gov/api.html#NeoWS)
* Atom text editor


## Contact
* hello@stephanieye.com
* http://stephanieye.com
