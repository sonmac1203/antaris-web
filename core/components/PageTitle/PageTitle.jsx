import styles from './PageTitle.module.css';

export const PageTitle = ({ children, className }) => {
  return <h1 className={styles.Style + ' ' + className}>{children}</h1>;
};
