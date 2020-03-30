import React, { FC, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Dropdown.module.scss';
import DropDownIcon from '../Icons/DropDownIcon';

interface Props {
  /**
   * Define label. Default: ''
   */
  label?: string;

  /**
   * Define disabled option. Default: false
   */
  disabled?: boolean;

  /**
   * Define is opened option. Default: false
   */
  isOpen?: boolean;

  /**
   * Define callback on focus event.
   */
  onFocus?: () => void;

  /**
   * Define callback on blur event.
   */
  onBlur?: () => void;
}

const Dropdown: FC<Props> = ({ children, disabled = false, label = '', isOpen = false, onFocus = () => null, onBlur = () => null }) => {
  const ref = React.createRef<HTMLDivElement>();
  const [allowBlur, setAllowBlur] = useState(true);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      setAllowBlur(true);
    } else {
      setAllowBlur(false);
    }
  }, [ref]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('mouseover', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseover', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <label className={classNames(styles.label, { [styles.disabled]: disabled })}>
        {label}
        <span className={classNames(styles.arrow, { [styles.opened]: isOpen && !disabled })}>
          <DropDownIcon />
        </span>
        <input
          value=''
          onChange={() => null}
          className={classNames(styles.input, { [styles.disabled]: disabled })}
          onFocus={() => onFocus()}
          onBlur={() => allowBlur && onBlur()}
        />
      </label>
      <div className={classNames(styles.menu, { [styles.opened]: isOpen && !disabled })}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
