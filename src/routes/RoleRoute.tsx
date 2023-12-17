import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

// configs
import { PATH_NAME } from 'configs';
import { roleSelector } from 'redux/selectors/auth.selector';
import { useNavigate } from 'react-router';

// selectors

type IProps = {
  requireRoles: string[] | [];
};

const RoleRoute: FC<IProps> = ({ children, requireRoles = [] }) => {
  const navigate = useNavigate();
  const role = useSelector(roleSelector);

  useEffect(() => {
    if (!role || requireRoles.length === 0) return;

    const checkRole = requireRoles.includes(role);
    if (!checkRole) {
      navigate(PATH_NAME.ERROR_403);
    }
  }, [navigate, role, requireRoles]);

  return <>{children}</>;
};

export default RoleRoute;
