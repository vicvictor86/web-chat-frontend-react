import React from 'react';

interface ConnectionStateProps {
  isConnected: boolean;
}

export const ConnectionState: React.FC<ConnectionStateProps> = ({ isConnected }) => {
  return <p>State: { '' + isConnected }</p>;
}