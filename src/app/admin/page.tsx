'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { products as localProducts } from '@/data/products';

// Simple password protection
const ADMIN_PASSWORD = "golden-admin-2024";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Migration function
    const handleMigration = async () => {
        if (!confirm('¿Estás seguro? Esto copiará los productos del código a la base de datos.')) return;
        setLoading(true);
        try {
            // Prepare data for insertion (remove ID to let Supabase generate UUIDs or keep distinct)
            const productsToInsert = localProducts.map(p => ({
                name: p.name,
                price: p.price,
                description: p.description,
                category: p.category,
                images: p.images,
                is_sold_out: false
            }));

            const { error } = await supabase.from('products').insert(productsToInsert);
            if (error) throw error;

            alert('¡Productos migrados exitosamente!');
            fetchProducts();
        } catch (error: any) {
            alert('Error en la migración: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'T-Shirts',
        images: '',
    });

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('products')
                .insert([
                    {
                        name: formData.name,
                        price: parseFloat(formData.price),
                        description: formData.description,
                        category: formData.category,
                        images: formData.images.split(',').map(url => url.trim()),
                        is_sold_out: false
                    }
                ])
                .select();

            if (error) throw error;

            alert('Producto creado con éxito!');
            setFormData({ name: '', price: '', description: '', category: 'T-Shirts', images: '' });
            fetchProducts();
        } catch (error: any) {
            alert('Error al crear producto: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchProducts();
        } catch (error: any) {
            alert('Error al eliminar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleSoldOut = async (id: string, currentStatus: boolean) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .update({ is_sold_out: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchProducts();
        } catch (error: any) {
            alert('Error al actualizar estado: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Acceso Admin</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 font-bold">
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    // Image uploading state
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                const { data } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                uploadedUrls.push(data.publicUrl);
            }

            // Append new URLs to existing ones
            const currentImages = formData.images ? formData.images.split(',').map(u => u.trim()).filter(Boolean) : [];
            const newImages = [...currentImages, ...uploadedUrls].join(', ');

            setFormData({ ...formData, images: newImages });
            alert('¡Imágenes subidas correctamente!');
        } catch (error: any) {
            alert('Error al subir imagen: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Mobile Header */}
            <div className="bg-white shadow-sm sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-serif font-bold text-slate-900">Panel Admin v2.0</h1>
                <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold uppercase tracking-widest text-red-500">
                    Salir
                </button>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-8">

                {/* Actions Toolbar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">Gestión de Catálogo</p>
                    <button
                        onClick={handleMigration}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition"
                        disabled={loading}
                    >
                        {loading ? '...' : '↺ Restaurar Backup'}
                    </button>
                </div>

                {/* Create Product Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">＋</span>
                        Nuevo Producto
                    </h2>

                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Nombre</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black transition outline-none font-medium"
                                placeholder="Ej. Pantalón Carhartt"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Precio</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400 font-bold">₡</span>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full p-3 pl-8 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black transition outline-none font-bold text-gray-800"
                                        placeholder="8000"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black transition outline-none font-medium text-gray-600 appearance-none"
                                >
                                    <option value="T-Shirts">Camisetas</option>
                                    <option value="Pants">Pantalones</option>
                                    <option value="Jackets">Chaquetas</option>
                                    <option value="Accessories">Accesorios</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Descripción</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-black transition outline-none text-sm text-gray-600"
                                rows={3}
                                placeholder="Detalles de la prenda..."
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Fotos</label>

                            <div className="flex flex-col gap-3">
                                {/* Gallery Upload Button */}
                                <div className="flex gap-2">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        ref={fileInputRef}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 active:scale-95 transform duration-100"
                                    >
                                        {uploading ? (
                                            <span className="animate-pulse">Subiendo...</span>
                                        ) : (
                                            <>
                                                <span className="text-2xl">📷</span>
                                                <span className="text-sm">Tocar para subir fotos</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {formData.images && (
                                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2 overflow-x-auto">
                                        {formData.images.split(',').map((img, idx) => img && (
                                            <div key={idx} className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-white border border-gray-200 relative">
                                                <img src={img.trim()} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        {formData.images.split(',').filter(Boolean).length > 0 && (
                                            <span className="text-xs text-gray-400 whitespace-nowrap px-2">
                                                {formData.images.split(',').filter(Boolean).length} fotos seleccionadas
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-black active:scale-95 transition-all duration-200 mt-4 text-sm uppercase tracking-widest"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Publicar Prenda'}
                        </button>
                    </form>
                </div>

                {/* Inventory List (Mobile Cards) */}
                <div>
                    <h2 className="text-lg font-bold mb-4 px-2 text-gray-900">Inventario ({products.length})</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                {/* Image Thumbnail */}
                                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    {product.images && product.images[0] ? (
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">No img</div>
                                    )}
                                    {product.is_sold_out && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-white uppercase transform -rotate-12 border border-white px-1">Agotado</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate pr-4">{product.name}</h3>
                                    <p className="text-vintage-gold font-bold text-sm">₡{product.price.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{product.category}</p>

                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleToggleSoldOut(product.id, product.is_sold_out)}
                                            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold text-center transition ${product.is_sold_out
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            {product.is_sold_out ? 'Marcar Disponible' : 'Marcar Agotado'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-3 py-1.5 bg-red-50 text-red-500 rounded-md text-xs font-bold"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                                <p>No hay productos en el inventario.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
