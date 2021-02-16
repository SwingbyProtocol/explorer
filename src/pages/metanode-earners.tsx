import { GetServerSideProps } from 'next';

import { fetchNodeEarningsList } from '../modules/metanodes';
import { MetanodeEarners } from '../modules/scenes/Main';

type Props = { metanodes: React.ComponentPropsWithoutRef<typeof MetanodeEarners>['metanodes'] };

export default function MetanodesEarners({ metanodes }: Props) {
  return <MetanodeEarners metanodes={metanodes} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      metanodes: await (async () => {
        try {
          return await fetchNodeEarningsList();
        } catch (e) {
          return [];
        }
      })(),
    },
  };
};
