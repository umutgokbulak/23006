import './UserTutorial.css';
import SvgLine from '../Utilities/SvgLine/SvgLine';
export default function UserTutorial({ handleHelp }) {
  return (
    <section className='tutorial-container-overlay'>
      <button
        className='btn tutorial-close-btn'
        onClick={handleHelp}
      >
        Close123
      </button>
      <SvgLine />
    </section>
  );
}
