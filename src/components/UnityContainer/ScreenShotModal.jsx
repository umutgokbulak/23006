import { DownloadIcon } from '@radix-ui/react-icons';
import { m, LazyMotion, domAnimation } from 'framer-motion';
export default function ScreenshotModal({
  screenshotImage,
  downloadScreenshot,
  closeModal,
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='screenshot-modal'
      >
        <img src={screenshotImage} alt='screenshot' />

        <button onClick={closeModal} className='close-btn modal-btn'>
          Close
        </button>
        <button className='download-btn modal-btn' onClick={downloadScreenshot}>
          Download <DownloadIcon width={17} height={17} />
        </button>
      </m.div>
    </LazyMotion>
  );
}
