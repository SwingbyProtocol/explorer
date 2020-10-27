import { Button } from '@swingby-protocol/pulsar';
import { useSelector } from 'react-redux';

export const Main = () => {
  const data = useSelector((state) => state.demo.someProp);
  return (
    <>
      <Button variant="primary" size="country">
        A test {data}
      </Button>
    </>
  );
};
