import styled from 'styled-components';

export const BrowserContainer = styled.div`
  display: grid;
  justify-content: center;
  .wrapper-browser {
    height: 50rem;
    max-width: 140rem;
    background: white;
    margin-top: 5rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border-radius: 1rem;
    box-shadow: 0 1.5rem 2.5rem -1rem rgba(43, 55, 74, 0.152644);
    .top-browser {
      height: 20rem;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 4rem;
    }
  }
`;
