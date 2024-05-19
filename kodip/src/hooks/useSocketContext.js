
import { useContext } from 'react';
import {SocketContext} from '../context/SocketProvider'


export const useSocketContext = () => {
    return useContext(SocketContext);
};
