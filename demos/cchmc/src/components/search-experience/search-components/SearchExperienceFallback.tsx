'use client';
import { cn } from '@/lib/utils';
import { gridColsClass } from './constants';
import { SearchExperienceProps } from './models';
import { SearchSkeletonItem } from './SearchSkeletonItem';
import { useParams } from './useParams';
import { useSearchField } from './useSearchField';

export function SearchExperienceFallback(props: SearchExperienceProps) {
  const { params } = props;
  const { styles, id, pageSize, columns } = useParams(params);
  const { fieldsMapping } = useSearchField(props.fields.search.value);

  return (
    <div className={`component search-experience ${styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <div className="h-10 w-full max-w-md bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
          </div>

          <div className={cn('grid gap-6 mb-8', gridColsClass(Number(columns)))}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <SearchSkeletonItem
                variant={Number(columns) === 1 ? 'list' : 'card'}
                key={index}
                mapping={fieldsMapping}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
