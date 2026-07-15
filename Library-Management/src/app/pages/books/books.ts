import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-books',
  imports: [CommonModule,FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books implements OnInit{

  books: any[] = [];
  users: any[] = [];

  title: string = '';
  author: string = '';
  isbn: string = '';
  category: string = 'Fiction';
  available: boolean = true;
  issuedTo: string = '';
  issuedDate: string = '';
  dueDate: string = '';
  editIndex: number | null = null;
  searchTerm: string = '';
  filterStatus: string = 'all';

  categories: string[] = ['Fiction', 'Non-Fiction', 'Poetry', 'Science', 'Biography', 'Children', 'Horror', 'Romance'];
  
  showIssueModal: boolean = false;
  selectedBookIndex: number | null = null;

  ngOnInit(): void {
      this.loadBooks();
      this.loadUsers();
  }

  loadBooks(){
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
  }

  saveBooks(){
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  loadUsers(){
    const basicUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const managedUsers = JSON.parse(localStorage.getItem('managedUsers') || '[]');

    this.users = managedUsers.length ? managedUsers : basicUsers; 
  }

  addBook(){
    if (!this.title || !this.author || !this.isbn){
      this.showAlert("All fields are required!", 'error');
      return;
    }

    const existingBook = this.books.find( book  => book.isbn === this.isbn);
    if (existingBook) {
      this.showAlert("Book already exists!", 'error');
      return;
    }
   
    const newBook = {
      id: this.generateId(),
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      category: this.category,
      available: true,
      issuedTo: null,
      issuedDate: null,
      dueDate: null,
      addedDate: new Date().toLocaleDateString(),
    };

    this.books.push(newBook);
    this.saveBooks();
    this.resetForm();
    this.showAlert("Book added successfully!", 'success');
  }

  editBook(index: number){
    const book = this.books[index];
    this.title = book.title;
    this.author = book.author;
    this.isbn = book.isbn;
    this.category = book.category || 'Fiction';
    this.available = book.available;
    this.editIndex = index;
  }

  updateBook(){
    if (this.editIndex !== null) {
      this.books[this.editIndex] = {
        title: this.title,
        author: this.author,
        isbn: this.isbn,
        category: this.category,
        available: this.available
      };

      this.saveBooks();
      this.resetForm();
      this.showAlert("Book updated successfully!", 'success');
    }
  }

  deleteBook(index: number){
    if (confirm('Are you sure you want to delete this book?')) {
      this.books.splice(index, 1);
      this.saveBooks();
      this.showAlert("Book deleted successfully!", 'success');
    }
  }

  openIssueModal(index: number){
    this.selectedBookIndex = index;
    this.showIssueModal = true;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    this.dueDate = dueDate.toISOString().split('T')[0];
  }

  closeIssueModal(){
    this.showIssueModal = false;
    this.selectedBookIndex = null;
    this.dueDate = '';
    this.issuedTo = '';
  }

  issueBook(){
    if (this.selectedBookIndex === null) return;

    if (!this.dueDate || !this.issuedTo) {
      this.showAlert("All fields are required!", 'error');
      return;
    }

    const book = this.books[this.selectedBookIndex];
    book.available = false;
    book.dueDate = new Date(this.dueDate).toLocaleDateString();
    book.issuedTo = this.issuedTo;
    book.issuedDate = new Date().toLocaleDateString();

    this.saveBooks();
    this.closeIssueModal();
    this.showAlert("Book issued successfully!", 'success');
  }

  returnBook(index: number){
    if (confirm('Are you sure you want to return this book?')) {
      const book = this.books[index];
      book.available = true;
      book.issuedTo = null;
      book.issuedDate = null;
      book.dueDate = null;

      this.saveBooks();
      this.showAlert("Book returned successfully!", 'success');
    }
  }

     get filteredBooks() {
      let filtered = this.books;

      if (this.searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      }

      if (this.filterStatus === 'available') {
        filtered = filtered.filter(book => book.available);
        } else if (this.filterStatus === 'issued') {
          filtered = filtered.filter(book => !book.available);
        }
      
      return filtered;
    }

     get bookStats(){
      const total = this.books.length;
      const available = this.books.filter(book => book.available).length;
      const issued = total - available;

      return {total, available, issued};  
    }

   isOverdue(book: any): boolean {
    if (!book.dueDate || !book.available )  return false;
    const dueDate = new Date(book.dueDate);
    const today = new Date();

    return dueDate < today;
   }

    resetForm() {
    this.title = '';
    this.author = '';
    this.isbn = '';
    this.category = 'Fiction';
    this.available= true;
    this.issuedTo = '';
    this.issuedDate = '';
    this.dueDate = '';
    this.editIndex = null;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private showAlert(message: string, type: 'success' | 'error') {
    alert(message);
  } 
}


