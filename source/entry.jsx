/*eslint-disable */
import './entry.scss';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Iterable, List } from 'immutable';
import _ from 'underscore';

// Functional Programming 101
//
// 1. "Shared mutable state is the root of all evil"
//
// In functional programming, all data is immutable.
// A piece of data once created is never changed.
// Instead, functions are responsible for creating new output data based on the input data.
//
// Below:: original data is an immutable array (List)
const labNamesOriginalBucket = List([
  '오*석', '강*경', '유*재', '이*선', '안*수', '정*영',
  '권*철', '김*열', '이*혜', '이*훈', '이*기', '오*철', '채*영',
  '이*은', '이*수', '배*섭', '양*승', '윤*규', '이*민',
  '박*영', '최*람', '장*민', '정*솜', '김*범',
  '권*희', '신*연', '권*',
  '이*', '이*정', '안*희', '문*열',
  '김*설', '은*현', '이*호', '박*현', '최*준',
]);

// Functional Programming 101
//
// 2. "Functions must be pure"
//
// A "pure" function is defined as follows:
//  1. Referential Transparency
//    For the given set of inputs, the output of the function must depend only on those inputs
//
//  2. Free of side-effects
//    Function must not create any observable side effects (such as mutating an input!)
//
// Below:: is an example of IMPURE function (because of RANDOMNESS)
const associateRandomNumber = (range) =>
  (name, index) => (
    {
      name,
      // number: Math.random(range) * 100,
      number: range - index,
    }
  );

// Below:: is an example of PURE function
const returnFieldValue = (field) =>
  (obj) => (
    obj[field]
  );

// Below:: pure also
const leaveOnlyField = (field) =>
  (obj) => (
    {
      [field]: obj[field],
    }
  );

// Below:: again, pure
const objectWithSingleFieldToValue = (obj) =>
  obj[Object.keys(obj)[0]];

// [1, 2, 3].map( number => number + 1 ) // returns new array with [2, 3, 4]
const shuffleLabNamesBucket = (iterable) =>
  iterable
    // .map(associateRandomNumber(100))
    // .sortBy(returnFieldValue('number'))
    // .map(leaveOnlyField('name'))
    // .map(objectWithSingleFieldToValue);

// custom PropType checker
const iterablePropTypeChecker = (props, propName, componentName) => {
  if (!Iterable.isIterable(props[propName])) {
    return new Error(`${componentName} received a non-iterable bucket`);
  }
  return null;
};


// a React component
//
// looks deceptively similar to above functions that we've built
//
// input: props
// output: DOM elements (view)
// Reactive programming uses functional utilities like
// map, filter, and reduce to create and process data flows
// which propogate changes through the system: hence, reactive.
// When input x changes, output y updates automatically in response.
//
// Now we know why the library is called React!
//
// Below:: Stateless Functional Components (PURE)
const GroupByTwo = (props) => (
  <div className="group-by-two">
    {
      props.bucket.map((name, index) =>
        <div key={index} className="group-by-two__column">
          <div className="group-by-two__item">
            {typeof name === 'object' ? JSON.stringify(name) : name}
          </div>
        </div>
      )
    }
  </div>
);

GroupByTwo.propTypes = {
  bucket: iterablePropTypeChecker,
};


// IMPURE
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBucket: this.props.initialBucket,
    };
  }
  render() {
    return (
      <div>
        <GroupByTwo
          bucket={shuffleLabNamesBucket(this.props.initialBucket)}
        />
      </div>
    );
  }
}

App.propTypes = {
  initialBucket: iterablePropTypeChecker,
};

// IMPURE
ReactDOM.render(<App initialBucket={labNamesOriginalBucket} />, document.getElementById('app'));
// Just to drive home the point

// Iterative
// var printCenter = function (str) {
//   var elem = document.createElement('div');
//   elem.textContent = str;
//   elem.style.position = 'absolute';
//   elem.style.top = window.innerHeight / 2 + 'px'; // this is a state (of the window)
//   elem.style.left = window.innerWidth / 2 + 'px'; // this is state (of the window)
//   document.body.appendChild(elem);
// };

// Functional (pure)
// var printSomewhere = function (str, height, width) { // explicitly passes in the height and width
//   var elem = document.createElement('div');
//   elem.textContent = str;
//   elem.stye.position = 'absolute';
//   elem.style.top = height;
//   elem.style.left = width;
//   return elem;
// };
// document.body.appendChild(
//   printSomewhere('hello world',
//   window.innerHeight / 2 + 10 + 'px',
//   window.innerWidth / 2 + 10 + 'px')
// );

// How functional approach is more useful and opens up possibilities for re-use
// var messages = ['Hi', 'Hello', 'Sup', 'Hey', 'Hola'];
// messages
//   .map((s, i) => printSomewhere(s, 100 * i * 10, 100 * i * 10))
//   .forEach(elem => document.body.appendChild(elem)); // does the DOM manipulation
