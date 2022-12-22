import { useEffect, useRef } from "react";
import io from "socket.io-client";
export default function useWebSocket(props) {
    const manager = useRef();
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
    const emit = (event, data) => { var _a; return (_a = manager.current) === null || _a === void 0 ? void 0 : _a.emit(event, data); };
    const listen = (event, callback) => {
        manager.current &&
            manager.current.on(event, (data) => {
                callback(data);
            });
    };
    const emitAndListen = async (event, data, callback) => {
        console.log("emiteer");
        await new Promise((res) => {
            emit(event, data);
            res();
        });
        manager.current &&
            manager.current.on(event, (result) => {
                callback(result);
            });
    };
    const stopListening = async (event) => {
        var _a;
        (_a = manager.current) === null || _a === void 0 ? void 0 : _a.removeListener(event);
    };
    useEffect(() => {
        connect();
        return () => {
            var _a;
            (_a = manager.current) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
            return;
        };
    }, []);
    useEffect(() => {
        if (!manager.current) {
            return;
        }
        manager.current.on("connect_error", (error) => {
            props.stateUpdateCallback({ state: "connect_error", error });
        });
        manager.current.on("disconnect", (reason) => {
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
//# sourceMappingURL=index.js.map