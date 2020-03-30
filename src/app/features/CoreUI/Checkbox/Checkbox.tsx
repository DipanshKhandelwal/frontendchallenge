import React, { FC, forwardRef, Ref, useCallback, useState, useRef } from 'react';
import classNames from 'classnames';

import Label from '../Label/Label';
import styles from './Checkbox.module.scss';
import CheckboxIcon from '../Icons/CheckboxIcon';
import useHover from '../../../../utils/hooks/useHover';
import useFocus from '../../../../utils/hooks/useFocus';

interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label to be displayed alongside with toggle input
   */
  label?: string;

  /**
   * Default value of toggle input, does not make the input controlled
   */
  defaultValue?: boolean;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (newChecked: boolean) => void;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement> | undefined;
}

const Checkbox: FC<Props> = forwardRef((props, ref) => {
  const { label, defaultValue, disabled, onChange, ...otherProps } = props;

  const [isChecked, setChecked] = useState(!!defaultValue);
  const [isFocussed, setIsFocussed] = useState(false);

  const checkbox = useRef<HTMLLabelElement>(null);
  const hasHover = useHover(checkbox);

  const toggle = useCallback(
    () => {
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange],
  );

  return (
    <Label ref={checkbox} title={label || ''} disabled={disabled} position='right'>
      <span className={classNames(styles.checkboxButton, {
        [styles.disabled]: disabled
      })} >
        <CheckboxIcon isActive={isChecked} hasHover={!disabled && (hasHover || isFocussed)} />
      </span>
      <input
        type='checkbox'
        className={styles.input}
        ref={ref}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        onFocus={() => setIsFocussed(true)}
        onBlur={() => setIsFocussed(false)}
        {...otherProps}
      />
    </Label>
  );
});

export default Checkbox;
