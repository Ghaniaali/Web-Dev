import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})

export class UsersComponent implements OnInit {
  users: any[] = [];
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Member';
  editIndex: number | null = null;
  searchTerm: string = '';
  
  roles: string[] = ['Admin', 'Librarian', 'Member'];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const signupUsers = localStorage.getItem('users');
    const existingUsers = signupUsers ? JSON.parse(signupUsers) : [];

    const managedUsers = localStorage.getItem('managedUsers');
    const usermanagedData = managedUsers ? JSON.parse(managedUsers) : [];

    this.users = existingUsers.map((user: any) => {
        const managementData = usermanagedData.find((managed:any) => 
        managed.username === user.username || managed.email === user.email
      );

      return managementData || {
        id: user.id || this.generateId(),
        username: user.username,
        email: user.email,
        password: user.password,
        role: 'Member', 
        joinDate: user.joinDate || new Date().toLocaleDateString(),
        status: 'Active'
      };
    });
  }


  saveUsers(){
      const basicUsers = this.users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      joinDate: user.joinDate

    }));

    localStorage.setItem('users', JSON.stringify(basicUsers));
    
    localStorage.setItem('managedUsers', JSON.stringify(this.users));
  }

  addUser() {
    if (!this.username || !this.email || !this.password) {
     this.showAlert("All fields are required!", 'error');
      return;
    }

    const existingUser = this.users.find((user: any) => 
      user.username === this.username || user.email === this.email
    );

    if (existingUser) {
      this.showAlert("User already exists!", 'error');
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      status: 'Active',
      joindate: new Date().toLocaleDateString(),
      id: this.generateId()
    };

    this.users.push(newUser);
    this.saveUsers();
    this.resetForm();
    this.showAlert("User added successfully!", 'success');
  }

  editUser(index: number) {
    const user = this.users[index];
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || 'Member';
    this.editIndex = index;
  }

  updateUser() {
    if (this.editIndex !== null) {
      this.users[this.editIndex] = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      };

      this.saveUsers();
      this.resetForm();
      this.showAlert("User updated successfully!", 'success');
    }
  }

  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
      this.saveUsers();
      this.showAlert("User deleted successfully!", 'success');
    }
  }

  toggleUserStatus(index: number) {
    this.users[index].status = this.users[index].status === 'Active' ? 'Inactive' : 'Active';
    this.saveUsers();
  }

  resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = 'Member';
    this.editIndex = null;
  }

  get filteredUsers() {
    if (!this.searchTerm) return this.users;
    
    return this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private showAlert(message: string, type: 'success' | 'error') {
    alert(message);
  }
}
