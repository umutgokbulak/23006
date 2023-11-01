import arrowDown from '/assets/SvgArrows/arrowDown.svg';
import arrowRight from '/assets/SvgArrows/arrowRight.svg';
import './UserTutorial.css';
export default function UserTutorial({ handleHelp }) {
  return (
    <section className='tutorial-container-overlay'>
      <button
        className='btn tutorial-close-btn'
        onClick={handleHelp}
      >
        Close
      </button>
      <img
        className='tutorial-arrow downArrow'
        src={arrowDown}
        alt='arrowDown'
      />
      <img
        className='tutorial-arrow rightArrow'
        src={arrowRight}
        alt='arrowDown'
      />
    </section>
  );
}
