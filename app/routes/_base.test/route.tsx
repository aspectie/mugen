import Filter from '@/components/filter/Filter'
import { filterSelects } from '@/lib/shiki'

function TestComponent() {
  const selects = filterSelects

  return (
    <div className="w-[320px]">
      <Filter
        type={'small'}
        selects={selects}
      ></Filter>
    </div>
  )
}

export default TestComponent
