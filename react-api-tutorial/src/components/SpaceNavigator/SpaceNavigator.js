import React from 'react';
import styles from './SpaceNavigator.scss';
import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
// import RightIcon from 'react-icons/lib/md/chevron-right';

const cx = classNames.bind(styles);

const SpaceNavigator = ({ onPrev, onNext }) => {
  return (
    <div className={cx('space-navigator')}>
      <div className={cx('left', 'end')}>
        <div className={cx('circle')} onClick={onPrev}>
          <IoIosArrowBack />
        </div>
      </div>
      <div className={cx('right', 'end')}>
        <div className={cx('circle')} onClick={onNext}>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default SpaceNavigator;
