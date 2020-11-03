import React from 'react';

import { addComma } from '../../utils/addComma';
import capacity from '../../assets/icons/network/NetworkCapacity.svg';
import rewards from '../../assets/icons/network/NetworkRewards.svg';
import validators from '../../assets/icons/network/NetworkValidators.svg';
import volume from '../../assets/icons/network/NetworkVolume.svg';

import { ExplorerInfosContainerContainer } from './ExplorerInfosContainer.styles';

const ExplorerInfos = (): JSX.Element => {
  const dummyData = [
    {
      icon: volume,
      description: 'Volume (24hr)',
      value: '$' + addComma(128130, 0),
    },
    {
      icon: rewards,
      description: 'Rewards (24hr)',
      value: '$' + addComma(128130, 0),
    },
    {
      icon: capacity,
      description: 'Capacity (Float)',
      value: '$' + addComma(128130, 0),
    },
    { icon: validators, description: 'Validators', value: 50 },
  ];

  return (
    <ExplorerInfosContainerContainer>
      <div className="infos-container">
        {dummyData.map((info) => {
          return (
            <div className="info-container" key={info.icon}>
              <img src={info.icon} alt={info.icon} className="icon-image" />
              <div className="data">
                {info.description === 'Validators' ? (
                  <div className="row-validator">
                    <span>{info.description}</span>
                    <span className="validator-link">All</span>
                  </div>
                ) : (
                  <div className="row">
                    <span>{info.description}</span>
                  </div>
                )}

                <div className="row">
                  <span className="value-text">{info.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ExplorerInfosContainerContainer>
  );
};

export default ExplorerInfos;
