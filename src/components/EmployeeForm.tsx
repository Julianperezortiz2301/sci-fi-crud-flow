import { useState } from 'react';
import { X, Save, Loader2, User, Mail, Phone, Building, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Employee } from './Dashboard';

interface EmployeeFormProps {
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function EmployeeForm({ onSubmit, onClose, isLoading }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.position && formData.department && formData.hireDate) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const departments = [
    'Technology',
    'Sales',
    'Marketing',
    'Finance',
    'Human Resources',
    'Operations',
    'Customer Service'
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl glow-card animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-foreground">
                  Nuevo Empleado
                </CardTitle>
                <CardDescription>
                  Agrega un nuevo miembro al equipo
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Ej: juan@empresa.com"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Ej: +1 (555) 123-4567"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-foreground flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Posición
                </Label>
                <Input
                  id="position"
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="Ej: Senior Developer"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-foreground">
                  Departamento
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                  <SelectTrigger className="input-futuristic">
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate" className="text-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha de Contratación
                </Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleChange('hireDate', e.target.value)}
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="status" className="text-foreground">
                  Estado
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="input-futuristic">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary text-primary-foreground glow-button"
                disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.position || !formData.department || !formData.hireDate}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Crear Empleado
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}