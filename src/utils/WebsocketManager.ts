class WebsocketManager {
    private websocket: WebSocket | null = null;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * WebSocket 연결을 초기화합니다
     */
    connect() {
        if (this.websocket) {
            console.warn("WebSocket is already connected.");
            return;
        }

        this.websocket = new WebSocket(this.url);

        this.websocket.onopen = () => {
            console.log("WebSocket 연결 성공:", this.url);
        };

        this.websocket.onmessage = (event) => {
            console.log("메시지 수신:", event.data);
        };

        this.websocket.onerror = (error) => {
            console.error("WebSocket 오류 발생:", error);
        };

        this.websocket.onclose = () => {
            console.log("WebSocket 연결 종료");
            this.websocket = null; // 연결이 종료되면 null로 초기화
        };
    }

    /**
     * WebSocket으로 메시지를 전송합니다.
     * @param message 전송할 메시지
     */
    send(message: string) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
            console.log("메시지 전송:", message);
        } else {
            console.error("WebSocket 연결 상태가 유효하지 않습니다.");
        }
    }

    /**
     * WebSocket 연결을 종료합니다.
     */
    disconnect() {
        if (this.websocket) {
            this.websocket.close();
            console.log("WebSocket 연결을 종료합니다.");
        } else {
            console.warn("WebSocket이 이미 종료되었거나 연결되어 있지 않습니다.");
        }
    }

    /**
     * 메시지를 수신했을 때 작동할 함수를 설정합니다
     * @param callback 메시지 수신 시 실행할 콜백 함수
     */
    onMessage(callback: (message: string) => void) {
        if (this.websocket) {
            this.websocket.onmessage = (event) => {
                console.log("수신한 메시지:", event.data);
                callback(event.data);
            };
        } else {
            console.warn("WebSocket이 연결되지 않았습니다.");
        }
    }
}

export default WebsocketManager;