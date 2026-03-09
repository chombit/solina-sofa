import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Plus, Edit, Trash2, Search, TrendingUp, DollarSign, Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

type AdminTab = "overview" | "products" | "orders" | "customers" | "analytics";

const statsCards = [
  { label: "Total Revenue", value: "2,450,000 ETB", icon: DollarSign, change: "+12.5%", color: "text-gold" },
  { label: "Total Orders", value: "156", icon: ShoppingCart, change: "+8.2%", color: "text-gold" },
  { label: "Customers", value: "89", icon: Users, change: "+15.3%", color: "text-gold" },
  { label: "Page Views", value: "12,430", icon: Eye, change: "+22.1%", color: "text-gold" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Abebe Kebede", product: "Solina Modern Sectional", total: "85,000 ETB", status: "Delivered" },
  { id: "ORD-002", customer: "Sara Ahmed", product: "Classic Chesterfield", total: "120,000 ETB", status: "Processing" },
  { id: "ORD-003", customer: "Daniel Tesfaye", product: "Executive Desk Set", total: "45,000 ETB", status: "Shipped" },
  { id: "ORD-004", customer: "Meron Hailu", product: "Royal Upholstered Bed", total: "75,000 ETB", status: "Pending" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-gold/10 text-gold-dark",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-secondary text-muted-foreground",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
    { key: "orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { key: "customers", label: "Customers", icon: <Users className="h-4 w-4" /> },
    { key: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="md:w-56 shrink-0">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Admin Panel</h2>
              <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.key
                        ? "bg-gold text-accent-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
              {/* Overview */}
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsCards.map((stat) => (
                      <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground">{stat.label}</span>
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders */}
                  <div className="bg-card rounded-xl border border-border">
                    <div className="p-5 border-b border-border">
                      <h3 className="font-display font-bold text-foreground">Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Order</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Customer</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Product</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Total</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                              <td className="px-5 py-3 text-sm font-medium text-foreground">{order.id}</td>
                              <td className="px-5 py-3 text-sm text-foreground">{order.customer}</td>
                              <td className="px-5 py-3 text-sm text-muted-foreground">{order.product}</td>
                              <td className="px-5 py-3 text-sm font-bold text-foreground">{order.total}</td>
                              <td className="px-5 py-3">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Products Management */}
              {activeTab === "products" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
                    <Button variant="gold" className="gap-2">
                      <Plus className="h-4 w-4" /> Add Product
                    </Button>
                  </div>
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      maxLength={100}
                    />
                  </div>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Product</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Category</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Price</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Colors</th>
                            <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products
                            .filter((p) =>
                              p.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((product) => (
                              <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                                <td className="px-5 py-3">
                                  <div className="flex items-center gap-3">
                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                    <span className="text-sm font-medium text-foreground">{product.name}</span>
                                  </div>
                                </td>
                                <td className="px-5 py-3 text-sm text-muted-foreground">{product.category}</td>
                                <td className="px-5 py-3 text-sm font-bold text-foreground">{product.price}</td>
                                <td className="px-5 py-3 text-sm text-muted-foreground">{product.colors.length}</td>
                                <td className="px-5 py-3">
                                  <div className="flex items-center justify-end gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                                      <Edit className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Order ID</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Customer</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Product</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Total</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                            <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                              <td className="px-5 py-3 text-sm font-medium text-foreground">{order.id}</td>
                              <td className="px-5 py-3 text-sm text-foreground">{order.customer}</td>
                              <td className="px-5 py-3 text-sm text-muted-foreground">{order.product}</td>
                              <td className="px-5 py-3 text-sm font-bold text-foreground">{order.total}</td>
                              <td className="px-5 py-3">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-right">
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Customers */}
              {activeTab === "customers" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Customer data coming soon</h3>
                    <p className="text-muted-foreground">Connect the backend to see customer analytics.</p>
                  </div>
                </motion.div>
              )}

              {/* Analytics */}
              {activeTab === "analytics" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                      <h3 className="font-display font-bold text-foreground mb-4">Sales by Category</h3>
                      <div className="space-y-3">
                        {[
                          { cat: "Living Room", pct: 40 },
                          { cat: "Luxury", pct: 30 },
                          { cat: "Beds", pct: 15 },
                          { cat: "Office", pct: 10 },
                          { cat: "Corner Sofas", pct: 5 },
                        ].map((item) => (
                          <div key={item.cat}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{item.cat}</span>
                              <span className="font-medium text-foreground">{item.pct}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.pct}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gold rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                      <h3 className="font-display font-bold text-foreground mb-4">Monthly Revenue</h3>
                      <div className="flex items-end gap-2 h-40">
                        {[30, 45, 35, 55, 70, 60, 80, 75, 90, 85, 95, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className="flex-1 bg-gold/80 rounded-t-md hover:bg-gold transition-colors cursor-pointer"
                            title={`Month ${i + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Jan</span>
                        <span>Jun</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
