import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'APPOCALYPSE'
  };
  render() {
    return (
      <View style={styles.home}>
        <Text>!!!APPOCALYPSE!!! is an app that tells you about the asteroids that are currently passing Earth, and whether any of them are potentially hazardous.</Text>
        <View style={styles.frontbutton}>
          <Button title="click here for today's outlook" onPress={() => this.props.navigation.navigate('Index')} color='green' />
        </View>
        <View style={styles.quote}>
          <Text>Potentially Hazardous Asteroids (PHAs) are currently defined based on parameters that measure the asteroid’s potential to make threatening close approaches to the Earth.</Text> <Text style={styles.red}>Specifically, all asteroids with a minimum orbit intersection distance (MOID) of 0.05 au or less and an absolute magnitude (H) of 22.0 or less are considered PHAs.</Text>
          <Text>~Center for Near Earth Object Studies, Nasa</Text>
        </View>
      </View>
    );
  }
}

class IndexScreen extends React.Component {
  static navigationOptions = {
    title: 'TODAY'
  };

  state = {
    asteroids: [],
    today: ''
  }

  componentDidMount() {
    this.makeDate();
    axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.today}&end_date=${this.state.today}&api_key=LSP2Gn16oEtpqZZr25CbqkRmogQ6TmCEb65QHSA1`)
      .then(res => {
        var x = Object.values(res.data)[2];
        var y = Object.values(x)[0];
        this.setState({asteroids: y});
      }
      );
  }

  onPress = (asteroid) => {
    this.props.navigation.navigate('Asteroid', {asteroid});
  }

  makeDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd < 10) {
      dd = '0'+dd;
    }

    if(mm < 10) {
      mm = '0'+mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    this.setState({today: today});
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          the outlook for
        </Text>
        <Text style={styles.title}>
          {this.state.today}
        </Text>
        <View style={styles.content}>
          {this.state.asteroids.map(asteroid =>
            <TouchableHighlight onPress={() => this.onPress(asteroid)} key={asteroid.name}>
              <View style={styles.button}><Text>asteroid name: {asteroid.name}</Text>
                {!asteroid.is_potentially_hazardous_asteroid && <Text style={styles.green}>i am a benign asteroid!</Text>}
                {asteroid.is_potentially_hazardous_asteroid && <Text style={styles.red}>i am a potentially hazardous asteroid.</Text>}</View>
            </TouchableHighlight>)}
        </View>
      </ScrollView>
    );
  }
}


class AsteroidScreen extends React.Component {
  static navigationOptions = {
    title: 'ASTEROID'
  };

 state = {
   dates: []
 }


 componentDidMount() {
   const { navigation } = this.props;
   const asteroid = navigation.getParam('asteroid', 'no asteroid...');

   axios.get(`${asteroid.links.self}`)
     .then(res => {
       this.setState({dates: Object.values(res.data.close_approach_data)});
     }
     );
 }

 render() {
   const { navigation } = this.props;
   const asteroid = navigation.getParam('asteroid', 'no asteroid...');


   return (
     <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.content}>
         <View style={styles.roll}>
           <Text>my name:</Text> <Text>{asteroid.name}</Text>
         </View>
         <View style={styles.roll}>
           <Text>my absolute magnitude:</Text>
           <Text>{asteroid.absolute_magnitude_h}</Text>

         </View>
         <View style={styles.roll}>
           <Text>date of closest approach:</Text> <Text>{asteroid.close_approach_data[0].close_approach_date}</Text>
         </View>
         <View style={styles.roll}>
           <Text>what i am orbiting:</Text> <Text>{asteroid.close_approach_data[0].orbiting_body}</Text>
         </View>
         <View style={styles.roll}>
           <Text>how big i am: </Text>
           <Text>between {asteroid.estimated_diameter.kilometers.estimated_diameter_min}km and {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km in diameter</Text>
         </View>
         <View style={styles.roll}>
           <Text>how fast i am going:</Text> <Text>{asteroid.close_approach_data[0].relative_velocity.kilometers_per_second}km per second</Text>
         </View>

         {Number(asteroid.close_approach_data[0].miss_distance.astronomical) <= 0.05 && <View style={styles.roll}>
           <Text style={styles.red}>distance by which i will miss Earth:</Text> <Text style={styles.red}>{asteroid.close_approach_data[0].miss_distance.kilometers}km or {asteroid.close_approach_data[0].miss_distance.astronomical}au</Text>
           <Text style={styles.red}>i might be too close for comfort...</Text>
         </View>}

         {Number(asteroid.close_approach_data[0].miss_distance.astronomical) > 0.05 && <View style={styles.roll}>
           <Text style={styles.green}>distance by which i will miss Earth:</Text> <Text style={styles.green}>{asteroid.close_approach_data[0].miss_distance.kilometers}km or {asteroid.close_approach_data[0].miss_distance.astronomical}au</Text>
           <Text style={styles.green}>i bid you hello from a safe distance!</Text>
         </View>}

         <View style={styles.guestbook}>
           <Text>all my known and knowable visits: {this.state.dates.length}</Text>

           {this.state.dates.map(date =>
             <View key={date.close_approach_date} style={styles.roll}>
               {Number(date.miss_distance.astronomical) <= 0.05 && <View>
                 <Text style={styles.red}>DANGER DAY</Text>
                 <Text style={styles.red}>date: {date.close_approach_date}</Text>
                 <Text style={styles.red}>distance from Earth: </Text>
                 <Text style={styles.red}>{date.miss_distance.kilometers}km or {date.miss_distance.astronomical}au</Text>
               </View>}
               {Number(date.miss_distance.astronomical) > 0.05 && <View>
                 <Text>date: {date.close_approach_date}</Text>
                 <Text>distance from Earth: </Text>
                 <Text>{date.miss_distance.kilometers}km or {date.miss_distance.astronomical}au</Text>
               </View>}
             </View>)}
         </View>
       </View>

     </ScrollView>
   );
 }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Index: IndexScreen,
    Asteroid: AsteroidScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'pink'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({

  home: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },

  container: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    color: 'purple'
  },

  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  frontbutton: {
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'pink',
    marginTop: 30
  },

  button: {
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'pink',
    borderColor: 'black',
    width: 250,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  green: {
    color: 'green'
  },

  red: {
    color: 'red'
  },

  roll: {
    width: 250,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  quote: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  },

  guestbook: {
    padding: 20,
    marginTop: 20,
    borderColor: 'pink',
    borderRadius: 20,
    borderWidth: 2
  }
});
