import { Edit, Trash2, Shield, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DataItem } from './Dashboard';

interface DataTableProps {
  items: DataItem[];
  onEdit: (item: DataItem) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export function DataTable({ items, onEdit, onDelete, isLoading }: DataTableProps) {
  const getStatusBadge = (status: 'active' | 'inactive') => {
    return status === 'active' ? (
      <Badge className="bg-primary/20 text-primary border-primary/30">
        <ShieldCheck className="w-3 h-3 mr-1" />
        Activo
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-muted/20 text-muted-foreground border-muted-foreground/30">
        <Shield className="w-3 h-3 mr-1" />
        Inactivo
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      Admin: 'bg-destructive/20 text-destructive border-destructive/30',
      Moderator: 'bg-accent/20 text-accent border-accent/30',
      User: 'bg-secondary/20 text-secondary-foreground border-secondary/30'
    };
    
    return (
      <Badge className={variants[role as keyof typeof variants] || variants.User}>
        {role}
      </Badge>
    );
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay elementos para mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-2 text-sm font-medium text-muted-foreground">
              Nombre
            </th>
            <th className="text-left py-4 px-2 text-sm font-medium text-muted-foreground">
              Email
            </th>
            <th className="text-left py-4 px-2 text-sm font-medium text-muted-foreground">
              Rol
            </th>
            <th className="text-left py-4 px-2 text-sm font-medium text-muted-foreground">
              Estado
            </th>
            <th className="text-left py-4 px-2 text-sm font-medium text-muted-foreground">
              Fecha
            </th>
            <th className="text-right py-4 px-2 text-sm font-medium text-muted-foreground">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border/50 table-row-hover"
            >
              <td className="py-4 px-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-primary-foreground">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {item.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 text-muted-foreground">
                {item.email}
              </td>
              <td className="py-4 px-2">
                {getRoleBadge(item.role)}
              </td>
              <td className="py-4 px-2">
                {getStatusBadge(item.status)}
              </td>
              <td className="py-4 px-2 text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-2">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    disabled={isLoading}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary glow-button"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    disabled={isLoading}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive glow-button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}