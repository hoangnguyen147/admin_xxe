import React, { FC } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@mui/styles';

import { IconButton, Theme, Tooltip, TooltipProps } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  borderColor: {
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(206, 203, 203, 0.12)'}`,
  },
}));

type IProps = TooltipProps & {
  title: string | React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isBorderColor?: boolean;
  id?: string;
};

const DefaultPage: FC<IProps> = ({ title, color = 'inherit', isBorderColor = false, children, onClick, id }) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <IconButton id={id} color={color} onClick={onClick} className={clsx(isBorderColor && classes.borderColor)} size="large">
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default DefaultPage;
