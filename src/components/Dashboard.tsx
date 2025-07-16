import { useState, useEffect } from 'react';
import { Plus, Users, Target, Trash2, Building, Mail, Phone, Calendar, DollarSign, TrendingUp, User, Briefcase, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { EmployeeForm } from './EmployeeForm';
import { OpportunityForm } from './OpportunityForm';

// Ahora el frontend asume la estructura de los datos directamente del backend.
// Las interfaces ya no son necesarias aquí, pero si usas TypeScript y quieres mantener un tipado estricto,
// puedes mover estas interfaces a un archivo separado, como 'types.ts', para ser importado por ambos componentes.
// Sin embargo, para este ejemplo, las hemos eliminado para simplificar el código.

const API_BASE_URL = 'http://localhost:3000/api';

export function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const employeesResponse = await fetch(`${API_BASE_URL}/employees`);
      if (!employeesResponse.ok) throw new Error('Failed to fetch employees');
      const employeesData = await employeesResponse.json();
      setEmployees(employeesData);

      const opportunitiesResponse = await fetch(`${API_BASE_URL}/opportunities`);
      if (!opportunitiesResponse.ok) throw new Error('Failed to fetch opportunities');
      const opportunitiesData = await opportunitiesResponse.json();
      setOpportunities(opportunitiesData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudieron cargar los datos desde el servidor. Asegúrate de que el backend esté funcionando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCreateEmployee = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchAllData();
      setShowEmployeeForm(false);
      
      toast({
        title: "Empleado creado",
        description: "El empleado se ha agregado exitosamente.",
      });
    } catch (error) {
      console.error("Failed to create employee:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al crear el empleado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOpportunity = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchAllData();
      setShowOpportunityForm(false);
      
      toast({
        title: "Oportunidad creada",
        description: "La oportunidad se ha agregado exitosamente.",
      });
    } catch (error) {
      console.error("Failed to create opportunity:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al crear la oportunidad.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchAllData();
      
      toast({
        title: "Empleado eliminado",
        description: "El empleado se ha eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Failed to delete employee:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el empleado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOpportunity = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchAllData();

      toast({
        title: "Oportunidad eliminada",
        description: "La oportunidad se ha eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Failed to delete opportunity:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar la oportunidad.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status, type) => {
    if (type === 'employee') {
      return status === 'active' ? (
        <Badge className="bg-primary/20 text-primary border-primary/30">
          Activo
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-muted/20 text-muted-foreground border-muted-foreground/30">
          Inactivo
        </Badge>
      );
    } else {
      const variants = {
        lead: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        negotiation: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'closed-won': 'bg-green-500/20 text-green-400 border-green-500/30',
        'closed-lost': 'bg-red-500/20 text-red-400 border-red-500/30'
      };
      
      return (
        <Badge className={variants[status]}>
          {status === 'closed-won' ? 'Ganada' : 
           status === 'closed-lost' ? 'Perdida' : 
           status === 'lead' ? 'Lead' : 'Negociación'}
        </Badge>
      );
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <Badge className={variants[priority]}>
        {priority === 'low' ? 'Baja' : priority === 'medium' ? 'Media' : 'Alta'}
      </Badge>
    );
  };

  const totalOpportunityValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const hotOpportunities = opportunities.filter(opp => opp.priority === 'high' && opp.status !== 'closed-lost').length;

  return (
    <div className="min-h-screen bg-background animated-bg">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
              <Building className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-2">
                compañia de gestión de oportunidades y empleados
              </h1>
              <p className="text-xl text-muted-foreground">
                Gestión inteligente de empleados y oportunidades
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glow-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Empleados Activos
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {activeEmployees}
              </div>
              <p className="text-xs text-primary">
                de {employees.length} empleados totales
              </p>
            </CardContent>
          </Card>

          <Card className="glow-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valor Total Oportunidades
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${totalOpportunityValue.toLocaleString()}
              </div>
              <p className="text-xs text-primary">
                {opportunities.length} oportunidades activas
              </p>
            </CardContent>
          </Card>

          <Card className="glow-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Oportunidades Críticas
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {hotOpportunities}
              </div>
              <p className="text-xs text-primary">
                prioridad alta
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Employees and Opportunities */}
        <Tabs defaultValue="employees" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Empleados
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Oportunidades
            </TabsTrigger>
          </TabsList>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-4">
            <Card className="glow-card animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Gestión de Empleados</CardTitle>
                    <CardDescription>
                      Administra el equipo de la empresa
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowEmployeeForm(true)}
                    className="glow-button bg-gradient-primary text-primary-foreground"
                    disabled={isLoading}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Empleado
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <div
                                  key={employee.id}
                                  className="flex items-center justify-between p-4 border border-border rounded-lg table-row-hover"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                                      <User className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{employee.name}</h3>
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Mail className="w-3 h-3 mr-1" />
                                        {employee.email}
                                      </p>
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Phone className="w-3 h-3 mr-1" />
                                        {employee.phone}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                      <p className="font-medium text-foreground">{employee.position}</p>
                                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                                      <p className="text-xs text-muted-foreground flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(employee.hireDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {getStatusBadge(employee.status, 'employee')}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteEmployee(employee.id)}
                                        disabled={isLoading}
                                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive glow-button"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground p-8">No hay empleados registrados.</p>
                        )}
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card className="glow-card animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Gestión de Oportunidades</CardTitle>
                    <CardDescription>
                      Administra las oportunidades de negocio
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowOpportunityForm(true)}
                    className="glow-button bg-gradient-primary text-primary-foreground"
                    disabled={isLoading}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Oportunidad
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {opportunities.length > 0 ? (
                            opportunities.map((opportunity) => (
                                <div
                                  key={opportunity.id}
                                  className="flex items-center justify-between p-4 border border-border rounded-lg table-row-hover"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                                      <Target className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{opportunity.title}</h3>
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Building className="w-3 h-3 mr-1" />
                                        {opportunity.client}
                                      </p>
                                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                      <p className="font-bold text-foreground text-lg">
                                        ${opportunity.value.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(opportunity.deadline).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                      {getStatusBadge(opportunity.status, 'opportunity')}
                                      {getPriorityBadge(opportunity.priority)}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteOpportunity(opportunity.id)}
                                      disabled={isLoading}
                                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive glow-button"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground p-8">No hay oportunidades registradas.</p>
                        )}
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        {showEmployeeForm && (
          <EmployeeForm
            onSubmit={handleCreateEmployee}
            onClose={() => setShowEmployeeForm(false)}
            isLoading={isLoading}
          />
        )}

        {showOpportunityForm && (
          <OpportunityForm
            onSubmit={handleCreateOpportunity}
            onClose={() => setShowOpportunityForm(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}