import './entry.scss';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Iterable, List } from 'immutable';
import _ from 'underscore';

// original data is an immutable array (List)
const labNamesOriginalBucket = List([
  '오*석', '강*경', '유*재', '이*선', '안*수', '정*영',
  '권*철', '김*열', '이*혜', '이*훈', '이*기', '오*철', '채*영',
  '이*은', '이*수', '배*섭', '양*승', '윤*규', '이*민',
  '박*영', '최*람', '장*민', '정*솜', '김*범',
  '권*희', '신*연', '권*',
  '이*', '이*정', '안*희', '문*열',
  '김*설', '은*현', '이*호', '박*현', '최*준',
]);

const associateRandomNumber = (range) =>
  (name) => (
    {
      name,
      number: Math.random(range) * 100,
    }
  );

const leaveOnlyField = (field) =>
  (obj) => (
    {
      [field]: obj[field],
    }
  );

const objectWithSingleFieldToValue = (obj) =>
  obj[Object.keys(obj)[0]];

const returnFieldValue = (field) =>
  (obj) => (
    obj[field]
  );

const shuffleLabNamesBucket = (iterable) =>
  iterable
    .map(associateRandomNumber(100))
    .sortBy(returnFieldValue('number'))
    .map(leaveOnlyField('name'))
    .map(objectWithSingleFieldToValue);

// custom PropType checker
const iterablePropTypeChecker = (props, propName, componentName) => {
  if (!Iterable.isIterable(props[propName])) {
    return new Error(`${componentName} received a non-iterable bucket`);
  }
  return null;
};

const GroupByTwo = (props) => (
  <div className="group-by-two">
    {
      props.bucket.map((name, index) =>
        <div key={index} className="group-by-two__column">
          <div className="group-by-two__item">
            {name}
          </div>
        </div>
      )
    }
  </div>
);

GroupByTwo.propTypes = {
  bucket: iterablePropTypeChecker,
};

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

ReactDOM.render(<App initialBucket={labNamesOriginalBucket} />, document.getElementById('app'));
