import './entry.scss';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

const labNamesBucket = [
  '오*석', '강*경', '유*재', '이*선', '안*수', '정*영',
  '권*철', '김*열', '이*혜', '이*훈', '이*기', '오*철', '채*영',
  '이*은', '이*수', '배*섭', '양*승', '윤*규', '이*민',
  '박*영', '최*람', '장*민', '정*솜', '김*범',
  '권*희', '신*연', '권*',
  '이*', '이*정', '안*희', '문*열',
  '김*설', '은*현', '이*호', '박*현', '최*준',
];

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

const objectWithSingleFieldToArray = (obj) => (
  obj[_.keys(obj)[0]]
);

const shuffleLabNamesBucket = (array) =>
  _.chain(array)
    .map(associateRandomNumber(100))
    .sortBy((obj) => obj.number)
    .map(leaveOnlyField('name'))
    .map(objectWithSingleFieldToArray)
    .value();

const GroupByTwo = (props) => (
  <div className="group-by-two">
    {
      props.bucket.map(name =>
        <div className="group-by-two__column">
          <div className="group-by-two__item">
            {name}
          </div>
        </div>
      )
    }
  </div>
);

GroupByTwo.propTypes = {
  bucket: PropTypes.array,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      someState: null,
    };
  }
  render() {
    return (
      <div>
        <GroupByTwo
          bucket={shuffleLabNamesBucket(labNamesBucket)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
