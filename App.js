import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    if(goalTitle.length === 0) {
      alert('Please enter a goal');
      return;
    }
    //console.log(enteredGoal);
    // Get latest state snapshot of courseGoals and append enteredGoal to it
    // All state changes applied at once -> renders once not twice.
    setCourseGoals(courseGoals => [
      ...courseGoals,
      { id: Math.random().toString(), value: goalTitle }]); // Spread operator, add new element to old ones
      setIsAddMode(false);
  };

  const removeGoalHandler = goalID => {
    setCourseGoals(courseGoals => {
      return courseGoals.filter((goal) => goal.id !== goalID);
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData =>
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
