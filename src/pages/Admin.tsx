import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import {
  LayoutDashboard, FileText, Users, Settings,
  LogOut, Mail, Eye, Trash2, X,
  Shield, AlertTriangle,
} from 'lucide-react';

type TabType = 'dashboard' | 'contacts' | 'quotes' | 'settings';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const { data: contacts, refetch: refetchContacts } = trpc.contact.list.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const { data: quotes, refetch: refetchQuotes } = trpc.quote.list.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => refetchContacts(),
  });

  const deleteQuote = trpc.quote.delete.useMutation({
    onSuccess: () => refetchQuotes(),
  });

  const updateQuoteStatus = trpc.quote.updateStatus.useMutation({
    onSuccess: () => {
      refetchQuotes();
      setSelectedQuote(null);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const tabs: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'quotes', label: 'Quote Requests', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    quoted: 'bg-green-500/20 text-green-400',
    closed: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <div className="min-h-screen bg-[#060606] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#171717] border-r border-white/5 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#d91d1d]" />
            <span className="font-display text-xl font-bold text-white">ROOFTEX</span>
          </div>
          <p className="text-white/40 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#d91d1d] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#d91d1d] flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{user.name || 'Admin'}</div>
              <div className="text-white/40 text-xs">{user.email || 'admin@rooftex.com'}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#171717] border-b border-white/5 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#d91d1d]" />
            <span className="font-display text-lg font-bold text-white">ROOFTEX</span>
          </div>
          <button onClick={logout} className="text-white/40 hover:text-white">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex overflow-x-auto px-4 pb-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#d91d1d] text-white'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:pt-0 pt-28">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-6 lg:p-10">
            <h1 className="font-display text-3xl font-bold text-white mb-8">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Contacts', value: stats?.totalContacts || 0, icon: Mail, color: 'bg-blue-500/10 text-blue-400' },
                { label: 'Quote Requests', value: stats?.totalQuotes || 0, icon: FileText, color: 'bg-green-500/10 text-green-400' },
                { label: 'New Quotes', value: stats?.newQuotes || 0, icon: AlertTriangle, color: 'bg-yellow-500/10 text-yellow-400' },
                { label: 'Services', value: '6', icon: Shield, color: 'bg-[#d91d1d]/10 text-[#d91d1d]' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#171717] border border-white/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#171717] border border-white/5 p-6">
                <h2 className="font-display text-xl font-bold text-white mb-6">Recent Contacts</h2>
                <div className="space-y-4">
                  {contacts?.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-white font-medium">{contact.name}</div>
                        <div className="text-white/40 text-sm">{contact.email}</div>
                      </div>
                      <div className="text-white/30 text-xs">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {(!contacts || contacts.length === 0) && (
                    <p className="text-white/30 text-sm">No contacts yet.</p>
                  )}
                </div>
              </div>

              <div className="bg-[#171717] border border-white/5 p-6">
                <h2 className="font-display text-xl font-bold text-white mb-6">Recent Quotes</h2>
                <div className="space-y-4">
                  {quotes?.slice(0, 5).map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-white font-medium">{quote.name}</div>
                        <div className="text-white/40 text-sm">{quote.serviceType || 'General Inquiry'}</div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium ${statusColors[quote.status]}`}>
                        {quote.status}
                      </span>
                    </div>
                  ))}
                  {(!quotes || quotes.length === 0) && (
                    <p className="text-white/30 text-sm">No quotes yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="p-6 lg:p-10">
            <h1 className="font-display text-3xl font-bold text-white mb-8">Contact Submissions</h1>

            <div className="bg-[#171717] border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Name</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Email</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Subject</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Date</th>
                      <th className="text-right text-white/40 text-sm font-medium px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts?.map((contact) => (
                      <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{contact.name}</div>
                          {contact.phone && <div className="text-white/40 text-sm">{contact.phone}</div>}
                        </td>
                        <td className="px-6 py-4 text-white/60">{contact.email}</td>
                        <td className="px-6 py-4 text-white/60">{contact.subject || '-'}</td>
                        <td className="px-6 py-4 text-white/40 text-sm">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-[#d91d1d] transition-colors"
                            >
                              <Eye className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Delete this contact?')) {
                                  deleteContact.mutate({ id: contact.id });
                                }
                              }}
                              className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!contacts || contacts.length === 0) && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                          No contact submissions yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div className="p-6 lg:p-10">
            <h1 className="font-display text-3xl font-bold text-white mb-8">Quote Requests</h1>

            <div className="bg-[#171717] border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Name</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Service</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Roof Size</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Status</th>
                      <th className="text-left text-white/40 text-sm font-medium px-6 py-4">Date</th>
                      <th className="text-right text-white/40 text-sm font-medium px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes?.map((quote) => (
                      <tr key={quote.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{quote.name}</div>
                          <div className="text-white/40 text-sm">{quote.email}</div>
                        </td>
                        <td className="px-6 py-4 text-white/60">{quote.serviceType || '-'}</td>
                        <td className="px-6 py-4 text-white/60">{quote.roofSize || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium ${statusColors[quote.status]}`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/40 text-sm">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedQuote(quote)}
                              className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-[#d91d1d] transition-colors"
                            >
                              <Eye className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Delete this quote?')) {
                                  deleteQuote.mutate({ id: quote.id });
                                }
                              }}
                              className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!quotes || quotes.length === 0) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                          No quote requests yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6 lg:p-10">
            <h1 className="font-display text-3xl font-bold text-white mb-8">Settings</h1>

            <div className="max-w-xl space-y-6">
              <div className="bg-[#171717] border border-white/5 p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">Name</label>
                    <div className="bg-[#060606] border border-white/10 text-white px-4 py-3">{user.name || 'Admin'}</div>
                  </div>
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">Email</label>
                    <div className="bg-[#060606] border border-white/10 text-white px-4 py-3">{user.email || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">Role</label>
                    <div className="bg-[#060606] border border-white/10 text-[#d91d1d] px-4 py-3 font-medium capitalize">{user.role}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#171717] border border-white/5 p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4">Danger Zone</h2>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-6 py-3 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setSelectedContact(null)}>
          <div className="bg-[#171717] max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">Contact Details</h2>
              <button onClick={() => setSelectedContact(null)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div><label className="text-white/40 text-sm">Name</label><p className="text-white">{selectedContact.name}</p></div>
              <div><label className="text-white/40 text-sm">Email</label><p className="text-white">{selectedContact.email}</p></div>
              {selectedContact.phone && <div><label className="text-white/40 text-sm">Phone</label><p className="text-white">{selectedContact.phone}</p></div>}
              {selectedContact.subject && <div><label className="text-white/40 text-sm">Subject</label><p className="text-white">{selectedContact.subject}</p></div>}
              <div><label className="text-white/40 text-sm">Message</label><p className="text-white/80 text-sm leading-relaxed">{selectedContact.message}</p></div>
              <div><label className="text-white/40 text-sm">Received</label><p className="text-white/60 text-sm">{new Date(selectedContact.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setSelectedQuote(null)}>
          <div className="bg-[#171717] max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">Quote Details</h2>
              <button onClick={() => setSelectedQuote(null)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div><label className="text-white/40 text-sm">Name</label><p className="text-white">{selectedQuote.name}</p></div>
              <div><label className="text-white/40 text-sm">Email</label><p className="text-white">{selectedQuote.email}</p></div>
              <div><label className="text-white/40 text-sm">Phone</label><p className="text-white">{selectedQuote.phone}</p></div>
              {selectedQuote.address && <div><label className="text-white/40 text-sm">Address</label><p className="text-white">{selectedQuote.address}</p></div>}
              {selectedQuote.serviceType && <div><label className="text-white/40 text-sm">Service</label><p className="text-white">{selectedQuote.serviceType}</p></div>}
              {selectedQuote.roofSize && <div><label className="text-white/40 text-sm">Roof Size</label><p className="text-white">{selectedQuote.roofSize}</p></div>}
              {selectedQuote.message && <div><label className="text-white/40 text-sm">Message</label><p className="text-white/80 text-sm">{selectedQuote.message}</p></div>}
              <div>
                <label className="text-white/40 text-sm">Status</label>
                <div className="flex gap-2 mt-2">
                  {['new', 'contacted', 'quoted', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateQuoteStatus.mutate({ id: selectedQuote.id, status: status as "new" | "contacted" | "quoted" | "closed" })}
                      className={`px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                        selectedQuote.status === status
                          ? statusColors[status]
                          : 'bg-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div><label className="text-white/40 text-sm">Received</label><p className="text-white/60 text-sm">{new Date(selectedQuote.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
