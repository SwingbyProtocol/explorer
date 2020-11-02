import React from 'react';
import { customMedia } from 'src/styles/globalStyle';
import { localTheme } from 'src/styles/localTheme';
import { addComma } from 'src/utils/addComma';
import styled from 'styled-components';

import capacity from '../../assets/icons/network/NetworkCapacity.svg';
import rewards from '../../assets/icons/network/NetworkRewards.svg';
import validators from '../../assets/icons/network/NetworkValidators.svg';
import volume from '../../assets/icons/network/NetworkVolume.svg';

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
    <ExplorerInfosContainer>
      <div className="wrapper-explorer-infos">
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
      </div>
    </ExplorerInfosContainer>
  );
};

export default ExplorerInfos;

const ExplorerInfosContainer = styled.div`
  .wrapper-explorer-infos {
    border-right: 0.1rem solid ${localTheme.colors.rat};
    border-left: 0.1rem solid ${localTheme.colors.rat};
    padding-right: 2rem;
    padding-left: 3rem;
  }
  .infos-container {
    padding-top: 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    ${customMedia.greaterThan('macBook13')`
      padding-left: 6%;
      padding-right: 6%;
    `}
  }

  .info-container {
    min-width: 16rem;
    display: grid;
    grid-template-columns: 5rem auto;
    align-items: center;
    .icon-image {
      width: 3rem;
      opacity: 0.3;
    }
    .data {
      display: grid;
      grid-row-gap: 0.4rem;
      .row {
        display: grid;
        grid-template-columns: 5rem auto;
        white-space: nowrap;
        .value-text {
          font-size: 1.8rem;
          font-weight: bold;
        }
      }
      .row-validator {
        display: flex;
        .validator-link {
          margin-left: 1.2rem;
          color: ${localTheme.colors.teal};
          border-bottom: 0.1rem solid ${localTheme.colors.teal};
          margin-bottom: -0.1rem;
          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
