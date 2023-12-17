import React, { useReducer, useContext, createContext } from 'react';

type IProps = {
  children: React.ReactNode;
};

type IContext = {
  modeTheme: string;
  setModeTheme: (mode: string) => void;
};

type IAction = {
  type: string;
  payload: any;
};

const initialState = {
  modeTheme: process.env.REACT_APP_THEME || 'light',
  setModeTheme: () => {},
};

const GlobalContext = createContext<IContext>(initialState);

const reducer = (state: IContext, { type, payload }: IAction) => {
  switch (type) {
    case 'SET_MODE_THEME': {
      return {
        ...state,
        modeTheme: payload,
      };
    }
    default:
      return state;
  }
};

const GlobalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _handleSetModeTheme = (mode: string) => {
    dispatch({
      type: 'SET_MODE_THEME',
      payload: mode,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setModeTheme: _handleSetModeTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalContext };
