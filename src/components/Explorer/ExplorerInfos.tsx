import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

import { addComma } from '../../modules/utils/addComma';
import { DescribeSpan } from '../customSpan.styles';

import { ExplorerInfosContainerContainer } from './ExplorerInfos.styles';

const ExplorerInfos = (): JSX.Element => {
  const dummyData = [
    {
      icon: <Icon.NetworkVolume className="icon-image" />,
      description: 'Volume (24hr)',
      value: '$' + addComma(128130, 0),
    },
    {
      icon: <Icon.NetworkRewards className="icon-image" />,
      description: 'Rewards (24hr)',
      value: '$' + addComma(128130, 0),
    },
    {
      icon: <Icon.NetworkCapacity className="icon-image" />,
      description: 'Capacity (Float)',
      value: '$' + addComma(128130, 0),
    },
    {
      icon: <Icon.NetworkValidators className="icon-image" />,
      description: 'Validators',
      value: 50,
    },
  ];

  return (
    <ExplorerInfosContainerContainer>
      <div className="infos-container">
        {dummyData.map((info, i) => {
          return (
            <div className="info-container" key={i}>
              {info.icon}
              <div className="data">
                {info.description === 'Validators' ? (
                  <div className="row-validator">
                    <DescribeSpan>{info.description}</DescribeSpan>
                    <span className="validator-link">All</span>
                  </div>
                ) : (
                  <div className="row">
                    <DescribeSpan>{info.description}</DescribeSpan>
                  </div>
                )}

                <div className="row">
                  <DescribeSpan className="value-text">{info.value}</DescribeSpan>
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
