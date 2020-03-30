import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './DropdownItem.module.scss';

interface Props {
  /**
   * Define callback on click event.
   */
  onClick?: () => void;

  /**
   * Define error option. Default: false
   */
  error?: boolean;
}

const DropdownItem: FC<Props> = ({ onClick, error = false, children }) => {
  return (
    <div className={classNames(styles.item, { [styles.error]: error })} onClick={onClick} onKeyDown={() => null} role='button' tabIndex={0}>
      {children}
    </div>
  );
};

export default DropdownItem;
