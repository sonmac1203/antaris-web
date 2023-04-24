import { Button } from 'react-bootstrap';
import styles from './Homepage.module.css';
export const Homepage = () => {
  return (
    <div className={`core-container d-flex flex-wrap ${styles.Container}`}>
      <div className={styles.LeftCol}>
        <h1 className={styles.HeroText}>
          Streamlining
          <br className={styles.HideAtSmall} /> survey delivery
        </h1>
        <p className={`${styles.HeroParagraph}`}>
          Antaris connects participants to clinical surveys and health
          interventions, while empowering researchers with an intuitive
          management dashboard.
        </p>
        <div className='d-flex align-items-center gap-2'>
          <Button className='d-flex align-items-center gap-2'>
            Get started
            <i className='fa-solid fa-play' style={{ fontSize: '12px' }} />
          </Button>
          <Button
            variant='outline-primary'
            className='d-flex align-items-center gap-2 text-decoration-none'
          >
            Documentation
            <i className='fa-regular fa-file-code' />
          </Button>
        </div>
        <div>
          <Button
            variant='link'
            className='d-flex align-items-center gap-2 text-decoration-none p-0 text-secondary mt-4'
            style={{ fontSize: '12px' }}
          >
            See how to use Antaris
            <i className='fa-solid fa-circle-info' />
          </Button>
        </div>
      </div>
      <div className={styles.RightCol}>
        <img src='/landing/hero-image.svg' className={styles.HeroImage} />
      </div>
    </div>
  );
};
