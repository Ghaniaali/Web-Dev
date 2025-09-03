import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private rolesSubject = new BehaviorSubject<Role[]>(this.loadRoles());
  public roles$ = this.rolesSubject.asObservable();

  private defaultPermissions: Permission[] = [

    { id: 'books.view', name: 'View Books', description: 'Can view books catalog', category: 'Books' },
    { id: 'books.add', name: 'Add Books', description: 'Can add new books', category: 'Books' },
    { id: 'books.edit', name: 'Edit Books', description: 'Can edit book details', category: 'Books' },
    { id: 'books.delete', name: 'Delete Books', description: 'Can delete books', category: 'Books' },
    
    { id: 'users.view', name: 'View Users', description: 'Can view user list', category: 'Users' },
    { id: 'users.add', name: 'Add Users', description: 'Can add new users', category: 'Users' },
    { id: 'users.edit', name: 'Edit Users', description: 'Can edit user details', category: 'Users' },
    { id: 'users.delete', name: 'Delete Users', description: 'Can delete users', category: 'Users' },
    
    { id: 'borrowing.issue', name: 'Issue Books', description: 'Can issue books to users', category: 'Borrowing' },
    { id: 'borrowing.return', name: 'Return Books', description: 'Can process book returns', category: 'Borrowing' },
    { id: 'borrowing.view', name: 'View Borrowing', description: 'Can view borrowing records', category: 'Borrowing' },
    
    { id: 'reports.view', name: 'View Reports', description: 'Can view system reports', category: 'Reports' },
    { id: 'reports.export', name: 'Export Reports', description: 'Can export reports', category: 'Reports' },
    
    { id: 'system.settings', name: 'System Settings', description: 'Can modify system settings', category: 'System' },
    { id: 'roles.manage', name: 'Manage Roles', description: 'Can create and edit roles', category: 'System' }
  ];

  constructor() {
    this.initializeDefaultRoles();
  }

  private loadRoles(): Role[] {
    const savedRoles = localStorage.getItem('systemRoles');
    return savedRoles ? JSON.parse(savedRoles) : [];
  }

  private saveRoles(roles: Role[]): void {
    localStorage.setItem('systemRoles', JSON.stringify(roles));
    this.rolesSubject.next(roles);
  }

  private initializeDefaultRoles(): void {
    const existingRoles = this.loadRoles();
    
    if (existingRoles.length === 0) {
      const defaultRoles: Role[] = [
        {
          id: this.generateId(),
          name: 'Admin',
          description: 'Full system access with all permissions',
          permissions: this.defaultPermissions.map(p => p.id),
          isDefault: true,
          createdAt: new Date()
        },
        {
          id: this.generateId(),
          name: 'Librarian',
          description: 'Manages books and borrowing operations',
          permissions: [
            'books.view', 'books.add', 'books.edit',
            'users.view', 'users.add', 'users.edit',
            'borrowing.issue', 'borrowing.return', 'borrowing.view',
            'reports.view'
          ],
          isDefault: true,
          createdAt: new Date()
        },
        {
          id: this.generateId(),
          name: 'User',
          description: 'Basic user with limited access',
          permissions: ['books.view', 'borrowing.view'],
          isDefault: true,
          createdAt: new Date()
        }
      ];
      
      this.saveRoles(defaultRoles);
    }
  }

  getRoles(): Role[] {
    return this.rolesSubject.value;
  }

  getRoleById(id: string): Role | undefined {
    return this.getRoles().find(role => role.id === id);
  }

  addRole(roleData: Omit<Role, 'id' | 'createdAt' | 'isDefault'>): void {
    const newRole: Role = {
      ...roleData,
      id: this.generateId(),
      isDefault: false,
      createdAt: new Date()
    };

    const currentRoles = this.getRoles();
    const updatedRoles = [...currentRoles, newRole];
    this.saveRoles(updatedRoles);
  }

  updateRole(id: string, roleData: Partial<Role>): void {
    const currentRoles = this.getRoles();
    const updatedRoles = currentRoles.map(role => 
      role.id === id ? { ...role, ...roleData } : role
    );
    this.saveRoles(updatedRoles);
  }

  deleteRole(id: string): boolean {
    const role = this.getRoleById(id);
    if (role && !role.isDefault) {
      const currentRoles = this.getRoles();
      const updatedRoles = currentRoles.filter(r => r.id !== id);
      this.saveRoles(updatedRoles);
      return true;
    }
    return false;
  }

  getAvailablePermissions(): Permission[] {
    return this.defaultPermissions;
  }

  getPermissionsByCategory(): { [category: string]: Permission[] } {
    return this.defaultPermissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as { [category: string]: Permission[] });
  }

  private generateId(): string {
    return 'role_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  isRoleNameExists(name: string, excludeId?: string): boolean {
    return this.getRoles().some(role => 
      role.name.toLowerCase() === name.toLowerCase() && role.id !== excludeId
    );
  }
}