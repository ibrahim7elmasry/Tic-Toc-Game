
import React, {Component} from 'react';
import {
 SafeAreaView,
 View,
 Text,
 StatusBar,
 TouchableOpacity,
 Alert,
 Button,
} from 'react-native';
import styles from './styles';
 
import IconX from 'react-native-vector-icons/Ionicons'
import IconO from 'react-native-vector-icons/MaterialCommunityIcons'
const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'

class  Game extends Component {
  constructor(props){
    super(props);
    this.state = {
        gameState :[
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
      ],
        currentPlayer : 1
    }
  }
  componentDidMount =()=>{
    this.initializeGame();
  }

    initializeGame() {
      this.setState({gameState: 
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
      ],
      currentPlayer: 1,

      });
    }

    winnerPlayer =()=>{
      // return 1 if Player number 1 won ... return -1 if player number 2 won ... return 0 if no one has won
      const numOfCells = 3;
      let arr = this.state.gameState;
      let sum;

      // Check rows..
      for (let i = 0; i < numOfCells; i++) {
        sum = arr[i][0] + arr[i][1] + arr[i][2];
        if(sum == 3){
          return 1;
        }
        else if (sum == -3){
          return -1;
        }
        

        // Check columns..
        for (let i = 0; i < numOfCells; i++) {
          sum = arr[0][i] + arr[1][i] + arr[2][i];
          if (sum == 3) {
          return 1;
          }
          else if (sum == -3){
            return -1;
          }
        
          // Check left diagnol.. 
          sum = arr[0][0] + arr[1][1] + arr[2][2];
          if (sum == 3) {
            return 1;
            }
            else if (sum == -3){
              return -1;
            }

               // Check right diagnol.. 
          sum = arr[2][0] + arr[1][0] + arr[0][2];
          if (sum == 3) {
            return 1;
            }
            else if (sum == -3){
              return -1;
            }

            // Check if there are no winners..
            return 0;
          
        }
      }


    }

    onCellPress =(row, column) => {
      
      // Don’t allow cell to change one more time
      let val = this.state.gameState[row][column];
      if (val !== 0){ return <View /> }

      let currentPlayer = this.state.currentPlayer;

      // Set the cell to an a sign (X or O)
      let arr = this.state.gameState.slice();
      arr[row][column] = currentPlayer;
      this.setState({gameState: arr});

      // Switch to next player
      let nextPlayer = (currentPlayer == 1) ? -1  : 1
      this.setState({currentPlayer: nextPlayer})

      // Check for the winner player.. 
      let winner = this.winnerPlayer();
      if (winner == 1) {
        Alert.alert("Player 1 is the WINNER 🏆🎉👏🏼");
        this.initializeGame();
      }
      else if (winner == -1){
        Alert.alert("Player 2 is the WINNER 🏆🎉👏🏼 ");
        this.initializeGame();
      }

  }

  newGame =()=>{
    this.initializeGame();
  }

renderIcon=(row, column)=>{
  let val = this.state.gameState[row][column];
  switch (val) {
    case 1: return  <IconX name='md-close' style={styles.cellX} />
    case -1 : return <IconO name='circle-outline' style={styles.cellO} />
    default: return <View />
  }
}



 render(){
 return (
   
      <View style={styles.root}>
         <View  style={styles.container}>

        <TouchableOpacity 
            onPress = { ()=> this.onCellPress(0, 0)}
            style={[styles.cell  ,{borderLeftWidth:0, borderTopWidth:0}]} >
            {this.renderIcon(0, 0)}
        </TouchableOpacity>

          <TouchableOpacity
              onPress = {() => this.onCellPress(0, 1)}
              style={[styles.cell, {borderTopWidth:0}]} >
              {this.renderIcon(0, 1)}
           </TouchableOpacity>

          <TouchableOpacity 
              onPress = {()=> this.onCellPress(0, 2)}
              style={[styles.cell, {borderTopWidth:0, borderRightWidth:0}]} >
              {this.renderIcon(0, 2)}
          </TouchableOpacity>

       </View>

         <View style={styles.container}>

          <TouchableOpacity 
            onPress = {()=> this.onCellPress(1, 0)}
          style={[styles.cell, {borderLeftWidth:0}]} > 
          {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity 
              onPress = {()=> this.onCellPress(1, 1)}
              style={[styles.cell, {borderTopWidth:0}]} > 
              {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity 
              onPress = {()=> this.onCellPress(1, 2)}
              style={[styles.cell, {borderTopWidth:0, borderRightWidth:0}]}> 
              {this.renderIcon(1, 2)}
          </TouchableOpacity>
          </View>





         <View  style={styles.container}>

          <TouchableOpacity
              onPress = {()=> this.onCellPress(2, 0)}
              style={[styles.cell, {borderLeftWidth:0,borderBottomWidth:0 }]} >
              {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress = {()=> this.onCellPress(2, 1)}
            style={[styles.cell, {borderBottomWidth:0}]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress = {()=> this.onCellPress(2, 2)}
            style={[styles.cell, {borderBottomWidth:0,  borderRightWidth:0}]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>

          </View>

          
          <View  style={{paddingTop:100}}/>
              <Button 
                     title="New Game"
                    onPress={()=> this.newGame()}
                  >
                  </Button>
        
         </View>
 )
}
}



export default Game;
