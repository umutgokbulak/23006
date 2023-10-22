import Skeleton from './Skeleton';
import Shimmer from './Shimmer';

export default function SkeletonLayout() {
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-option'>
        <Skeleton type='title' />
        <Skeleton type='thumbnail' />
        <Skeleton type='titleBig' />
        <Skeleton type='divider' />
        <Skeleton type='thumbnail' />
        <Skeleton type='titleBig' />
        <Skeleton type='thumbnail' />
        <Skeleton type='titleBig' />
        <Skeleton type='divider' />
        <Skeleton type='thumbnail' />
        <Skeleton type='titleBig' />
      </div>
      <Shimmer />
    </div>
  );
}
