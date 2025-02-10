import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const main_url = "qrgate.xyz";
const BASE_URL = "https://" + main_url + "/api";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인 검사
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 실제 엔드포인트와 요청 파라미터는 백엔드 구현에 맞게 수정하세요.
            const url = `${BASE_URL}/test/insert?user_id=${email}&user_pwd=${password}`;
            const response = await axios.get(url);
            if (response.status === 200 && response.data.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } else {
                setError("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            console.error(err);
            setError("회원가입 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300">
            <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center w-[90%] max-w-[400px]">
                {!isSuccess ? (
                    <>
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">회원가입</h1>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                                    이메일
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="example@example.com"
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                                    비밀번호
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                                    비밀번호 확인
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="********"
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                회원가입
                            </button>
                        </form>
                        <p className="mt-6 text-sm text-gray-600">
                            이미 계정이 있으신가요?{" "}
                            <a href="/login" className="text-blue-500 hover:underline">
                                로그인
                            </a>
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/845/845646.png" // 성공 아이콘 이미지 (변경 가능)
                            alt="성공"
                            className="w-24 h-24 mb-6"
                        />
                        <h2 className="text-2xl font-bold text-green-600">회원가입 성공!</h2>
                        <p className="text-gray-600 mt-4">환영합니다!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;