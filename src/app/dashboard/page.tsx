"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);

    // 1. ดักจับข้อมูลจาก URL (ตอนที่ Main Login เด้งกลับมาหน้านี้)
    const hash = window.location.hash;
    if (hash && hash.includes('token=')) {
      const params = new URLSearchParams(hash.substring(1));
      const mophToken = params.get('token');
      const profileStr = params.get('profile');

      if (mophToken) {
        localStorage.setItem('moph_token', mophToken);
      }
      if (profileStr) {
        try {
          const decoded = JSON.parse(decodeURIComponent(profileStr));
          localStorage.setItem('provider_profile', JSON.stringify(decoded));
          setProfile(decoded);
        } catch (e) { }
      }

      // ลบ Hash ออกจาก URL เพื่อความสวยงาม
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      // 2. ถ้าไม่มีใน URL ให้ลองดึงจาก LocalStorage (กรณีเคยกดเข้ามาแล้ว)
      const savedProfile = localStorage.getItem('provider_profile');
      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile));
        } catch (e) { }
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('moph_token');
    localStorage.removeItem('provider_profile');
    window.location.href = '/'; // กลับไปหน้าแรก
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8 border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-[#006E8C]">Eye Donation Dashboard</h1>
            <p className="text-slate-500 text-sm">ระบบบริหารจัดการการบริจาคดวงตา</p>
          </div>
          <button 
            onClick={logout}
            className="px-6 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>

        {/* Content */}
        {!profile ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-slate-100">
            <h2 className="text-xl text-slate-600 mb-4">คุณยังไม่ได้เข้าสู่ระบบ</h2>
            <Link href="/" className="px-6 py-3 bg-[#0284c7] text-white rounded-xl font-semibold hover:bg-[#0369a1] transition-colors inline-block">
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Profile Card */}
            <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-center text-slate-800 mb-1">
                {profile?.title_th || profile?.pre_name_th || ''} {profile?.firstname_th || profile?.first_name_th} {profile?.lastname_th || profile?.last_name_th}
              </h2>
              <p className="text-center text-emerald-600 font-medium text-sm mb-6">
                Provider ID: {profile?.provider_id}
              </p>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs">ตำแหน่ง/วิชาชีพ</span>
                  <span className="font-medium">{profile?.organization?.[0]?.position_type || profile?.profession_name_th || '-'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs">หน่วยบริการ</span>
                  <span className="font-medium">{profile?.organization?.[0]?.hname_th || '-'}</span>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-slate-400">
              <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p className="text-lg">พื้นที่ส่วนระบบงาน Eye Donation</p>
              <p className="text-sm mt-2">ดึงข้อมูลสำเร็จและพร้อมทำงานต่อ</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
