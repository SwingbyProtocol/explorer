import styled from 'styled-components';

export const HeaderContainer = styled.div`
  .wrapper-header {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      padding-right: 4rem;
      padding-left: 4rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #cecddc;
    }
    .left {
      display: flex;
      align-items: center;
      .logo {
        width: 22rem;
        :hover {
          cursor: pointer;
        }
      }
      .menu {
        margin-left: 5rem;
        width: 20rem;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 1.4rem;
          :hover {
            cursor: pointer;
          }
        }
      }
    }
    .right {
      .ui.dropdown {
        display: flex;
      }
      .icon {
        padding-top: 0.1rem;
        margin-left: 0.2rem;
        font-weight: bolder;
        font-size: 1.6rem;
        color: #31d5b8;
      }
    }
  }
`;