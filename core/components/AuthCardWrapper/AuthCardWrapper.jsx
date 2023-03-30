import styles from './AuthCardWrapper.module.css';

export const AuthCardWrapper = ({ children, title }) => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>{title}</h1>
      {children}
    </div>
  );
};
