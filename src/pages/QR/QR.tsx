import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "qrcode";

const BASE_URL = "http://localhost:8000/api";
const CURRENT_URL = "http://localhost:5173";

const QR: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [qrCodeBase64, setQrCodeBase64] = useState("");

    useEffect(() => {
        if (isClicked) {
            reception_start();
        }
    }, [isClicked]);

    const reception_start = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/qr/start`);
            const targetUrl = `${CURRENT_URL}/login?token=${response.data.token}`;
            console.log(targetUrl)

            // QR 코드 생성 및 Base64 변환
            const qrCodeUrl = await QRCode.toDataURL(targetUrl);
            setQrCodeBase64(qrCodeUrl);
        } catch (error) {
            alert("알 수 없는 오류가 발생했습니다");
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300">
            {isClicked ? (
                <div className="flex flex-col justify-center items-center min-h-[80vh]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">QR 스캔 후 로그인을 완료 해주세요</h1>
                    {qrCodeBase64 ? (
                        <img src={qrCodeBase64} alt="QR Code"
                             className="w-64 h-64 object-contain border-4 border-gray-300 rounded-lg shadow-md"/>
                    ) : (
                        <p>QR 코드를 생성 중입니다...</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center min-h-[80vh]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">QR 접수 페이지</h1>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
                        onClick={() => setIsClicked(true)}
                    >
                        접수 시작하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default QR;