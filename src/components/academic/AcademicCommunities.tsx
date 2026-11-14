import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  PlusCircle, 
  Trophy, 
  MessageSquare, 
  CheckCircle2, 
  UserCheck, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Award,
  BookOpen,
  X
} from 'lucide-react';
import { STUDENTS, StudentPersona } from '@/data/students';

interface StudyGroup {
  id: string;
  title: string;
  topic: string;
  courseCode: string;
  creatorName: string;
  membersCount: number;
  maxMembers: number;
  isJoined?: boolean;
  meetingTime: string;
  tags: string[];
}

const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 'grp-1',
    title: 'نخبة التشفير ما بعد الكمي (PQC Guild)',
    topic: 'دراسة وتطبيق خوارزميات ML-KEM والشبكات الرياضية',
    courseCode: 'ISE-243',
    creatorName: 'فهد خالد الغامدي',
    membersCount: 8,
    maxMembers: 12,
    isJoined: true,
    meetingTime: 'الأحد والثلاثاء - ٨:٠٠ مساءً',
    tags: ['PQC', 'Lattices', 'NIST'],
  },
  {
    id: 'grp-2',
    title: 'مجموعة مراجعة البراهين الصفرية (ZKP Lab Group)',
    topic: 'تطبيقات بروتوكولات Schnorr وبرهان فيات شامير',
    courseCode: 'ISE-243',
    creatorName: 'صالح محمد المالكي',
    membersCount: 6,
    maxMembers: 10,
    isJoined: false,
    meetingTime: 'الإثنين والأربعاء - ٧:٣٠ مساءً',
    tags: ['Zero-Knowledge', 'Auth', 'Privacy'],
  },
  {
    id: 'grp-3',
    title: 'فريق المصطلحات السيبرانية الأكاديمية (English Cyber Terms)',
    topic: 'ممارسة النطق والمصطلحات الأكاديمية ومحاكاة المقابلات التقنية',
    courseCode: 'ENG-CYBER',
    creatorName: 'ياسر محمد عسيري',
    membersCount: 14,
    maxMembers: 20,
    isJoined: false,
    meetingTime: 'الخميس - ٦:٠٠ مساءً',
    tags: ['Terminology', 'Speaking', 'Research'],
  },
];

interface LeaderboardItem {
  rank: number;
  name: string;
  academicId: string;
  specialty: string;
  xpPoints: number;
  completedChapters: number;
  pqcScore: number;
  badge: string;
}

const INITIAL_LEADERBOARD: LeaderboardItem[] = [
  {
    rank: 1,
    name: 'فهد خالد الغامدي',
    academicId: 'MEMBER-002M-01',
    specialty: 'مهندس البنية التشفيرية',
    xpPoints: 3450,
    completedChapters: 10,
    pqcScore: 98,
    badge: '🏆 البطل الأكاديمي',
  },
  {
    rank: 2,
    name: 'صالح محمد المالكي',
    academicId: 'MEMBER-002M-02',
    specialty: 'محلل الثغرات المتقدم',
    xpPoints: 3280,
    completedChapters: 10,
    pqcScore: 95,
    badge: '⚔️ خبير الثغرات',
  },
  {
    rank: 3,
    name: 'ياسر محمد عسيري',
    academicId: 'MEMBER-002M-03',
    specialty: 'مهندس استجابة الحوادث',
    xpPoints: 3120,
    completedChapters: 9,
    pqcScore: 92,
    badge: '🛡️ الحارس الرقمي',
  },
  {
    rank: 4,
    name: 'ماهر علي الشهري',
    academicId: 'MEMBER-002M-04',
    specialty: 'مطور العقود الذكية الآمنة',
    xpPoints: 2950,
    completedChapters: 9,
    pqcScore: 89,
    badge: '⛓️ حارس السلاسل',
  },
  {
    rank: 5,
    name: 'عبدالرحمن فيصل الحربي',
    academicId: 'MEMBER-002M-05',
    specialty: 'معماري البراهين صفرية المعرفة',
    xpPoints: 2840,
    completedChapters: 8,
    pqcScore: 88,
    badge: '🔮 متقن البراهين',
  },
];

export const AcademicCommunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GROUPS' | 'LOOKUP' | 'LEADERBOARD'>('GROUPS');
  
  // Peer Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPeer, setSearchedPeer] = useState<StudentPersona | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Study Groups State
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');
  const [newGroupCourse, setNewGroupCourse] = useState('ISE-243');
  const [newGroupMax, setNewGroupMax] = useState(10);

  // Notification state (in-place replacement for window.alert)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Peer lookup handler
  const handleSearchPeer = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchedPeer(null);
      return;
    }

    const found = STUDENTS.find(
      (s) =>
        s.academicId.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.username.toLowerCase().includes(q)
    );

    setSearchedPeer(found || null);
  };

  // Group join/leave handler
  const toggleJoinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const nextJoined = !g.isJoined;
          const nextCount = nextJoined ? g.membersCount + 1 : Math.max(1, g.membersCount - 1);
          showToast(
            nextJoined ? `تم الانضمام بنجاح إلى "${g.title}"!` : `تمت المغادرة من "${g.title}".`,
            nextJoined ? 'success' : 'info'
          );
          return {
            ...g,
            isJoined: nextJoined,
            membersCount: nextCount,
          };
        }
        return g;
      })
    );
  };

  // Create new group handler
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupTitle.trim() || !newGroupTopic.trim()) {
      showToast('يرجى كتابة عنوان المجموعة والموضوع العلمي', 'error');
      return;
    }

    const newGroup: StudyGroup = {
      id: `grp-${Date.now()}`,
      title: newGroupTitle.trim(),
      topic: newGroupTopic.trim(),
      courseCode: newGroupCourse,
      creatorName: 'أنت (الطالب الباحث)',
      membersCount: 1,
      maxMembers: Number(newGroupMax) || 10,
      isJoined: true,
      meetingTime: 'يُحدد بالتشاور عبر المنصة',
      tags: ['مجموعة_جديدة', newGroupCourse],
    };

    setGroups([newGroup, ...groups]);
    setIsCreatingGroup(false);
    setNewGroupTitle('');
    setNewGroupTopic('');
    showToast(`تم إنشاء المجموعة الأكاديمية "${newGroup.title}" بنجاح!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner (Safe replacement for window.alert) */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
              : toastMessage.type === 'error'
              ? 'bg-red-950/80 border-red-500/40 text-red-200'
              : 'bg-blue-950/80 border-blue-500/40 text-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xl">
              <Users className="w-6 h-6" />
              <span>المجتمعات الأكاديمية وحلقات المذاكرة (Academic Communities)</span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              تواصل مع زملائك في تخصص الأمن السيبراني، ابحث بالرقم الأكاديمي، وتنافس في قائمة المتصدرين.
            </p>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('GROUPS')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'GROUPS'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>مجموعات المذاكرة ({groups.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('LOOKUP')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'LOOKUP'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>دليل الزملاء بالرقم الأكاديمي</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('LEADERBOARD')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'LEADERBOARD'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>لوحة المتصدرين</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STUDY GROUPS */}
        {activeTab === 'GROUPS' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>حلقات التعلّم النشطة للمقررات الأكاديمية</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsCreatingGroup(!isCreatingGroup)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isCreatingGroup ? 'إلغاء' : 'إنشاء مجموعة جديدة'}</span>
              </button>
            </div>

            {/* Creation Form Modal/Card */}
            {isCreatingGroup && (
              <form
                onSubmit={handleCreateGroup}
                className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-4 shadow-xl"
              >
                <h4 className="text-sm font-bold text-amber-300">بيانات المجموعة الأكاديمية الجديدة</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المجموعة</label>
                    <input
                      type="text"
                      value={newGroupTitle}
                      onChange={(e) => setNewGroupTitle(e.target.value)}
                      placeholder="مثال: ورشة فك تشفير بروتوكول Kyber"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">المقرر المرتبط</label>
                    <select
                      value={newGroupCourse}
                      onChange={(e) => setNewGroupCourse(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="ISE-243">ISE-243: أمن وتشفير البيانات</option>
                      <option value="ENG-CYBER">ENG-101: الإنجليزية السيبرانية</option>
                      <option value="PQC-LAB">PQC: مختبر ما بعد الكم</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الموضوع والأهداف البحثية</label>
                  <textarea
                    rows={2}
                    value={newGroupTopic}
                    onChange={(e) => setNewGroupTopic(e.target.value)}
                    placeholder="اكتب نبذة عن جدول المذاكرة أو التحدي المستهدف..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400">الحد الأقصى للأعضاء:</label>
                    <input
                      type="number"
                      min={3}
                      max={30}
                      value={newGroupMax}
                      onChange={(e) => setNewGroupMax(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-center text-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                  >
                    حفظ ونشر المجموعة للطلاب
                  </button>
                </div>
              </form>
            )}

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="px-2 py-0.5 rounded font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {group.courseCode}
                      </span>
                      <span className="text-slate-400">
                        الأعضاء: {group.membersCount} / {group.maxMembers}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-100 leading-snug mb-1">
                      {group.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {group.topic}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {group.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      بإشراف: <span className="text-slate-300 font-medium">{group.creatorName}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleJoinGroup(group.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        group.isJoined
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-red-500/20 hover:text-red-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {group.isJoined ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>منضم (مغادرة)</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>انضمام للمجموعة</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PEER LOOKUP BY ACADEMIC ID */}
        {activeTab === 'LOOKUP' && (
          <div className="mt-6 space-y-6">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchPeer} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="أدخل (الرقم الأكاديمي) أو الاسم..."
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-lg shadow-cyan-600/20"
                >
                  استعلام
                </button>
              </form>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span>أرقام نموذجية للتجربة:</span>
                {INITIAL_LEADERBOARD.slice(0, 4).map((s, idx) => (
                  <button
                    key={s.academicId}
                    type="button"
                    onClick={() => {
                      setSearchQuery(s.academicId);
                      setSearchedPeer(STUDENTS[idx] || null);
                      setSearchAttempted(true);
                    }}
                    className="underline hover:text-cyan-400 font-mono"
                  >
                    {s.academicId}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Result Card */}
            {searchedPeer ? (
              <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-black text-xl flex items-center justify-center">
                      {searchedPeer.initial}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        <span>{searchedPeer.name}</span>
                        <span className="text-sm">{searchedPeer.badge}</span>
                      </h4>
                      <p className="text-xs text-cyan-400 font-mono">
                        المعرف الأكاديمي: {searchedPeer.academicId.startsWith('MEMBER-') ? searchedPeer.academicId : `MEMBER-002M-0${searchedPeer.id}`}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>حساب نشط وموثق</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">المسار الأكاديمي المتقدم:</span>
                    <span className="font-semibold text-slate-200">{searchedPeer.title}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">مجال التخصص الدقيق:</span>
                    <span className="font-semibold text-slate-200">{searchedPeer.theme.specialty}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{searchedPeer.message}&rdquo;
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => showToast(`تم إرسال طلب تعاون أكاديمي إلى ${searchedPeer.name}`, 'success')}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>إرسال دعوة للمذاكرة</span>
                  </button>
                </div>
              </div>
            ) : searchAttempted && searchQuery ? (
              <div className="max-w-md mx-auto text-center py-10 text-slate-400 text-xs">
                لم يتم العثور على طالب يطابق &ldquo;{searchQuery}&rdquo;. تأكد من صحة الرقم الأكاديمي.
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: LEADERBOARD */}
        {activeTab === 'LEADERBOARD' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>لوحة الشرف الأكاديمية (Mirsad Honor Roll)</span>
              </h3>
              <span className="text-xs text-slate-400">تحديث تلقائي مستند للتقدم في المقررات والمختبرات</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">المرتبة</th>
                    <th className="py-3 px-4">الطالب المتميز</th>
                    <th className="py-3 px-4">الرقم الأكاديمي</th>
                    <th className="py-3 px-4">نقاط الخبرة (XP)</th>
                    <th className="py-3 px-4">الفصول المنجزة</th>
                    <th className="py-3 px-4">معدل PQC</th>
                    <th className="py-3 px-4">الوسام الفخري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {INITIAL_LEADERBOARD.map((item) => (
                    <tr
                      key={item.rank}
                      className={`hover:bg-slate-800/40 transition ${
                        item.rank === 1 ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold">
                        {item.rank === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                            1
                          </span>
                        ) : item.rank === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300/20 text-slate-200 flex items-center justify-center border border-slate-300/30">
                            2
                          </span>
                        ) : item.rank === 3 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 flex items-center justify-center border border-amber-700/30">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-400 px-2">{item.rank}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-100">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.specialty}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{item.academicId}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{item.xpPoints} XP</td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{item.completedChapters} / 10</td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-semibold text-emerald-400">{item.pqcScore}%</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-amber-300">{item.badge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicCommunities;
