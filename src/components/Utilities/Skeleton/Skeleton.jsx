import './skeleton.css';

function Skeleton({ type }) {
  const classes = `skeleton ${type}`;

  return (
    <div className='skeleton-wrapper-single'>
      <div className={classes}></div>
    </div>
  )
}

export default Skeleton;
