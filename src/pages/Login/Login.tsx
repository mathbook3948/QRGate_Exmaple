import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const main_url = "qrgate.xyz"
const client_url = "qrgate.pages.dev"
const BASE_URL = "https://"+main_url+"/api";
// @ts-ignore
const CURRENT_URL = client_url

const Login: React.FC = () => {
    const query = useQuery();
    const token = query.get("token");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // 폼 기본 제출 방지
        try {
            const url = `${BASE_URL}/qr/auth/${token}`;
            const response = await axios.post(url, {
                id: email,
                pwd: password
            });
            if (response.status === 200 && response.data.success) {
                setIsSuccess(true);
            }
        } catch (error) {
            alert(error)
            alert("아이디 또는 비밀번호를 확인해주세요");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300">
            <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center w-[90%] max-w-[400px]">
                {!isSuccess ? (
                    <>
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">로그인</h1>
                        <p className="text-gray-600 text-center mb-8">계정 정보를 입력하여 로그인하세요</p>

                        <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">이메일</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="example@example.com"
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                로그인
                            </button>
                        </form>

                        <p className="mt-6 text-sm text-gray-600">
                            계정이 없으신가요? <a href="#" className="text-blue-500 hover:underline">회원가입</a>
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"  // 성공 아이콘 이미지 (변경 가능)
                            alt="성공"
                            className="w-24 h-24 mb-6"
                        />
                        <h2 className="text-2xl font-bold text-green-600">로그인 성공!</h2>
                        <p className="text-gray-600 mt-4">환영합니다! 😊</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;