import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "qrcode";
import WebsocketManager from "../../utils/WebsocketManager.ts";

const main_url = "qrgate.xyz";
const client_url = "qrgate.pages.dev";
const BASE_URL = "https://" + main_url + "/api";
const CURRENT_URL = client_url;

const QR: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [qrCodeBase64, setQrCodeBase64] = useState("");
    const [timer, setTimer] = useState(300); // 5분(300초) 타이머
    const [websocketManager, setWebsocketManager] = useState<WebsocketManager | null>(null);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (isClicked) {
            reception_start();

            // 5분 타이머 시작
            timerId = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        handleTimeout();
                        clearInterval(timerId);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isClicked]);

    const reception_start = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/qr/start`);
            const targetUrl = `${CURRENT_URL}/login?token=${response.data.token}`;
            console.log("로그인 URL:", targetUrl);

            // QR 코드 생성 및 Base64 변환
            const qrCodeUrl = await QRCode.toDataURL(targetUrl);
            setQrCodeBase64(qrCodeUrl);

            // WebSocket 설정
            const websocketUrl = `${BASE_URL}/qr/ws/loading/${response.data.token}`;
            const wsManager = new WebsocketManager(websocketUrl);

            wsManager.connect();
            wsManager.onMessage((message) => {
                console.log(message);
                if (message === "success") {
                    alert("로그인 완료");
                    wsManager.disconnect();
                    handleTimeout();
                }
            });

            setWebsocketManager(wsManager);
        } catch (error) {
            alert("알 수 없는 오류가 발생했습니다");
            window.location.reload();
        }
    };

    const handleTimeout = () => {
        websocketManager?.disconnect();
        window.location.reload();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300">
            {/* 메인 콘텐츠 영역 */}
            <div className="flex-grow flex justify-center items-center">
                {isClicked ? (
                    <div className="flex flex-col justify-center items-center min-h-[80vh]">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            QR 스캔 후 로그인을 완료 해주세요
                        </h1>
                        {qrCodeBase64 ? (
                            <>
                                <img
                                    src={qrCodeBase64}
                                    alt="QR Code"
                                    className="w-64 h-64 object-contain border-4 border-gray-300 rounded-lg shadow-md"
                                />
                                <div className="w-16 h-16 mt-5 mb-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p>로그인 완료 대기 중입니다...</p>
                                <p className="text-red-500 mt-4">남은 시간: {formatTime(timer)}</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p>QR 코드를 생성 중입니다...</p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center min-h-[80vh]">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            QR 접수 페이지
                        </h1>
                        <button
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
                            onClick={() => setIsClicked(true)}
                        >
                            접수 시작하기
                        </button>
                    </div>
                )}
            </div>

            {/* GitHub 링크 영역 */}
            <footer className="p-4 text-center">
                <a
                    href="https://github.com/your_username/QRGate" // 본인의 저장소 URL로 변경하세요.
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    GitHub - QRGate
                </a>
            </footer>
        </div>
    );
};

export default QR;