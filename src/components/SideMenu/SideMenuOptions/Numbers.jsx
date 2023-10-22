import { Suspense, memo } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';

const Numbers = memo(function Numbers({ onChoose }) {
  return (
    <Suspense fallback={'FALAN FILAN'}>
      <section className='options-section'>
        <div className='options-container-numbers'></div>
      </section>
    </Suspense>
  );
});

export default Numbers;
