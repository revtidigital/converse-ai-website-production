import { type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, CreditCard, LogOut, FileText, Trash2, Hash, ArrowLeftRight, Activity, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
  { label: "Case Studies", href: "/admin/case-studies", icon: BookOpen, end: false },
  { label: "Pricing", href: "/admin/pricing", icon: CreditCard, end: false },
];

const blogSubItems = [
  { label: "All Posts", href: "/admin/blog", icon: FileText, end: true },
  { label: "New Post", href: "/admin/blog/new", icon: FileText, end: true },
  { label: "Trash", href: "/admin/blog/trash", icon: Trash2, end: true },
  { label: "Categories", href: "/admin/blog/categories", icon: Hash, end: true },
  { label: "Redirects", href: "/admin/redirects", icon: ArrowLeftRight, end: true },
  { label: "Activity", href: "/admin/activity", icon: Activity, end: true },
];

const AdminShell = ({ children }: AdminShellProps) => {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-secondary/20 lg:flex">
      <aside className="border-b border-border/60 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center gap-2 px-6">
          <BarChart3 className="h-5 w-5 text-primary" />
          <Link to="/admin" className="text-lg font-bold text-primary">ConverseAI</Link>
          <span className="text-sm text-muted-foreground">Admin</span>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) => cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 lg:pt-3">
            <p className="hidden px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:block">Blog</p>
            {blogSubItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                className={({ isActive }) => cn(
                  "flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-border/60 bg-white">
          <div className="flex h-14 items-center justify-end gap-3 px-6">
            <span className="hidden text-xs text-muted-foreground sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1.5 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminShell;
