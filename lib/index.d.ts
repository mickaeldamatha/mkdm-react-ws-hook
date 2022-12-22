import { Socket } from "socket.io-client";
interface SocketHookProps {
    url: string;
    socketServerPath: string;
    stateUpdateCallback: (message: any) => void;
    corsOrigin: string | string[];
}
export default function useWebSocket(props: SocketHookProps): {
    emit: (event: any, data: any) => Socket<any, any> | undefined;
    listen: (event: any, callback: Function) => void;
    emitAndListen: (event: any, data: any, callback: Function) => Promise<void>;
    stopListening: (event: string) => Promise<void>;
};
export {};
