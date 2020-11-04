import Head from 'next/head';

import { ExplorerMain } from '../../../components/Explorer';
import { DocumentTitle } from '../../constants';

export const Main = () => {
  return (
    <>
      <Head>
        <title>{DocumentTitle.Explorer}</title>
      </Head>
      {/* Todo: Add Swap later */}
      <div style={{ height: '70px' }}>
        <h1>Swap</h1>
      </div>
      <ExplorerMain />
    </>
  );
};

// Memo: Example code. Will remove here later

// import { Button } from '@swingby-protocol/pulsar';
// import Head from 'next/head';
// import { FormattedMessage } from 'react-intl';
// import { useSelector } from 'react-redux';

// export const Main = () => {
//   const data = useSelector((state) => state.demo.someProp);
//   return (
//     <>
//       <Button variant="primary" size="country">
//         <FormattedMessage id="generic.example" />
//       </Button>
//       <Button variant="secondary" size="country">
//         {data}
//       </Button>
//     </>
//   );
// };
