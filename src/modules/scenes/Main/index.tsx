import { Button } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

export const Main = () => {
  const data = useSelector((state) => state.demo.someProp);
  return (
    <>
      <Button variant="primary" size="country">
        <FormattedMessage id="generic.example" />
      </Button>
      <Button variant="secondary" size="country">
        {data}
      </Button>
      <h1>Hello World</h1>
    </>
  );
};
