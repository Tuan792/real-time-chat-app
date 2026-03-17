import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-gradient-to-b from-purple-900 to-blue-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-blue-500/30">
              <div className="w-full max-w-md 
                              bg-gradient-to-br from-indigo-600/90 to-purple-600/90 
                              rounded-xl p-6 shadow-2xl border border-indigo-400/30">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-indigo-200 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Tạo tài khoản</h2>
                  <p className="text-gray-200">Tự tạo cho bạn một tài khoản mới</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label text-gray-200">Tên người dùng</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon text-indigo-200" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input bg-gray-700/50 text-white placeholder-gray-300"
                        placeholder="Quốc Tuấn"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label text-gray-200">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon text-indigo-200" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input bg-gray-700/50 text-white placeholder-gray-300"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label text-gray-200">Mật khẩu</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon text-indigo-200" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input bg-gray-700/50 text-white placeholder-gray-300"
                        placeholder="Nhập mật khẩu"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Tạo tài khoản"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link text-indigo-100 hover:text-indigo-200">
                    Bạn đã có tài khoản? Đăng nhập
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-blue-900/30 to-purple-900/20">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-purple-400">Bắt đầu ngày mới của bạn</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge bg-purple-600 text-white">Miễn phí</span>
                    <span className="auth-badge bg-indigo-600 text-white">Dễ cài đặt</span>
                    <span className="auth-badge bg-cyan-600 text-white">Riêng tư</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;