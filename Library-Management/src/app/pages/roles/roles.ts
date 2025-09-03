import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService, Role, Permission } from '../../services/roles.service/roles.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})

export class RolesComponent implements OnInit {
  roles: Role[] = [];
  showAddRoleForm = false;
  showEditModal = false;
  editingRole: Role | null = null;
  roleNameExists = false;

  newRole = {
    name: '',
    description: '',
    permissions: [] as string[]
  };

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolesService.roles$.subscribe(roles => {
      this.roles = roles;
    });
  }

  toggleAddRoleForm(): void {
    this.showAddRoleForm = !this.showAddRoleForm;
    if (!this.showAddRoleForm) {
      this.resetAddRoleForm();
    }
  }

  addRole(): void {
    if (this.rolesService.isRoleNameExists(this.newRole.name)) {
      this.roleNameExists = true;
      return;
    }

    this.rolesService.addRole(this.newRole);
    this.resetAddRoleForm();
    this.showSuccessMessage('Role created successfully!');
  }

  editRole(role: Role): void {
    this.editingRole = { ...role };
    this.showEditModal = true;
  }

  updateRole(): void {
    if (this.editingRole) {
      this.rolesService.updateRole(this.editingRole.id, this.editingRole);
      this.closeEditModal();
      this.showSuccessMessage('Role updated successfully!');
    }
  }

  deleteRole(roleId: string): void {
    const role = this.rolesService.getRoleById(roleId);
    if (!role) return;

    const userCount = this.getUserCountByRole(roleId);
    let confirmMessage = 'Are you sure you want to delete this role?';
    
    if (userCount > 0) {
      confirmMessage = `This role is assigned to ${userCount} user(s). Deleting it will remove the role from those users. Are you sure you want to continue?`;
    }

    if (confirm(confirmMessage)) {
      const success = this.rolesService.deleteRole(roleId);
      if (success) {
        this.removeRoleFromUsers(roleId);
        this.showSuccessMessage('Role deleted successfully!');
      } else {
        this.showErrorMessage('Cannot delete system roles!');
      }
    }
  }

  cancelAddRole(): void {
    this.resetAddRoleForm();
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingRole = null;
  }

  checkRoleNameExists(): void {
    this.roleNameExists = this.rolesService.isRoleNameExists(this.newRole.name);
  }

  onPermissionChange(permissionId: string, event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.newRole.permissions.includes(permissionId)) {
        this.newRole.permissions.push(permissionId);
      }
    } else {
      this.newRole.permissions = this.newRole.permissions.filter(id => id !== permissionId);
    }
    this.roleNameExists = false;
  }

  onEditPermissionChange(permissionId: string, event: any): void {
    if (!this.editingRole) return;

    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.editingRole.permissions.includes(permissionId)) {
        this.editingRole.permissions.push(permissionId);
      }
    } else {
      this.editingRole.permissions = this.editingRole.permissions.filter(id => id !== permissionId);
    }
  }

  getPermissionCategories(): string[] {
    return Object.keys(this.rolesService.getPermissionsByCategory());
  }

  getPermissionsByCategory(): { [category: string]: Permission[] } {
    return this.rolesService.getPermissionsByCategory();
  }

  getPermissionName(permissionId: string): string {
    const permission = this.rolesService.getAvailablePermissions().find(p => p.id === permissionId);
    return permission ? permission.name : permissionId;
  }

  getSelectedPermissionsInCategory(category: string): number {
    const categoryPermissions = this.getPermissionsByCategory()[category];
    return categoryPermissions.filter(p => this.newRole.permissions.includes(p.id)).length;
  }

  getUserCountByRole(roleId: string): number {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((user: any) => user.roleId === roleId).length;
  }

  viewRoleDetails(role: Role): void {
    const permissions = role.permissions.map(pid => this.getPermissionName(pid)).join('\n- ');
    alert(`Role: ${role.name}\n\nDescription: ${role.description}\n\nPermissions:\n- ${permissions}`);
  }

  private resetAddRoleForm(): void {
    this.newRole = {
      name: '',
      description: '',
      permissions: []
    };
    this.showAddRoleForm = false;
    this.roleNameExists = false;
  }

  private removeRoleFromUsers(roleId: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: any) => {
      if (user.roleId === roleId) {
        return { ...user, roleId: null };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  private showSuccessMessage(message: string): void {
    alert(message);
  }

  private showErrorMessage(message: string): void {
    alert(message);
  }
}