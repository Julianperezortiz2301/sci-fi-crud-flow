import { useState } from 'react';
import { Plus, Database, Activity, Users, TrendingUp, Cpu, Zap, Shield } from 'lucide-react';
import { DataTable } from './DataTable';
import { DataForm } from './DataForm';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import dashboardHero from '@/assets/dashboard-hero.jpg';

export interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export function Dashboard() {
  const [items, setItems] = useState<DataItem[]>([
    {
      id: '1',
      name: 'Alexandra Chen',
      email: 'alex@example.com',
      role: 'Admin',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      role: 'User',
      status: 'active',
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Moderator',
      status: 'inactive',
      createdAt: '2024-01-17'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreate = async (data: Omit<DataItem, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be your actual API call:
      // const response = await fetch('/api/items', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      const newItem: DataItem = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setItems(prev => [...prev, newItem]);
      setShowForm(false);
      
      toast({
        title: "Elemento creado",
        description: "El elemento se ha creado exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al crear el elemento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: DataItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleUpdate = async (data: Omit<DataItem, 'id' | 'createdAt'>) => {
    if (!editingItem) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be your actual API call:
      // const response = await fetch(`/api/items/${editingItem.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      const updatedItem = { ...editingItem, ...data };
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ));
      
      setShowForm(false);
      setEditingItem(null);
      
      toast({
        title: "Elemento actualizado",
        description: "El elemento se ha actualizado exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el elemento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // This would be your actual API call:
      // const response = await fetch(`/api/items/${id}`, {
      //   method: 'DELETE'
      // });
      
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Elemento eliminado",
        description: "El elemento se ha eliminado exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el elemento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Items",
      value: items.length,
      icon: Database,
      change: "+12%"
    },
    {
      title: "Active Users",
      value: items.filter(item => item.status === 'active').length,
      icon: Users,
      change: "+8%"
    },
    {
      title: "System Status",
      value: "Online",
      icon: Activity,
      change: "99.9%"
    },
    {
      title: "Growth",
      value: "+23%",
      icon: TrendingUp,
      change: "+4%"
    }
  ];

  return (
    <div className="min-h-screen bg-background animated-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                <Cpu className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-2">
                  CRM Futurista
                </h1>
                <p className="text-xl text-muted-foreground">
                  Panel de control avanzado con funcionalidades CRUD
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Seguro</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Rápido</span>
              </div>
              <div className="flex items-center">
                <Database className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Eficiente</span>
              </div>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="glow-button bg-gradient-primary text-primary-foreground px-8 py-3 text-lg"
              disabled={isLoading}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Elemento
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="glow-card animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-primary">
                    {stat.change} desde el último mes
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data Table */}
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-foreground">Gestión de Datos</CardTitle>
            <CardDescription>
              Administra elementos con funcionalidades completas CRUD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        {/* Form Modal */}
        {showForm && (
          <DataForm
            item={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}