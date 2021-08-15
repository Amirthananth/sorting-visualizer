import "./SortingViz.css";
import { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";

function SortingViz() {
  const ANIMATION_SPEED_MS = 1;
  const NUMBER_OF_ARRAY_BARS = 430;
  const PRIMARY_COLOR = "turquoise";
  const SECONDARY_COLOR = "red";

  const [arrayValue, setArrayValue] = useState([]);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 850));
    }
    setArrayValue(array);
  };

  useEffect(() => {
    resetArray();
  }, []);

  const mergeSort = () => {
    const animations = getMergeSortAnimations(arrayValue);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const quickSort = () => {};
  const heapSort = () => {};
  const bubbleSort = () => {};

  const testingAlgorithms = () => {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  };

  return (
    <div className="array-container">
      {arrayValue.map((value, index) => (
        <div
          className="array-bar"
          key={index}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}
        ></div>
      ))}
      <button onClick={() => resetArray()}> Generate New Array </button>
      <button onClick={() => mergeSort()}> Merge Sort </button>
      <button onClick={() => quickSort()}> Quick Sort </button>
      <button onClick={() => heapSort()}> Heap Sort </button>
      <button onClick={() => bubbleSort()}> Bubble Sort </button>
      <button onClick={() => testingAlgorithms()}>Test Algorithms</button>
    </div>
  );

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
  }
}

export default SortingViz;
