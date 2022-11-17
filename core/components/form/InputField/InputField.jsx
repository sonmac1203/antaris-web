import React from 'react';
import styles from './InputField.module.css';

export const InputField = ({ label, type, accept, name, id, callback }) => {
  const inputClassName =
    type === 'file' ? styles.FileInputField : styles.TextInputField;
  return (
    <div>
      <label htmlFor={name} className={styles.InputLabel}>
        {label}
      </label>
      <input
        type={type}
        accept={accept}
        id={id}
        name={name}
        className={inputClassName}
        onChange={callback}
      />
    </div>
  );
};
