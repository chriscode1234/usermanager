import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { UserService, User } from './user.service';



@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  users: User[] = [];
  message = '';
  messageType = '';
  editingId: number | null = null;
  searchText = '';

  newUser: any = { firstName: '', lastName: '', age: null, salary: null, email: '', department: '' };

  constructor(private userService: UserService, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadUsers();

    if (isPlatformBrowser(this.platformId)){
      setTimeout(() => {
      const video = document.querySelector('.bg-video') as HTMLVideoElement;
      if (video) {
        video.muted = true;
        video.play();
      }
    }, 100);
  }
    }
    

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.message = 'Loaded ' + data.length + ' user(s).';
      this.cdr.detectChanges();
    });
  }

  saveUser(): void {
    if (this.editingId === null) {
      this.userService.addUser(this.newUser).subscribe({
        next: (saved) => {
          this.message = 'Added ' + saved.firstName + ' (id ' + saved.id + ').';
          this.messageType = 'success';
          this.resetForm();
          this.loadUsers();
        },
        error: () => {
          this.message = 'Could not add user. Age must be 18 or older.';
          this.messageType = 'error';
        }
      });
    } else {
      this.userService.updateUser(this.editingId, this.newUser).subscribe({
        next: (saved) => {
          this.message = 'Updated ' + saved.firstName + ' (id ' + saved.id + ').';
          this.messageType = 'success';
          this.resetForm();
          this.loadUsers();
        },
        error: () => {
          this.message = 'Could not update user. Age must be 18 or older.';
          this.messageType = 'error';
        }
      });
    }
  }

  editUser(user: User): void {
    this.editingId = user.id!;
    this.newUser = { ...user };
    this.message = 'Editing ' + user.firstName + '. Change the fields, then click Save.';
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe(() => {
      this.message = 'Deleted user with id ' + id + '.';
      this.messageType = 'success';
      this.loadUsers();
    });
  }

  resetForm(): void {
    this.newUser = { firstName: '', lastName: '', age: null, salary: null, email: '', department: '' };
    this.editingId = null;
  }

  get filteredUsers(): User[] {
    const text = this.searchText.toLowerCase();
    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(text) ||
      user.lastName.toLowerCase().includes(text)
    );
  }

  sortBy(field: 'firstName' | 'lastName' | 'age' | 'salary'): void {
    this.users.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    this.cdr.detectChanges();
  }
}
