import { useState } from 'react';
import { X, Save, Loader2, Target, Building, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Opportunity } from './Dashboard';

interface OpportunityFormProps {
  onSubmit: (data: Omit<Opportunity, 'id'>) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function OpportunityForm({ onSubmit, onClose, isLoading }: OpportunityFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    value: '',
    status: 'lead' as 'lead' | 'negotiation' | 'closed-won' | 'closed-lost',
    priority: 'medium' as 'low' | 'medium' | 'high',
    deadline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.client && formData.value && formData.deadline && formData.description) {
      onSubmit({
        ...formData,
        value: parseFloat(formData.value)
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl glow-card animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-foreground">
                  Nueva Oportunidad
                </CardTitle>
                <CardDescription>
                  Agrega una nueva oportunidad de negocio
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
                <Label htmlFor="title" className="text-foreground flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Título de la Oportunidad
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Ej: Implementación de Software"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client" className="text-foreground flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Cliente
                </Label>
                <Input
                  id="client"
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleChange('client', e.target.value)}
                  placeholder="Ej: Tech Corp Inc."
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value" className="text-foreground flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Valor (USD)
                </Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  placeholder="Ej: 50000"
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha Límite
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  className="input-futuristic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground">
                  Estado
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="input-futuristic">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="negotiation">Negociación</SelectItem>
                    <SelectItem value="closed-won">Cerrada - Ganada</SelectItem>
                    <SelectItem value="closed-lost">Cerrada - Perdida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-foreground flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Prioridad
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger className="input-futuristic">
                    <SelectValue placeholder="Selecciona una prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-foreground">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe los detalles de la oportunidad..."
                  className="input-futuristic min-h-[100px]"
                  required
                />
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
                disabled={isLoading || !formData.title || !formData.client || !formData.value || !formData.deadline || !formData.description}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Crear Oportunidad
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}