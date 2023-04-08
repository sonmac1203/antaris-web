import styles from './DarkOverlay.module.css';
export const DarkOverlay = () => {
  const style = {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1999',
    backgroundColor: 'black',
    opacity: '.75',
    cursor: 'pointer',
    animation: '.3s linear fadein',
    display: 'none',
  };
  return <div className={styles.Style} id='dark-overlay' />;
};
