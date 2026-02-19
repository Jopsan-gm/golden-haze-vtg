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
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Panel de Administración</h1>
                    <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                        <button
                            onClick={handleMigration}
                            className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold text-sm"
                            disabled={loading}
                        >
                            {loading ? '...' : 'Restaurar'}
                        </button>
                        <button onClick={() => setIsAuthenticated(false)} className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-bold">Salir</button>
                    </div>
                </div>

                {/* Create Product Form */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">Añadir Nuevo Producto</h2>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nombre del Producto"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-3 border rounded w-full"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Precio (₡)"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="p-3 border rounded w-full"
                            required
                        />
                        <textarea
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="p-3 border rounded md:col-span-2 w-full"
                            rows={3}
                            required
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="p-3 border rounded w-full"
                        >
                            <option value="T-Shirts">Camisetas</option>
                            <option value="Pants">Pantalones</option>
                            <option value="Jackets">Chaquetas</option>
                            <option value="Accessories">Accesorios</option>
                        </select>

                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Imágenes</label>

                            {/* File Upload Button */}
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
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 transition"
                                >
                                    {uploading ? 'Subiendo...' : '📷 Subir desde Galería'}
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="O pega URLs de imágenes aquí (separadas por coma)"
                                value={formData.images}
                                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                className="p-3 border rounded w-full text-sm"
                            />
                            <p className="text-xs text-gray-400">Puedes mezclar fotos subidas y links externos.</p>
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition w-full"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Crear Producto'}
                        </button>
                    </form>
                </div>

                {/* Products List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold p-6 border-b">Inventario Actual</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4">Imagen</th>
                                    <th className="p-4">Nombre</th>
                                    <th className="p-4">Precio</th>
                                    <th className="p-4">Categoría</th>
                                    <th className="p-4">Estado</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-4">
                                            {product.images && product.images[0] && (
                                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                            )}
                                        </td>
                                        <td className="p-4 font-medium">{product.name}</td>
                                        <td className="p-4">₡{product.price.toLocaleString()}</td>
                                        <td className="p-4 text-sm text-gray-500">{product.category}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleToggleSoldOut(product.id, product.is_sold_out)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${product.is_sold_out
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                    }`}
                                            >
                                                {product.is_sold_out ? 'AGOTADO' : 'DISPONIBLE'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">
                                            No hay productos en la base de datos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
