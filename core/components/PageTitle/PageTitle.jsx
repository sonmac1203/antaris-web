import styles from './PageTitle.module.css';

export const PageTitle = ({ children }) => {
  return <h1 className={styles.Style}>{children}</h1>;
};
