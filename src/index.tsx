import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface SocketHookProps {
  url: string;
  socketServerPath: string;
  stateUpdateCallback: (message: any) => void;
  corsOrigin: string | string[];
}

export default function useWebSocket(props: SocketHookProps) {
  const manager = useRef<Socket<any, any> | undefined>();

  const connect = () => {
    manager.current = io(props.url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 250,
      path: props.socketServerPath,
      auth: {
        cors: {
          origin: props.corsOrigin || "*",
          methods: ["GET", "POST"],
          credentials: true,
        },
      },
    });
  };

  const emit = (event: any, data: any) => manager.current?.emit(event, data);

  const listen = (event: any, callback: Function) => {
    manager.current &&
      manager.current.on(event, (data: any) => {
        callback(data);
      });
  };

  const emitAndListen = async (event: any, data: any, callback: Function) => {
    console.log("emiteer");
    await new Promise((res: Function) => {
      emit(event, data);
      res();
    });
    manager.current &&
      manager.current.on(event, (result: any) => {
        callback(result);
      });
  };

  const stopListening = async (event: string) => {
    manager.current?.removeListener(event);
  };

  useEffect(() => {
    connect();
    return () => {
      manager.current?.removeAllListeners();
      return;
    };
  }, []);

  useEffect(() => {
    if (!manager.current) {
      return;
    }

    manager.current.on("connect_error", (error: Error) => {
      props.stateUpdateCallback({ state: "connect_error", error });
    });

    manager.current.on("disconnect", (reason: string) => {
      props.stateUpdateCallback({ state: "disconnect", reason });
    });
    manager.current.on("connect", () => {
      props.stateUpdateCallback({ state: "connect" });
    });
  }, [manager.current]);

  return {
    emit,
    listen,
    emitAndListen,
    stopListening,
  };
}
