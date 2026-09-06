import React, { useState } from 'react';
import { ShoppingBag, Plus, CheckCircle2, Package, DollarSign, ArrowRight } from 'lucide-react';
import { Product, ProductSale, Member } from '../types';

interface ProductsViewProps {
  products: Product[];
  members: Member[];
  onSellProduct: (sale: ProductSale) => void;
  onAddStock: (productId: string, amount: number) => void;
  darkMode?: boolean;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  members,
  onSellProduct,
  onAddStock,
  darkMode = false,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [assignedMemberId, setAssignedMemberId] = useState('');
  const [recentSales, setRecentSales] = useState<ProductSale[]>([
    {
      id: 's-1',
      productId: 'pr-1',
      productName: 'სნოს წყალი 0.5ლ',
      quantity: 2,
      totalPrice: 3.0,
      time: '11:30',
      date: '06/09/2026',
      memberName: 'ლუკა ლუნცკიძე',
    },
    {
      id: 's-2',
      productId: 'pr-3',
      productName: 'პროტეინის ბატონი (შოკოლადი)',
      quantity: 1,
      totalPrice: 6.5,
      time: '12:45',
      date: '06/09/2026',
    },
  ]);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleQuickSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (selectedProduct.stock < quantity) {
      alert('საწყობში არ არის საკმარისი მარაგი!');
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const assignedMember = members.find((m) => m.id === assignedMemberId);

    const sale: ProductSale = {
      id: `sale-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      totalPrice: selectedProduct.price * quantity,
      time: timeStr,
      date: dateStr,
      memberId: assignedMember?.id,
      memberName: assignedMember ? `${assignedMember.firstName} ${assignedMember.lastName}` : undefined,
    };

    onSellProduct(sale);
    setRecentSales((prev) => [sale, ...prev]);
    setQuantity(1);
    setAssignedMemberId('');
    alert(`გაყიდვა დაფიქსირდა: ${selectedProduct.name} x${quantity} (${sale.totalPrice}₾)`);
  };

  const totalSalesRevenue = recentSales.reduce((acc, s) => acc + s.totalPrice, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            პროდუქტები და ბარი
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            წყლის, დანამატების, პროტეინებისა და აქსესუარების გაყიდვა და მარაგები
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          დღევანდელი ბარის ნავაჭრი: <span className="text-sm font-black">{totalSalesRevenue.toFixed(2)}₾</span>
        </div>
      </div>

      {/* POS Quick Sale Box + Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Sell Form */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
            <span>სწრაფი გაყიდვა</span>
          </div>

          <form onSubmit={handleQuickSale} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                აირჩიეთ პროდუქტი
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.price}₾ (მარაგი: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  რაოდენობა
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  ჯამი (₾)
                </label>
                <div className="px-3 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs flex items-center">
                  {((selectedProduct?.price || 0) * quantity).toFixed(2)}₾
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                მიბმა წევრზე (არასავალდებულო)
              </label>
              <select
                value={assignedMemberId}
                onChange={(e) => setAssignedMemberId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              >
                <option value="">ზოგადი / ნაღდი ანგარიშსწორება</option>
                {members.slice(0, 10).map((m) => (
                  <option key={m.id} value={m.id}>
                    #{m.cardNumber} - {m.firstName} {m.lastName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>გაყიდვის დაფიქსირება</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Products Stock Table */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>მარაგების სია ({products.length} პროდუქტი)</span>
          </div>

          <div className={`rounded-2xl border ${darkMode ? 'border-slate-800 bg-[#161D28]' : 'border-slate-200 bg-white'} overflow-hidden shadow-2xs`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={`border-b ${darkMode ? 'border-slate-800 bg-[#1A2332] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'} font-semibold`}>
                  <tr>
                    <th className="px-4 py-2.5">დასახელება</th>
                    <th className="px-4 py-2.5">კატეგორია</th>
                    <th className="px-4 py-2.5">ფასი</th>
                    <th className="px-4 py-2.5">მარაგი</th>
                    <th className="px-4 py-2.5 text-right">მოქმედება</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-emerald-600">
                        {p.price}₾
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                            p.stock <= 10
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {p.stock} ცალი
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => onAddStock(p.id, 10)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold cursor-pointer"
                        >
                          +10 მარაგი
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
